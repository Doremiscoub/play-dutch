
import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Player } from '@/types';
import { db, OngoingGame } from '@/lib/database';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { getStorageProvider, emergencySave } from '@/utils/persistence/storageHelpers';

export const useGameSaver = () => {
  const { user, isSignedIn } = useAuth();

  const saveGameState = useCallback(async (gameState: {
    players: Player[];
    roundHistory: { scores: number[], dutchPlayerId?: string }[];
    isGameOver: boolean;
    scoreLimit: number;
    gameStartTime: Date | null;
  }, retryCount = 0) => {
    console.log('useGameSaver: saveGameState called with', {
      playersCount: gameState.players?.length,
      roundsCount: gameState.roundHistory?.length,
      isGameOver: gameState.isGameOver,
      retryCount
    });
    
    try {
      // Validation des données avant sauvegarde
      if (!gameState.players || gameState.players.length === 0) {
        console.warn('useGameSaver: No players to save');
        return false;
      }

      const { hasIndexedDB } = await getStorageProvider();
      
      const gameData: OngoingGame = {
        id: 'current_game',
        userId: isSignedIn && user?.id ? user.id : undefined,
        ...gameState,
        gameStartTime: gameState.gameStartTime?.toISOString() ?? null,
        lastUpdated: new Date().toISOString()
      };

      if (hasIndexedDB) {
        console.log('useGameSaver: Saving to IndexedDB');
        try {
          await db.transaction('rw', db.ongoingGames, async () => {
            // Efface l'ancienne partie si elle existe
            if (isSignedIn && user?.id) {
              await db.ongoingGames.where({
                id: 'current_game',
                userId: user.id
              }).delete();
            } else {
              await db.ongoingGames.where('id').equals('current_game').delete();
            }
            // Sauvegarde la nouvelle
            await db.ongoingGames.add(gameData);
          });
          console.log('useGameSaver: IndexedDB save successful');
          
          // Sauvegarde de backup en localStorage
          localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameData));
          
        } catch (dbError) {
          console.error('useGameSaver: IndexedDB save failed, falling back to localStorage:', dbError);
          localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameData));
        }
      } else {
        console.log('useGameSaver: Saving to localStorage');
        localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameData));
      }
      
      return true;
    } catch (error) {
      console.error('useGameSaver: Erreur lors de la sauvegarde de l\'état du jeu :', error);
      
      // Retry logic
      if (retryCount < 2) {
        console.log(`useGameSaver: Retrying save (attempt ${retryCount + 1})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return saveGameState(gameState, retryCount + 1);
      }
      
      // Sauvegarde d'urgence
      emergencySave(gameState);
      return false;
    }
  }, [isSignedIn, user?.id]);

  return {
    saveGameState
  };
};
