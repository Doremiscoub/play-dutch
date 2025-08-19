import React, { useEffect, useRef } from 'react';
import { useAds } from '@/contexts/AdContext';

interface AdSlotProps {
  placement: 
    | 'homepage-inline' 
    | 'game-sidebar-left' 
    | 'game-sidebar-right' 
    | 'game-banner-mobile'
    | 'setup-inline'
    | 'rules-sidebar'
    | 'rules-inline'
    | 'history-sidebar'
    | 'history-inline'
    | 'content-inline'
    | 'content-sidebar';
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
    },
    'setup-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité configuration',
      slotId: '7153963996', // Real AdSense slot ID
      format: 'auto'
    },
    'rules-sidebar': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité règles sidebar',
      slotId: '7153963996', // Real AdSense slot ID
      format: 'vertical'
    },
    'rules-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité règles inline',
      slotId: '7153963996', // Real AdSense slot ID
      format: 'auto'
    },
    'history-sidebar': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité historique sidebar',
      slotId: '7153963996', // Real AdSense slot ID
      format: 'vertical'
    },
    'history-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité historique inline',
      slotId: '7153963996', // Real AdSense slot ID
      format: 'auto'
    },
    'content-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité contenu inline',
      slotId: '7153963996', // Real AdSense slot ID
      format: 'auto'
    },
    'content-sidebar': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité contenu sidebar',
      slotId: '7153963996', // Real AdSense slot ID
      format: 'vertical'
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

  if (!config.show) {
    return null;
  }

  // Mode développement : afficher placeholder
  if (!import.meta.env.PROD || !config.slotId) {
    return (
      <div className={`
        ${config.dimensions} 
        bg-gradient-to-br from-slate-100 to-slate-200 
        dark:from-slate-800 dark:to-slate-900
        rounded-lg border border-slate-300 dark:border-slate-700
        flex flex-col items-center justify-center
        text-slate-500 dark:text-slate-400
        ${className}
      `}>
        <div className="text-center space-y-2">
          <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded mx-auto opacity-50" />
          <p className="text-xs font-medium opacity-70">{config.content}</p>
          <p className="text-xs opacity-50">AdSense Preview</p>
        </div>
      </div>
    );
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