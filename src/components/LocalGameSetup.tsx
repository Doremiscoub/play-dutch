
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Play, Clock, Users, LockIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

interface LocalGameSetupProps {
  onStartGame: (players: string[]) => void;
}

const LocalGameSetup: React.FC<LocalGameSetupProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));

  const handleNumPlayersChange = (increment: boolean) => {
    const newNum = increment 
      ? Math.min(numPlayers + 1, 10) 
      : Math.max(numPlayers - 1, 2);
    
    setNumPlayers(newNum);
    
    // Adjust player names array
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

  const handleStartGame = () => {
    // Validate player names (ensure no empty names)
    const validPlayerNames = playerNames.map(name => name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name);
    onStartGame(validPlayerNames);
  };

  const transitionProps = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };

  return (
    <div className="min-h-screen w-full relative pb-24">
      {/* Background elements - now full width */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      
      <motion.div 
        className="w-full max-w-md mx-auto p-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={transitionProps}
        >
          Nouvelle Partie
        </motion.h1>
        
        {/* Mode de jeu - avec les options multijoueur grisées */}
        <motion.div 
          className="dutch-card mb-4 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...transitionProps, delay: 0.1 }}
          whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Mode de jeu</h2>
          
          <div className="space-y-3">
            {/* Mode local */}
            <motion.div 
              className="p-3 bg-dutch-blue/10 rounded-xl border border-dutch-blue/30 flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2">
                <div className="bg-dutch-blue/20 p-2 rounded-lg">
                  <Play className="h-5 w-5 text-dutch-blue" />
                </div>
                <div>
                  <p className="font-medium text-dutch-blue">Local</p>
                  <p className="text-xs text-gray-600">Sur cet appareil</p>
                </div>
              </div>
              <div className="bg-dutch-blue/20 px-2 py-1 rounded text-xs font-medium text-dutch-blue">
                Actif
              </div>
            </motion.div>
            
            {/* Mode multijoueur (grisé) */}
            <motion.div 
              className="p-3 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-between opacity-60"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-medium text-gray-500">Multijoueur</p>
                    <div className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-0.5" />
                      À venir
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Sur plusieurs appareils</p>
                </div>
              </div>
              <div>
                <LockIcon className="h-4 w-4 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Information à venir - Moved here directly after game mode selection */}
        <motion.div
          className="mb-8 relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-md border border-dutch-purple/20 rounded-xl p-3 shadow-md">
            <p className="text-sm text-center text-dutch-purple/90">
              <span className="font-semibold">À venir :</span> Mode multijoueur, connexion multi-appareils, et plus encore !
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...transitionProps, delay: 0.3 }}
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
          transition={{ ...transitionProps, delay: 0.4 }}
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
      
      {/* Bouton Commencer flottant */}
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
            className="w-full shadow-lg transition-all relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-r from-dutch-blue/90 via-dutch-purple/90 to-dutch-blue/90"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <span className="absolute inset-0 flex items-center justify-center gap-2 text-lg font-medium">
              <Play className="h-5 w-5" /> Commencer la partie
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LocalGameSetup;
