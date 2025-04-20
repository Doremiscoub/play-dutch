
/**
 * Test pour vérifier que la notification de mode hors-ligne 
 * n'apparaît qu'une seule fois après rechargement de page
 */
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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

describe('Mode hors-ligne notification tests', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();
    // Réinitialiser localStorage avant chaque test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up après chaque test
    localStorage.clear();
  });

  it('affiche la notification une seule fois en mode hors-ligne', () => {
    // Simuler le mode hors-ligne
    localStorage.setItem('clerk_auth_failed', 'true');
    
    // Premier rendu
    const { rerender } = render(<App />);
    
    // Vérifier que toast.info a été appelé exactement une fois
    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith("Mode hors-ligne activé");
    
    // Simuler un rechargement de page
    rerender(<App />);
    
    // Vérifier que toast.info n'a pas été appelé une deuxième fois
    expect(toast.info).toHaveBeenCalledTimes(1);
  });

  it('n\'affiche pas de notification en mode en-ligne', () => {
    // Ne pas définir clerk_auth_failed (mode en ligne)
    
    // Rendu de l'app
    render(<App />);
    
    // Vérifier qu'aucune notification n'est affichée
    expect(toast.info).not.toHaveBeenCalled();
  });
});
