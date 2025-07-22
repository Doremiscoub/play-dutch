/**
 * Test de stabilité pour le wizard ModernGameSetup
 * Vérifie que le wizard reste visible et fonctionnel après navigation Home → Setup
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '@/App';
import { toast } from 'sonner';

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Modern Game Setup Flow', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should navigate from Home CTA to Setup and keep wizard stable for 5 seconds', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Attendre que la page Home soit chargée
    await waitFor(() => {
      expect(screen.getByText(/Jouer maintenant/i)).toBeInTheDocument();
    }, { timeout: 10000 });

    // Cliquer sur "Jouer maintenant"
    const playButton = screen.getByText(/Jouer maintenant/i);
    await user.click(playButton);

    // Vérifier que nous sommes sur /setup
    await waitFor(() => {
      expect(window.location.pathname).toBe('/setup');
    }, { timeout: 5000 });

    // Vérifier que le wizard est visible
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    }, { timeout: 5000 });

    // Attendre 5 secondes et vérifier que le wizard est toujours là
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    expect(screen.getByText(/Configuration de partie/i)).toBeInTheDocument();

    // Tester l'interaction avec le wizard
    const nextButton = screen.getByText(/Suivant/i);
    expect(nextButton).toBeInTheDocument();
    
    await user.click(nextButton);
    
    // Vérifier qu'on peut passer à l'étape suivante
    await waitFor(() => {
      expect(screen.getByText(/Noms des joueurs/i)).toBeInTheDocument();
    }, { timeout: 2000 });

  }, 20000);

  it('should complete the full wizard flow and create a game', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/setup']}>
        <App />
      </MemoryRouter>
    );

    // Étape 1: Nombre de joueurs
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    });

    const nextButton = screen.getByText(/Suivant/i);
    await user.click(nextButton);

    // Étape 2: Noms des joueurs
    await waitFor(() => {
      expect(screen.getByText(/Noms des joueurs/i)).toBeInTheDocument();
    });

    // Remplir les noms
    const nameInputs = screen.getAllByLabelText(/Nom du joueur/i);
    expect(nameInputs).toHaveLength(3); // Par défaut 3 joueurs

    await user.type(nameInputs[0], 'Alice');
    await user.type(nameInputs[1], 'Bob');
    await user.type(nameInputs[2], 'Charlie');

    const nextButton2 = screen.getByText(/Suivant/i);
    await user.click(nextButton2);

    // Étape 3: Récapitulatif
    await waitFor(() => {
      expect(screen.getByText(/Récapitulatif/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();

    // Commencer la partie
    const startButton = screen.getByText(/Commencer la partie/i);
    await user.click(startButton);

    // Vérifier la navigation vers /game
    await waitFor(() => {
      expect(window.location.pathname).toBe('/game');
    });

    expect(toast.success).toHaveBeenCalledWith('Partie créée avec 3 joueurs!');

  }, 20000);
});