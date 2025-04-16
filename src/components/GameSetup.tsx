import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Play, Users, Computer } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cleanupGameState } from '@/utils/gameUtils';
import { clearPlayerSetup } from '@/utils/playerInitializer';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));
  const [gameMode, setGameMode] = useState<'local' | 'multiplayer'>('local');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    cleanupGameState();
    clearPlayerSetup();
  }, []);
  
  const handleNumPlayersChange = (increment: boolean) => {
    const newNum = increment 
      ? Math.min(numPlayers + 1, 10) 
      : Math.max(numPlayers - 1, 2);
    
    setNumPlayers(newNum);
    
    if (increment && numPlayers < 10) {
      setPlayerNames([...playerNames, `Joueur ${numPlayers + 1}`]);
    } else if (!increment && numPlayers > 2) {
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      console.info('Démarrage de la partie...');
      
      cleanupGameState();
      clearPlayerSetup();
      
      const validPlayerNames = playerNames.map(name => 
        name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name.trim()
      );
      
      if (gameMode === 'multiplayer') {
        toast.info('Le mode multijoueur sera disponible prochainement !');
        setIsSubmitting(false);
        return;
      }
      
      const setupKey = 'dutch_player_setup';
      localStorage.setItem(setupKey, JSON.stringify(validPlayerNames));
      localStorage.setItem('dutch_new_game_requested', 'true');
      
      console.info('Redirection vers /game...');
      
      setTimeout(() => {
        navigate('/game');
      }, 100);
    } catch (error) {
      console.error("Erreur lors du démarrage de la partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const transitionProps = {
    type: "spring",
    stiffness: 260,
    damping: 20
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
        
        <motion.div 
          className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Mode de jeu</h2>
          <Tabs 
            defaultValue="local" 
            value={gameMode} 
            onValueChange={(value) => setGameMode(value as 'local' | 'multiplayer')}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="local" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Local
              </TabsTrigger>
              <TabsTrigger value="multiplayer" className="flex items-center gap-2" disabled>
                <Computer className="h-4 w-4" /> Multijoueur
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {gameMode === 'multiplayer' && (
            <div className="mt-4 p-3 bg-dutch-purple/10 text-dutch-purple rounded-lg text-sm">
              <p>À venir : mode multijoueur, connexion multi-appareil et plus encore.</p>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Nombre de joueurs</h2>
          <div className="flex items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="dutch-glass" 
                size="icon" 
                onClick={() => handleNumPlayersChange(false)}
                disabled={numPlayers <= 2}
                className="border border-white/40 shadow-md"
              >
                <Minus className="h-6 w-6" />
              </Button>
            </motion.div>
            <motion.span 
              className="text-3xl font-bold text-dutch-blue w-10 text-center"
              key={numPlayers}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {numPlayers}
            </motion.span>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="dutch-glass" 
                size="icon"
                onClick={() => handleNumPlayersChange(true)}
                disabled={numPlayers >= 10}
                className="border border-white/40 shadow-md"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Noms des joueurs</h2>
          <div className="space-y-3">
            {playerNames.map((name, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-bold shadow-md">
                  {index + 1}
                </div>
                <div className="relative flex-grow">
                  <motion.div 
                    className="absolute -inset-0.5 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-lg blur opacity-30"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Input
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Joueur ${index + 1}`}
                    className="dutch-input border border-white/40 shadow-sm relative z-10 backdrop-blur-sm"
                    maxLength={20}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="fixed left-0 right-0 bottom-8 flex justify-center z-50 px-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-md"
        >
          <Button 
            onClick={handleStartGame}
            variant="floating"
            size="game-action"
            className="w-full shadow-lg transition-all relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-r from-dutch-blue/90 via-dutch-purple/90 to-dutch-blue/90 h-16"
            disabled={isSubmitting}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <span className="absolute inset-0 flex items-center justify-center gap-2 text-lg font-medium text-white">
              {isSubmitting ? 'Création de la partie...' : (
                <>
                  <Play className="h-6 w-6" /> Commencer la partie
                </>
              )}
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameSetup;
