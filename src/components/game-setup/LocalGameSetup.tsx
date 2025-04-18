
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // S'assurer que tous les noms sont valides
      const validPlayerNames = playerNames.map((name, i) => 
        name.trim() === '' ? `Joueur ${i + 1}` : name.trim()
      );
      
      console.info('Configuration des joueurs:', validPlayerNames);
      
      // Réinitialiser le flag de jeu en cours pour garantir une nouvelle partie
      localStorage.removeItem('current_dutch_game');
      
      // Stocker les noms dans localStorage avant d'appeler onStartGame
      localStorage.setItem('dutch_player_setup', JSON.stringify(validPlayerNames));
      localStorage.setItem('dutch_new_game_requested', 'true');
      localStorage.setItem('dutch_game_mode', 'local');
      
      toast.success("Configuration des joueurs enregistrée");
      
      // Petite pause pour s'assurer que localStorage est bien mis à jour
      setTimeout(() => {
        onStartGame(validPlayerNames);
      }, 100);
    } catch (error) {
      console.error("Erreur lors de la configuration des joueurs:", error);
      toast.error("Erreur lors de la configuration des joueurs");
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
