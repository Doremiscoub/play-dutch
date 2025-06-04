
import React, { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface MobileOptimizerProps {
  children: React.ReactNode;
  enableTouchOptimization?: boolean;
  disableZoom?: boolean;
  enableReducedMotion?: boolean;
}

export const MobileOptimizer: React.FC<MobileOptimizerProps> = ({
  children,
  enableTouchOptimization = true,
  disableZoom = false,
  enableReducedMotion = true
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (isMobile && enableTouchOptimization) {
      // Optimisation pour les appareils tactiles
      document.body.classList.add('touch-device');
      
      // Prévenir le zoom accidentel sur les inputs
      if (disableZoom) {
        const metaViewport = document.querySelector('meta[name="viewport"]');
        if (metaViewport) {
          metaViewport.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          );
        }
      }

      // Améliorer la performance des scrolls
      document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
      
      // Optimiser les animations pour mobile
      if (enableReducedMotion && prefersReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
      }
    }

    return () => {
      document.body.classList.remove('touch-device');
      document.documentElement.classList.remove('reduce-motion');
    };
  }, [isMobile, enableTouchOptimization, disableZoom, enableReducedMotion, prefersReducedMotion]);

  return (
    <div className={`mobile-optimized ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      {children}
    </div>
  );
};

// Styles CSS à ajouter via Tailwind ou CSS global
export const mobileOptimizerStyles = `
  .touch-device {
    /* Améliorer les zones de touch */
    touch-action: manipulation;
  }

  .touch-device button,
  .touch-device [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }

  .is-mobile {
    /* Optimisations spécifiques mobile */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }

  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  @media (max-width: 768px) {
    /* Améliorer la lisibilité sur mobile */
    body {
      font-size: 16px; /* Éviter le zoom automatique sur iOS */
    }
    
    /* Optimiser les formulaires */
    input, textarea, select {
      font-size: 16px; /* Éviter le zoom automatique */
    }
  }
`;
