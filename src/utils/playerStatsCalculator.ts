
import { Player, PlayerStatistics } from '@/types';

/**
 * Calcule les statistiques détaillées d'un joueur
 * @param player Le joueur pour lequel calculer les statistiques
 * @returns Les statistiques calculées du joueur
 */
export const calculatePlayerStats = (player: Player): PlayerStatistics => {
  if (!player.rounds || player.rounds.length === 0) {
    return {
      bestRound: null,
      dutchCount: 0,
      averageScore: 0,
      worstRound: null,
      improvementRate: 0,
      consistencyScore: 0,
      winStreak: 0
    };
  }

  // Nombre de Dutch réalisés
  const dutchCount = player.rounds.filter(round => round.isDutch).length;
  
  // Score moyen par manche
  const totalScore = player.rounds.reduce((sum, round) => sum + round.score, 0);
  const averageScore = player.rounds.length > 0 ? totalScore / player.rounds.length : 0;
  
  // Meilleur round (score le plus bas)
  const scores = player.rounds.map(round => round.score);
  const bestRound = scores.length > 0 ? Math.min(...scores) : null;
  
  // Pire round (score le plus haut)
  const worstRound = scores.length > 0 ? Math.max(...scores) : null;
  
  // Tendance d'amélioration : comparer première et seconde moitié des manches
  let improvementRate = 0;
  if (player.rounds.length >= 4) {
    const half = Math.floor(player.rounds.length / 2);
    const firstHalfScores = player.rounds.slice(0, half);
    const secondHalfScores = player.rounds.slice(-half);
    
    const firstHalfAvg = firstHalfScores.reduce((sum, round) => sum + round.score, 0) / firstHalfScores.length;
    const secondHalfAvg = secondHalfScores.reduce((sum, round) => sum + round.score, 0) / secondHalfScores.length;
    
    // Taux d'amélioration : valeur positive = s'améliore, négative = se dégrade
    improvementRate = firstHalfAvg - secondHalfAvg;
  }
  
  // Score de constance (écart-type inversé): plus c'est élevé, plus le joueur est constant
  let consistencyScore = 0;
  if (player.rounds.length >= 2) {
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);
    consistencyScore = standardDeviation === 0 ? 10 : 10 / (1 + standardDeviation / 5);
  }
  
  // Calcul de série de victoires (définie comme des tours avec un score <= 5)
  let currentStreak = 0;
  let maxStreak = 0;
  for (const round of player.rounds) {
    if (round.score <= 5) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  return {
    bestRound,
    dutchCount,
    averageScore,
    worstRound,
    improvementRate,
    consistencyScore,
    winStreak: maxStreak
  };
};

/**
 * Met à jour les statistiques de tous les joueurs
 * @param players La liste des joueurs à mettre à jour
 * @returns La liste des joueurs avec leurs statistiques à jour
 */
export const updateAllPlayersStats = (players: Player[]): Player[] => {
  return players.map(player => ({
    ...player,
    stats: calculatePlayerStats(player)
  }));
};

/**
 * Vérifie si les conditions de fin de partie sont atteintes
 * @param players La liste des joueurs à vérifier
 * @returns true si la partie est terminée, false sinon
 */
export const isGameOver = (players: Player[]): boolean => {
  // La partie se termine si un joueur atteint 100 points ou plus
  return players.some(player => player.totalScore >= 100);
};

/**
 * Trouve le gagnant de la partie (celui avec le score le plus bas)
 * @param players La liste des joueurs
 * @returns Le joueur gagnant
 */
export const findWinner = (players: Player[]): Player | null => {
  if (!players || players.length === 0) return null;
  return [...players].sort((a, b) => a.totalScore - b.totalScore)[0];
};

export default {
  calculatePlayerStats,
  updateAllPlayersStats,
  isGameOver,
  findWinner
};
