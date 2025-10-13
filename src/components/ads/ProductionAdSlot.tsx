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
    } catch (error) {
      console.error('❌ Erreur AdSense:', error);
      setAdError(true);
    }
  };

  // Ne rien afficher si conditions non remplies ou erreur - pas de placeholder
  if (!shouldShowAds || !hasConsentedToAds || adError || !import.meta.env.PROD) {
    return null;
  }

  return (
    <div ref={adRef} className={`${config.dimensions} mx-auto ${className}`}>
      <ins
        className="adsbygoogle"
        style={config.style}
        data-ad-client="ca-pub-2046195502734056"
        data-ad-slot={config.slotId}
        data-ad-format={config.format}
        data-ad-sizes={config.sizes}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default ProductionAdSlot;