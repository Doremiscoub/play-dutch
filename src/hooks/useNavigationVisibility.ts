import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationVisibilityConfig {
  showFloatingActions: boolean;
  showQuickActions: boolean;
  showMobileNav: boolean;
  mobileNavBottomOffset: string;
}

export const useNavigationVisibility = (isModalOpen: boolean = false): NavigationVisibilityConfig => {
  const location = useLocation();
  const [config, setConfig] = useState<NavigationVisibilityConfig>({
    showFloatingActions: true,
    showQuickActions: true,
    showMobileNav: true,
    mobileNavBottomOffset: '0px'
  });

  useEffect(() => {
    const isGamePage = location.pathname === '/game';
    
    setConfig({
      // FloatingActions: visible sur la page de jeu, cachés si modal ouvert
      showFloatingActions: isGamePage && !isModalOpen,
      
      // QuickActions: cachés sur la page de jeu (redondance)
      showQuickActions: !isGamePage,
      
      // MobileNav: toujours visible
      showMobileNav: true,
      
      // Offset pour éviter les superpositions avec les boutons flottants
      mobileNavBottomOffset: isGamePage && !isModalOpen ? '80px' : '0px'
    });
  }, [location.pathname, isModalOpen]);

  return config;
};