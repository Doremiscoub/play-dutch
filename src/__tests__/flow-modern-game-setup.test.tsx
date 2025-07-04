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

describe('Flow: Modern Game Setup (3 Steps)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should complete the 3-step setup flow successfully', async () => {
    const user = userEvent.setup();
    
    render(
      <MemoryRouter initialEntries={['/setup']}>
        <App />
      </MemoryRouter>
    );

    // ✅ Step 1: Player Count
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    });
    
    // Should show default 4 players
    expect(screen.getByText('4')).toBeInTheDocument();
    
    // Click Next to go to Step 2
    const nextButton = screen.getByText(/Suivant : Noms des joueurs/i);
    await user.click(nextButton);

    // ✅ Step 2: Player Names
    await waitFor(() => {
      expect(screen.getByText(/Noms des joueurs/i)).toBeInTheDocument();
    });
    
    // Add 4 players
    const addButtons = screen.getAllByRole('button', { name: /\+ \w+/i });
    for (let i = 0; i < 4 && i < addButtons.length; i++) {
      await user.click(addButtons[i]);
    }
    
    // Wait for players to be added and continue button to be enabled
    await waitFor(() => {
      const continueButton = screen.getByRole('button', { name: /Continuer/i });
      expect(continueButton).not.toBeDisabled();
    });
    
    const continueButton = screen.getByRole('button', { name: /Continuer/i });
    await user.click(continueButton);

    // ✅ Step 3: Game Summary
    await waitFor(() => {
      expect(screen.getByText(/Tout est prêt/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Commencer la partie/i)).toBeInTheDocument();
    
    // Verify no error toasts
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should show Step 1 immediately when accessing /setup', async () => {
    render(
      <MemoryRouter initialEntries={['/setup']}>
        <App />
      </MemoryRouter>
    );

    // Should show Step 1 without any loading or blank screen
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});