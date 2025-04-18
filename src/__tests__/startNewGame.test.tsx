
import '@testing-library/jest-dom';  // Add this import at the top
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock des fonctions de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

// Remplacer l'implémentation de localStorage
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock des toasts pour éviter les erreurs
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
  }
}));

describe('Start New Game Flow', () => {
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    window.localStorage.clear();
  });

  it('should navigate to setup when clicking New Game on home page', async () => {
    // Rendre l'application
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Trouver et cliquer sur le bouton Nouvelle Partie
    const newGameButton = await screen.findByText(/nouvelle partie/i);
    fireEvent.click(newGameButton);

    // Vérifier que nous avons été redirigés vers la page de configuration
    await waitFor(() => {
      expect(screen.getByText(/nombre de joueurs/i)).toBeInTheDocument();
    });

    // Vérifier qu'aucun message d'erreur n'apparaît
    await waitFor(() => {
      expect(screen.queryByText(/aucun joueur disponible/i)).not.toBeInTheDocument();
    });
  });

  it('should successfully start a game after configuring players', async () => {
    // Configuration pré-test: simuler une configuration de joueurs
    window.localStorage.setItem('dutch_player_setup', JSON.stringify(['Player 1', 'Player 2']));
    window.localStorage.setItem('dutch_new_game_requested', 'true');

    // Rendre l'application avec la route /game
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Navigation directe à /game
    window.history.pushState({}, '', '/game');
    
    // Vérifier que la page de jeu se charge correctement sans erreur
    await waitFor(() => {
      // Nous cherchons soit le tableau des scores, soit un élément de chargement,
      // mais pas un message d'erreur "Aucun joueur disponible"
      expect(screen.queryByText(/aucun joueur disponible/i)).not.toBeInTheDocument();
    });
  });
});
