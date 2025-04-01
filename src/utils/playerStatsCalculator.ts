
import { Player, PlayerStatistics } from '@/types';

/**
 * Calcule les statistiques d'un joueur
 * Optimisé pour éviter le recalcul inutile
 */
export const calculatePlayerStats = (player: Player, allPlayers: Player[]): PlayerStatistics => {
  const rounds = player.rounds;
  if (!rounds || rounds.length === 0) {
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

  const scores = rounds.map(r => r.score);
  const dutchCount = rounds.filter(r => r.isDutch).length;
  const nonZeroScores = scores.filter(s => s > 0);
  
  let improvementRate = 0;
  if (rounds.length >= 6) {
    const firstThree = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    const lastThree = scores.slice(-3).reduce((a, b) => a + b, 0) / 3;
    improvementRate = lastThree - firstThree;
  }

  // Calcul de la moyenne avec une protection contre les divisions par zéro
  const avg = rounds.length > 0 ? scores.reduce((a, b) => a + b, 0) / rounds.length : 0;
  
  // Calcul de la variance avec protection contre les divisions par zéro
  const variance = rounds.length > 0 
    ? scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / rounds.length 
    : 0;
  
  const consistencyScore = Math.sqrt(variance);

  // Calcul de la série de victoires
  let winStreak = 0;
  let currentWinStreak = 0;
  for (let i = 0; i < rounds.length; i++) {
    // Vérifier que tous les autres joueurs ont des données pour cette manche
    const allPlayersHaveRound = allPlayers.every(p => p.id === player.id || (p.rounds && p.rounds[i]));
    
    if (allPlayersHaveRound && allPlayers.every(p => 
      p.id === player.id || (p.rounds[i] && rounds[i].score <= p.rounds[i].score)
    )) {
      currentWinStreak++;
      winStreak = Math.max(winStreak, currentWinStreak);
    } else {
      currentWinStreak = 0;
    }
  }

  return {
    bestRound: nonZeroScores.length > 0 ? Math.min(...nonZeroScores) : null,
    dutchCount,
    averageScore: Math.round(avg * 10) / 10,
    worstRound: scores.length > 0 ? Math.max(...scores) : null,
    improvementRate: Math.round(improvementRate * 10) / 10,
    consistencyScore: Math.round(consistencyScore * 10) / 10,
    winStreak
  };
};

/**
 * Met à jour les statistiques de tous les joueurs
 */
export const updateAllPlayersStats = (players: Player[]): Player[] => {
  if (!players || players.length === 0) return players;
  
  return players.map(player => ({
    ...player,
    stats: calculatePlayerStats(player, players)
  }));
};

/**
 * Fonction pour déterminer le vainqueur d'une partie
 */
export const determineWinner = (players: Player[]): string | null => {
  if (!players || players.length === 0) return null;
  
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  return sortedPlayers[0].name;
};

/**
 * Fonction pour vérifier si le jeu est terminé (un joueur a atteint 100 points)
 */
export const isGameOver = (players: Player[]): boolean => {
  if (!players || players.length === 0) return false;
  return players.some(player => player.totalScore >= 100);
};
