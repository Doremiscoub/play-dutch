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
import PageHeader from '@/components/PageHeader';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("local");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    cleanupGameState();
    clearPlayerSetup();
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
      
      if (!playerNames || playerNames.length < 2) {
        console.error("Erreur: moins de 2 joueurs");
        toast.error('Il faut au moins 2 joueurs pour commencer une partie');
        setIsSubmitting(false);
        return;
      }
      
      localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
      console.info('Configuration des joueurs sauvegardée dans localStorage');
      
      const playersQueryParam = encodeURIComponent(JSON.stringify(playerNames));
      console.info('Redirection vers /game avec les paramètres des joueurs');
      
      setTimeout(() => {
        navigate(`/game?players=${playersQueryParam}&new=true`);
        setIsSubmitting(false);
      }, 300);
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
        <PageHeader 
          title={
            <span className="relative text-2xl sm:text-3xl font-black tracking-tight">
              <span className="absolute -inset-1 block rounded-lg bg-gradient-to-br from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 blur-xl" />
              <span className="relative block bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] animate-shimmer">
                Nouvelle Partie
              </span>
            </span>
          }
          onBack={() => navigate('/')}
        />
        
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
