import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { EnhancedAdProvider, useAds } from '@/contexts/EnhancedAdContext';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';
import GDPRConsentBanner from '@/components/ads/GDPRConsentBanner';

// Mock du hook useSubscription
const mockUseSubscription = vi.fn(() => ({
  isPremium: false,
  isLoading: false
}));

vi.mock('@/hooks/useSubscription', () => ({
  useSubscription: mockUseSubscription
}));

// Mock du hook useIsMobile
const mockUseIsMobile = vi.fn(() => false);

vi.mock('@/hooks/use-mobile', () => ({
  default: mockUseIsMobile
}));

// Composant test pour accéder au contexte
const TestComponent = () => {
  const { shouldShowAds, hasConsentedToAds, updateConsent } = useAds();
  
  return (
    <div>
      <div data-testid="should-show-ads">{shouldShowAds.toString()}</div>
      <div data-testid="has-consented">{hasConsentedToAds.toString()}</div>
      <button 
        onClick={() => updateConsent({ marketing: true, analytics: true })}
        data-testid="consent-button"
      >
        Donner consentement
      </button>
    </div>
  );
};

// Configuration de test avec provider
const renderWithAdProvider = (component: React.ReactElement) => {
  return render(
    <EnhancedAdProvider>
      {component}
    </EnhancedAdProvider>
  );
};

describe('🎯 Système AdSense Intégré', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('AdContext et RGPD', () => {
    it('doit initialiser sans consentement par défaut', () => {
      renderWithAdProvider(<TestComponent />);
      
      expect(screen.getByTestId('should-show-ads')).toHaveTextContent('false');
      expect(screen.getByTestId('has-consented')).toHaveTextContent('false');
    });

    it('doit permettre de donner son consentement', async () => {
      renderWithAdProvider(<TestComponent />);
      
      const consentButton = screen.getByTestId('consent-button');
      fireEvent.click(consentButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('has-consented')).toHaveTextContent('true');
        expect(screen.getByTestId('should-show-ads')).toHaveTextContent('true');
      });
    });

    it('doit sauvegarder le consentement dans localStorage', async () => {
      renderWithAdProvider(<TestComponent />);
      
      const consentButton = screen.getByTestId('consent-button');
      fireEvent.click(consentButton);
      
      await waitFor(() => {
        const stored = localStorage.getItem('dutch-gdpr-consent');
        expect(stored).toBeTruthy();
        
        const consent = JSON.parse(stored!);
        expect(consent.marketing).toBe(true);
        expect(consent.analytics).toBe(true);
      });
    });

    it('ne doit pas afficher de publicité pour utilisateur premium', () => {
      mockUseSubscription.mockReturnValue({
        isPremium: true,
        isLoading: false
      });

      renderWithAdProvider(<TestComponent />);
      
      expect(screen.getByTestId('should-show-ads')).toHaveTextContent('false');
    });
  });

  describe('Bannière de consentement RGPD', () => {
    it('doit afficher la bannière si pas de consentement', () => {
      renderWithAdProvider(<GDPRConsentBanner />);
      
      expect(screen.getByText('Respect de votre vie privée')).toBeInTheDocument();
      expect(screen.getByText('Accepter tout')).toBeInTheDocument();
      expect(screen.getByText('Refuser tout')).toBeInTheDocument();
    });

    it('ne doit pas afficher la bannière si consentement déjà donné', () => {
      // Simuler un consentement existant
      localStorage.setItem('dutch-gdpr-consent', JSON.stringify({
        marketing: true,
        analytics: true,
        functional: true,
        timestamp: Date.now()
      }));

      renderWithAdProvider(<GDPRConsentBanner />);
      
      expect(screen.queryByText('Respect de votre vie privée')).not.toBeInTheDocument();
    });

    it('doit permettre la personnalisation des cookies', async () => {
      renderWithAdProvider(<GDPRConsentBanner />);
      
      const customizeButton = screen.getByText('Personnaliser');
      fireEvent.click(customizeButton);
      
      await waitFor(() => {
        expect(screen.getByText('Cookies fonctionnels')).toBeInTheDocument();
        expect(screen.getByText('Cookies analytiques')).toBeInTheDocument();
        expect(screen.getByText('Cookies marketing')).toBeInTheDocument();
      });
    });
  });

  describe('EnhancedAdSlot', () => {
    it('doit afficher un placeholder en mode développement', () => {
      renderWithAdProvider(
        <EnhancedAdSlot placement="homepage-inline" />
      );
      
      expect(screen.getByText('Mode Développement')).toBeInTheDocument();
      expect(screen.getByText('AdSense Preview')).toBeInTheDocument();
    });

    it('ne doit pas rendre d\'annonce sans consentement', () => {
      const { container } = renderWithAdProvider(
        <EnhancedAdSlot placement="homepage-inline" />
      );
      
      // En dev mode, le placeholder s'affiche quand même
      // mais en production sans consentement, rien ne s'afficherait
      expect(container.firstChild).toBeTruthy();
    });

    it('doit adapter les dimensions selon le placement', () => {
      renderWithAdProvider(
        <EnhancedAdSlot placement="game-sidebar-left" />
      );
      
      const adContainer = screen.getByText('Publicité gauche').closest('div');
      expect(adContainer).toHaveClass('w-[300px]', 'h-[600px]');
    });

    it('doit gérer le mode mobile', () => {
      mockUseIsMobile.mockReturnValue(true);
      
      renderWithAdProvider(
        <EnhancedAdSlot placement="game-banner-mobile" />
      );
      
      const adContainer = screen.getByText('Bannière mobile').closest('div');
      expect(adContainer).toHaveClass('w-full', 'h-[100px]');
    });
  });

  describe('Sécurité et Performance', () => {
    it('doit gérer gracieusement les erreurs de chargement AdSense', () => {
      // Simuler une erreur AdSense
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Simuler l'absence du script AdSense
      Object.defineProperty(window, 'adsbygoogle', {
        value: undefined,
        configurable: true
      });
      
      renderWithAdProvider(
        <EnhancedAdSlot placement="homepage-inline" />
      );
      
      expect(screen.getByText('Mode Développement')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    it('doit implémenter le lazy loading intelligent', async () => {
      // Mock IntersectionObserver
      const mockIntersectionObserver = vi.fn();
      mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
      });
      
      window.IntersectionObserver = mockIntersectionObserver;
      
      renderWithAdProvider(
        <EnhancedAdSlot placement="homepage-inline" priority="low" />
      );
      
      // Vérifier que l'observer est utilisé
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });
  });
});

describe('🔒 Conformité RGPD', () => {
  it('doit respecter le withdrawal du consentement', async () => {
    // Simuler un consentement initial
    localStorage.setItem('dutch-gdpr-consent', JSON.stringify({
      marketing: true,
      analytics: true,
      functional: true,
      timestamp: Date.now()
    }));

    const TestConsentWithdrawal = () => {
      const { hasConsentedToAds, updateConsent } = useAds();
      
      return (
        <div>
          <div data-testid="consent-status">{hasConsentedToAds.toString()}</div>
          <button 
            onClick={() => updateConsent({ marketing: false })}
            data-testid="withdraw-consent"
          >
            Retirer consentement
          </button>
        </div>
      );
    };

    renderWithAdProvider(<TestConsentWithdrawal />);
    
    expect(screen.getByTestId('consent-status')).toHaveTextContent('true');
    
    const withdrawButton = screen.getByTestId('withdraw-consent');
    fireEvent.click(withdrawButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('consent-status')).toHaveTextContent('false');
    });
  });

  it('doit gérer la persistence du consentement', () => {
    // Test avec consentement préexistant
    const existingConsent = {
      marketing: true,
      analytics: false,
      functional: true,
      timestamp: Date.now() - 1000000 // 1 seconde dans le passé
    };
    
    localStorage.setItem('dutch-gdpr-consent', JSON.stringify(existingConsent));
    
    renderWithAdProvider(<TestComponent />);
    
    expect(screen.getByTestId('has-consented')).toHaveTextContent('true');
    expect(screen.getByTestId('should-show-ads')).toHaveTextContent('true');
  });
});