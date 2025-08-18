import { useState, useEffect } from 'react';

interface MobileOptimizationConfig {
  reducedMotion: boolean;
  isLandscape: boolean;
  hasNotch: boolean;
  isSmallScreen: boolean;
  performanceMode: boolean;
}

export function useMobileOptimization(): MobileOptimizationConfig {
  const [config, setConfig] = useState<MobileOptimizationConfig>({
    reducedMotion: false,
    isLandscape: false,
    hasNotch: false,
    isSmallScreen: false,
    performanceMode: false
  });

  useEffect(() => {
    const checkMobileFeatures = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const landscapeQuery = window.matchMedia('(orientation: landscape)');
      const smallScreenQuery = window.matchMedia('(max-width: 380px)');
      
      // Détection du notch basique
      const hasNotch = window.screen.height / window.screen.width > 2.1;
      
      // Mode performance basé sur la mémoire disponible
      const performanceMode = (navigator as any).deviceMemory ? (navigator as any).deviceMemory < 4 : false;

      setConfig({
        reducedMotion: mediaQuery.matches,
        isLandscape: landscapeQuery.matches,
        hasNotch,
        isSmallScreen: smallScreenQuery.matches,
        performanceMode
      });
    };

    checkMobileFeatures();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const landscapeQuery = window.matchMedia('(orientation: landscape)');
    const smallScreenQuery = window.matchMedia('(max-width: 380px)');

    mediaQuery.addListener(checkMobileFeatures);
    landscapeQuery.addListener(checkMobileFeatures);
    smallScreenQuery.addListener(checkMobileFeatures);

    return () => {
      mediaQuery.removeListener(checkMobileFeatures);
      landscapeQuery.removeListener(checkMobileFeatures);
      smallScreenQuery.removeListener(checkMobileFeatures);
    };
  }, []);

  return config;
}

export function getMobileClasses(config: MobileOptimizationConfig): string {
  const classes = [];
  
  if (config.reducedMotion) classes.push('motion-reduce');
  if (config.isLandscape) classes.push('landscape-mode');
  if (config.hasNotch) classes.push('has-notch');
  if (config.isSmallScreen) classes.push('small-screen');
  if (config.performanceMode) classes.push('performance-mode');
  
  return classes.join(' ');
}