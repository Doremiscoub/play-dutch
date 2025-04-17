
import { Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Flag to prevent duplicate notifications
let errorNotificationShown = false;

/**
 * Initialize players from localStorage configuration
 * @returns Array of initialized players or null if configuration is invalid
 */
export const initializePlayers = (): Player[] | null => {
  try {
    // Reset notification flag when explicitly initializing
    errorNotificationShown = false;
    
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (!playerSetup) {
      console.error('Aucune configuration de joueurs trouvée dans localStorage');
      if (!errorNotificationShown) {
        toast.error('Configuration de partie manquante');
        errorNotificationShown = true;
      }
      return null;
    }
    
    const playerNames = JSON.parse(playerSetup);
    
    if (!Array.isArray(playerNames) || playerNames.length < 2) {
      console.error('Configuration de joueurs invalide:', playerNames);
      if (!errorNotificationShown) {
        toast.error('Configuration de partie invalide');
        errorNotificationShown = true;
      }
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
    if (!errorNotificationShown) {
      toast.error('Erreur lors de la création de la partie');
      errorNotificationShown = true;
    }
    return null;
  }
};

/**
 * Force clear all players setup data
 */
export const clearPlayerSetup = () => {
  localStorage.removeItem('dutch_player_setup');
  console.info('Configuration des joueurs nettoyée');
  // Reset notification flag when clearing setup
  errorNotificationShown = false;
};

/**
 * Verify if player setup exists and is valid
 * @returns boolean indicating if setup is valid
 */
export const verifyPlayerSetup = (): boolean => {
  try {
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (!playerSetup) {
      console.error('Vérification: Aucune configuration de joueurs trouvée');
      return false;
    }
    
    const playerNames = JSON.parse(playerSetup);
    
    if (!Array.isArray(playerNames) || playerNames.length < 2) {
      console.error('Vérification: Configuration de joueurs invalide:', playerNames);
      return false;
    }
    
    console.info('Vérification: Configuration de joueurs valide');
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification de la configuration:', error);
    return false;
  }
};
