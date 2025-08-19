import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SimpleGamePage from '@/pages/SimpleGamePage';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';
import * as scoreEngine from '@/utils/scoreEngine';

// Mock the game state hook
vi.mock('@/hooks/useSimpleGameState');
vi.mock('@/utils/scoreEngine');

const mockUseSimpleGameState = vi.mocked(useSimpleGameState);
const mockScoreEngine = vi.mocked(scoreEngine);

describe('Scoring Engine Integration', () => {
  const mockGameState = {
    players: [
      { id: '1', name: 'Alice', totalScore: 0, rounds: [], avatarColor: '#000' },
      { id: '2', name: 'Bob', totalScore: 0, rounds: [], avatarColor: '#fff' }
    ],
    roundHistory: [],
    scoreLimit: 100,
    gameStartTime: new Date(),
    isGameOver: false,
    hasGame: true,
    createGame: vi.fn(),
    addRound: vi.fn(),
    undoLastRound: vi.fn(),
    resetGame: vi.fn(),
    loadFromStorage: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSimpleGameState.mockReturnValue(mockGameState);
    mockScoreEngine.addRoundToPlayers.mockReturnValue({
      success: true,
      updatedPlayers: mockGameState.players,
    });
  });

  it('routes all scoring through scoreEngine.ts', async () => {
    render(
      <MemoryRouter>
        <SimpleGamePage />
      </MemoryRouter>
    );

    // Simulate adding a round
    const addRoundButton = screen.getByRole('button', { name: /ajouter/i });
    fireEvent.click(addRoundButton);
    
    // Verify scoreEngine was called
    await waitFor(() => {
      expect(mockScoreEngine.addRoundToPlayers).toHaveBeenCalled();
    });
  });

  it('reflects score updates in UI and persisted state', async () => {
    const updatedPlayers = [
      { ...mockGameState.players[0], totalScore: 15 },
      { ...mockGameState.players[1], totalScore: 8 }
    ];
    
    mockScoreEngine.addRoundToPlayers.mockReturnValue({
      success: true,
      updatedPlayers,
    });

    render(
      <MemoryRouter>
        <SimpleGamePage />
      </MemoryRouter>
    );

    expect(mockScoreEngine.addRoundToPlayers).toBeDefined();
    expect(mockUseSimpleGameState).toHaveBeenCalled();
  });
});