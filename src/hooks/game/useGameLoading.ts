import { useCallback } from 'react';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { Player } from '@/types';

interface UseGameLoadingProps {
  setPlayers: (players: Player[]) => void;
  setGameStartTime: (time: Date | null) => void;
  setScoreLimit: (limit: number) => void;
  setRoundHistory: (history: any[]) => void;
  setIsInitialized: (initialized: boolean) => void;
}

export const useGameLoading = ({
  setPlayers,
  setGameStartTime,
  setScoreLimit,
  setRoundHistory,
  setIsInitialized
}: UseGameLoadingProps) => {
  
  const loadExistingGame = useCallback((): boolean => {
    try {
      const savedGame = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
      if (!savedGame) return false;

      const gameData = JSON.parse(savedGame);
      
      if (!gameData.players || !Array.isArray(gameData.players) || gameData.players.length === 0) {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
        return false;
      }

      setPlayers(gameData.players);
      setGameStartTime(gameData.gameStartTime ? new Date(gameData.gameStartTime) : null);
      setScoreLimit(gameData.scoreLimit || 100);
      setRoundHistory(gameData.roundHistory || []);
      setIsInitialized(true);
      
      return true;
    } catch (error) {
      console.error('Failed to load existing game:', error);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
      return false;
    }
  }, [setPlayers, setGameStartTime, setScoreLimit, setRoundHistory, setIsInitialized]);

  return { loadExistingGame };
};