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
        
        // Configuration de la politique de consentement
        if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
        }

        console.log('🚀 AdSense Production Manager - Configured for optimal performance');
      } catch (error) {
        console.error('❌ AdSense Production Manager - Error:', error);
      }
    }
  }, [shouldShowAds, hasConsentedToAds]);

  // Log de diagnostic en production
  useEffect(() => {
    if (import.meta.env.PROD) {
      console.log('📊 AdSense Production Status:', {
        shouldShowAds,
        hasConsentedToAds,
        isPremium,
        adSenseLoaded: !!(window as any).adsbygoogle,
        timestamp: new Date().toISOString()
      });
    }
  }, [shouldShowAds, hasConsentedToAds, isPremium]);

  return null; // Ce composant ne rend rien
};

export default AdSenseProductionManager;