
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGameInitialization } from '@/hooks/useGameInitialization';

interface SimpleGameInitializerProps {
  children: React.ReactNode;
}

const SimpleGameInitializer: React.FC<SimpleGameInitializerProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const initializationAttempted = useRef(false);
  const { createNewGame, loadExistingGame, isInitialized } = useGameInitialization();

  useEffect(() => {
    const initialize = async () => {
      if (initializationAttempted.current) return;
      initializationAttempted.current = true;

      try {
        // Check URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        const playersParam = urlParams.get('players');
        const isNewGame = urlParams.get('new') === 'true';

        if (playersParam && isNewGame) {
          // Create new game from URL parameters
          const playerNames = JSON.parse(decodeURIComponent(playersParam));
          const success = await createNewGame(playerNames);
          
          if (success) {
            // Clean URL after successful initialization
            window.history.replaceState({}, '', '/game');
            setIsLoading(false);
            return;
          }
        }

        // Try to load existing game
        const loaded = loadExistingGame();
        
        if (loaded) {
          setIsLoading(false);
          return;
        }

        // No game found, redirect to setup
        setHasError(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Game initialization error:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    initialize();
  }, [createNewGame, loadExistingGame]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-dutch-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Initialisation de la partie...</p>
        </motion.div>
      </div>
    );
  }

  if (hasError || !isInitialized) {
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
            Aucune partie trouvée
          </h3>
          
          <p className="text-gray-600 mb-6">
            Veuillez configurer une nouvelle partie.
          </p>
          
          <button
            onClick={() => window.location.href = '/game/setup'}
            className="px-4 py-2 bg-dutch-blue text-white rounded-lg hover:bg-dutch-blue/90 transition-colors"
          >
            Configurer une partie
          </button>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SimpleGameInitializer;
