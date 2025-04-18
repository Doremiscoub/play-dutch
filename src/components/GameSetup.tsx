
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cleanupGameState } from '@/utils/gameUtils';
import AnimatedBackground from './AnimatedBackground';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GameModeTabs from './game-setup/GameModeTabs';
import LocalGameSetupContainer from './game-setup/LocalGameSetupContainer';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("local");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Nettoyage partiel de l'état lors de l'entrée sur la page de configuration
  useEffect(() => {
    console.info("Nettoyage partiel de l'état du jeu au montage de GameSetup");
    
    // Ne pas supprimer dutch_player_setup pour permettre la reprise
    // Supprimer uniquement le flag de demande de nouvelle partie
    localStorage.removeItem('dutch_new_game_requested');
    
    // Supprimer la partie en cours
    localStorage.removeItem('current_dutch_game');
  }, []);

  const handleStartGame = (playerNames: string[]) => {
    if (isSubmitting) {
      console.info("Soumission déjà en cours, éviter les clics multiples");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.info('Démarrage de la partie avec les joueurs:', playerNames);
      
      if (playerNames.length < 2) {
        console.error("Erreur: moins de 2 joueurs");
        toast.error('Il faut au moins 2 joueurs pour commencer une partie');
        setIsSubmitting(false);
        return;
      }
      
      // Stockage des noms des joueurs pour l'initialisation
      localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
      
      // Ajouter un flag pour forcer une nouvelle partie
      localStorage.setItem('dutch_new_game_requested', 'true');
      
      console.info("Configuration sauvegardée, navigation vers /game");
      
      // Navigation vers la page de jeu
      navigate('/game');
      
    } catch (error) {
      console.error("Erreur lors du démarrage de la partie:", error);
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
