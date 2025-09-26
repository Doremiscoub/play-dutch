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

  // Ne pas afficher si conditions non remplies
  if (!shouldShowAds || !hasConsentedToAds) {
    return null;
  }

  // Placeholder pour le développement
  if (!import.meta.env.PROD) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          ${config.dimensions} mx-auto
          bg-gradient-to-br from-game-primary/10 to-game-secondary/10
          border-2 border-game-primary/20 rounded-xl
          flex flex-col items-center justify-center
          ${className}
        `}
      >
        <div className="text-center space-y-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {config.icon}
          </motion.div>
          <div>
            <p className="text-sm font-semibold text-game-text">{config.message}</p>
            <p className="text-xs text-game-text/60 mt-1">Ad Slot - {placement}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={adRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.dimensions} mx-auto relative ${className}`}
    >
      {/* Loading indicator */}
      {adState === 'loading' && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-2"
            >
              {config.icon}
            </motion.div>
            <p className="text-xs text-slate-500">{config.message}</p>
          </div>
        </div>
      )}
      
      {/* Ad container */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-2046195502734056"
        data-ad-slot={config.slotId}
        data-ad-format={config.format}
        data-ad-sizes={config.sizes}
        data-full-width-responsive="true"
      />
    </motion.div>
  );
};

export default GameAdSlot;