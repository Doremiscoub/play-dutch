
import { db, isIndexedDBAvailable } from '@/lib/database';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { toast } from 'sonner';

export const getStorageProvider = async () => {
  const hasIndexedDB = await isIndexedDBAvailable();
  return {
    hasIndexedDB,
    useIndexedDB: hasIndexedDB,
    useFallback: !hasIndexedDB
  };
};

export const emergencySave = (gameData: any) => {
  try {
    // Security: Sanitize game data before storage
    const sanitizedGameData = {
      players: gameData.players?.map((p: any) => ({
        name: typeof p.name === 'string' ? p.name.substring(0, 50) : '',
        emoji: typeof p.emoji === 'string' ? p.emoji.substring(0, 10) : '',
        score: typeof p.score === 'number' ? p.score : 0,
        totalScore: typeof p.totalScore === 'number' ? p.totalScore : 0
      })) || [],
      gameStartTime: gameData.gameStartTime?.toISOString?.() || gameData.gameStartTime,
      scoreLimit: typeof gameData.scoreLimit === 'number' ? gameData.scoreLimit : 100,
      emergency: true,
      timestamp: new Date().toISOString()
    };
    
    // Security: Add expiration for sensitive data
    const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
    const storageData = {
      data: sanitizedGameData,
      expires: expirationTime
    };
    
    localStorage.setItem(STORAGE_KEYS.EMERGENCY_SAVE, JSON.stringify(storageData));
    console.log('Emergency save completed');
    toast.warning('Sauvegarde d\'urgence effectuée');
    return true;
  } catch (error) {
    console.error('Emergency save failed:', error);
    toast.error('Erreur critique de sauvegarde');
    return false;
  }
};

export const cleanupCurrentGame = async () => {
  const { hasIndexedDB } = await getStorageProvider();
  
  if (hasIndexedDB) {
    await db.ongoingGames.where('id').equals('current_game').delete();
  }
  localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
  localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
};
