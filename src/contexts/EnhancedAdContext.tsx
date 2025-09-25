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
  const [adPerformance, setAdPerformance] = useState({
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
    
    // If marketing consent is withdrawn, remove AdSense cookies
    if (!newConsent.marketing && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  // Load AdSense script only when consent is given and ads should show
  useEffect(() => {
    if (shouldShowAds && !document.querySelector('script[src*="adsbygoogle"]')) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2046195502734056';
      script.crossOrigin = 'anonymous';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ AdSense script loaded with GDPR compliance');
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load AdSense script');
      };
      
      document.head.appendChild(script);
    }
  }, [shouldShowAds]);

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