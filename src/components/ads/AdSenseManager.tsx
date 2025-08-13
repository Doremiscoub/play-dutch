import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import useIsMobile from '@/hooks/use-mobile';
import AdSenseSlot from '@/components/AdSenseSlot';

interface AdSenseManagerProps {
  placement: 'homepage-sidebar' | 'homepage-banner' | 'game-sidebar';
  className?: string;
}

const AdSenseManager: React.FC<AdSenseManagerProps> = ({ placement, className = '' }) => {
  const { isPremium, isLoading } = useSubscription();
  const isMobile = useIsMobile();

  // Don't show ads for premium users
  if (isPremium || isLoading) {
    return null;
  }

  // Configuration for different ad placements
  const adConfigs = {
    'homepage-sidebar': {
      adClient: 'ca-pub-xxxxxxxxxxxxxxxx',
      adSlot: '1234567890',
      format: 'auto',
      show: !isMobile, // Only show on desktop
    },
    'homepage-banner': {
      adClient: 'ca-pub-xxxxxxxxxxxxxxxx', 
      adSlot: '1234567891',
      format: 'auto',
      show: isMobile, // Only show on mobile
    },
    'game-sidebar': {
      adClient: 'ca-pub-xxxxxxxxxxxxxxxx',
      adSlot: '1234567892', 
      format: 'auto',
      show: !isMobile, // Only show on desktop
    },
  };

  const config = adConfigs[placement];

  if (!config.show) {
    return null;
  }

  return (
    <div className={`ads-container ${className}`}>
      <AdSenseSlot
        adClient={config.adClient}
        adSlot={config.adSlot}
        adFormat={config.format}
        className="rounded-lg overflow-hidden"
      />
      <div className="text-xs text-muted-foreground text-center mt-1 opacity-60">
        Publicité
      </div>
    </div>
  );
};

export default AdSenseManager;