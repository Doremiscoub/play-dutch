
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock des toasts
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn()
  }
}));

describe('Start Game Shows Scoreboard', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  
  it('should display scoreboard after starting a game with valid players', async () => {
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
    
    // Vérifier que le scoreboard s'affiche
    await waitFor(() => {
      expect(screen.getByText(/tableau des scores/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Vérifier que le message "Configuration de partie requise" n'apparaît pas
    expect(screen.queryByText(/configuration de partie requise/i)).not.toBeInTheDocument();
    
    // Vérifier l'état du localStorage
    const currentGame = localStorage.getItem('current_dutch_game');
    expect(currentGame).toBeTruthy();
    expect(JSON.parse(currentGame!).players.length).toBeGreaterThanOrEqual(3);
    
    // Créer un snapshot des valeurs de localStorage
    const finalState = {
      dutch_player_setup: localStorage.getItem('dutch_player_setup'),
      current_dutch_game: localStorage.getItem('current_dutch_game'),
      dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
      dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
    };
    
    expect(finalState).toMatchSnapshot();
  });
});
