/**
 * Tests unitaires pour le moteur de commentaires sportifs
 * Vérifie les scénarios: remontada, écrasante, suspense
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { commentaryEngine, useCommentaryEngine } from '@/hooks/commentary-engine';
import { Player } from '@/types';

describe('Commentary Engine', () => {
  let players: Player[];

  beforeEach(() => {
    commentaryEngine.resetGameState();
  });

  const createPlayer = (name: string, totalScore: number, rounds: number[] = []): Player => ({
    id: Math.random().toString(),
    name,
    avatarColor: '#3B82F6',
    emoji: '🎲',
    totalScore,
    rounds: rounds.map((score, index) => ({
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

  describe('Scénario Remontada', () => {
    it('devrait détecter et commenter une remontada spectaculaire', () => {
      // Setup: Marie était dernière, maintenant elle remonte
      const initialPlayers = [
        createPlayer('Alex', 25, [15, 10]),
        createPlayer('Sophie', 30, [20, 10]), 
        createPlayer('Marie', 45, [25, 20]) // était dernière
      ];

      // Après remontada de Marie
      players = [
        createPlayer('Marie', 50, [25, 20, 5]), // maintenant première !
        createPlayer('Alex', 55, [15, 10, 30]),
        createPlayer('Sophie', 58, [20, 10, 28])
      ];

      const commentary = commentaryEngine.generatePostRoundComment({
        players,
        roundCount: 3,
        gamePhase: 'mid',
        rankChanges: [],
        trends: []
      });

      expect(commentary.text).toContain('Marie');
      expect(commentary.text.toLowerCase()).toMatch(/(remonte|comeback|fusée|turbo)/);
      expect(commentary.priority).toBe('high');
      expect(commentary.text.length).toBeLessThanOrEqual(120);
    });

    it('devrait utiliser le prénom du joueur dans le commentaire', () => {
      players = [
        createPlayer('Jean-Baptiste', 20, [10, 10]),
        createPlayer('Marie-Claire', 35, [25, 10]),
        createPlayer('Pierre-Henri', 40, [30, 10])
      ];

      const commentary = commentaryEngine.generatePostRoundComment({
        players,
        roundCount: 2,
        gamePhase: 'early',
        rankChanges: [],
        trends: []
      });

      // Doit contenir au moins un prénom
      const containsName = players.some(p => commentary.text.includes(p.name));
      expect(containsName).toBe(true);
    });
  });

  describe('Scénario Écrasante', () => {
    it('devrait commenter une domination écrasante', () => {
      players = [
        createPlayer('Léa', 15, [8, 7]), // leader avec gros écart
        createPlayer('Thomas', 45, [25, 20]),
        createPlayer('Camille', 52, [30, 22]),
        createPlayer('Julien', 58, [35, 23])
      ];

      const commentary = commentaryEngine.generatePostRoundComment({
        players,
        roundCount: 2,
        gamePhase: 'mid',
        rankChanges: [],
        trends: []
      });

      expect(commentary.text).toContain('Léa');
      expect(commentary.text.toLowerCase()).toMatch(/(creuse|écart|avance|survole|démonstration)/);
      expect(commentary.priority).toBe('high');
      expect(commentary.text).toMatch(/\d+/); // doit contenir l'écart en points
    });
  });

  describe('Scénario Suspense', () => {
    it('devrait créer du suspense pour une course serrée', () => {
      players = [
        createPlayer('Anna', 48, [25, 23]), // course très serrée
        createPlayer('Boris', 52, [28, 24]),
        createPlayer('Clara', 54, [29, 25]),
        createPlayer('David', 55, [30, 25])
      ];

      const commentary = commentaryEngine.generatePostRoundComment({
        players,
        roundCount: 2,
        gamePhase: 'endgame',
        rankChanges: [],
        trends: []
      });

      expect(commentary.text).toContain('Anna');
      expect(commentary.text.toLowerCase()).toMatch(/(serré|suspense|craquer|folie)/);
      expect(commentary.priority).toBe('high');
      expect(commentary.text).toMatch(/\d+/); // doit mentionner l'écart
    });
  });

  describe('Commentaires entre manches', () => {
    it('devrait générer des punchlines variées entre les manches', () => {
      players = [
        createPlayer('Maxime', 30, [15, 15]),
        createPlayer('Lisa', 35, [20, 15])
      ];

      const comments = [];
      for (let i = 0; i < 10; i++) {
        const commentary = commentaryEngine.generateBetweenRoundsComment({
          players,
          roundCount: 1,
          gamePhase: 'early',
          rankChanges: [],
          trends: []
        });
        comments.push(commentary.text);
      }

      // Doit y avoir de la variété
      const uniqueComments = new Set(comments);
      expect(uniqueComments.size).toBeGreaterThan(3);

      // Tous les commentaires doivent respecter la limite
      comments.forEach(comment => {
        expect(comment.length).toBeLessThanOrEqual(120);
      });

      // Au moins un commentaire doit contenir un prénom
      const containsPlayerName = comments.some(comment => 
        players.some(player => comment.includes(player.name))
      );
      expect(containsPlayerName).toBe(true);
    });

    it('devrait inclure des rappels de règles', () => {
      players = [createPlayer('Test', 20, [20])];

      const ruleComments = [];
      for (let i = 0; i < 20; i++) {
        const commentary = commentaryEngine.generateBetweenRoundsComment({
          players,
          roundCount: 1,
          gamePhase: 'early',
          rankChanges: [],
          trends: []
        });
        ruleComments.push(commentary.text);
      }

      // Doit contenir des références aux règles du jeu
      const hasRuleReference = ruleComments.some(comment => 
        comment.toLowerCase().includes('roi') ||
        comment.toLowerCase().includes('as') ||
        comment.toLowerCase().includes('joker') ||
        comment.toLowerCase().includes('valet')
      );
      expect(hasRuleReference).toBe(true);
    });
  });

  describe('Performance', () => {
    it('devrait générer des commentaires en moins de 500ms', () => {
      players = [
        createPlayer('Speed', 20, [10, 10]),
        createPlayer('Test', 25, [15, 10])
      ];

      const startTime = performance.now();
      
      commentaryEngine.generatePostRoundComment({
        players,
        roundCount: 2,
        gamePhase: 'mid',
        rankChanges: [],
        trends: []
      });

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(500); // moins de 500ms
    });

    it('devrait générer des commentaires entre manches rapidement', () => {
      players = [createPlayer('Fast', 30, [30])];

      const startTime = performance.now();
      
      commentaryEngine.generateBetweenRoundsComment({
        players,
        roundCount: 1,
        gamePhase: 'early',
        rankChanges: [],
        trends: []
      });

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(500);
    });
  });

  describe('Contraintes de format', () => {
    it('devrait respecter la limite de 120 caractères', () => {
      players = [
        createPlayer('SuperLongPlayerNameForTesting', 20),
        createPlayer('AnotherVeryLongPlayerNameToTest', 25)
      ];

      for (let i = 0; i < 50; i++) {
        const postRoundComment = commentaryEngine.generatePostRoundComment({
          players,
          roundCount: i + 1,
          gamePhase: 'mid',
          rankChanges: [],
          trends: []
        });

        const betweenRoundsComment = commentaryEngine.generateBetweenRoundsComment({
          players,
          roundCount: i + 1,
          gamePhase: 'mid',
          rankChanges: [],
          trends: []
        });

        expect(postRoundComment.text.length).toBeLessThanOrEqual(120);
        expect(betweenRoundsComment.text.length).toBeLessThanOrEqual(120);
      }
    });

    it('devrait toujours retourner un commentaire non vide', () => {
      players = [createPlayer('Test', 0, [])];

      const commentary = commentaryEngine.generatePostRoundComment({
        players,
        roundCount: 1,
        gamePhase: 'early',
        rankChanges: [],
        trends: []
      });

      expect(commentary.text).toBeTruthy();
      expect(commentary.text.length).toBeGreaterThan(0);
    });
  });
});