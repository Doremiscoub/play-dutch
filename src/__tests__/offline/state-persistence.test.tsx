import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSimpleGameState } from '@/hooks/useSimpleGameState';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Offline State Persistence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('starts game and persists state to localStorage', () => {
    const { result } = renderHook(() => useSimpleGameState());
    
    act(() => {
      result.current.createGame(['Alice', 'Bob']);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'dutch_game_state',
      expect.stringContaining('Alice')
    );
  });

  it('restores state after reload simulation', () => {
    const savedState = JSON.stringify({
      players: [
        { id: '1', name: 'Alice', totalScore: 15, rounds: [{ score: 15, dutchPlayer: false }], avatarColor: '#000' }
      ],
      history: [],
      scoreLimit: 100,
      gameStartTime: new Date().toISOString(),
      isGameOver: false
    });
    
    localStorageMock.getItem.mockReturnValue(savedState);
    
    const { result } = renderHook(() => useSimpleGameState());
    
    act(() => {
      result.current.loadFromStorage();
    });

    expect(result.current.players).toHaveLength(1);
    expect(result.current.players[0].name).toBe('Alice');
    expect(result.current.players[0].totalScore).toBe(15);
  });

  it('handles corrupted localStorage gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid json');
    
    const { result } = renderHook(() => useSimpleGameState());
    
    act(() => {
      result.current.loadFromStorage();
    });

    // Should not crash and maintain default state
    expect(result.current.hasGame).toBe(false);
    expect(result.current.players).toHaveLength(0);
  });
});