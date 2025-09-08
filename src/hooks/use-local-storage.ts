
import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour utiliser localStorage avec une interface similaire à useState
 * @param key La clé à utiliser dans localStorage
 * @param initialValue La valeur initiale (utilisée si aucune valeur n'existe dans localStorage)
 * @returns Une paire [storedValue, setValue] similaire à useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prevValue: T) => T)) => void] {
  // Fonction d'état pour initialiser la valeur depuis localStorage ou utiliser la valeur initiale
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Vérifier si window est défini (SSR-safe)
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        // Analyser l'élément stocké ou retourner la valeur initiale
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la clé localStorage "${key}":`, error);
      return initialValue;
    }
  });

  // Effet pour mettre à jour localStorage quand la valeur stockée change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Sauvegarder dans localStorage
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde de la clé localStorage "${key}":`, error);
      
      // En cas d'erreur (quota dépassé par exemple), essayer de nettoyer
      try {
        // Nettoyer les anciennes données pour faire de la place
        const allKeys = Object.keys(localStorage);
        const dutchKeys = allKeys.filter(k => k.startsWith('dutch_') && !k.includes('sound') && !k.includes('ads'));
        
        // Garder seulement les clés essentielles
        dutchKeys.forEach(k => {
          if (!k.includes('current_game') && !k.includes('game_active')) {
            localStorage.removeItem(k);
          }
        });
        
        // Réessayer la sauvegarde
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (cleanupError) {
        console.error(`Erreur critique localStorage pour "${key}":`, cleanupError);
      }
    }
  }, [key, storedValue]);

  // Fonction pour mettre à jour la valeur stockée, similaire à setState
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // Permettre la même API que useState (fonction ou valeur)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Mettre à jour l'état React
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Erreur lors de la définition de la valeur pour la clé localStorage "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
