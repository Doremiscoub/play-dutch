
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import FAQPage from '@/pages/FAQPage';
import AboutPage from '@/pages/AboutPage';
import HistoryPage from '@/pages/HistoryPage';
import RulesPage from '@/pages/RulesPage';
import GameSetup from '@/pages/GameSetup';
import UnifiedTopBar from '@/components/scoreboard/UnifiedTopBar';

// Mock router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock hooks
vi.mock('@/hooks/useSEO', () => ({
  useSEO: vi.fn(),
}));

vi.mock('@/hooks/useGameState', () => ({
  useGameState: () => ({
    createNewGame: vi.fn(),
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Unified Header Integration', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  describe('UnifiedTopBar Component', () => {
    it('renders with correct title and glassmorphic styles', () => {
      render(
        <TestWrapper>
          <UnifiedTopBar title="Test Title" showSettings={true} />
        </TestWrapper>
      );

      const topbar = screen.getByTestId('unified-topbar');
      expect(topbar).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      
      // Check for glassmorphic classes
      expect(topbar).toHaveClass('backdrop-blur-xl');
      expect(topbar).toHaveClass('bg-gradient-to-r');
      expect(topbar).toHaveClass('shadow-lg');
    });

    it('shows game info when provided', () => {
      render(
        <TestWrapper>
          <UnifiedTopBar 
            title="Game" 
            roundCount={5}
            scoreLimit={100}
            showSettings={true} 
          />
        </TestWrapper>
      );

      expect(screen.getByText('Manche 5')).toBeInTheDocument();
      expect(screen.getByText('Objectif : 100 pts')).toBeInTheDocument();
    });

    it('handles back button when enabled', () => {
      const mockOnBack = vi.fn();
      render(
        <TestWrapper>
          <UnifiedTopBar 
            title="Test" 
            showBackButton={true}
            onBack={mockOnBack}
            showSettings={true} 
          />
        </TestWrapper>
      );

      const backButton = screen.getByRole('button');
      fireEvent.click(backButton);
      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });
  });

  const testPages = [
    { name: 'FAQ', component: FAQPage, expectedTitle: 'Questions Fréquentes' },
    { name: 'About', component: AboutPage, expectedTitle: 'À propos de Dutch' },
    { name: 'History', component: HistoryPage, expectedTitle: 'Historique des parties' },
    { name: 'Rules', component: RulesPage, expectedTitle: 'Règles du Dutch' },
    { name: 'GameSetup', component: GameSetup, expectedTitle: 'Créer une partie' },
  ];

  testPages.forEach(({ name, component: Component, expectedTitle }) => {
    describe(`${name} Page`, () => {
      it('renders UnifiedTopBar with correct title', () => {
        render(
          <TestWrapper>
            <Component />
          </TestWrapper>
        );

        expect(screen.getByText(expectedTitle)).toBeInTheDocument();
        expect(screen.getByTestId('unified-topbar')).toBeInTheDocument();
      });

      it('shows settings button when enabled', () => {
        render(
          <TestWrapper>
            <Component />
          </TestWrapper>
        );

        // Look for settings button
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);
      });

      it('has no legacy headers', () => {
        render(
          <TestWrapper>
            <Component />
          </TestWrapper>
        );

        // Check that there are no legacy header elements
        const legacyHeaders = screen.queryAllByTestId('legacy-header');
        expect(legacyHeaders).toHaveLength(0);
      });

      it('has glassmorphic styling', () => {
        render(
          <TestWrapper>
            <Component />
          </TestWrapper>
        );

        const topbar = screen.getByTestId('unified-topbar');
        expect(topbar).toHaveClass('backdrop-blur-xl');
        expect(topbar).toHaveClass('bg-gradient-to-r');
      });
    });
  });

  it('all pages have consistent glassmorphic styling', () => {
    testPages.forEach(({ component: Component }) => {
      const { unmount } = render(
        <TestWrapper>
          <Component />
        </TestWrapper>
      );

      // Check for glassmorphic elements
      const glassElements = document.querySelectorAll('.glass-button, .vision-card, .glass-modal');
      expect(glassElements.length).toBeGreaterThan(0);

      unmount();
    });
  });
});
