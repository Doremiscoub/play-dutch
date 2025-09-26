import React, { useEffect, useRef, useState } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';
import TestAdSlot from './TestAdSlot';

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
        console.error('AdSense error:', error);
        setAdStatus('blocked');
      }
    }, priority === 'high' ? 100 : priority === 'medium' ? 300 : 500);

    return () => clearTimeout(timer);
  }, [isIntersecting, hasConsentedToAds, config.slotId, priority]);

  // Placeholder pour développement ou erreur
  const renderPlaceholder = (status: string, icon?: React.ReactNode) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        ${config.dimensions} 
        bg-gradient-to-br from-slate-50 to-slate-100 
        dark:from-slate-800 dark:to-slate-900
        rounded-lg border border-slate-200 dark:border-slate-700
        flex flex-col items-center justify-center
        text-slate-500 dark:text-slate-400
        ${className}
      `}
    >
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          {icon || <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded mx-auto opacity-50" />}
        </div>
        <div>
          <p className="text-xs font-medium opacity-70">{config.content}</p>
          <p className="text-xs opacity-50 mt-1">{status}</p>
        </div>
      </div>
    </motion.div>
  );

  // En développement, montrer TestAdSlot si pas de consentement
  if (!import.meta.env.PROD && !hasConsentedToAds) {
    return (
      <TestAdSlot 
        placement={placement}
        width={config?.dimensions?.includes('w-[300px]') ? 300 : 728}
        height={config?.dimensions?.includes('h-[600px]') ? 600 : 90}
        className={className}
      />
    );
  }

  // Conditions critiques pour affichage des ads
  if (!shouldShowAds) {
    console.log('🚫 Ad slot masqué - shouldShowAds:', { placement, shouldShowAds, hasConsentedToAds });
    return null;
  }

  if (!hasConsentedToAds) {
    console.log('🚫 Ad slot masqué - pas de consentement:', { placement, hasConsentedToAds });
    return null;
  }

  if (!config.show) {
    console.log('🚫 Ad slot masqué - config.show:', { placement, configShow: config.show });
    return null;
  }

  // Pas de slot ID configuré
  if (!config.slotId) {
    return renderPlaceholder('Configuration manquante', <AlertCircle className="w-6 h-6 text-amber-500" />);
  }

  // États d'erreur
  if (adStatus === 'error') {
    return renderPlaceholder('Erreur de chargement', <WifiOff className="w-6 h-6 text-red-500" />);
  }

  if (adStatus === 'blocked') {
    return renderPlaceholder('Bloqueur de publicité détecté', <AlertCircle className="w-6 h-6 text-orange-500" />);
  }

  // Annonce en cours de chargement
  if (adStatus === 'loading' && isIntersecting) {
    return renderPlaceholder('Chargement...', <Wifi className="w-6 h-6 text-blue-500 animate-pulse" />);
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