
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { toast } from 'sonner';

// Mock pour Sonner toast
vi.mock('sonner', () => {
  return {
    ...vi.importActual('sonner'),
    toast: {
      info: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
    },
    Toaster: () => null,
  };
});

// Mock Framer Motion pour éviter les problèmes d'animation en test
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('FINAL Test: Setup Wizard Stability from Home', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should navigate from home CTA to setup wizard and keep it visible for game creation', async () => {
    const user = userEvent.setup();
    
    // Start at the home page
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the home page to fully load and find the correct CTA button
    await waitFor(() => {
      expect(screen.getByText(/C'EST PARTI/i)).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Click the main CTA button
    const ctaButton = screen.getByText(/C'EST PARTI/i);
    await user.click(ctaButton);
    
    // Verify we navigated to /setup and wizard is visible
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Critical test: Wait 3 seconds to ensure wizard stays visible (no disappearing bug)
    await new Promise(resolve => setTimeout(resolve, 3000));
    expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    
    // Verify wizard is interactive - can proceed to next step
    const nextButton = screen.getByText(/Suivant/i);
    expect(nextButton).toBeInTheDocument();
    await user.click(nextButton);
    
    // Verify step 2 loads (player names)
    await waitFor(() => {
      expect(screen.getByText(/Noms des joueurs/i)).toBeInTheDocument();
    });
    
    // Add players using quick add buttons
    const quickAddButtons = screen.getAllByRole('button', { name: /\+ \w+/i });
    expect(quickAddButtons.length).toBeGreaterThan(0);
    
    // Add at least 2 players
    for (let i = 0; i < Math.min(2, quickAddButtons.length); i++) {
      await user.click(quickAddButtons[i]);
    }
    
    // Wait and proceed to step 3
    await waitFor(() => {
      const createButton = screen.getByRole('button', { name: /Créer la partie/i });
      expect(createButton).not.toBeDisabled();
    });
    
    const createButton = screen.getByRole('button', { name: /Créer la partie/i });
    await user.click(createButton);
    
    // Verify we reach step 3 (summary)
    await waitFor(() => {
      expect(screen.getByText(/Récapitulatif/i)).toBeInTheDocument();
    });
    
    // Complete the game creation
    const startGameButton = screen.getByText(/Commencer la partie/i);
    await user.click(startGameButton);
    
    // Verify navigation to game page
    await waitFor(() => {
      expect(window.location.pathname).toBe('/game');
    }, { timeout: 3000 });
    
    // Verify success toast was called
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Partie créée avec'));
    
    console.log('✅ COMPLETE FLOW TEST PASSED: Home → Setup Wizard → Game Creation → Game Page');
  }, 20000);

  it('should directly access /setup and maintain stable wizard', async () => {
    render(
      <MemoryRouter initialEntries={['/setup']}>
        <App />
      </MemoryRouter>
    );

    // Verify direct access works
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    });
    
    // Wait 3 seconds to ensure no disappearing
    await new Promise(resolve => setTimeout(resolve, 3000));
    expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    
    console.log('✅ DIRECT ACCESS TEST PASSED: /setup → Stable Wizard');
  });
});
