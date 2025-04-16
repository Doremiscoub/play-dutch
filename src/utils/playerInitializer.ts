
import { Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const initializePlayers = (): Player[] | null => {
  try {
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (!playerSetup) {
      console.error('Aucune configuration de joueurs trouvée dans localStorage');
      return null;
    }
    
    const playerNames = JSON.parse(playerSetup);
    
    if (!Array.isArray(playerNames) || playerNames.length < 2) {
      console.error('Configuration de joueurs invalide:', playerNames);
      return null;
    }
    
    console.info(`Initialisation de ${playerNames.length} joueurs`);
    
    const newPlayers: Player[] = playerNames.map(name => ({
      id: uuidv4(),
      name: name.trim() || `Joueur ${Math.floor(Math.random() * 1000)}`,
      totalScore: 0,
      rounds: []
    }));
    
    return newPlayers;
  } catch (error) {
    console.error('Erreur lors de la création de la partie :', error);
    toast.error('Erreur lors de la création de la partie');
    return null;
  }
};

// Force clear all players setup data
export const clearPlayerSetup = () => {
  localStorage.removeItem('dutch_player_setup');
  console.info('Configuration des joueurs nettoyée');
};
