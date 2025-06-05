
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface GameInitializerProps {
  onInitialize: () => Promise<boolean>;
  gameMode: 'quick' | 'tournament';
  children: React.ReactNode;
}

const GameInitializer: React.FC<GameInitializerProps> = ({ 
  onInitialize, 
  gameMode, 
  children 
}) => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const initializationAttempted = useRef(false);
  const isInitializing = useRef(false);

  useEffect(() => {
    const initialize = async () => {
      // Protection contre les appels multiples
      if (initializationAttempted.current || isInitializing.current) {
        console.log('GameInitializer: Initialization already attempted or in progress');
        return;
      }

      console.log('GameInitializer: Starting initialization');
      initializationAttempted.current = true;
      isInitializing.current = true;

      try {
        // Vérifier si un jeu est déjà actif
        const gameActive = localStorage.getItem('dutch_game_active');
        if (gameActive === 'true') {
          console.log('GameInitializer: Game already active, skipping initialization');
          setIsInitialized(true);
          setIsLoading(false);
          return;
        }

        const success = await onInitialize();
        console.log('GameInitializer: Initialization result:', success);
        
        if (success) {
          setIsInitialized(true);
          setHasError(false);
        } else {
          console.warn('GameInitializer: Initialization failed');
          setHasError(true);
          
          // Ne pas rediriger automatiquement, laisser l'utilisateur choisir
          setTimeout(() => {
            console.log('GameInitializer: Offering manual navigation to setup');
          }, 2000);
        }
      } catch (error) {
        console.error('GameInitializer: Initialization error:', error);
        setHasError(true);
        // Reset en cas d'erreur pour permettre une nouvelle tentative
        initializationAttempted.current = false;
      } finally {
        setIsLoading(false);
        isInitializing.current = false;
      }
    };

    initialize();
  }, []); // Pas de dépendances pour éviter les re-renders

  const handleManualSetup = () => {
    console.log('GameInitializer: Manual navigation to setup requested');
    navigate('/game/setup');
  };

  const handleRetry = () => {
    console.log('GameInitializer: Retry initialization requested');
    setIsLoading(true);
    setHasError(false);
    initializationAttempted.current = false;
    isInitializing.current = false;
    
    // Relancer l'initialisation
    setTimeout(() => {
      const initialize = async () => {
        try {
          const success = await onInitialize();
          if (success) {
            setIsInitialized(true);
            setHasError(false);
          } else {
            setHasError(true);
          }
        } catch (error) {
          setHasError(true);
        } finally {
          setIsLoading(false);
        }
      };
      initialize();
    }, 100);
  };

  if (isLoading || (!isInitialized && !hasError)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-dutch-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mb-2">
            {gameMode === 'tournament' ? 'Initialisation du tournoi...' : 'Initialisation de la partie...'}
          </p>
          <p className="text-sm text-gray-500">
            Chargement des joueurs et configuration...
          </p>
        </motion.div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-6"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Erreur d'initialisation
          </h3>
          
          <p className="text-gray-600 mb-6">
            Impossible de charger la partie. Vérifiez que vous avez configuré les joueurs correctement.
          </p>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-dutch-blue text-white rounded-lg hover:bg-dutch-blue/90 transition-colors"
            >
              Réessayer
            </button>
            
            <button
              onClick={handleManualSetup}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Configurer une nouvelle partie
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GameInitializer;
