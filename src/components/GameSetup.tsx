
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AnimatedBackground from './AnimatedBackground';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GameModeTabs from './game-setup/GameModeTabs';
import LocalGameSetupContainer from './game-setup/LocalGameSetupContainer';
import { cleanupGameState } from '@/utils/gameUtils';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("local");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Nettoyage de l'état lors de l'entrée sur la page de configuration
  useEffect(() => {
    console.info("GameSetup: Nettoyage de l'état du jeu au montage");
    
    // Nettoyer certains flags mais PAS dutch_player_setup pour permettre la reprise
    localStorage.removeItem('dutch_game_page_visited');
    localStorage.removeItem('dutch_initialization_attempted');
    localStorage.removeItem('dutch_initialization_completed');
    localStorage.removeItem('dutch_new_game_requested');
    
    // Définir le mode par défaut à local
    localStorage.setItem('dutch_game_mode', 'local');
  }, []);

  const handleStartGame = (playerNames: string[]) => {
    if (isSubmitting) {
      console.info("GameSetup: Soumission déjà en cours, éviter les clics multiples");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.info('GameSetup: Démarrage de la partie avec les joueurs:', playerNames);
      
      if (!playerNames || playerNames.length < 2) {
        console.error("GameSetup: Erreur: moins de 2 joueurs");
        toast.error('Il faut au moins 2 joueurs pour commencer une partie');
        setIsSubmitting(false);
        return;
      }
      
      // Vérification finale que les données sont bien enregistrées
      const storedPlayers = localStorage.getItem('dutch_player_setup');
      const playerData = storedPlayers ? JSON.parse(storedPlayers) : null;
      
      if (!playerData || !Array.isArray(playerData) || playerData.length < 2) {
        console.error("GameSetup: Configuration des joueurs invalide, essai de correction");
        localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
      }
      
      console.info("GameSetup: Navigation vers /game");
      
      // Navigation avec délai pour s'assurer que localStorage est à jour
      setTimeout(() => {
        navigate('/game');
        
        // Réinitialiser le flag de soumission après la navigation
        setTimeout(() => {
          setIsSubmitting(false);
        }, 500);
      }, 300);
    } catch (error) {
      console.error("GameSetup: Erreur lors du démarrage de la partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      
      <motion.div 
        className="w-full max-w-md mx-auto p-6 relative z-10 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Nouvelle Partie
        </motion.h1>
        
        <Tabs 
          defaultValue="local" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <GameModeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
          <TabsContent value="local">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-4"
            >
              <LocalGameSetupContainer onStartGame={handleStartGame} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default GameSetup;
