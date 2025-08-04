/**
 * Test E2E pour le commentateur sportif
 * Vérifie le comportement sur une partie complète
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSportsCommentator } from '@/hooks/useSportsCommentator';
import { Player } from '@/types';

// Mock pour performance.now
Object.defineProperty(global, 'performance', {
  value: {
    now: vi.fn(() => Date.now())
  }
});

describe('Sports Commentator E2E', () => {
  let players: Player[];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const createPlayer = (name: string, totalScore: number, rounds: number[] = []): Player => ({
    id: Math.random().toString(),
    name,
    avatarColor: '#3B82F6',
    emoji: '🎲',
    totalScore,
    rounds: rounds.map((score) => ({
      score,
      isDutch: false
    })),
    stats: {
      playerId: Math.random().toString(),
      roundsPlayed: rounds.length,
      meanScore: totalScore / Math.max(rounds.length, 1),
      totalScore,
      averageScore: totalScore / Math.max(rounds.length, 1),
      bestRound: rounds.length > 0 ? Math.min(...rounds) : null,
      worstRound: rounds.length > 0 ? Math.max(...rounds) : null,
      dutchCount: 0,
      improvementRate: 0,
      consistencyScore: 0.5,
      winStreak: 0
    }
  });

  it('devrait commenter après chaque manche et faire de la rotation entre manches', async () => {
    // Partie complète simulée
    const gameSteps = [
      // Manche 1
      {
        players: [
          createPlayer('Alice', 15, [15]),
          createPlayer('Bob', 20, [20]),
          createPlayer('Charlie', 25, [25])
        ],
        roundCount: 1
      },
      // Manche 2 - remontada d'Alice
      {
        players: [
          createPlayer('Alice', 25, [15, 10]),
          createPlayer('Bob', 35, [20, 15]),
          createPlayer('Charlie', 45, [25, 20])
        ],
        roundCount: 2
      },
      // Manche 3 - course serrée
      {
        players: [
          createPlayer('Alice', 35, [15, 10, 10]),
          createPlayer('Bob', 38, [20, 15, 3]),
          createPlayer('Charlie', 50, [25, 20, 5])
        ],
        roundCount: 3
      }
    ];

    const { result, rerender } = renderHook(
      ({ players, roundCount, isGameActive }) => 
        useSportsCommentator({ 
          players, 
          roundCount, 
          isGameActive,
          rotationInterval: 2 // 2 secondes pour les tests
        }),
      {
        initialProps: {
          players: gameSteps[0].players,
          roundCount: gameSteps[0].roundCount,
          isGameActive: true
        }
      }
    );

    const commentsReceived: string[] = [];

    // Manche 1
    await act(async () => {
      // Attendre que le commentaire post-manche apparaisse
      await vi.advanceTimersByTimeAsync(100);
    });

    if (result.current.isVisible && result.current.currentComment) {
      commentsReceived.push(`POST_ROUND_1: ${result.current.currentComment}`);
      expect(result.current.commentType).toBe('post_round');
    }

    // Attendre la rotation entre manches (démarrage après 5s)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5500);
    });

    if (result.current.isVisible && result.current.currentComment) {
      commentsReceived.push(`BETWEEN_ROUNDS_1: ${result.current.currentComment}`);
      expect(result.current.commentType).toBe('between_rounds');
    }

    // Rotation suivante (toutes les 2s)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2100);
    });

    if (result.current.isVisible && result.current.currentComment) {
      commentsReceived.push(`BETWEEN_ROUNDS_2: ${result.current.currentComment}`);
    }

    // Manche 2 - doit arrêter la rotation et faire un nouveau commentaire
    await act(async () => {
      rerender({
        players: gameSteps[1].players,
        roundCount: gameSteps[1].roundCount,
        isGameActive: true
      });
      await vi.advanceTimersByTimeAsync(100);
    });

    if (result.current.isVisible && result.current.currentComment) {
      commentsReceived.push(`POST_ROUND_2: ${result.current.currentComment}`);
      expect(result.current.commentType).toBe('post_round');
    }

    // Manche 3
    await act(async () => {
      rerender({
        players: gameSteps[2].players,
        roundCount: gameSteps[2].roundCount,
        isGameActive: true
      });
      await vi.advanceTimersByTimeAsync(100);
    });

    if (result.current.isVisible && result.current.currentComment) {
      commentsReceived.push(`POST_ROUND_3: ${result.current.currentComment}`);
    }

    // Vérifications
    console.log('Commentaires reçus:', commentsReceived);

    // Doit y avoir au moins des commentaires post-manche
    const postRoundComments = commentsReceived.filter(c => c.includes('POST_ROUND'));
    expect(postRoundComments.length).toBeGreaterThanOrEqual(2);

    // Doit y avoir des commentaires entre manches
    const betweenRoundsComments = commentsReceived.filter(c => c.includes('BETWEEN_ROUNDS'));
    expect(betweenRoundsComments.length).toBeGreaterThanOrEqual(1);

    // Tous les commentaires doivent mentionner des prénoms
    const commentsWithNames = commentsReceived.filter(comment => 
      gameSteps[0].players.some(player => comment.includes(player.name))
    );
    expect(commentsWithNames.length).toBeGreaterThan(0);

    // Tous les commentaires doivent respecter la limite de caractères
    commentsReceived.forEach(comment => {
      const commentText = comment.split(': ')[1] || '';
      expect(commentText.length).toBeLessThanOrEqual(120);
    });
  });

  it('devrait arrêter la rotation quand le jeu se termine', async () => {
    players = [
      createPlayer('Winner', 100, [50, 50]), // Gagnant
      createPlayer('Loser', 120, [60, 60])
    ];

    const { result, rerender } = renderHook(
      ({ isGameActive }) => 
        useSportsCommentator({ 
          players, 
          roundCount: 2, 
          isGameActive,
          rotationInterval: 1
        }),
      {
        initialProps: { isGameActive: true }
      }
    );

    // Démarrer la rotation
    await act(async () => {
      await vi.advanceTimersByTimeAsync(6000); // Après le délai initial
    });

    expect(result.current.isRotating).toBe(true);

    // Terminer le jeu
    await act(async () => {
      rerender({ isGameActive: false });
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.isRotating).toBe(false);

    // Attendre plus longtemps pour s'assurer que la rotation ne reprend pas
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(result.current.isRotating).toBe(false);
  });

  it('devrait permettre de forcer des commentaires manuellement', async () => {
    players = [
      createPlayer('Test1', 30, [30]),
      createPlayer('Test2', 35, [35])
    ];

    const { result } = renderHook(() => 
      useSportsCommentator({ 
        players, 
        roundCount: 1, 
        isGameActive: true 
      })
    );

    // Force un commentaire post-manche
    await act(async () => {
      result.current.forceComment('post_round');
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.currentComment).toBeTruthy();
    expect(result.current.commentType).toBe('post_round');

    // Attendre que le commentaire disparaisse
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4500);
    });

    expect(result.current.isVisible).toBe(false);

    // Force un commentaire entre manches
    await act(async () => {
      result.current.forceComment('between_rounds');
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.commentType).toBe('between_rounds');
  });

  it('devrait gérer correctement les changements de parties', async () => {
    // Première partie
    const firstGamePlayers = [
      createPlayer('Player1', 50, [25, 25]),
      createPlayer('Player2', 60, [30, 30])
    ];

    const { result, rerender } = renderHook(
      ({ players, roundCount }) => 
        useSportsCommentator({ 
          players, 
          roundCount, 
          isGameActive: true 
        }),
      {
        initialProps: {
          players: firstGamePlayers,
          roundCount: 2
        }
      }
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    const firstGameComment = result.current.currentComment;

    // Nouvelle partie (roundCount reset à 0)
    const secondGamePlayers = [
      createPlayer('NewPlayer1', 0, []),
      createPlayer('NewPlayer2', 0, [])
    ];

    await act(async () => {
      rerender({
        players: secondGamePlayers,
        roundCount: 0
      });
      await vi.advanceTimersByTimeAsync(100);
    });

    // Le commentaire devrait être effacé pour la nouvelle partie
    expect(result.current.isVisible).toBe(false);

    // Première manche de la nouvelle partie
    const newGameFirstRound = [
      createPlayer('NewPlayer1', 15, [15]),
      createPlayer('NewPlayer2', 20, [20])
    ];

    await act(async () => {
      rerender({
        players: newGameFirstRound,
        roundCount: 1
      });
      await vi.advanceTimersByTimeAsync(100);
    });

    expect(result.current.isVisible).toBe(true);
    expect(result.current.currentComment).not.toBe(firstGameComment);
    expect(result.current.currentComment).toMatch(/(NewPlayer1|NewPlayer2)/);
  });
});