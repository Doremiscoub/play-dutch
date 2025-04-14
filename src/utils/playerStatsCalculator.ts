
/**
 * Utilitaires pour le calcul des statistiques des joueurs
 */
import { Player, PlayerStatistics } from '@/types';
import { isGameOver } from './gameUtils';

/**
 * Calcule les statistiques complètes pour un joueur
 */
export function calculatePlayerStatistics(player: Player): PlayerStatistics {
  if (!player || !player.rounds || player.rounds.length === 0) {
    return {
      averageScore: 0,
      bestRound: null,
      worstRound: null,
      dutchCount: 0,
      improvementRate: 0,
      consistencyScore: 0,
      winStreak: 0,
    };
  }

  // Calcul du score moyen
  const roundScores = player.rounds.map(round => round.score);
  const totalScore = roundScores.reduce((sum, score) => sum + score, 0);
  const averageScore = player.rounds.length > 0 ? totalScore / player.rounds.length : 0;

  // Meilleur et pire round
  const bestRound = Math.min(...roundScores);
  const worstRound = Math.max(...roundScores);

  // Nombre de Dutch
  const dutchCount = player.rounds.filter(round => round.isDutch).length;

  // Taux d'amélioration
  let improvementRate = 0;
  if (player.rounds.length > 1) {
    const firstHalf = player.rounds.slice(0, Math.floor(player.rounds.length / 2));
    const secondHalf = player.rounds.slice(Math.floor(player.rounds.length / 2));
    
    const firstHalfAvg = firstHalf.reduce((sum, round) => sum + round.score, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((sum, round) => sum + round.score, 0) / secondHalf.length;
    
    improvementRate = firstHalfAvg - secondHalfAvg;
  }

  // Score de consistance (écart-type simplifié)
  let consistencyScore = 0;
  if (player.rounds.length > 1) {
    const squaredDiffs = roundScores.map(score => Math.pow(score - averageScore, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / player.rounds.length;
    consistencyScore = Math.sqrt(variance);
  }

  // Séries de victoires
  const streakInfo = calculateStreakInfo(player);
  const winStreak = streakInfo.best;

  return {
    averageScore: parseFloat(averageScore.toFixed(1)),
    bestRound,
    worstRound,
    dutchCount,
    improvementRate: parseFloat(improvementRate.toFixed(1)),
    consistencyScore: parseFloat(consistencyScore.toFixed(1)),
    winStreak,
    streakInfo
  };
}

/**
 * Calcule les informations de série pour un joueur
 */
export function calculateStreakInfo(player: Player): {
  current: number;
  best: number;
  type: 'positive' | 'negative' | 'none';
} {
  if (!player.rounds || player.rounds.length < 2) {
    return {
      current: 0,
      best: 0,
      type: 'none'
    };
  }

  // Initialisation
  let currentStreak = 1;
  let bestStreak = 1;
  let currentType: 'positive' | 'negative' | 'none' = 'none';
  
  // Détermination du type initial
  if (player.rounds.length > 1) {
    const diff = player.rounds[1].score - player.rounds[0].score;
    if (diff < 0) currentType = 'positive';
    else if (diff > 0) currentType = 'negative';
  }

  // Parcours des rounds pour calculer les séries
  for (let i = 1; i < player.rounds.length; i++) {
    const prevScore = player.rounds[i - 1].score;
    const currentScore = player.rounds[i].score;
    const diff = currentScore - prevScore;
    
    // Continuation d'une série
    if ((diff < 0 && currentType === 'positive') || (diff > 0 && currentType === 'negative')) {
      currentStreak++;
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } 
    // Nouvelle série
    else if (diff !== 0) {
      currentType = diff < 0 ? 'positive' : 'negative';
      currentStreak = 1;
    }
  }

  return {
    current: currentStreak,
    best: bestStreak,
    type: currentType
  };
}

/**
 * Met à jour les statistiques pour tous les joueurs
 */
export function updateAllPlayersStats(players: Player[]): Player[] {
  if (!players) return [];
  
  return players.map(player => ({
    ...player,
    stats: calculatePlayerStatistics(player)
  }));
}
