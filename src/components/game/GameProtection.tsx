
import React, { useEffect } from 'react';

interface GameProtectionProps {
  children: React.ReactNode;
}

const GameProtection: React.FC<GameProtectionProps> = ({ children }) => {
  
  useEffect(() => {
    console.log('GameProtection: Setting up game protection');
    
    // Marquer que nous sommes dans le jeu
    localStorage.setItem('dutch_game_active', 'true');
    sessionStorage.setItem('dutch_in_game', 'true');
    
    // Protection contre le beforeunload
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const gameActive = localStorage.getItem('dutch_game_active');
      if (gameActive === 'true') {
        event.preventDefault();
        event.returnValue = 'Êtes-vous sûr de vouloir quitter la partie en cours ?';
        return event.returnValue;
      }
    };

    // Protection contre la navigation
    const handlePopState = (event: PopStateEvent) => {
      const gameActive = localStorage.getItem('dutch_game_active');
      if (gameActive === 'true') {
        console.log('GameProtection: Preventing navigation from game');
        event.preventDefault();
        window.history.pushState(null, '', '/game');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    
    // Forcer l'URL correcte
    if (window.location.pathname !== '/game') {
      window.history.replaceState(null, '', '/game');
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      sessionStorage.removeItem('dutch_in_game');
    };
  }, []);

  return <>{children}</>;
};

export default GameProtection;
