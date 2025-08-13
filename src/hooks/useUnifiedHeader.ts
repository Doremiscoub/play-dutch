import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

interface UnifiedHeaderConfig {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  showRulesButton?: boolean;
  variant?: 'default' | 'game' | 'simple';
  roundCount?: number;
  scoreLimit?: number;
  gameStartTime?: Date;
  hideTitle?: boolean;
}

export const useUnifiedHeader = (config?: Partial<UnifiedHeaderConfig>): UnifiedHeaderConfig => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Configuration par défaut basée sur la route
  const getDefaultConfig = (): UnifiedHeaderConfig => {
    const path = location.pathname;
    
    switch (path) {
      case '/':
        return {
          title: 'Dutch - Carnet de scores',
          showBackButton: false,
          showSettings: true,
          showRulesButton: true,
          variant: 'default'
        };
      
      case '/setup':
        return {
          title: 'Configuration de partie',
          showBackButton: true,
          onBack: () => navigate('/'),
          showSettings: true,
          showRulesButton: true,
          variant: 'default'
        };
      
      case '/game':
        return {
          title: 'Partie en cours',
          showBackButton: true,
          onBack: () => navigate('/'),
          showSettings: true,
          showRulesButton: false,
          variant: 'game'
        };
      
      case '/history':
        return {
          title: 'Historique des parties',
          showBackButton: true,
          onBack: defaultBack,
          showSettings: true,
          showRulesButton: true,
          variant: 'default'
        };
      
      case '/rules':
        return {
          title: 'Règles du jeu',
          showBackButton: true,
          onBack: defaultBack,
          showSettings: true,
          showRulesButton: false,
          variant: 'default'
        };
      
      case '/sign-in':
        return {
          title: 'Connexion',
          showBackButton: true,
          onBack: () => navigate('/'),
          showSettings: false,
          showRulesButton: false,
          variant: 'simple'
        };
      
      default:
        return {
          title: 'Dutch',
          showBackButton: true,
          onBack: defaultBack,
          showSettings: true,
          showRulesButton: true,
          variant: 'default'
        };
    }
  };

  const defaultConfig = getDefaultConfig();
  
  // Merge avec la config fournie
  return {
    ...defaultConfig,
    ...config,
    // Si onBack est fourni dans config, l'utiliser, sinon utiliser celui par défaut
    onBack: config?.onBack || defaultConfig.onBack
  };
};