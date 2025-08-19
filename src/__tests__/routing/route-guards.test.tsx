import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'sonner';
import ProtectedGameRoute from '@/components/routing/ProtectedGameRoute';

// Mock dependencies
vi.mock('sonner');
vi.mock('@/hooks/useSimpleGameState', () => ({
  useSimpleGameState: () => ({
    hasGame: false,
    players: []
  })
}));

const mockToast = vi.mocked(toast);

describe('Route Guards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects /game without active game session', () => {
    render(
      <MemoryRouter initialEntries={['/game']}>
        <ProtectedGameRoute requiresGame={true}>
          <div>Game Content</div>
        </ProtectedGameRoute>
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Game Content')).not.toBeInTheDocument();
    expect(mockToast.info).toHaveBeenCalledWith('Veuillez d\'abord créer une partie');
  });

  it('redirects /setup without prerequisites when required', () => {
    render(
      <MemoryRouter initialEntries={['/setup']}>
        <ProtectedGameRoute requiresGame={true}>
          <div>Setup Content</div>
        </ProtectedGameRoute>
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Setup Content')).not.toBeInTheDocument();
    expect(mockToast.info).toHaveBeenCalledWith('Veuillez d\'abord créer une partie');
  });

  it('allows access to setup when requiresGame is false', () => {
    render(
      <MemoryRouter initialEntries={['/setup']}>
        <ProtectedGameRoute requiresGame={false}>
          <div>Setup Content</div>
        </ProtectedGameRoute>
      </MemoryRouter>
    );
    
    expect(screen.getByText('Setup Content')).toBeInTheDocument();
    expect(mockToast.info).not.toHaveBeenCalled();
  });
});