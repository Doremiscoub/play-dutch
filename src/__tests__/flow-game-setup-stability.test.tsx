import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { toast } from 'sonner';

// Mock for Sonner toast
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

describe('Flow: Game Setup Wizard Stability', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should navigate from home to setup and keep the wizard visible', async () => {
    const user = userEvent.setup();
    
    // Start at the home page
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the home page to load and "Commencer maintenant" button to be visible
    await waitFor(() => {
      expect(screen.getByText(/Commencer maintenant/i)).toBeInTheDocument();
    });
    
    // Click the "Commencer maintenant" button
    const startButton = screen.getByText(/Commencer maintenant/i);
    await user.click(startButton);
    
    // After navigation, verify the setup wizard is visible and stays visible
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    });
    
    // Verify that after a significant delay (2s simulation), the wizard is still there
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    
    // Verify we can interact with the wizard
    const nextButton = screen.getByText(/Suivant/i);
    await user.click(nextButton);
    
    // Verify we've progressed to step 2 (player names)
    await waitFor(() => {
      expect(screen.getByText(/Noms des joueurs/i)).toBeInTheDocument();
    });
    
    // Verify no error toasts were shown during the flow
    expect(toast.error).not.toHaveBeenCalled();
  });
  
  it('should directly access setup page and have wizard visible', async () => {
    // Start directly at the setup page
    render(
      <MemoryRouter initialEntries={['/setup']}>
        <App />
      </MemoryRouter>
    );

    // Verify the setup wizard loads immediately
    await waitFor(() => {
      expect(screen.getByText(/Combien de joueurs/i)).toBeInTheDocument();
    });
    
    // Verify it's completely visible and interactive
    const nextButton = screen.getByText(/Suivant/i);
    expect(nextButton).toBeInTheDocument();
  });
});