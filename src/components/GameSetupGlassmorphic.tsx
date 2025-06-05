
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UnifiedCard } from '@/components/ui/unified-card';

interface GameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const GameSetupGlassmorphic: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState(['', '', '', '']);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const addPlayerField = () => {
    if (playerNames.length < 10) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const removePlayerField = (index: number) => {
    if (playerNames.length > 2) {
      const newNames = [...playerNames];
      newNames.splice(index, 1);
      setPlayerNames(newNames);
    }
  };

  const handleStartGame = () => {
    const validPlayerNames = playerNames.filter(name => name.trim() !== '');
    if (validPlayerNames.length >= 2) {
      onStartGame(validPlayerNames);
    } else {
      alert('Please enter at least two player names.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <UnifiedCard variant="glass" padding="lg">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Configuration de la partie
          </h2>

          {playerNames.map((name, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Label htmlFor={`player-${index}`} className="text-sm font-medium text-gray-700">
                Joueur {index + 1}
              </Label>
              <Input
                type="text"
                id={`player-${index}`}
                placeholder={`Nom du joueur ${index + 1}`}
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="flex-1"
              />
              {playerNames.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePlayerField(index)}
                  className="text-red-500 hover:bg-red-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </Button>
              )}
            </div>
          ))}

          {playerNames.length < 10 && (
            <Button variant="secondary" onClick={addPlayerField} className="w-full">
              Ajouter un joueur
            </Button>
          )}

          <Button variant="dutch-primary" onClick={handleStartGame} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Commencer la partie
          </Button>
        </div>
      </UnifiedCard>
    </motion.div>
  );
};

export default GameSetupGlassmorphic;
