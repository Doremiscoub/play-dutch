
import '@testing-library/jest-dom';
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

describe('Start Game Shows Scoreboard', () => {
  beforeEach(() => {
    // Nettoyer localStorage avant chaque test
    window.localStorage.clear();
  });
  
  it('should display scoreboard after starting a game with valid players', async () => {
    // Journaliser les valeurs initiales pour diagnostique
    console.debug('Initial localStorage state:', {
      dutch_player_setup: localStorage.getItem('dutch_player_setup'),
      current_dutch_game: localStorage.getItem('current_dutch_game'),
      dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
      dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
    });
  
    // Rendre l'application
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Aller à la configuration du jeu
    const newGameButton = await screen.findByText(/nouvelle partie/i);
    fireEvent.click(newGameButton);
    
    // Configurer 3 joueurs
    await waitFor(() => {
      expect(screen.getByText(/nombre de joueurs/i)).toBeInTheDocument();
    });
    
    // Sélectionner 3 joueurs
    const playerCountSelect = screen.getByLabelText(/nombre de joueurs/i);
    fireEvent.change(playerCountSelect, { target: { value: "3" } });
    
    // Remplir les noms des joueurs
    const playerInputs = screen.getAllByPlaceholderText(/nom du joueur/i);
    fireEvent.change(playerInputs[0], { target: { value: "Alice" } });
    fireEvent.change(playerInputs[1], { target: { value: "Bob" } });
    fireEvent.change(playerInputs[2], { target: { value: "Charlie" } });
    
    // Cliquer sur "Commencer la partie"
    const startButton = screen.getByText(/commencer la partie/i);
    fireEvent.click(startButton);
    
    // Journaliser les valeurs après la configuration pour diagnostique
    console.debug('After setup localStorage state:', {
      dutch_player_setup: localStorage.getItem('dutch_player_setup'),
      current_dutch_game: localStorage.getItem('current_dutch_game'),
      dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
      dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
    });
    
    // Attendre l'affichage du tableau des scores
    await waitFor(() => {
      expect(screen.getByText(/tableau des scores/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Vérifier que le message "Configuration de partie requise" n'apparaît pas
    expect(screen.queryByText(/configuration de partie requise/i)).not.toBeInTheDocument();
    
    // Journaliser les valeurs finales pour diagnostique
    const finalState = {
      dutch_player_setup: localStorage.getItem('dutch_player_setup'),
      current_dutch_game: localStorage.getItem('current_dutch_game'),
      dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
      dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
    };
    
    console.debug('Final localStorage state:', finalState);
    
    // Créer un snapshot des valeurs de localStorage pour vérification
    expect(finalState).toMatchSnapshot();
    
    // Vérifier que les joueurs sont bien visibles dans le scoreboard
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/bob/i)).toBeInTheDocument();
    expect(screen.getByText(/charlie/i)).toBeInTheDocument();
  });
});
