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
import PlayerNameInput from './game-setup/PlayerNameInput';
import PlayerCountSelector from './game-setup/PlayerCountSelector';
import GameModeSelector from './game-setup/GameModeSelector';
import ActionButton from './game-setup/ActionButton';
import SetupCard from './game-setup/SetupCard';
import ComingSoonBanner from './game-setup/ComingSoonBanner';

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

  const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      console.info('Démarrage de la partie...');
      
      // Clean up any existing game state
      cleanupGameState();
      clearPlayerSetup();
      
      // Ensure all player names are valid
      const validPlayerNames = playerNames.map(name => 
        name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name.trim()
      );
      
      if (validPlayerNames.length < 2) {
        toast.error('Il faut au moins 2 joueurs pour commencer une partie');
        setIsSubmitting(false);
        return;
      }
      
      if (gameMode === 'multiplayer') {
        toast.info('Le mode multijoueur sera disponible prochainement !');
        setIsSubmitting(false);
        return;
      }
      
      // Save player setup to localStorage
      const setupKey = 'dutch_player_setup';
      localStorage.setItem(setupKey, JSON.stringify(validPlayerNames));
      localStorage.setItem('dutch_new_game_requested', 'true');
      
      console.info('Configuration des joueurs enregistrée:', validPlayerNames);
      console.info('Redirection vers /game...');
      
      // Redirect after a short delay to ensure storage is updated
      setTimeout(() => {
        navigate('/game');
      }, 300);
    } catch (error) {
      console.error("Erreur lors du démarrage de la partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
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
        
        {/* Mode de jeu */}
        <SetupCard title="Mode de jeu" delay={0.1}>
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
        </SetupCard>
        
        {/* Information à venir - Teaser multijoueur */}
        <ComingSoonBanner />
        
        {/* Nombre de joueurs */}
        <SetupCard title="Nombre de joueurs" delay={0.2}>
          <PlayerCountSelector 
            numPlayers={numPlayers} 
            onNumPlayersChange={handleNumPlayersChange} 
          />
        </SetupCard>
        
        {/* Noms des joueurs */}
        <SetupCard title="Noms des joueurs" delay={0.3}>
          <div className="space-y-3">
            {playerNames.map((name, index) => (
              <PlayerNameInput
                key={index}
                index={index}
                name={name}
                onChange={handleNameChange}
              />
            ))}
          </div>
        </SetupCard>
      </motion.div>
      
      {/* Bouton Commencer flottant */}
      <motion.div
        className="fixed left-0 right-0 bottom-8 flex justify-center z-50 px-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <ActionButton 
          onClick={handleStartGame} 
          label={isSubmitting ? 'Création de la partie...' : 'Commencer la partie'} 
        />
      </motion.div>
    </div>
  );
};

export default GameSetup;
