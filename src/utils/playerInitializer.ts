
import { Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const initializePlayers = (): Player[] | null => {
  const playerSetup = localStorage.getItem('dutch_player_setup');
  
  if (!playerSetup) {
    toast.error('Aucune configuration de joueurs trouvée');
    return null;
  }
  
  try {
    const playerNames = JSON.parse(playerSetup);
    
    if (!Array.isArray(playerNames) || playerNames.length < 2) {
      throw new Error('Configuration de joueurs invalide');
    }
    
    const newPlayers: Player[] = playerNames.map(name => ({
      id: uuidv4(),
      name,
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
