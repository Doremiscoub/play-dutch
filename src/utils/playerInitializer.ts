
import { Player } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Flags pour éviter les notifications multiples
let errorNotificationShown = false;
let verificationErrorShown = false;

/**
 * Réinitialise tous les flags de notification
 */
export const resetNotificationFlags = () => {
  errorNotificationShown = false;
  verificationErrorShown = false;
  console.info("Flags de notification réinitialisés");
};

/**
 * Initialize players from localStorage configuration
 * @returns Array of initialized players or null if configuration is invalid
 */
export const initializePlayers = (): Player[] | null => {
  try {
    console.info("Tentative d'initialisation des joueurs...");
    
    // Reset notification flag when explicitly initializing
    errorNotificationShown = false;
    
    const playerSetup = localStorage.getItem('dutch_player_setup');
    console.info("Configuration trouvée dans localStorage:", playerSetup);
    
    if (!playerSetup) {
      console.error('Aucune configuration de joueurs trouvée dans localStorage');
      if (!errorNotificationShown) {
        // Ne pas afficher de toast ici pour éviter les doublons
        errorNotificationShown = true;
      }
      return null;
    }
    
    let playerNames;
    try {
      playerNames = JSON.parse(playerSetup);
    } catch (parseError) {
      console.error("Erreur de parsing de la configuration:", parseError);
      if (!errorNotificationShown) {
        // Ne pas afficher de toast ici pour éviter les doublons
        errorNotificationShown = true;
      }
      return null;
    }
    
    if (!Array.isArray(playerNames) || playerNames.length < 2) {
      console.error('Configuration de joueurs invalide:', playerNames);
      if (!errorNotificationShown) {
        // Ne pas afficher de toast ici pour éviter les doublons
        errorNotificationShown = true;
      }
      return null;
    }
    
    console.info(`Initialisation de ${playerNames.length} joueurs:`, playerNames);
    
    // Assurer que tous les noms sont valides
    const sanitizedNames = playerNames.map((name, index) => {
      const trimmedName = name && typeof name === 'string' ? name.trim() : '';
      return trimmedName || `Joueur ${index + 1}`;
    });
    
    const newPlayers: Player[] = sanitizedNames.map((name, index) => ({
      id: uuidv4(),
      name: name,
      totalScore: 0,
      rounds: []
    }));
    
    // NE PAS nettoyer la configuration ici, laissons le composant supérieur le faire
    // après avoir vérifié que l'initialisation est réussie
    
    return newPlayers;
  } catch (error) {
    console.error('Erreur lors de la création de la partie :', error);
    if (!errorNotificationShown) {
      // Ne pas afficher de toast ici pour éviter les doublons
      errorNotificationShown = true;
    }
    return null;
  }
};

/**
 * Force clear all players setup data
 */
export const clearPlayerSetup = () => {
  try {
    localStorage.removeItem('dutch_player_setup');
    console.info('Configuration des joueurs nettoyée');
    // Reset notification flag when clearing setup
    errorNotificationShown = false;
    verificationErrorShown = false;
  } catch (error) {
    console.error("Erreur lors du nettoyage de la configuration des joueurs:", error);
  }
};

/**
 * Verify if player setup exists and is valid
 * @returns boolean indicating if setup is valid
 */
export const verifyPlayerSetup = (): boolean => {
  try {
    console.info("Vérification de la configuration des joueurs...");
    
    // Réinitialiser le flag de vérification
    verificationErrorShown = false;
    
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (!playerSetup) {
      console.error('Vérification: Aucune configuration de joueurs trouvée');
      return false;
    }
    
    let playerNames;
    try {
      playerNames = JSON.parse(playerSetup);
    } catch (parseError) {
      console.error("Erreur lors du parsing de la configuration:", parseError);
      return false;
    }
    
    if (!Array.isArray(playerNames) || playerNames.length < 2) {
      console.error('Vérification: Configuration de joueurs invalide:', playerNames);
      return false;
    }
    
    // Vérifier que chaque nom est utilisable (peut être vide, sera remplacé lors de l'initialisation)
    const anyInvalidName = playerNames.some(name => 
      name !== null && name !== undefined && typeof name !== 'string'
    );
    
    if (anyInvalidName) {
      console.error('Vérification: Un ou plusieurs noms de joueurs sont invalides');
      return false;
    }
    
    console.info('Vérification: Configuration de joueurs valide avec', playerNames.length, 'joueurs');
    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification de la configuration:', error);
    return false;
  }
};
