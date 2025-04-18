
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PlayerNameInput from './game-setup/PlayerNameInput';
import PlayerCountSelector from './game-setup/PlayerCountSelector';

interface LocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
  isSubmitting?: boolean;
}

const LocalGameSetup: React.FC<LocalGameSetupProps> = ({ onStartGame, isSubmitting = false }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) {
      console.info("LocalGameSetup: Soumission déjà en cours, ignorer");
      return;
    }
    
    try {
      // Assurer que tous les noms sont valides
      const validPlayerNames = playerNames.map((name, index) => 
        name.trim() === '' ? `Joueur ${index + 1}` : name.trim()
      );
      
      console.info("LocalGameSetup: Noms validés:", validPlayerNames);
      
      // Appeler la fonction de démarrage de partie du parent
      onStartGame(validPlayerNames);
    } catch (error) {
      console.error("LocalGameSetup: Erreur lors de la soumission:", error);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Nombre de joueurs</h3>
        <PlayerCountSelector 
          numPlayers={numPlayers} 
          onNumPlayersChange={handleNumPlayersChange} 
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
