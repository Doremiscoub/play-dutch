/**
 * Test pour diagnostiquer la disparition du wizard de setup
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { vi } from 'vitest';

// Mock console pour capturer les logs de debug
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Setup Wizard Stability Diagnostics', () => {
  beforeEach(() => {
    consoleSpy.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should track component lifecycle when navigating from Home to Setup', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Attendre que la page Home soit chargée
    await waitFor(() => {
      expect(screen.getByText(/Jouer maintenant/i)).toBeInTheDocument();
    });

    console.log('🔍 Initial logs:', consoleSpy.mock.calls);

    // Cliquer sur "Jouer maintenant"
    const playButton = screen.getByText(/Jouer maintenant/i);
    await user.click(playButton);

    // Attendre la navigation vers /setup
    await waitFor(() => {
      expect(window.location.pathname).toBe('/setup');
    });

    // Vérifier que le wizard est monté
    await waitFor(() => {
      const setupLogs = consoleSpy.mock.calls.filter(call => 
        call[0]?.includes('SimpleGameSetup') || call[0]?.includes('ModernGameSetup')
      );
      console.log('🔍 Setup component logs:', setupLogs);
      
      // Le wizard devrait être monté
      expect(setupLogs.some(call => call[0]?.includes('MOUNTED'))).toBe(true);
    });

    // Attendre 3 secondes pour voir si le wizard reste monté
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Vérifier si le wizard est toujours visible
    const wizardElement = screen.queryByText(/Combien de joueurs/i);
    console.log('🔍 Wizard still visible after 3s:', !!wizardElement);

    // Analyser les logs pour détecter un démontage inattendu
    const unmountLogs = consoleSpy.mock.calls.filter(call => 
      call[0]?.includes('UNMOUNTED')
    );
    console.log('🔍 Unmount logs:', unmountLogs);

    if (unmountLogs.length > 0) {
      console.log('❌ PROBLÈME DÉTECTÉ: Le wizard a été démonté de manière inattendue');
    } else {
      console.log('✅ Le wizard est resté monté correctement');
    }

    // Le test passe même si le wizard disparaît - on veut juste diagnostiquer
    expect(true).toBe(true);
  }, 10000);

  it('should detect unexpected navigation events', async () => {
    const user = userEvent.setup();
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;
    
    const navigationEvents: string[] = [];
    
    // Espionner les changements d'historique
    window.history.pushState = function(...args) {
      navigationEvents.push(`pushState: ${args[2]}`);
      return originalPushState.apply(this, args);
    };
    
    window.history.replaceState = function(...args) {
      navigationEvents.push(`replaceState: ${args[2]}`);
      return originalReplaceState.apply(this, args);
    };

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Navigation Home → Setup
    const playButton = await screen.findByText(/Jouer maintenant/i);
    await user.click(playButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/setup');
    });

    // Attendre et analyser les événements de navigation
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('🔍 Navigation events:', navigationEvents);
    
    // Restaurer les méthodes originales
    window.history.pushState = originalPushState;
    window.history.replaceState = originalReplaceState;

    expect(true).toBe(true);
  }, 10000);
});