
import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour détecter si un media query est satisfait
 * @param query La requête CSS media query à vérifier
 * @returns boolean indiquant si la requête est satisfaite
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Vérifier si window est défini (pour éviter les erreurs en SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia(query);
    
    // Fonction pour mettre à jour l'état en fonction des changements de media query
    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    // Écouter les changements de taille d'écran
    mediaQuery.addEventListener('change', updateMatches);
    
    // Initialiser avec la valeur actuelle
    updateMatches();
    
    // Nettoyer l'écouteur lors du démontage
    return () => {
      mediaQuery.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
