
import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery, useDeviceDetect } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AdaptiveLayoutProps {
  children: ReactNode;
  mobileLayout?: ReactNode;
  tabletLayout?: ReactNode;
  desktopLayout?: ReactNode;
  className?: string;
  enableTransitions?: boolean;
  orientation?: 'portrait' | 'landscape' | 'auto';
}

export const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({
  children,
  mobileLayout,
  tabletLayout,
  desktopLayout,
  className = '',
  enableTransitions = true,
  orientation = 'auto'
}) => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  const [currentOrientation, setCurrentOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  // Détecter l'orientation de l'appareil
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerHeight > window.innerWidth) {
        setCurrentOrientation('portrait');
      } else {
        setCurrentOrientation('landscape');
      }
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Détecter le type d'appareil
  useEffect(() => {
    if (isMobile) {
      setDeviceType('mobile');
    } else if (isTablet) {
      setDeviceType('tablet');
    } else if (isDesktop) {
      setDeviceType('desktop');
    }
  }, [isMobile, isTablet, isDesktop]);

  // Choisir le layout approprié
  const getLayout = () => {
    if (deviceType === 'mobile' && mobileLayout) {
      return mobileLayout;
    }
    if (deviceType === 'tablet' && tabletLayout) {
      return tabletLayout;
    }
    if (deviceType === 'desktop' && desktopLayout) {
      return desktopLayout;
    }
    return children;
  };

  const layoutClasses = cn(
    'adaptive-layout',
    `device-${deviceType}`,
    `orientation-${currentOrientation}`,
    {
      'mobile-optimized': deviceType === 'mobile',
      'tablet-optimized': deviceType === 'tablet',
      'desktop-optimized': deviceType === 'desktop',
      'portrait-mode': currentOrientation === 'portrait',
      'landscape-mode': currentOrientation === 'landscape',
    },
    className
  );

  const content = getLayout();

  if (!enableTransitions) {
    return <div className={layoutClasses}>{content}</div>;
  }

  return (
    <motion.div
      key={`${deviceType}-${currentOrientation}`}
      className={layoutClasses}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        layout: true 
      }}
      layout
    >
      {content}
    </motion.div>
  );
};

// Hook personnalisé pour les adaptations d'interface
export const useAdaptiveInterface = () => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  
  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    
    updateOrientation();
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);
    
    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);

  // Calculs adaptatifs
  const getAdaptiveSpacing = () => {
    if (isMobile) return orientation === 'portrait' ? 'p-4' : 'p-2';
    if (isTablet) return 'p-6';
    return 'p-8';
  };

  const getAdaptiveTextSize = () => {
    if (isMobile) return orientation === 'portrait' ? 'text-sm' : 'text-xs';
    if (isTablet) return 'text-base';
    return 'text-lg';
  };

  const getAdaptiveButtonSize = () => {
    if (isMobile) return orientation === 'portrait' ? 'h-12 px-4' : 'h-10 px-3';
    if (isTablet) return 'h-12 px-6';
    return 'h-14 px-8';
  };

  const getAdaptiveColumns = () => {
    if (isMobile) return orientation === 'portrait' ? 1 : 2;
    if (isTablet) return orientation === 'portrait' ? 2 : 3;
    return 4;
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    orientation,
    getAdaptiveSpacing,
    getAdaptiveTextSize,
    getAdaptiveButtonSize,
    getAdaptiveColumns,
    deviceClass: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  };
};
