import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useNavigationVisibility = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [modalsOpen, setModalsOpen] = useState(0);

  // API pour gérer les modals ouverts
  const registerModal = () => setModalsOpen(prev => prev + 1);
  const unregisterModal = () => setModalsOpen(prev => Math.max(0, prev - 1));

  // Reset modal count when path changes
  useEffect(() => {
    setModalsOpen(0);
  }, [currentPath]);

  // Logique pour déterminer la visibilité des composants de navigation
  const isGamePage = currentPath.includes('/game');
  const hasModalsOpen = modalsOpen > 0;
  
  const showMobileNav = !isGamePage && !hasModalsOpen;
  const showQuickActions = !isGamePage && !hasModalsOpen;
  const mobileNavBottomOffset = isGamePage || hasModalsOpen ? '80px' : '0px';

  return {
    showMobileNav,
    showQuickActions,
    mobileNavBottomOffset,
    registerModal,
    unregisterModal,
    hasModalsOpen,
    isGamePage
  };
};