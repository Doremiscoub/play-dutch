import React, { useEffect, useRef, useState } from 'react';
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
    | 'content-sidebar'
    | 'faq-inline'
    | 'legal-inline';
  className?: string;
  sticky?: boolean;
  refreshable?: boolean;
}

interface AdError {
  code: string;
  message: string;
  placement: string;
}

const EnhancedAdSlot: React.FC<AdSlotProps> = ({ 
  placement, 
  className = '', 
  sticky = false,
  refreshable = false 
}) => {
  const { shouldShowAds, isMobile } = useAds();
  const adRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adError, setAdError] = useState<AdError | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Configuration avancée par placement
  const adConfig = {
    'homepage-inline': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Espace publicitaire horizontal',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_HOMEPAGE || '',
      format: 'auto',
      priority: 'high'
    },
    'game-sidebar-left': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[250px] h-[600px]',
      content: 'Publicité gauche',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_GAME_LEFT || '',
      format: 'vertical',
      priority: 'high'
    },
    'game-sidebar-right': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[250px] h-[600px]',
      content: 'Publicité droite',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_GAME_RIGHT || '',
      format: 'vertical',
      priority: 'high'
    },
    'game-banner-mobile': {
      show: shouldShowAds && isMobile,
      dimensions: 'w-full h-[250px]',
      content: 'Bannière mobile',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_GAME_MOBILE || '',
      format: 'horizontal',
      priority: 'high'
    },
    'setup-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité configuration',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_SETUP || '',
      format: 'auto',
      priority: 'medium'
    },
    'rules-sidebar': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité règles sidebar',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_RULES_SIDEBAR || '',
      format: 'vertical',
      priority: 'medium'
    },
    'rules-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité règles inline',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_RULES_INLINE || '',
      format: 'auto',
      priority: 'medium'
    },
    'history-sidebar': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité historique sidebar',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_HISTORY_SIDEBAR || '',
      format: 'vertical',
      priority: 'low'
    },
    'history-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité historique inline',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_HISTORY_INLINE || '',
      format: 'auto',
      priority: 'low'
    },
    'content-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité contenu inline',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_CONTENT_INLINE || '',
      format: 'auto',
      priority: 'medium'
    },
    'content-sidebar': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité contenu sidebar',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_CONTENT_SIDEBAR || '',
      format: 'vertical',
      priority: 'medium'
    },
    'faq-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[200px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité FAQ',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_FAQ || '',
      format: 'auto',
      priority: 'low'
    },
    'legal-inline': {
      show: shouldShowAds,
      dimensions: isMobile ? 'w-full h-[180px]' : 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Publicité légale',
      slotId: import.meta.env.VITE_ADSENSE_SLOT_LEGAL || '',
      format: 'auto',
      priority: 'low'
    }
  };

  const config = adConfig[placement];

  // Lazy loading AdSense script optimisé
  const loadAdSenseScript = async () => {
    if (typeof window === 'undefined' || !(window as any).adsbygoogle) {
      try {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_ADSENSE_CLIENT_ID}`;
        script.crossOrigin = 'anonymous';
        script.async = true;
        
        // Promesse pour attendre le chargement
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        
        console.log('✅ AdSense script loaded successfully');
      } catch (error) {
        console.error('❌ Failed to load AdSense script:', error);
        setAdError({
          code: 'SCRIPT_LOAD_ERROR',
          message: 'Failed to load AdSense script',
          placement
        });
      }
    }
  };

  // Initialisation de l'ad avec retry logic
  const initializeAd = async (retryCount = 0) => {
    if (!config.show || !config.slotId || !import.meta.env.PROD) return;

    try {
      setIsLoading(true);
      setAdError(null);

      await loadAdSenseScript();

      // Délai avant initialisation basé sur la priorité
      const delay = config.priority === 'high' ? 100 : config.priority === 'medium' ? 300 : 500;
      
      setTimeout(() => {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setIsLoading(false);
          console.log(`✅ Ad initialized: ${placement}`);
        } catch (error) {
          console.error(`❌ Ad initialization failed: ${placement}`, error);
          
          // Retry logic (max 2 retries)
          if (retryCount < 2) {
            setTimeout(() => initializeAd(retryCount + 1), 2000);
          } else {
            setAdError({
              code: 'INIT_ERROR',
              message: 'Failed to initialize ad after retries',
              placement
            });
            setIsLoading(false);
          }
        }
      }, delay);

    } catch (error) {
      console.error(`❌ Ad setup failed: ${placement}`, error);
      setAdError({
        code: 'SETUP_ERROR',
        message: 'Failed to setup ad',
        placement
      });
      setIsLoading(false);
    }
  };

  // Fonction de refresh
  const refreshAd = () => {
    if (refreshable && config.show) {
      setRefreshKey(prev => prev + 1);
      initializeAd();
    }
  };

  // Auto-refresh toutes les 30 secondes pour les ads refreshables
  useEffect(() => {
    if (refreshable && config.show) {
      const interval = setInterval(refreshAd, 30000);
      return () => clearInterval(interval);
    }
  }, [refreshable, config.show]);

  // Initialisation
  useEffect(() => {
    initializeAd();
  }, [config.show, config.slotId, refreshKey]);

  if (!config.show) {
    return null;
  }

  // Mode développement : placeholder amélioré
  if (!import.meta.env.PROD || !config.slotId) {
    return (
      <div className={`
        ${config.dimensions} 
        bg-gradient-to-br from-slate-100 to-slate-200 
        dark:from-slate-800 dark:to-slate-900
        rounded-xl border border-slate-300 dark:border-slate-700
        flex flex-col items-center justify-center
        text-slate-500 dark:text-slate-400
        relative overflow-hidden
        ${sticky ? 'sticky top-4' : ''}
        ${className}
      `}>
        {/* Animation de loading */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        )}
        
        <div className="text-center space-y-2 p-4">
          <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded mx-auto opacity-50" />
          <p className="text-xs font-medium opacity-70">{config.content}</p>
          <p className="text-xs opacity-50">
            {config.priority} priority • {import.meta.env.DEV ? 'DEV' : 'PREVIEW'}
          </p>
          {refreshable && (
            <button
              onClick={refreshAd}
              className="text-xs text-blue-500 hover:text-blue-600 underline"
            >
              🔄 Refresh
            </button>
          )}
        </div>
      </div>
    );
  }

  // Mode production : vraie ad avec fallback
  return (
    <div 
      className={`
        ${config.dimensions} 
        ${sticky ? 'sticky top-4' : ''} 
        ${className}
      `}
    >
      {/* Affichage d'erreur */}
      {adError ? (
        <div className={`
          ${config.dimensions}
          bg-red-50 dark:bg-red-950/20 
          border border-red-200 dark:border-red-800
          rounded-xl flex flex-col items-center justify-center
          text-red-600 dark:text-red-400
        `}>
          <div className="text-center space-y-2 p-4">
            <div className="text-2xl">⚠️</div>
            <p className="text-xs font-medium">Erreur de chargement</p>
            <button
              onClick={() => initializeAd()}
              className="text-xs underline hover:no-underline"
            >
              Réessayer
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Loading skeleton */}
          {isLoading && (
            <div className={`
              ${config.dimensions}
              bg-gradient-to-br from-slate-100 to-slate-200 
              dark:from-slate-800 dark:to-slate-900
              rounded-xl animate-pulse
            `} />
          )}
          
          {/* Ad content */}
          <div 
            ref={adRef}
            className={isLoading ? 'opacity-0 absolute' : 'opacity-100'}
          >
            <ins
              key={refreshKey}
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
              data-ad-slot={config.slotId}
              data-ad-format={config.format}
              data-full-width-responsive="true"
            />
          </div>
          
          {/* Refresh button pour les ads refreshables */}
          {refreshable && !isLoading && (
            <button
              onClick={refreshAd}
              className="absolute top-2 right-2 text-xs text-gray-400 hover:text-gray-600 opacity-0 hover:opacity-100 transition-opacity"
              title="Rafraîchir la publicité"
            >
              🔄
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedAdSlot;