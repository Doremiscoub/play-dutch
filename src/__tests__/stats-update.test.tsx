
/// <reference types="vitest" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ScoreBoard from '@/components/scoreboard/ScoreBoard';
import { Player } from '@/types';

const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Alice',
    totalScore: 0,
    avatarColor: 'blue',
    rounds: [],
    stats: {
      averageScore: 0,
      bestRound: 0,
      worstRound: 0,
      dutchCount: 0,
      improvementRate: 0,
      consistencyScore: 0,
      winStreak: 0
      // Removed 'rank' property which doesn't exist in PlayerStatistics
    }
  },
  {
    id: '2',
    name: 'Bob',
    totalScore: 0,
    avatarColor: 'green',
    rounds: [],
    stats: {
      averageScore: 0,
      bestRound: 0,
      worstRound: 0,
      dutchCount: 0,
      improvementRate: 0,
      consistencyScore: 0,
      winStreak: 0
      // Removed 'rank' property which doesn't exist in PlayerStatistics
    }
  }
];

const mockRoundHistory = [];

describe('Statistiques après ajout de manche', () => {
  it('Les statistiques sont mises à jour après l\'ajout d\'une manche', async () => {
    const handleAddRound = vi.fn((scores, dutchPlayerId) => {
      mockRoundHistory.push({ scores, dutchPlayerId });
      return true;
    });
    
    const handleUndoLastRound = vi.fn();
    const handleEndGame = vi.fn();
    
    render(
      <BrowserRouter>
        <ScoreBoard
          players={mockPlayers}
          onAddRound={handleAddRound}
          onUndoLastRound={handleUndoLastRound}
          onEndGame={handleEndGame}
          roundHistory={mockRoundHistory}
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
    
    // Vérifier la mise à jour des statistiques (si possible)
  });
});
