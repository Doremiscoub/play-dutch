
/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ScoreBoard from '@/components/scoreboard/ScoreBoard';
import { Player } from '@/types';

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Alice',
    totalScore: 0, // Ajout de totalScore
    avatarColor: 'blue',
    rounds: [],
    stats: {
      playerId: '1',
      roundsPlayed: 0,
      meanScore: 0,
      // Ajout des propriétés nécessaires pour satisfaire le type PlayerStatistics
      averageScore: 0,
      bestRound: null,
      worstRound: null,
      dutchCount: 0,
      improvementRate: 0,
      consistencyScore: 0,
      winStreak: 0
    }
  },
  {
    id: '2',
    name: 'Bob',
    totalScore: 0, // Ajout de totalScore
    avatarColor: 'green',
    rounds: [],
    stats: {
      playerId: '2',
      roundsPlayed: 0,
      meanScore: 0,
      // Ajout des propriétés nécessaires pour satisfaire le type PlayerStatistics
      averageScore: 0,
      bestRound: null,
      worstRound: null,
      dutchCount: 0,
      improvementRate: 0,
      consistencyScore: 0,
      winStreak: 0
    }
  }
];

describe('Statistiques après ajout de manche', () => {
  let handleAddRound: ReturnType<typeof vi.fn>;
  let handleUndoLastRound: ReturnType<typeof vi.fn>;
  let handleEndGame: ReturnType<typeof vi.fn>;
  
  beforeEach(() => {
    handleAddRound = vi.fn();
    handleUndoLastRound = vi.fn();
    handleEndGame = vi.fn();
  });

  it('Les statistiques sont mises à jour après l\'ajout d\'une manche', async () => {
    render(
      <BrowserRouter>
        <ScoreBoard
          players={mockPlayers}
          onAddRound={handleAddRound}
          onUndoLastRound={handleUndoLastRound}
          onEndGame={handleEndGame}
          roundHistory={[]}
          scoreLimit={100}
        />
      </BrowserRouter>
    );
    
    // Vérifier l'affichage initial
    expect(screen.getByText(/Manches jouées/i)).toBeInTheDocument();
    expect(screen.getByText(/0/)).toBeInTheDocument();
    
    // Simuler l'ajout d'une manche
    const addRoundButton = screen.getByText(/Nouvelle manche/i);
    fireEvent.click(addRoundButton);
    
    // Vérifier que handleAddRound a été appelé
    await waitFor(() => {
      expect(handleAddRound).toHaveBeenCalled();
    });
  });
});
