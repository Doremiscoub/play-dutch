/**
 * Moteur de calcul de scores unifié et sécurisé
 * Source unique de vérité pour tous les calculs de score
 */
import { Player } from '@/types';
import { toast } from 'sonner';

/**
 * Valide la cohérence des données de joueur
 */
export const validatePlayerData = (player: Player): boolean => {
  if (!player || typeof player !== 'object') return false;
  if (!player.id || typeof player.name !== 'string') return false;
  if (!Array.isArray(player.rounds)) return false;
  if (typeof player.totalScore !== 'number') return false;
  
  return true;
};

/**
 * Recalcule le score total d'un joueur depuis ses rounds
 * Cette fonction est la source unique de vérité pour le calcul des totaux
 */
export const recalculatePlayerTotalScore = (player: Player): number => {
  if (!validatePlayerData(player) || player.rounds.length === 0) {
    return 0;
  }
  
  return player.rounds.reduce((total, round) => {
    const score = typeof round.score === 'number' ? round.score : 0;
    return total + score;
  }, 0);
};

/**
 * Vérifie la cohérence entre le totalScore stocké et les rounds
 */
export const checkScoreIntegrity = (player: Player): { isValid: boolean; calculatedTotal: number; storedTotal: number } => {
  const calculatedTotal = recalculatePlayerTotalScore(player);
  const storedTotal = player.totalScore || 0;
  
  return {
    isValid: Math.abs(calculatedTotal - storedTotal) < 0.01, // Tolérance pour les arrondis
    calculatedTotal,
    storedTotal
  };
};

/**
 * Corrige automatiquement un joueur en recalculant son score total
 */
export const fixPlayerScore = (player: Player): Player => {
  const correctedTotal = recalculatePlayerTotalScore(player);
  
  return {
    ...player,
    totalScore: correctedTotal
  };
};

/**
 * Valide et corrige un array de joueurs
 */
export const validateAndFixPlayers = (players: Player[]): { fixedPlayers: Player[]; hasErrors: boolean } => {
  if (!Array.isArray(players)) {
    console.error('❌ ScoreEngine: Invalid players array');
    return { fixedPlayers: [], hasErrors: true };
  }

  let hasErrors = false;
  const fixedPlayers = players.map(player => {
    if (!validatePlayerData(player)) {
      console.error('❌ ScoreEngine: Invalid player data:', player);
      hasErrors = true;
      return player;
    }

    const integrity = checkScoreIntegrity(player);
    if (!integrity.isValid) {
      console.warn('⚠️ ScoreEngine: Score mismatch detected for player', player.name, {
        calculated: integrity.calculatedTotal,
        stored: integrity.storedTotal
      });
      hasErrors = true;
      return fixPlayerScore(player);
    }

    return player;
  });

  return { fixedPlayers, hasErrors };
};

/**
 * Ajoute un nouveau round de façon sécurisée
 */
export const addRoundToPlayers = (
  players: Player[], 
  scores: number[], 
  dutchPlayerId?: string
): { success: boolean; updatedPlayers: Player[]; error?: string } => {
  try {
    // Validation des entrées
    if (!Array.isArray(players) || players.length === 0) {
      return { success: false, updatedPlayers: players, error: 'Aucun joueur fourni' };
    }

    if (!Array.isArray(scores) || scores.length !== players.length) {
      return { success: false, updatedPlayers: players, error: 'Nombre de scores incorrect' };
    }

    if (scores.some(score => typeof score !== 'number' || isNaN(score))) {
      return { success: false, updatedPlayers: players, error: 'Scores invalides' };
    }

    // Vérification initiale de l'intégrité
    const { fixedPlayers, hasErrors } = validateAndFixPlayers(players);
    if (hasErrors) {
      toast.warning('Correction automatique des scores détectée');
    }

    // Application du nouveau round
    const updatedPlayers = fixedPlayers.map((player, index) => {
      const roundScore = scores[index];
      const isDutch = player.id === dutchPlayerId;
      
      const newRound = { score: roundScore, isDutch };
      const updatedRounds = [...player.rounds, newRound];
      
      // Recalcul du total depuis tous les rounds (source unique de vérité)
      const newTotalScore = updatedRounds.reduce((total, round) => total + round.score, 0);
      
      return {
        ...player,
        rounds: updatedRounds,
        totalScore: newTotalScore
      };
    });

    // Vérification finale de l'intégrité
    const finalCheck = validateAndFixPlayers(updatedPlayers);
    if (finalCheck.hasErrors) {
      console.error('❌ ScoreEngine: Integrity check failed after adding round');
      return { success: false, updatedPlayers: players, error: 'Erreur de cohérence des scores' };
    }

    console.log('✅ ScoreEngine: Round added successfully');
    return { success: true, updatedPlayers: finalCheck.fixedPlayers };

  } catch (error) {
    console.error('❌ ScoreEngine: Error adding round:', error);
    return { success: false, updatedPlayers: players, error: 'Erreur interne' };
  }
};

/**
 * Retire le dernier round de façon sécurisée
 */
export const removeLastRoundFromPlayers = (players: Player[]): { success: boolean; updatedPlayers: Player[]; error?: string } => {
  try {
    if (!Array.isArray(players) || players.length === 0) {
      return { success: false, updatedPlayers: players, error: 'Aucun joueur fourni' };
    }

    // Vérification qu'il y a des rounds à retirer
    if (players.every(player => !player.rounds || player.rounds.length === 0)) {
      return { success: false, updatedPlayers: players, error: 'Aucune manche à annuler' };
    }

    // Vérification initiale de l'intégrité
    const { fixedPlayers, hasErrors } = validateAndFixPlayers(players);
    if (hasErrors) {
      toast.warning('Correction automatique des scores détectée');
    }

    // Retrait du dernier round
    const updatedPlayers = fixedPlayers.map(player => {
      if (!player.rounds || player.rounds.length === 0) {
        return player;
      }

      const updatedRounds = player.rounds.slice(0, -1);
      
      // Recalcul du total depuis tous les rounds restants (source unique de vérité)
      const newTotalScore = updatedRounds.reduce((total, round) => total + round.score, 0);
      
      return {
        ...player,
        rounds: updatedRounds,
        totalScore: newTotalScore
      };
    });

    // Vérification finale de l'intégrité
    const finalCheck = validateAndFixPlayers(updatedPlayers);
    if (finalCheck.hasErrors) {
      console.error('❌ ScoreEngine: Integrity check failed after removing round');
      return { success: false, updatedPlayers: players, error: 'Erreur de cohérence des scores' };
    }

    console.log('✅ ScoreEngine: Last round removed successfully');
    return { success: true, updatedPlayers: finalCheck.fixedPlayers };

  } catch (error) {
    console.error('❌ ScoreEngine: Error removing last round:', error);
    return { success: false, updatedPlayers: players, error: 'Erreur interne' };
  }
};

/**
 * Audit complet de l'intégrité des scores
 */
export const auditScoreIntegrity = (players: Player[]): {
  isValid: boolean;
  errors: string[];
  corrections: { playerId: string; playerName: string; from: number; to: number }[];
} => {
  const errors: string[] = [];
  const corrections: { playerId: string; playerName: string; from: number; to: number }[] = [];

  if (!Array.isArray(players)) {
    errors.push('Players data is not an array');
    return { isValid: false, errors, corrections };
  }

  players.forEach(player => {
    if (!validatePlayerData(player)) {
      errors.push(`Invalid player data: ${player?.name || 'Unknown'}`);
      return;
    }

    const integrity = checkScoreIntegrity(player);
    if (!integrity.isValid) {
      errors.push(`Score mismatch for ${player.name}: calculated=${integrity.calculatedTotal}, stored=${integrity.storedTotal}`);
      corrections.push({
        playerId: player.id,
        playerName: player.name,
        from: integrity.storedTotal,
        to: integrity.calculatedTotal
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    corrections
  };
};

/**
 * Valide les données d'un round
 */
export const validateRoundData = (
  scores: number[],
  dutchPlayerId: string,
  playerIds: string[]
): boolean => {
  try {
    // Validation des paramètres
    if (!Array.isArray(scores) || !Array.isArray(playerIds)) {
      console.error('❌ Invalid round data: arrays expected');
      return false;
    }

    if (scores.length !== playerIds.length) {
      console.error('❌ Invalid round data: length mismatch');
      return false;
    }

    if (dutchPlayerId && !playerIds.includes(dutchPlayerId)) {
      console.error('❌ Invalid round data: Dutch player ID not in player list');
      return false;
    }

    // Validation des scores
    const hasValidScores = scores.every(score => 
      typeof score === 'number' && 
      isFinite(score) && 
      score >= 0 && 
      score <= 500
    );

    if (!hasValidScores) {
      console.error('❌ Invalid round data: invalid scores');
      return false;
    }

    // Validation logique du Dutch
    if (dutchPlayerId) {
      const dutchPlayerIndex = playerIds.indexOf(dutchPlayerId);
      const dutchScore = scores[dutchPlayerIndex];
      const minScore = Math.min(...scores);

      if (dutchScore !== minScore) {
        console.error('❌ Invalid round data: Dutch player does not have minimum score');
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('❌ Round data validation error:', error);
    return false;
  }
};