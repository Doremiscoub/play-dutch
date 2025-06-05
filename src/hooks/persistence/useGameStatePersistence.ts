
import { useCallback } from 'react';
import { Player } from '@/types';
import { useGamePersistence } from '@/hooks/useGamePersistence';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { toast } from 'sonner';

export const useGameStatePersistence = () => {
  const { saveGameState, saveGameToHistory } = useGamePersistence();

  const saveCurrentGame = useCallback(async (
    players: Player[],
    roundHistory: any[],
    scoreLimit: number,
    gameStartTime: Date | null,
    isGameOver: boolean = false
  ) => {
    const gameStateToSave = {
      players,
      roundHistory,
      isGameOver,
      scoreLimit,
      gameStartTime
    };

    try {
      const success = await saveGameState(gameStateToSave);
      if (!success) {
        // Sauvegarde d'urgence
        localStorage.setItem(STORAGE_KEYS.EMERGENCY_SAVE, JSON.stringify({
          ...gameStateToSave,
          gameStartTime: gameStateToSave.gameStartTime?.toISOString(),
          emergency: true,
          timestamp: new Date().toISOString()
        }));
        toast.warning('Sauvegarde d\'urgence effectuée');
      }
      return success;
    } catch (error) {
      console.error('Error saving game state:', error);
      return false;
    }
  }, [saveGameState]);

  const finalizeGame = useCallback(async (
    players: Player[],
    gameStartTime: Date | null
  ) => {
    try {
      await saveGameToHistory(players, gameStartTime);
      localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
      return true;
    } catch (error) {
      console.error('Error finalizing game:', error);
      toast.error('Erreur lors de la fin de partie');
      return false;
    }
  }, [saveGameToHistory]);

  return {
    saveCurrentGame,
    finalizeGame
  };
};
