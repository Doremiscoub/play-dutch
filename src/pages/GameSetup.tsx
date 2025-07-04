
import React, { useState } from 'react';
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

  const [isCreating, setIsCreating] = useState(false);

  const handleStartGame = async (playerNames: string[]) => {
    if (isCreating) return; // Éviter les double-clics
    
    try {
      setIsCreating(true);
      console.log('🎮 GAME_SETUP: Starting game creation with players:', playerNames);
      
      // Validation stricte des noms
      const validNames = playerNames.filter(name => name && name.trim().length >= 2);
      console.log('✅ GAME_SETUP: Valid names after filtering:', validNames);
      
      if (validNames.length < 2) {
        toast.error('Il faut au moins 2 joueurs avec des noms valides');
        return;
      }
      
      console.log('🚀 GAME_SETUP: Creating new game...');
      const success = await createNewGame(validNames);
      console.log('🎯 GAME_SETUP: Game creation result:', success);
      
      if (success) {
        console.log('✅ GAME_SETUP: Game created successfully');
        
        // VÉRIFICATION IMMÉDIATE des données sauvegardées
        const savedData = localStorage.getItem('current_dutch_game');
        const navigationReady = sessionStorage.getItem('game_navigation_ready');
        
        console.log('🔍 GAME_SETUP: Saved data check:', !!savedData);
        console.log('🔍 GAME_SETUP: Navigation ready:', !!navigationReady);
        
        if (savedData && navigationReady) {
          // Vérification de l'intégrité des données
          try {
            const parsedData = JSON.parse(savedData);
            if (parsedData.players && parsedData.players.length >= 2) {
              console.log('📍 GAME_SETUP: Data integrity confirmed, navigating...');
              sessionStorage.removeItem('game_navigation_ready');
              navigate('/game');
              return;
            }
          } catch (parseError) {
            console.error('❌ GAME_SETUP: Data corruption detected:', parseError);
          }
        }
        
        // Fallback en cas de problème
        console.warn('⚠️ GAME_SETUP: Navigation conditions not met, data issue');
        toast.error('Erreur de sauvegarde, veuillez réessayer');
        
      } else {
        console.log('❌ GAME_SETUP: Game creation failed');
        toast.error('Erreur lors de la création de la partie');
      }
    } catch (error) {
      console.error('💥 GAME_SETUP: Critical error:', error);
      toast.error('Erreur critique lors de la création');
    } finally {
      setIsCreating(false);
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
          {isCreating ? (
            <div className="lg-card lg-tint-primary-50 rounded-xl p-8 lg-elevation-02 text-center">
              <div className="animate-spin rounded-full border-b-2 mx-auto mb-4 h-8 w-8 border-white"></div>
              <p className="text-white">Création de la partie en cours...</p>
            </div>
          ) : (
            <ModernGameSetup onStartGame={handleStartGame} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
