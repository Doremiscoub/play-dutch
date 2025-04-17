
import { Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

/**
 * Initialize players from localStorage configuration
 * @returns Array of initialized players or null if configuration is invalid
 */
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
    
    console.info(`Initialisation de ${playerNames.length} joueurs:`, playerNames);
    
    const newPlayers: Player[] = playerNames.map((name, index) => ({
      id: uuidv4(),
      name: name && name.trim() ? name.trim() : `Joueur ${index + 1}`,
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

/**
 * Force clear all players setup data
 */
export const clearPlayerSetup = () => {
  localStorage.removeItem('dutch_player_setup');
  console.info('Configuration des joueurs nettoyée');
};

/**
 * Verify if player setup exists and is valid
 * @returns boolean indicating if setup is valid
 */
export const verifyPlayerSetup = (): boolean => {
  try {
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (!playerSetup) {
      return false;
    }
    
    const playerNames = JSON.parse(playerSetup);
    
    if (!Array.isArray(playerNames) || playerNames.length < 2) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
};
