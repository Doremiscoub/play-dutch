
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameSetupProps {
  onStartGame: (players: string[]) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
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

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-dutch-blue">Nouvelle Partie</h1>
      
      <div className="dutch-card mb-8">
        <h2 className="text-xl font-semibold mb-4">Nombre de joueurs</h2>
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="secondary" 
            size="icon" 
            glassmorphism
            elevated
            onClick={() => handleNumPlayersChange(false)}
            disabled={numPlayers <= 2}
          >
            <Minus className="h-6 w-6" />
          </Button>
          <span className="text-3xl font-bold text-dutch-blue w-10 text-center">{numPlayers}</span>
          <Button 
            variant="secondary" 
            size="icon"
            glassmorphism
            elevated
            onClick={() => handleNumPlayersChange(true)}
            disabled={numPlayers >= 10}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <div className="dutch-card mb-8">
        <h2 className="text-xl font-semibold mb-4">Noms des joueurs</h2>
        <div className="space-y-3">
          {playerNames.map((name, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dutch-blue flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <Input
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Joueur ${index + 1}`}
                className="dutch-input"
                maxLength={20}
              />
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={handleStartGame}
        variant="primary"
        size="2xl"
        glassmorphism
        elevated
        className="w-full"
      >
        <Play className="mr-2 h-5 w-5" /> Commencer la partie
      </Button>
    </motion.div>
  );
};

export default GameSetup;
