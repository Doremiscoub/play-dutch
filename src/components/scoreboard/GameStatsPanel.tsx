
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';

interface GameStatsPanelProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const GameStatsPanel: React.FC<GameStatsPanelProps> = ({ players, roundHistory }) => {
  const calculateStats = () => {
    if (!players.length) return null;

    const totalRounds = players[0]?.rounds.length || 0;
    const totalPlayers = players.length;
    
    // Extract just the score numbers from the rounds objects
    const allScores = players.flatMap(p => p.rounds.map(round => round.score));
    
    const averageScore = allScores.length 
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length * 10) / 10
      : 0;
    const bestScore = Math.min(...players.map(p => p.totalScore));
    const dutchCount = roundHistory.filter(r => r.dutchPlayerId).length;

    return { totalRounds, totalPlayers, averageScore, bestScore, dutchCount };
  };

  const stats = calculateStats();
  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
    >
      <div className="space-y-3">
        <StatItem 
          label="Joueurs" 
          value={stats.totalPlayers} 
          badgeColor="bg-dutch-blue"
        />
        <StatItem 
          label="Manches" 
          value={stats.totalRounds} 
          badgeColor="bg-dutch-purple"
        />
        <StatItem 
          label="Score moyen" 
          value={stats.averageScore || 0} 
          badgeColor="bg-dutch-orange"
        />
        <StatItem 
          label="Meilleur score" 
          value={stats.bestScore} 
          badgeColor="bg-green-500"
        />
        <StatItem 
          label="Total Dutch" 
          value={stats.dutchCount} 
          badgeColor="bg-red-500"
        />
      </div>
    </motion.div>
  );
};

const StatItem: React.FC<{ 
  label: string; 
  value: number | string; 
  badgeColor: string;
}> = ({ label, value, badgeColor }) => (
  <div className="flex justify-between items-center p-2 rounded-xl hover:bg-white/40 transition-colors">
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${badgeColor}`}></div>
      <span className="text-gray-700 font-medium">{label}</span>
    </div>
    <span className="text-lg font-bold bg-gradient-to-br from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
      {value}
    </span>
  </div>
);

export default GameStatsPanel;
