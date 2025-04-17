
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';
import PlayerNameInput from './game-setup/PlayerNameInput';
import PlayerCountSelector from './game-setup/PlayerCountSelector';
import GameModeSelector from './game-setup/GameModeSelector';
import ActionButton from './game-setup/ActionButton';
import SetupCard from './game-setup/SetupCard';
import ComingSoonBanner from './game-setup/ComingSoonBanner';

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

  const handleStartGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Validate player names (ensure no empty names)
    const validPlayerNames = playerNames.map(name => 
      name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name.trim()
    );
    
    if (validPlayerNames.length < 2) {
      console.error("Erreur: moins de 2 joueurs");
      return;
    }
    
    // Call the parent component's handler
    onStartGame(validPlayerNames);
  };

  return (
    <div className="min-h-screen w-full relative pb-24">
      {/* Background elements */}
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
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Nouvelle Partie
        </motion.h1>
        
        {/* Mode de jeu */}
        <SetupCard title="Mode de jeu" delay={0.1}>
          <GameModeSelector />
        </SetupCard>
        
        {/* Information à venir - Teaser multijoueur */}
        <ComingSoonBanner />
        
        {/* Nombre de joueurs */}
        <SetupCard title="Nombre de joueurs" delay={0.3}>
          <PlayerCountSelector 
            numPlayers={numPlayers} 
            onNumPlayersChange={handleNumPlayersChange} 
          />
        </SetupCard>
        
        {/* Noms des joueurs */}
        <SetupCard title="Noms des joueurs" delay={0.4}>
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
        <ActionButton onClick={handleStartGame} label="Commencer la partie" />
      </motion.div>
    </div>
  );
};

export default LocalGameSetup;
