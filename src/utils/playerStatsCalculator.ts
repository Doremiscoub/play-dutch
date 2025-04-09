
import { Player, PlayerStatistics } from '@/types';

/**
 * Calcule les statistiques d'un joueur
 */
export const calculatePlayerStats = (player: Player): PlayerStatistics => {
  const rounds = player.rounds || [];
  const roundCount = rounds.length;
  
  if (roundCount === 0) {
    return {
      averageScore: 0,
      bestRound: null,
      worstRound: null,
      dutchCount: 0,
      improvementRate: 0,
      consistencyScore: 0,
      winStreak: 0,
      highestRound: 0,
      lowestRound: 0,
      streakInfo: { current: 0, best: 0, type: 'none' }
    };
  }
  
  // Valeurs de base
  const totalScore = player.totalScore;
  const averageScore = roundCount > 0 ? totalScore / roundCount : 0;
  const scores = rounds.map(r => r.score);
  const highestRound = Math.max(...scores);
  const lowestRound = Math.min(...scores);
  const dutchCount = rounds.filter(r => r.isDutch).length;
  
  // Analyse des streaks
  let currentPositiveStreak = 0;
  let currentNegativeStreak = 0;
  let bestPositiveStreak = 0;
  let bestNegativeStreak = 0;
  
  rounds.forEach(round => {
    if (round.score <= 0) {
      currentPositiveStreak = 0;
      currentNegativeStreak++;
      bestNegativeStreak = Math.max(bestNegativeStreak, currentNegativeStreak);
    } else {
      currentNegativeStreak = 0;
      currentPositiveStreak++;
      bestPositiveStreak = Math.max(bestPositiveStreak, currentPositiveStreak);
    }
  });
  
  // Déterminer le type de streak courant
  const streakType = rounds.length > 0 
    ? (rounds[rounds.length - 1].score <= 0 ? 'negative' : 'positive')
    : 'none';
  
  // Valeur de la streak courante
  const currentStreak = streakType === 'positive' 
    ? currentPositiveStreak 
    : streakType === 'negative' 
      ? currentNegativeStreak 
      : 0;
  
  // Valeur de la meilleure streak
  const bestStreak = Math.max(bestPositiveStreak, bestNegativeStreak);
  
  return {
    averageScore: parseFloat(averageScore.toFixed(1)),
    bestRound: highestRound,
    worstRound: lowestRound,
    dutchCount,
    improvementRate: 0, // À implémenter selon les besoins
    consistencyScore: 0, // À implémenter selon les besoins
    winStreak: bestPositiveStreak,
    highestRound,
    lowestRound,
    streakInfo: {
      current: currentStreak,
      best: bestStreak,
      type: streakType
    }
  };
};

/**
 * Met à jour les statistiques de tous les joueurs
 */
export const updateAllPlayersStats = (players: Player[]): Player[] => {
  return players.map(player => {
    const stats = calculatePlayerStats(player);
    return { ...player, stats };
  });
};

/**
 * Vérifie si la partie est terminée (un joueur a dépassé la limite)
 */
export const isGameOver = (players: Player[], scoreLimit: number = 100): boolean => {
  return players.some(player => player.totalScore >= scoreLimit);
};
