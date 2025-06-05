
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const initialize = async () => {
      try {
        const success = await onInitialize();
        if (success) {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Game initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [onInitialize]);

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
