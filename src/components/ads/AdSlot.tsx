import React, { useEffect, useRef } from 'react';
import { useAds } from '@/contexts/AdContext';

interface AdSlotProps {
  placement: 'homepage-inline' | 'game-sidebar-left' | 'game-sidebar-right' | 'game-banner-mobile';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '' }) => {
  const { shouldShowAds, isMobile } = useAds();
  const adRef = useRef<HTMLDivElement>(null);

  // Configuration avancée par placement
  const adConfig = {
    'homepage-inline': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Espace publicitaire horizontal',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_HOMEPAGE || '',
      format: 'auto'
    },
    'game-sidebar-left': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[250px] h-[600px]',
      content: 'Publicité gauche',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_GAME_LEFT || '',
      format: 'vertical'
    },
    'game-sidebar-right': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[250px] h-[600px]',
      content: 'Publicité droite',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_GAME_RIGHT || '',
      format: 'vertical'
    },
    'game-banner-mobile': {
      show: shouldShowAds && isMobile,
      dimensions: 'w-full h-[250px]',
      content: 'Bannière mobile',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_GAME_MOBILE || '',
      format: 'horizontal'
    }
  };

  const config = adConfig[placement];

  // Chargement lazy des ads en production
  useEffect(() => {
    if (config.show && config.slotId && import.meta.env.PROD && adRef.current) {
      // Lazy load AdSense script si pas déjà chargé
      if (typeof window !== 'undefined' && !(window as any).adsbygoogle) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_ADSENSE_CLIENT_ID}`;
        script.crossOrigin = 'anonymous';
        script.async = true;
        document.head.appendChild(script);
      }

      // Initialisation de l'ad slot après un délai
      const timer = setTimeout(() => {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
          console.error('AdSense error:', e);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [config.show, config.slotId]);

  // Ne rien afficher si conditions non remplies - pas de placeholder
  if (!config.show || !config.slotId || !import.meta.env.PROD) {
    return null;
  }

  // Mode production : afficher vraie ad
  return (
    <div ref={adRef} className={`${config.dimensions} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
        data-ad-slot={config.slotId}
        data-ad-format={config.format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;