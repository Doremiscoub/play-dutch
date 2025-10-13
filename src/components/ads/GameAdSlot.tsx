import React, { useEffect, useRef, useState } from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import { Trophy, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameAdSlotProps {
  placement: 'game-end' | 'stats-page' | 'history-top';
  className?: string;
  priority?: 'high' | 'medium' | 'low';
}

const GameAdSlot: React.FC<GameAdSlotProps> = ({ 
  placement, 
  className = '', 
  priority = 'medium' 
}) => {
  const { shouldShowAds, isMobile, hasConsentedToAds } = useAds();
  const adRef = useRef<HTMLDivElement>(null);
  const [adState, setAdState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isVisible, setIsVisible] = useState(false);

  // Configuration des ads de jeu
  const gameAdConfig = {
    'game-end': {
      slotId: '8421933386',
      format: 'rectangle',
      sizes: '336x280',
      dimensions: 'w-[336px] h-[280px]',
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      message: 'Félicitations pour cette partie !'
    },
    'stats-page': {
      slotId: '9453001886',
      format: 'auto',
      sizes: isMobile ? '320x50' : '728x90',
      dimensions: isMobile ? 'w-full h-[50px] max-w-[320px]' : 'w-full h-[90px] max-w-[728px]',
      icon: <Star className="h-8 w-8 text-purple-500" />,
      message: 'Analysez vos performances'
    },
    'history-top': {
      slotId: '7625232120',
      format: 'auto', 
      sizes: isMobile ? '300x250' : '728x90',
      dimensions: isMobile ? 'w-[300px] h-[250px]' : 'w-full h-[90px] max-w-[728px]',
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      message: 'Revivez vos meilleures parties'
    }
  };

  const config = gameAdConfig[placement];

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    if (!shouldShowAds || !hasConsentedToAds || !adRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          loadGameAd();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [shouldShowAds, hasConsentedToAds, isVisible]);

  const loadGameAd = async () => {
    if (!isVisible || adState === 'loaded') return;

    try {
      await new Promise(resolve => setTimeout(resolve, 200)); // Délai pour éviter les conflits
      
      if ((window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setAdState('loaded');
      } else {
        setAdState('error');
      }
    } catch (error) {
      console.error('❌ Game ad error:', error);
      setAdState('error');
    }
  };

  // Ne rien afficher si conditions non remplies - pas de placeholder
  if (!shouldShowAds || !hasConsentedToAds || !import.meta.env.PROD) {
    return null;
  }

  // En cas d'erreur, ne rien afficher
  if (adState === 'error') {
    return null;
  }

  return (
    <div ref={adRef} className={`${config.dimensions} mx-auto ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-2046195502734056"
        data-ad-slot={config.slotId}
        data-ad-format={config.format}
        data-ad-sizes={config.sizes}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GameAdSlot;