
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { setupTestPlayers } from '../test-utils';
import GamePage from '../pages/GamePage';

describe('Flow: Add Round with Single Click', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    // Mock players setup
    setupTestPlayers(['Alice', 'Bob']);
  });

  it('should add a round with a single click on the validate button', async () => {
    render(
      <MemoryRouter initialEntries={['/game']}>
        <GamePage />
      </MemoryRouter>
    );

    // Open new round form
    fireEvent.click(screen.getByRole('button', { name: /nouvelle manche/i }));
    
    // Wait for form to appear
    await waitFor(() => {
      expect(screen.getByText(/ajouter une manche/i)).toBeInTheDocument();
    });

    // Fill in scores
    const scoreInputs = screen.getAllByRole('textbox');
    fireEvent.change(scoreInputs[0], { target: { value: '5' } });
    fireEvent.change(scoreInputs[1], { target: { value: '-5' } });

    // Submit the form with a single click
    fireEvent.click(screen.getByRole('button', { name: /valider/i }));

    // Expect the round to be added immediately and modal to be closed
    await waitFor(() => {
      // Modal should be closed
      expect(screen.queryByText(/ajouter une manche/i)).not.toBeInTheDocument();
      
      // Check for updated UI elements that would reflect a new round
      expect(screen.getByText(/manches jouées/i)).toBeInTheDocument();
      const roundCountElement = screen.getByText(/manches jouées/i).nextElementSibling;
      expect(roundCountElement).toHaveTextContent('1');
      
      // Check that localStorage was updated
      const savedGame = localStorage.getItem('current_dutch_game');
      expect(savedGame).not.toBeNull();
      expect(savedGame).toContain('"roundHistory"');
    });
  });
});
