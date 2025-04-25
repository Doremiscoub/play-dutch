
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import PlayerNameInput from './PlayerNameInput';
import PlayerCountSelector from './PlayerCountSelector';
import { usePlayerNames } from '@/hooks/usePlayerNames';
import { motion } from 'framer-motion';
import { CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface LocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const LocalGameSetup: React.FC<LocalGameSetupProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { playerNames, handleNameChange, updatePlayerCount, validateNames } = usePlayerNames(4);

  const handleNumPlayersChange = useCallback((increment: boolean) => {
    const newNum = increment 
      ? Math.min(numPlayers + 1, 10) 
      : Math.max(numPlayers - 1, 2);
    
    setNumPlayers(newNum);
    updatePlayerCount(newNum);
  }, [numPlayers, updatePlayerCount]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      if (!validateNames()) {
        setIsSubmitting(false);
        return;
      }

      const validPlayerNames = playerNames.map(name => 
        name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name.trim()
      );
      
      localStorage.setItem('dutch_player_setup', JSON.stringify(validPlayerNames));
      onStartGame(validPlayerNames);
      
    } catch (error) {
      console.error("Erreur lors de la configuration des joueurs:", error);
      setIsSubmitting(false);
    }
  }, [isSubmitting, playerNames, validateNames, onStartGame]);

  return (
    <CardContent className="space-y-6 py-6">
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-medium">Nombre de joueurs</h3>
        <PlayerCountSelector 
          numPlayers={numPlayers} 
          onNumPlayersChange={handleNumPlayersChange} 
        />
      </motion.div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
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
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-dutch-blue to-dutch-purple text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0.5 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            <Play className="h-5 w-5" />
            {isSubmitting ? 'Création...' : 'Commencer la partie'}
          </Button>
        </motion.div>
      </form>
    </CardContent>
  );
};

export default LocalGameSetup;
