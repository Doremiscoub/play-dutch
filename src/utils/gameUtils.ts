
/**
 * Utilitaires pour la gestion des parties
 */
import { v4 as uuidv4 } from 'uuid';
import { Player, Game, PlayerStatistics } from '@/types';

/**
 * Initialise les joueurs à partir des noms stockés
 */
export const initializePlayers = (): Player[] | null => {
  try {
    const savedPlayersStr = localStorage.getItem('dutch_player_setup');
    
    if (!savedPlayersStr) {
      console.error("Aucune configuration de joueurs trouvée");
      return null;
    }
    
    let playerNames;
    try {
      playerNames = JSON.parse(savedPlayersStr);
    } catch (error) {
      console.error("Format de configuration de joueurs invalide:", error);
      return null;
    }
    
    if (!Array.isArray(playerNames) || playerNames.length === 0) {
      console.error("Configuration de joueurs invalide (pas un tableau ou vide)");
      return null;
    }
    
    const players = playerNames.map((name: string, index: number) => {
      // S'assurer qu'un nom vide est remplacé par un nom par défaut
      const validName = name && typeof name === 'string' && name.trim() 
        ? name.trim() 
        : `Joueur ${index + 1}`;
        
      return {
        id: uuidv4(),
        name: validName,
        totalScore: 0,
        rounds: []
      };
    });
    
    return players;
  } catch (error) {
    console.error("Erreur lors de l'initialisation des joueurs:", error);
    return null;
  }
};

/**
 * Force la réinitialisation complète de l'état de jeu
 */
export const cleanupGameState = () => {
  // Liste des clés à supprimer explicitement
  const keysToRemove = [
    'current_dutch_game',
    'dutch_new_game_requested',
    'dutch_game_page_visited',
    'dutch_initialization_completed',
    'dutch_initialization_attempted',
    'dutch_game_history',
    'dutch_round_history',
    'dutch_players',
    'dutch_score_limit',
    'dutch_game_start_time'
  ];
  
  // Supprimer chaque clé individuellement
  for (const key of keysToRemove) {
    localStorage.removeItem(key);
  }
  
  console.info("État du jeu nettoyé");
};

/**
 * Calcule la durée d'une partie
 */
export const calculateGameDuration = (startTime: Date): string => {
  try {
    const endTime = new Date();
    const diffMs = endTime.getTime() - startTime.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${remainingMins}min`;
    } else {
      return `${diffMins} minutes`;
    }
  } catch (error) {
    console.error("Erreur lors du calcul de la durée:", error);
    return "Durée inconnue";
  }
};

/**
 * Vérifie si la partie est terminée
 */
export const isGameOver = (players: Player[], scoreLimit: number = 100): boolean => {
  if (!players || players.length === 0) return false;
  
  return players.some(player => player.totalScore >= scoreLimit);
};

/**
 * Trie les joueurs par score (du meilleur au moins bon)
 */
export const sortPlayersByScore = (players: Player[]): Player[] => {
  if (!players) return [];
  return [...players].sort((a, b) => a.totalScore - b.totalScore);
};

/**
 * Formatte une partie pour l'historique
 */
export const formatGameForHistory = (
  players: Player[],
  gameStartTime: Date | null,
  isMultiplayer: boolean = false
): Game => {
  const sortedPlayers = sortPlayersByScore(players);
  const winner = sortedPlayers[0]?.name || "Inconnu";
  const gameDuration = gameStartTime ? calculateGameDuration(gameStartTime) : '';
  
  return {
    id: uuidv4(),
    date: new Date(),
    rounds: players[0]?.rounds.length || 0,
    players: players.map(p => ({ 
      name: p.name, 
      score: p.totalScore, 
      isDutch: p.rounds.some(r => r.isDutch) 
    })),
    winner,
    isMultiplayer,
    duration: gameDuration
  };
};

/**
 * Détermine la couleur du score en fonction de sa valeur
 */
export const getScoreColorClass = (score: number): string => {
  if (score <= 0) return 'bg-green-500 text-white'; // Dutch parfait
  if (score <= 15) return 'bg-gray-200 text-gray-700'; // Score correct
  if (score <= 25) return 'bg-red-300 text-red-800'; // Score faible
  return 'bg-red-900 text-white'; // Score catastrophique
};
