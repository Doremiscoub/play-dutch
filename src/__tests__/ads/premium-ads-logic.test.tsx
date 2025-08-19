import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import SimpleGamePage from '@/pages/SimpleGamePage';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';

// Mock subscription hook
vi.mock('@/hooks/useSubscription', () => ({
  useSubscription: () => ({
    shouldShowAds: false // Test premium state first
  })
}));

vi.mock('@/hooks/useSimpleGameState', () => ({
  useSimpleGameState: () => ({
    hasGame: true,
    players: [{ id: '1', name: 'Test', totalScore: 0, rounds: [], avatarColor: '#000' }],
    history: [],
    scoreLimit: 100,
    gameStartTime: new Date(),
    isGameOver: false,
    addRound: vi.fn(),
    undoLastRound: vi.fn(),
    resetGame: vi.fn()
  })
}));

describe('Premium vs Free Ads Logic', () => {
  it('renders no ads when shouldShowAds is false (premium)', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    // Should not render any ad slots
    expect(screen.queryByTestId('ad-slot')).not.toBeInTheDocument();
  });

  it('renders ads when shouldShowAds is true (free tier)', () => {
    // Mock free tier
    vi.doMock('@/hooks/useSubscription', () => ({
      useSubscription: () => ({
        shouldShowAds: true
      })
    }));

    render(<EnhancedAdSlot slotId="test" />);
    
    // Should render ad slot
    expect(screen.getByTestId('ad-slot')).toBeInTheDocument();
  });
});