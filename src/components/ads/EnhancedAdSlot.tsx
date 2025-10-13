import React, { useEffect, useRef, useState } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnhancedAdSlotProps {
  placement: 'homepage-inline' | 'game-sidebar-left' | 'game-sidebar-right' | 'game-banner-mobile' | 'stats-rectangle';
  className?: string;
  priority?: 'high' | 'medium' | 'low';
}

const EnhancedAdSlot: React.FC<EnhancedAdSlotProps> = ({ 
  placement, 
  className = '', 
  priority = 'medium' 
}) => {
  const { shouldShowAds, isMobile, hasConsentedToAds } = useAds();
  const adRef = useRef<HTMLDivElement>(null);
  const [adStatus, setAdStatus] = useState<'loading' | 'loaded' | 'error' | 'blocked'>('loading');
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Configuration avancée par placement avec formats adaptatifs
  const adConfig = {
    'homepage-inline': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-full max-w-[728px] h-[90px] mx-auto',
      content: 'Espace publicitaire horizontal',
      slotId: '7625232120',
      format: 'auto',
      sizes: '(max-width: 768px) 320x50, (max-width: 1024px) 728x90, 970x90'
    },
    'game-sidebar-left': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité gauche',
      slotId: '8112000059',
      format: 'vertical',
      sizes: '300x600, 300x250, 160x600'
    },
    'game-sidebar-right': {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[300px] h-[600px]',
      content: 'Publicité droite',
      slotId: '8421933386',
      format: 'vertical',
      sizes: '300x600, 300x250, 160x600'
    },
    'game-banner-mobile': {
      show: shouldShowAds && isMobile,
      dimensions: 'w-full h-[100px] max-w-[320px] mx-auto',
      content: 'Bannière mobile',
      slotId: '9453001886',
      format: 'horizontal',
      sizes: '320x50, 300x50'
    },
    'stats-rectangle': {
      show: shouldShowAds,
      dimensions: 'w-[336px] h-[280px] mx-auto',
      content: 'Rectangle publicitaire',
      slotId: '7625232120', // Réutiliser un slot existant ou créer nouveau
      format: 'rectangle',
      sizes: '336x280, 300x250'
    }
  };

  const config = adConfig[placement];

  // Intersection Observer pour lazy loading intelligent
  useEffect(() => {
    if (!config.show || !adRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Précharger 50px avant d'être visible
      }
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [config.show]);

  // Chargement de l'annonce seulement quand visible ET avec consentement
  useEffect(() => {
    if (!isIntersecting || !hasConsentedToAds || !config.slotId) return;

    const timer = setTimeout(() => {
      try {
        if ((window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setAdStatus('loaded');
        } else {
          setAdStatus('error');
        }
      } catch (error) {
        setAdStatus('blocked');
      }
    }, priority === 'high' ? 100 : priority === 'medium' ? 300 : 500);

    return () => clearTimeout(timer);
  }, [isIntersecting, hasConsentedToAds, config.slotId, priority]);

  // Ne jamais afficher de placeholder - retourner null si on ne peut pas montrer la vraie pub
  if (!shouldShowAds || !hasConsentedToAds || !config.show || !config.slotId || !import.meta.env.PROD) {
    return null;
  }

  // En cas d'erreur, ne rien afficher pour garder l'UI propre
  if (adStatus === 'error' || adStatus === 'blocked') {
    return null;
  }

  // Pendant le chargement, ne rien afficher
  if (adStatus === 'loading') {
    return null;
  }

  // Annonce prête - attendre la visibilité
  return (
    <div ref={adRef} className={`${config.dimensions} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2046195502734056"
        data-ad-slot={config.slotId}
        data-ad-format={config.format}
        data-ad-sizes={config.sizes}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default EnhancedAdSlot;