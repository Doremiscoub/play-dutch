import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAds } from '@/contexts/EnhancedAdContext';
import AdSlot from './AdSlot';

interface ContextualAdBannerProps {
  placement: 'between-rounds' | 'game-over' | 'pause';
  showProbability?: number; // Probabilité d'affichage (0-1)
  autoHideDelay?: number; // Délai en ms avant masquage automatique
  onDismiss?: () => void;
}

const ContextualAdBanner: React.FC<ContextualAdBannerProps> = ({
  placement,
  showProbability = 0.7, // 70% de chance d'affichage par défaut
  autoHideDelay = 15000, // 15s par défaut
  onDismiss
}) => {
  const { shouldShowAds, isMobile, hasConsentedToAds } = useAds();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Ne rien afficher si les conditions ne sont pas remplies
  if (!shouldShowAds || !hasConsentedToAds || !import.meta.env.PROD) {
    return null;
  }

  useEffect(() => {
    // Détermine si la bannière doit s'afficher selon la probabilité
    const shouldDisplay = Math.random() < showProbability;
    setShouldShow(shouldDisplay && shouldShowAds);
  }, [shouldShowAds, showProbability]);

  useEffect(() => {
    if (shouldShow) {
      // Petit délai pour l'animation
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      // Auto-hide après le délai
      const hideTimer = setTimeout(() => {
        handleDismiss();
      }, autoHideDelay);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [shouldShow, autoHideDelay]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldShow(false);
      onDismiss?.();
    }, 300); // Délai pour l'animation de sortie
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-md mx-auto my-4"
        >
          <div className="relative lg-card lg-tint-surface-50 lg-elevation-02 rounded-xl p-4">
            {/* Bouton de fermeture */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
              aria-label="Fermer la publicité"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Petite indication "Publicité" */}
            <div className="text-xs text-gray-500 mb-2 text-center">
              Publicité
            </div>

            {/* Contenu publicitaire */}
            <div className="w-full flex justify-center">
              <AdSlot placement="game-banner-mobile" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextualAdBanner;