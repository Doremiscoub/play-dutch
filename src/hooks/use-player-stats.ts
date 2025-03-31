
import { useMemo } from 'react';
import { Player } from '@/types';

export interface AdvancedPlayerStats {
  bestRound: number | null;
  worstRound: number | null;
  averageScore: number;
  improvementRate: number;
  consistencyScore: number;
  winStreak: number;
  currentStreak: number;
  dutchCount: number;
  dutchSuccessRate: number;
  gamesPlayed: number;
  totalRounds: number;
  roundsWon: number;
  roundsWonPercentage: number;
  playStyle?: 'Agressif' | 'Défensif' | 'Équilibré' | 'Inconsistant' | 'Stratège';
}

export const usePlayerStats = (player: Player, allPlayers: Player[] = []): AdvancedPlayerStats => {
  return useMemo(() => {
    const rounds = player.rounds;
    
    if (rounds.length === 0) {
      return {
        bestRound: null,
        worstRound: null,
        averageScore: 0,
        improvementRate: 0,
        consistencyScore: 0,
        winStreak: 0,
        currentStreak: 0,
        dutchCount: 0,
        dutchSuccessRate: 0,
        gamesPlayed: 0,
        totalRounds: 0,
        roundsWon: 0,
        roundsWonPercentage: 0,
      };
    }

    const scores = rounds.map(r => r.score);
    const dutchRounds = rounds.filter(r => r.isDutch);
    const dutchCount = dutchRounds.length;
    
    // Calcul du taux de réussite quand le joueur dit "Dutch"
    const successfulDutchRounds = dutchRounds.filter(round => {
      const roundIndex = rounds.indexOf(round);
      // Le joueur a le meilleur score pour cette manche
      return allPlayers.every(p => 
        p.id === player.id || 
        (p.rounds[roundIndex] && round.score <= p.rounds[roundIndex].score)
      );
    });
    
    const dutchSuccessRate = dutchCount > 0 
      ? (successfulDutchRounds.length / dutchCount) * 100 
      : 0;
    
    // Calcul des manches où le joueur a eu le meilleur score
    const roundsWon = rounds.filter((round, index) => {
      return allPlayers.every(p => 
        p.id === player.id || 
        (p.rounds[index] && round.score <= p.rounds[index].score)
      );
    }).length;

    // Calcul de l'amélioration
    let improvementRate = 0;
    if (rounds.length >= 4) {
      const firstHalf = scores.slice(0, Math.floor(rounds.length / 2));
      const secondHalf = scores.slice(Math.floor(rounds.length / 2));
      
      const firstHalfAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
      
      // Négatif = amélioration (car score plus bas = meilleur)
      improvementRate = secondHalfAvg - firstHalfAvg;
    }

    // Calcul de la consistance (écart-type)
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((a, b) => a + Math.pow(b - averageScore, 2), 0) / scores.length;
    const consistencyScore = Math.sqrt(variance);

    // Calcul des séries de victoires
    let winStreak = 0;
    let currentStreak = 0;
    
    for (let i = 0; i < rounds.length; i++) {
      const isWinner = allPlayers.every(p => 
        p.id === player.id || 
        (p.rounds[i] && rounds[i].score <= p.rounds[i].score)
      );
      
      if (isWinner) {
        currentStreak++;
        winStreak = Math.max(winStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    // Style de jeu (heuristique simple)
    let playStyle: AdvancedPlayerStats['playStyle'];
    
    if (consistencyScore < 5 && averageScore < 20) {
      playStyle = 'Stratège';
    } else if (consistencyScore < 8) {
      playStyle = 'Équilibré';
    } else if (improvementRate < -5) {
      playStyle = 'Agressif';
    } else if (dutchCount / rounds.length > 0.3) {
      playStyle = 'Défensif';
    } else {
      playStyle = 'Inconsistant';
    }

    // Calculer les meilleurs et pires scores (non nuls)
    const nonZeroScores = scores.filter(s => s > 0);
    const bestRound = nonZeroScores.length > 0 ? Math.min(...nonZeroScores) : null;
    const worstRound = scores.length > 0 ? Math.max(...scores) : null;

    return {
      bestRound,
      worstRound,
      averageScore: Math.round(averageScore * 10) / 10,
      improvementRate: Math.round(improvementRate * 10) / 10,
      consistencyScore: Math.round(consistencyScore * 10) / 10,
      winStreak,
      currentStreak,
      dutchCount,
      dutchSuccessRate: Math.round(dutchSuccessRate * 10) / 10,
      gamesPlayed: 1, // Pour l'instant, une seule partie
      totalRounds: rounds.length,
      roundsWon,
      roundsWonPercentage: Math.round((roundsWon / rounds.length) * 100) || 0,
      playStyle
    };
  }, [player, allPlayers]);
};
