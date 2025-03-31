
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Play } from 'lucide-react';
import { motion } from 'framer-motion';

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

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm">
        <h2 className="text-lg font-semibold mb-3 text-ios-blue">Nombre de joueurs</h2>
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleNumPlayersChange(false)}
            disabled={numPlayers <= 2}
            className="h-10 w-10 rounded-full border border-ios-gray/30 bg-white shadow-sm hover:bg-ios-gray/10"
          >
            <Minus className="h-5 w-5 text-ios-gray" />
          </Button>
          <span className="text-3xl font-semibold text-ios-blue w-12 text-center">{numPlayers}</span>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleNumPlayersChange(true)}
            disabled={numPlayers >= 10}
            className="h-10 w-10 rounded-full border border-ios-gray/30 bg-white shadow-sm hover:bg-ios-gray/10"
          >
            <Plus className="h-5 w-5 text-ios-gray" />
          </Button>
        </div>
      </div>
      
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm">
        <h2 className="text-lg font-semibold mb-3 text-ios-blue">Noms des joueurs</h2>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {playerNames.map((name, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-ios-blue to-ios-teal flex items-center justify-center text-white font-semibold shadow-sm">
                {index + 1}
              </div>
              <Input
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Joueur ${index + 1}`}
                className="border border-ios-gray/20 bg-white rounded-xl shadow-sm focus-visible:ring-ios-blue"
                maxLength={20}
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={handleStartGame}
        size="lg"
        className="w-full py-6 rounded-xl bg-ios-blue hover:bg-ios-blue/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
      >
        <Play className="mr-2 h-5 w-5" /> Commencer la partie
      </Button>
    </div>
  );
};

export default LocalGameSetup;
