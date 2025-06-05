
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { UnifiedButton } from '@/components/ui/unified-button';
import PlayerNameInput from './PlayerNameInput';
import PlayerCountSelector from './PlayerCountSelector';
import { toast } from 'sonner';

interface LocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const LocalGameSetup: React.FC<LocalGameSetupProps> = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNumPlayersChange = useCallback((newCount: number) => {
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
  }, [playerNames, setPlayerNames]);

  const handleNameChange = useCallback((index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  }, [playerNames, setPlayerNames]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Ensure all player names are valid
      const validPlayerNames = playerNames.map(name => 
        name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name.trim()
      );
      
      if (validPlayerNames.length < 2) {
        toast.error("Il faut au moins 2 joueurs pour démarrer une partie");
        setIsSubmitting(false);
        return;
      }
      
      // Sauvegarder les noms dans localStorage avant de démarrer la partie
      localStorage.setItem('dutch_player_setup', JSON.stringify(validPlayerNames));
      console.info('Configuration des joueurs sauvegardée:', validPlayerNames);
      
      // Attendre un peu pour s'assurer que localStorage est bien mis à jour
      setTimeout(() => {
        onStartGame(validPlayerNames);
      }, 300);
    } catch (error) {
      console.error("Erreur lors de la configuration des joueurs:", error);
      toast.error("Une erreur est survenue lors de la configuration");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  }, [playerNames, setPlayerNames, onStartGame, isSubmitting]);

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-800">Nombre de joueurs</h3>
        <PlayerCountSelector 
          count={numPlayers} 
          onChange={handleNumPlayersChange} 
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-800">Noms des joueurs</h3>
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
          <UnifiedButton 
            type="submit" 
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Création...' : 'Commencer la partie'}
          </UnifiedButton>
        </div>
      </form>
    </div>
  );
};

export default LocalGameSetup;
