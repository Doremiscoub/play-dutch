
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
    const emergencyData = {
      ...gameData,
      gameStartTime: gameData.gameStartTime?.toISOString?.() || gameData.gameStartTime,
      emergency: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.EMERGENCY_SAVE, JSON.stringify(emergencyData));
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
