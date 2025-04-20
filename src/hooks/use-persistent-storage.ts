
import { useState, useEffect } from 'react';
import { db, isIndexedDBAvailable } from '@/lib/database';

export function usePersistentStorage<T>(
  key: string,
  initialValue: T,
  storeName: 'ongoingGames' | 'gameHistory' | 'userPreferences' = 'userPreferences'
): [T, (value: T | ((prevValue: T) => T)) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement initial
  useEffect(() => {
    const loadValue = async () => {
      try {
        // Vérifie si IndexedDB est disponible
        const hasIndexedDB = await isIndexedDBAvailable();
        
        if (hasIndexedDB) {
          // Essaie d'abord IndexedDB
          const value = await db.table(storeName).get(key);
          if (value) {
            setStoredValue(value as T);
            setIsLoading(false);
            return;
          }
        }
        
        // Fallback vers localStorage
        const item = localStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.error(`Erreur lors du chargement de ${key}:`, error);
      }
      setIsLoading(false);
    };

    loadValue();
  }, [key, storeName]);

  const setValue = async (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const hasIndexedDB = await isIndexedDBAvailable();
      
      if (hasIndexedDB) {
        // Sauvegarde dans IndexedDB
        await db.table(storeName).put({
          id: key,
          ...valueToStore,
          lastUpdated: new Date().toISOString()
        });
      } else {
        // Fallback vers localStorage
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde de ${key}:`, error);
    }
  };

  return [storedValue, setValue];
}

