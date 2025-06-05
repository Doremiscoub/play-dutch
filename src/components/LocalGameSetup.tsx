
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PlayerNameInput from './game-setup/PlayerNameInput';
import PlayerCountSelector from './game-setup/PlayerCountSelector';

interface LocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const LocalGameSetup: React.FC<LocalGameSetupProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNumPlayersChange = (newCount: number) => {
    setNumPlayers(newCount);
    
    if (newCount > playerNames.length) {
      // Add new players
      const newNames = [...playerNames];
      for (let i = playerNames.length; i < newCount; i++) {
        newNames.push(`Joueur ${i + 1}`);
      }
      setPlayerNames(newNames);
    } else if (newCount < playerNames.length) {
      // Remove excess players
      setPlayerNames(playerNames.slice(0, newCount));
    }
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Ensure all player names are valid
      const validPlayerNames = playerNames.map(name => 
        name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name.trim()
      );
      
      onStartGame(validPlayerNames);
    } catch (error) {
      console.error("Erreur lors de la configuration des joueurs:", error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Nombre de joueurs</h3>
        <PlayerCountSelector 
          count={numPlayers} 
          onChange={handleNumPlayersChange} 
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Noms des joueurs</h3>
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
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Création...' : 'Commencer la partie'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LocalGameSetup;
