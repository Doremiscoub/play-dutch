
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
  
  // Adaptation pour les scores négatifs
  // Le meilleur score est le plus petit (peut être négatif)
  const sortedScores = [...scores].sort((a, b) => a - b);
  const bestRound = sortedScores[0]; // Peut être négatif maintenant
  const worstRound = sortedScores[sortedScores.length - 1];
  
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
    bestRound,
    dutchCount,
    averageScore: Math.round(avg * 10) / 10,
    worstRound,
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
 * Optimisée et plus fiable
 */
export const isGameOver = (players: Player[]): boolean => {
  if (!players || players.length === 0) return false;
  
  // Le jeu est terminé si un joueur atteint ou dépasse 100 points
  return players.some(player => player.totalScore >= 100);
};

/**
 * Fonction pour vérifier la cohérence des scores
 * Utile pour détecter d'éventuelles erreurs de calcul
 */
export const verifyScoreConsistency = (player: Player): boolean => {
  if (!player.rounds || player.rounds.length === 0) return true;
  
  const calculatedTotal = player.rounds.reduce((sum, round) => sum + round.score, 0);
  
  // Tolérance pour erreurs d'arrondi
  return Math.abs(calculatedTotal - player.totalScore) < 0.01;
};

/**
 * Corrige les totaux si des incohérences sont détectées
 */
export const recalculatePlayerTotals = (players: Player[]): Player[] => {
  return players.map(player => {
    if (!verifyScoreConsistency(player)) {
      const recalculatedTotal = player.rounds.reduce((sum, round) => sum + round.score, 0);
      return {
        ...player,
        totalScore: recalculatedTotal
      };
    }
    return player;
  });
};
