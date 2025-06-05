
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        const success = await onInitialize();
        console.log('GameInitializer: Initialization result:', success);
        
        if (success) {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('GameInitializer: Initialization error:', error);
        // Reset en cas d'erreur pour permettre une nouvelle tentative
        initializationAttempted.current = false;
      } finally {
        setIsLoading(false);
        isInitializing.current = false;
      }
    };

    initialize();
  }, []); // Pas de dépendances pour éviter les re-renders

  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-dutch-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">
            {gameMode === 'tournament' ? 'Initialisation du tournoi...' : 'Initialisation de la partie...'}
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default GameInitializer;
