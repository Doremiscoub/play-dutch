import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import useIsMobile from '@/hooks/use-mobile';

interface GDPRConsent {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
}

interface AdContextType {
  isPremium: boolean;
  isLoading: boolean;
  isMobile: boolean;
  shouldShowAds: boolean;
  gdprConsent: GDPRConsent | null;
  hasConsentedToAds: boolean;
  updateConsent: (consent: Partial<GDPRConsent>) => void;
  adPerformance: {
    impressions: number;
    clicks: number;
    revenue: number;
  };
}

const AdContext = createContext<AdContextType | null>(null);

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an EnhancedAdProvider');
  }
  return context;
};

interface EnhancedAdProviderProps {
  children: ReactNode;
}

export const EnhancedAdProvider: React.FC<EnhancedAdProviderProps> = ({ children }) => {
  const { isPremium, isLoading } = useSubscription();
  const isMobile = useIsMobile();
  
  // RGPD Consent Management
  const [gdprConsent, setGdprConsent] = useState<GDPRConsent | null>(() => {
    const stored = localStorage.getItem('dutch-gdpr-consent');
    return stored ? JSON.parse(stored) : null;
  });

  // Ad Performance Tracking
  const [adPerformance, _setAdPerformance] = useState({
    impressions: 0,
    clicks: 0,
    revenue: 0
  });

  // Check if user has consented to marketing cookies (required for AdSense)
  const hasConsentedToAds = gdprConsent?.marketing ?? false;
  
  // Only show ads if: not premium, not loading, and has consent
  const shouldShowAds = !isPremium && !isLoading && hasConsentedToAds;


  const updateConsent = (consent: Partial<GDPRConsent>) => {
    const newConsent: GDPRConsent = {
      analytics: consent.analytics ?? false,
      marketing: consent.marketing ?? false,
      functional: consent.functional ?? true, // Always true for app functionality
      timestamp: Date.now()
    };
    
    setGdprConsent(newConsent);
    localStorage.setItem('dutch-gdpr-consent', JSON.stringify(newConsent));
    
    // Update GTAG consent based on actual user choices
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': newConsent.marketing ? 'granted' : 'denied',
        'ad_user_data': newConsent.marketing ? 'granted' : 'denied',
        'ad_personalization': newConsent.marketing ? 'granted' : 'denied',
        'analytics_storage': newConsent.analytics ? 'granted' : 'denied'
      });
    }
  };

  // Load H5 Games Ad Placement API script (production only).
  // Uses adBreak/adConfig API designed for HTML5 games.
  useEffect(() => {
    if (!import.meta.env.PROD || !hasConsentedToAds) return;
    if (document.querySelector('script[src*="pagead2.googlesyndication.com"]')) return;

    // Define adBreak/adConfig stubs before script loads
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    let adBreakReady = false;

    // The H5 Games Ads API uses a different initialization pattern
    (window as any).adBreak = (window as any).adBreak || function(o: any) {
      // Queue calls until the real API loads
      ((window as any).__adBreakQueue = (window as any).__adBreakQueue || []).push(o);
    };
    (window as any).adConfig = (window as any).adConfig || function(o: any) {
      ((window as any).__adConfigQueue = (window as any).__adConfigQueue || []).push(o);
    };

    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2046195502734056';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.setAttribute('data-ad-frequency-hint', '120s');

    script.onload = () => {
      // Configure H5 Games Ads
      if (typeof (window as any).adConfig === 'function') {
        (window as any).adConfig({
          preloadAdBreaks: 'on',
          sound: 'on',
          onReady: () => {
            adBreakReady = true;
            console.log('[H5Ads] Ad Placement API ready');
          },
        });
      }
    };

    document.head.appendChild(script);
  }, [hasConsentedToAds]);

  const value: AdContextType = {
    isPremium,
    isLoading,
    isMobile,
    shouldShowAds,
    gdprConsent,
    hasConsentedToAds,
    updateConsent,
    adPerformance,
  };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};