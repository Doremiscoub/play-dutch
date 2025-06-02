
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { toast } from 'sonner';

// Mock pour Sonner toast
vi.mock('sonner', async () => {
  const actual = await vi.importActual('sonner');
  return {
    ...actual,
    toast: {
      info: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
    },
    Toaster: () => null,
  };
});

describe('Flow: Game Initialization', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should handle game creation without crashes', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Click "Jouer sans compte"
    const playButton = await screen.findByText(/Jouer sans compte/i);
    await user.click(playButton);

    // Wait for navigation to setup page
    await waitFor(() => {
      expect(screen.getByText(/Nouvelle Partie/i)).toBeInTheDocument();
    });

    // Fill player names
    const playerInputs = await screen.findAllByPlaceholderText(/Nom du joueur/i);
    expect(playerInputs).toHaveLength(4); // Default 4 players
    
    await user.clear(playerInputs[0]);
    await user.type(playerInputs[0], 'Alice');
    await user.clear(playerInputs[1]);
    await user.type(playerInputs[1], 'Bob');

    // Click start game
    const startButton = screen.getByText(/Commencer la partie/i);
    await user.click(startButton);

    // Should navigate to game page without crash
    await waitFor(() => {
      // Check for either the game board or loading state
      const gameElements = [
        screen.queryByText('Alice'),
        screen.queryByText('Bob'),
        screen.queryByText(/Chargement/i),
        screen.queryByText(/Nouvelle manche/i)
      ];
      
      const hasGameElement = gameElements.some(element => element !== null);
      expect(hasGameElement).toBe(true);
    }, { timeout: 5000 });

    // Verify no error toasts
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should redirect to setup if no player configuration', async () => {
    render(
      <MemoryRouter initialEntries={['/game']}>
        <App />
      </MemoryRouter>
    );

    // Should either show loading or redirect to setup
    await waitFor(() => {
      const hasSetupOrError = screen.getByText(/configuration/i) || 
                             screen.getByText(/Nouvelle Partie/i) ||
                             screen.getByText(/Erreur/i);
      expect(hasSetupOrError).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
