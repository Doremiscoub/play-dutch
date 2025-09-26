import React, { useEffect, useState } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';

interface AdMetrics {
  impressions: number;
  clicks: number;
  viewability: number;
  revenue: number;
  lastUpdated: number;
}

/**
 * Tracker de performance AdSense pour optimiser les revenus
 */
const AdPerformanceTracker: React.FC = () => {
  const { shouldShowAds, hasConsentedToAds } = useAds();
  const [metrics, setMetrics] = useState<AdMetrics>({
    impressions: 0,
    clicks: 0,
    viewability: 0,
    revenue: 0,
    lastUpdated: Date.now()
  });

  useEffect(() => {
    if (!shouldShowAds || !hasConsentedToAds || !import.meta.env.PROD) return;

    // Observer les événements AdSense pour tracking
    const trackAdEvents = () => {
      if ((window as any).adsbygoogle && (window as any).adsbygoogle.loaded) {
        try {
          // Écouter les événements AdSense
          (window as any).adsbygoogle.push({
            google_ad_client: "ca-pub-2046195502734056",
            enable_page_level_ads: true,
            overlays: {bottom: true}
          });

          // Track impressions via Intersection Observer
          const adElements = document.querySelectorAll('.adsbygoogle');
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  setMetrics(prev => ({
                    ...prev,
                    impressions: prev.impressions + 1,
                    viewability: (entry.intersectionRatio * 100),
                    lastUpdated: Date.now()
                  }));
                }
              });
            },
            { threshold: [0.5, 0.7, 1.0] }
          );

          adElements.forEach(ad => observer.observe(ad));

          return () => observer.disconnect();
        } catch (error) {
          console.error('AdSense tracking error:', error);
        }
      }
    };

    const timer = setTimeout(trackAdEvents, 2000);
    return () => clearTimeout(timer);
  }, [shouldShowAds, hasConsentedToAds]);

  // Sauvegarder les métriques périodiquement
  useEffect(() => {
    if (metrics.impressions > 0) {
      localStorage.setItem('dutch-ad-metrics', JSON.stringify(metrics));
    }
  }, [metrics]);

  // Charger les métriques sauvegardées
  useEffect(() => {
    const saved = localStorage.getItem('dutch-ad-metrics');
    if (saved) {
      try {
        const savedMetrics = JSON.parse(saved);
        setMetrics(prev => ({ ...prev, ...savedMetrics }));
      } catch (error) {
        console.error('Error loading ad metrics:', error);
      }
    }
  }, []);

  return null; // Composant invisible
};

export default AdPerformanceTracker;