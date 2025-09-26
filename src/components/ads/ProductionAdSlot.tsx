import React, { useEffect, useRef, useState } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductionAdSlotProps {
  placement: 'homepage-hero' | 'homepage-footer' | 'game-end' | 'stats-top';
  className?: string;
  priority?: 'high' | 'medium' | 'low';
}

const ProductionAdSlot: React.FC<ProductionAdSlotProps> = ({ 
  placement, 
  className = '', 
  priority = 'medium' 
}) => {
  const { shouldShowAds, isMobile, hasConsentedToAds } = useAds();
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Configuration optimisée pour la production
  const adConfigs = {
    'homepage-hero': {
      slotId: '7625232120',
      format: 'auto',
      sizes: isMobile ? '320x50' : '728x90',
      dimensions: isMobile ? 'w-full h-[50px] max-w-[320px]' : 'w-full h-[90px] max-w-[728px]',
      style: { display: 'block', textAlign: 'center' as const }
    },
    'homepage-footer': {
      slotId: '8112000059',
      format: 'auto', 
      sizes: isMobile ? '300x250' : '728x90',
      dimensions: isMobile ? 'w-[300px] h-[250px]' : 'w-full h-[90px] max-w-[728px]',
      style: { display: 'block', textAlign: 'center' as const }
    },
    'game-end': {
      slotId: '8421933386',
      format: 'rectangle',
      sizes: '336x280',
      dimensions: 'w-[336px] h-[280px]',
      style: { display: 'block', textAlign: 'center' as const }
    },
    'stats-top': {
      slotId: '9453001886',
      format: 'auto',
      sizes: isMobile ? '320x50' : '728x90', 
      dimensions: isMobile ? 'w-full h-[50px] max-w-[320px]' : 'w-full h-[90px] max-w-[728px]',
      style: { display: 'block', textAlign: 'center' as const }
    }
  };

  const config = adConfigs[placement];

  // Intersection Observer pour lazy loading
  useEffect(() => {
    if (!shouldShowAds || !hasConsentedToAds || !adRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !adLoaded) {
          setIsVisible(true);
          loadAd();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [shouldShowAds, hasConsentedToAds, adLoaded]);

  const loadAd = async () => {
    if (adLoaded || !config) return;

    try {
      // Vérifier que AdSense est chargé
      if (!(window as any).adsbygoogle) {
        console.error('AdSense not loaded');
        setAdError(true);
        return;
      }

      // Initialiser l'ad
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      setAdLoaded(true);
      
      console.log('✅ Ad chargée:', { placement, slotId: config.slotId });
    } catch (error) {
      console.error('❌ Erreur AdSense:', error);
      setAdError(true);
    }
  };

  // Ne pas afficher si conditions non remplies
  if (!shouldShowAds || !hasConsentedToAds) {
    return null;
  }

  // Placeholder d'erreur
  if (adError) {
    return (
      <div className={`${config.dimensions} mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg ${className}`}>
        <div className="text-center text-slate-500">
          <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
          <p className="text-xs">Publicité indisponible</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={adRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.dimensions} mx-auto ${className}`}
    >
      {/* Indicateur de visibilité en dev */}
      {!import.meta.env.PROD && (
        <div className="absolute top-0 right-0 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-bl">
          {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        </div>
      )}
      
      <ins
        className="adsbygoogle"
        style={config.style}
        data-ad-client="ca-pub-2046195502734056"
        data-ad-slot={config.slotId}
        data-ad-format={config.format}
        data-ad-sizes={config.sizes}
        data-full-width-responsive="true"
      />
    </motion.div>
  );
};

export default ProductionAdSlot;