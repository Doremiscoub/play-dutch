
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import ModernGameSetup from '@/components/game-setup/ModernGameSetup';
import { useGameState } from '@/hooks/useGameState';
import { toast } from 'sonner';
import UnifiedHeader from '@/components/layout/UnifiedHeader';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const { createNewGame } = useGameState();

  useSEO({
    title: 'Configuration de partie - Dutch Card Game',
    description: 'Configurez votre partie de Dutch en ajoutant les joueurs et en choisissant les paramètres de jeu.',
    keywords: 'configuration, setup, joueurs, partie dutch'
  });

  const handleStartGame = async (playerNames: string[]) => {
    try {
      console.log('GameSetup: Starting game with players:', playerNames);
      
      // Validation des noms avant création
      const validNames = playerNames.filter(name => name && name.trim().length >= 2);
      if (validNames.length < 2) {
        toast.error('Il faut au moins 2 joueurs avec des noms valides');
        return;
      }
      
      const success = await createNewGame(validNames);
      if (success) {
        console.log('GameSetup: Game created successfully, navigating to /game');
        // Small delay to ensure state is updated
        setTimeout(() => {
          navigate('/game');
        }, 100);
      } else {
        toast.error('Erreur lors de la création de la partie');
      }
    } catch (error) {
      console.error('GameSetup: Failed to start game:', error);
      toast.error('Erreur lors de la création de la partie');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-trinity-blue-50 via-trinity-purple-50 to-trinity-orange-50">
      {/* Particules gaming colorées */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full ${
            i % 3 === 0 ? 'bg-trinity-blue-300/40' :
            i % 3 === 1 ? 'bg-trinity-purple-300/40' : 'bg-trinity-orange-300/40'
          }`}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6
          }}
        />
      ))}

      <UnifiedHeader 
        title="Créer une partie"
        showBackButton
        onBack={handleBack}
        showSettings={true}
      />

      {/* Contenu principal */}
      <div className="relative z-10 p-6 pt-8">
        <div className="w-full max-w-2xl mx-auto">
          <ModernGameSetup onStartGame={handleStartGame} />
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
