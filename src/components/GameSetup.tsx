
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cleanupGameState } from '@/utils/gameUtils';
import { clearPlayerSetup } from '@/utils/playerInitializer';
import AnimatedBackground from './AnimatedBackground';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import GameModeTabs from './game-setup/GameModeTabs';
import LocalGameSetupContainer from './game-setup/LocalGameSetupContainer';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("local");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    cleanupGameState();
    console.info("Configuration de jeu nettoyée au montage du composant GameSetup");
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
      
      // IMPORTANT: NE PAS nettoyer ici pour garder les données dans localStorage
      // jusqu'à ce que l'initialisation soit terminée
      
      // Option 1 : Utiliser l'URL pour transmettre les noms des joueurs (plus fiable)
      const playersQueryParam = encodeURIComponent(JSON.stringify(playerNames));
      console.info('Redirection vers /game avec les paramètres des joueurs');
      navigate(`/game?players=${playersQueryParam}&new=true`);
      
      // Option 2 : Utiliser localStorage comme méthode de secours
      // déjà fait dans le composant LocalGameSetup
      
    } catch (error) {
      console.error("Erreur lors du démarrage de la partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
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
