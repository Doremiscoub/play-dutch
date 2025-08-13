import React, { createContext, useContext, ReactNode } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import useIsMobile from '@/hooks/use-mobile';

interface AdContextType {
  isPremium: boolean;
  isLoading: boolean;
  isMobile: boolean;
  shouldShowAds: boolean;
}

const AdContext = createContext<AdContextType | null>(null);

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};

interface AdProviderProps {
  children: ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const { isPremium, isLoading } = useSubscription();
  const isMobile = useIsMobile();
  const shouldShowAds = !isPremium && !isLoading;

  const value: AdContextType = {
    isPremium,
    isLoading,
    isMobile,
    shouldShowAds,
  };

  return <AdContext.Provider value={value}>{children}</AdContext.Provider>;
};