import React, { useEffect } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';

/**
 * Gestionnaire central pour AdSense en production
 * S'assure que tout fonctionne optimalement
 */
const AdSenseProductionManager: React.FC = () => {
  const { shouldShowAds, hasConsentedToAds, isPremium } = useAds();

  useEffect(() => {
    // En production seulement
    if (!import.meta.env.PROD) return;

    // Configuration globale AdSense pour de meilleures performances
    if (shouldShowAds && hasConsentedToAds && (window as any).adsbygoogle) {
      try {
        // Configuration des paramètres AdSense globaux
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      } catch (error) {
        // Silently handle errors in production
      }
    }
  }, [shouldShowAds, hasConsentedToAds]);

  return null; // Ce composant ne rend rien
};

export default AdSenseProductionManager;