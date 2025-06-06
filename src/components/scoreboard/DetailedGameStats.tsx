
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { BarChart3 } from 'lucide-react';
import GameStatsGrid from './stats/GameStatsGrid';

interface DetailedGameStatsProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
}

const DetailedGameStats: React.FC<DetailedGameStatsProps> = ({ 
  players, 
  roundCount, 
  scoreLimit, 
  roundHistory = [] 
}) => {
  const calculateDetailedStats = () => {
    if (!players.length) return null;

    const totalRounds = roundCount;
    const totalPlayers = players.length;
    
    const allScores = players.flatMap(p => p.rounds.map(round => round.score));
    const averageScore = allScores.length 
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length * 10) / 10
      : 0;
    
    const bestScore = Math.min(...players.map(p => p.totalScore));
    const worstScore = Math.max(...players.map(p => p.totalScore));
    const dutchCount = roundHistory ? roundHistory.filter(r => r.dutchPlayerId).length : 0;
    
    const bestRound = allScores.length ? Math.min(...allScores) : 0;
    const worstRound = allScores.length ? Math.max(...allScores) : 0;
    
    const improvementRates = players.map(player => {
      if (player.rounds.length < 2) return 0;
      const scores = player.rounds.map(r => r.score);
      const best = Math.min(...scores);
      const worst = Math.max(...scores);
      return worst - best;
    });
    const avgImprovement = improvementRates.length 
      ? Math.round(improvementRates.reduce((a, b) => a + b, 0) / improvementRates.length)
      : 0;
    
    const playerConsistency = players.map(player => {
      if (player.rounds.length < 2) return 0;
      const scores = player.rounds.map(r => r.score);
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / scores.length;
      return Math.sqrt(variance);
    });
    const avgConsistency = playerConsistency.length 
      ? Math.round(playerConsistency.reduce((a, b) => a + b, 0) / playerConsistency.length * 10) / 10
      : 0;

    return { 
      totalRounds, 
      totalPlayers, 
      averageScore, 
      bestScore, 
      worstScore,
      dutchCount,
      bestRound,
      worstRound,
      avgImprovement,
      avgConsistency
    };
  };

  const stats = calculateDetailedStats();
  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-6"
    >
      <h3 className="text-xl font-semibold text-dutch-blue mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Statistiques de la partie
      </h3>
      
      <GameStatsGrid stats={stats} />
    </motion.div>
  );
};

export default DetailedGameStats;
