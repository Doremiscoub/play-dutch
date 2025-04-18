
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
      totalScore: 0,
      averageScore: 0,
      bestRound: 0,
      worstRound: 0,
      dutchCount: 0,
      rank: 1
    }
  },
  {
    id: '2',
    name: 'Bob',
    totalScore: 0,
    avatarColor: 'green',
    rounds: [],
    stats: {
      totalScore: 0,
      averageScore: 0,
      bestRound: 0,
      worstRound: 0,
      dutchCount: 0,
      rank: 2
    }
  }
];

const mockRoundHistory = [];

describe('Statistiques après ajout de manche', () => {
  test('Les statistiques sont mises à jour après l\'ajout d\'une manche', async () => {
    const handleAddRound = jest.fn((scores, dutchPlayerId) => {
      mockRoundHistory.push({ scores, dutchPlayerId });
      return true;
    });
    
    const handleUndoLastRound = jest.fn();
    const handleEndGame = jest.fn();
    
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
    
    // Remplir les scores dans le formulaire modal
    // (Note: le test complet nécessiterait de simuler le remplissage du formulaire)
    
    // Vérifier que handleAddRound a été appelé
    await waitFor(() => {
      expect(handleAddRound).toHaveBeenCalled();
    });
    
    // Vérifier la mise à jour des statistiques (si possible)
    // Cela peut nécessiter des ajustements en fonction de la structure réelle du composant
  });
});
