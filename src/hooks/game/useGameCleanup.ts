import { useCallback } from 'react';
import { STORAGE_KEYS, cleanupLegacyStorage } from '@/utils/storageKeys';
import { Player } from '@/types';

interface UseGameCleanupProps {
  setPlayers: (players: Player[]) => void;
  setGameStartTime: (time: Date | null) => void;
  setIsInitialized: (initialized: boolean) => void;
  setInitError: (error: string | null) => void;
  setShowScoreForm: (show: boolean) => void;
}

export const useGameCleanup = ({
  setPlayers,
  setGameStartTime,
  setIsInitialized,
  setInitError,
  setShowScoreForm
}: UseGameCleanupProps) => {

  const cleanup = useCallback(() => {
    setPlayers([]);
    setGameStartTime(null);
    setIsInitialized(false);
    setInitError(null);
    setShowScoreForm(false);
    
    localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
    localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
    localStorage.removeItem(STORAGE_KEYS.PLAYER_SETUP);
    
    cleanupLegacyStorage();
  }, [setPlayers, setGameStartTime, setIsInitialized, setInitError, setShowScoreForm]);

  return { cleanup };
};