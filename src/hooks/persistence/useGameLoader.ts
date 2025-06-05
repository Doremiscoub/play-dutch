
import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/database';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { getStorageProvider } from '@/utils/persistence/storageHelpers';
import { toast } from 'sonner';

export const useGameLoader = () => {
  const { user, isSignedIn } = useAuth();

  const loadGameState = useCallback(async () => {
    console.log('useGameLoader: loadGameState called');
    
    try {
      const { hasIndexedDB } = await getStorageProvider();
      console.log('useGameLoader: IndexedDB available:', hasIndexedDB);
      
      if (hasIndexedDB) {
        let query = db.ongoingGames.orderBy('lastUpdated');
        
        // Si l'utilisateur est connecté, filtrer par user_id
        if (isSignedIn && user?.id) {
          query = query.filter(game => game.userId === user.id);
        }
        
        const currentGame = await query.last();
        console.log('useGameLoader: Loaded game from IndexedDB:', !!currentGame);
        
        if (currentGame) {
          return {
            players: currentGame.players,
            roundHistory: currentGame.roundHistory,
            isGameOver: currentGame.isGameOver,
            scoreLimit: currentGame.scoreLimit,
            gameStartTime: currentGame.gameStartTime ? new Date(currentGame.gameStartTime) : null
          };
        }
      } else {
        // Fallback vers localStorage
        console.log('useGameLoader: Using localStorage fallback');
        const savedGame = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
        if (savedGame) {
          const parsed = JSON.parse(savedGame);
          console.log('useGameLoader: Loaded game from localStorage:', !!parsed);
          return parsed;
        }
      }
      
      console.log('useGameLoader: No saved game found');
      return null;
    } catch (error) {
      console.error('useGameLoader: Erreur lors du chargement de la partie :', error);
      toast.error('Erreur lors du chargement de la partie');
      return null;
    }
  }, [isSignedIn, user?.id]);

  const recoverEmergencySave = useCallback(() => {
    try {
      const emergencyData = localStorage.getItem(STORAGE_KEYS.EMERGENCY_SAVE);
      if (emergencyData) {
        const parsed = JSON.parse(emergencyData);
        console.log('useGameLoader: Emergency save recovered');
        localStorage.removeItem(STORAGE_KEYS.EMERGENCY_SAVE);
        toast.success('Sauvegarde d\'urgence récupérée');
        return parsed;
      }
      return null;
    } catch (error) {
      console.error('useGameLoader: Error recovering emergency save:', error);
      return null;
    }
  }, []);

  return {
    loadGameState,
    recoverEmergencySave
  };
};
