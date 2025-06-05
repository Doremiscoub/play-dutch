
import React, { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface MobileOptimizerProps {
  children: React.ReactNode;
  enableTouchOptimization?: boolean;
  disableZoom?: boolean;
  enableReducedMotion?: boolean;
  enableHaptics?: boolean;
  preventOverscroll?: boolean;
}

export const MobileOptimizer: React.FC<MobileOptimizerProps> = ({
  children,
  enableTouchOptimization = true,
  disableZoom = false,
  enableReducedMotion = true,
  enableHaptics = true,
  preventOverscroll = true
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
      
      // Prévenir l'overscroll
      if (preventOverscroll) {
        document.body.style.overscrollBehavior = 'none';
        document.documentElement.style.overscrollBehavior = 'none';
      }

      // Support du mode sombre automatique
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDarkMode.matches) {
        document.documentElement.classList.add('dark-mode-preferred');
      }
      
      // Optimiser les animations pour mobile
      if (enableReducedMotion && prefersReducedMotion) {
        document.documentElement.classList.add('reduce-motion');
      }

      // Support des gestes système
      document.body.style.touchAction = 'manipulation';
      
      // Optimisations pour Safari iOS
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.classList.add('ios-device');
        // Prévenir le bounce sur iOS
        document.addEventListener('touchmove', (e) => {
          if ((e.target as Element).closest('.scrollable')) return;
          e.preventDefault();
        }, { passive: false });
      }

      // Optimisations pour Android
      if (/Android/.test(navigator.userAgent)) {
        document.body.classList.add('android-device');
      }
    }

    return () => {
      document.body.classList.remove('touch-device', 'ios-device', 'android-device');
      document.documentElement.classList.remove('reduce-motion', 'dark-mode-preferred');
      if (preventOverscroll) {
        document.body.style.overscrollBehavior = '';
        document.documentElement.style.overscrollBehavior = '';
      }
    };
  }, [isMobile, enableTouchOptimization, disableZoom, enableReducedMotion, prefersReducedMotion, preventOverscroll]);

  return (
    <div className={`mobile-optimized ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      {children}
    </div>
  );
};

// Styles CSS étendus pour les optimisations mobiles
export const enhancedMobileOptimizerStyles = `
  .touch-device {
    touch-action: manipulation;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }

  .touch-device button,
  .touch-device [role="button"],
  .touch-device .interactive {
    min-height: 44px;
    min-width: 44px;
    touch-action: manipulation;
  }

  .ios-device {
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(0, 0, 0);
  }

  .android-device {
    overscroll-behavior: none;
  }

  .is-mobile {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    user-select: none;
  }

  .is-mobile input,
  .is-mobile textarea,
  .is-mobile select {
    user-select: text;
    -webkit-user-select: text;
  }

  .reduce-motion *,
  .reduce-motion *::before,
  .reduce-motion *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .scrollable {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  @media (max-width: 768px) {
    body {
      font-size: 16px;
      -webkit-text-size-adjust: 100%;
    }
    
    input, textarea, select {
      font-size: 16px;
      border-radius: 8px;
    }

    .touch-target {
      min-height: 44px;
      min-width: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (orientation: landscape) and (max-height: 500px) {
    .mobile-landscape-optimized {
      padding: 0.5rem;
    }
  }

  @supports (env(safe-area-inset-top)) {
    .safe-area-top {
      padding-top: env(safe-area-inset-top);
    }
    
    .safe-area-bottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
`;
