
import { useState, useEffect } from 'react';
import { UI_CONFIG } from '@/config/uiConfig';

/**
 * Hook personnalisé pour détecter si l'écran correspond à une requête média spécifique
 * @param query La requête média à vérifier (par exemple: "(max-width: 768px)")
 * @returns Un booléen indiquant si la requête média correspond
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Vérifier le support de window et matchMedia pour éviter les erreurs SSR
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia(query);
      
      const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      
      // Initialiser
      setMatches(mediaQuery.matches);
      
      // Ajouter un auditeur pour les changements
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback pour les anciens navigateurs
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
    
    return undefined;
  }, [query]);

  return matches;
}

/**
 * Hook pour détecter si l'appareil est un appareil mobile
 * @returns Un objet avec des booléens pour différentes tailles d'écran
 */
export function useDeviceDetect() {
  const isXs = useMediaQuery(`(max-width: ${UI_CONFIG.breakpoints.xs})`);
  const isSm = useMediaQuery(`(max-width: ${UI_CONFIG.breakpoints.sm})`);
  const isMd = useMediaQuery(`(max-width: ${UI_CONFIG.breakpoints.md})`);
  const isLg = useMediaQuery(`(max-width: ${UI_CONFIG.breakpoints.lg})`);
  const isXl = useMediaQuery(`(max-width: ${UI_CONFIG.breakpoints.xl})`);
  
  const isMobile = isSm; // Moins de 640px
  const isTablet = !isSm && isMd; // Entre 640px et 768px
  const isDesktop = !isMd; // Plus de 768px
  
  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isMobile,
    isTablet,
    isDesktop
  };
}

export default useMediaQuery;
