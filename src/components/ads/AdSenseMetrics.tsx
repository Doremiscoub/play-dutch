import React, { useEffect, useState } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';

interface AdMetrics {
  totalImpressions: number;
  todayImpressions: number;
  clickThroughRate: number;
  estimatedRevenue: number;
  lastUpdated: number;
}

/**
 * Composant invisible qui track les métriques AdSense
 * pour l'optimisation des revenus publicitaires
 */
const AdSenseMetrics: React.FC = () => {
  const { shouldShowAds, hasConsentedToAds } = useAds();
  const [metrics, setMetrics] = useState<AdMetrics>({
    totalImpressions: 0,
    todayImpressions: 0,
    clickThroughRate: 0,
    estimatedRevenue: 0,
    lastUpdated: Date.now()
  });

  useEffect(() => {
    if (!shouldShowAds || !hasConsentedToAds || !import.meta.env.PROD) return;

    // Charger les métriques sauvegardées
    const loadMetrics = () => {
      const saved = localStorage.getItem('dutch-ad-metrics');
      if (saved) {
        try {
          const savedMetrics = JSON.parse(saved);
          setMetrics(prev => ({ ...prev, ...savedMetrics }));
        } catch (error) {
          // Ignore parsing errors
        }
      }
    };

    // Observer les slots publicitaires pour les impressions
    const observeAdSlots = () => {
      const adSlots = document.querySelectorAll('.adsbygoogle');
      if (adSlots.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              // Une impression comptabilisée seulement si l'ad est 50% visible
              setMetrics(prev => {
                const now = Date.now();
                const today = new Date().toDateString();
                const lastUpdate = new Date(prev.lastUpdated).toDateString();
                
                const newMetrics = {
                  ...prev,
                  totalImpressions: prev.totalImpressions + 1,
                  todayImpressions: today === lastUpdate ? prev.todayImpressions + 1 : 1,
                  lastUpdated: now
                };

                // Sauvegarder périodiquement
                localStorage.setItem('dutch-ad-metrics', JSON.stringify(newMetrics));
                return newMetrics;
              });
            }
          });
        },
        {
          threshold: [0.5],
          rootMargin: '0px'
        }
      );

      adSlots.forEach(slot => observer.observe(slot));
      return () => observer.disconnect();
    };

    loadMetrics();
    const cleanup = observeAdSlots();

    // Nettoyage périodique des anciennes métriques (garder 30 jours)
    const cleanupOldMetrics = () => {
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      if (metrics.lastUpdated < thirtyDaysAgo) {
        setMetrics({
          totalImpressions: 0,
          todayImpressions: 0,
          clickThroughRate: 0,
          estimatedRevenue: 0,
          lastUpdated: Date.now()
        });
      }
    };

    const cleanupInterval = setInterval(cleanupOldMetrics, 24 * 60 * 60 * 1000); // Daily cleanup

    return () => {
      if (cleanup) cleanup();
      clearInterval(cleanupInterval);
    };
  }, [shouldShowAds, hasConsentedToAds]);

  return null;
};

export default AdSenseMetrics;