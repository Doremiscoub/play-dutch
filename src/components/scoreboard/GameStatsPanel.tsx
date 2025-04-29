
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
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
    >
      <div className="space-y-4">
        <StatItem label="Joueurs" value={stats.totalPlayers} />
        <StatItem label="Manches" value={stats.totalRounds} />
        <StatItem label="Score moyen" value={stats.averageScore === 0 ? '0' : `${stats.averageScore}`} />
        <StatItem label="Meilleur score" value={stats.bestScore} />
        <StatItem label="Total Dutch" value={stats.dutchCount} />
      </div>
    </motion.div>
  );
};

const StatItem: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <div className="flex justify-between items-center p-2 rounded-xl hover:bg-white/40 transition-colors">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-xl font-semibold bg-gradient-to-br from-dutch-blue to-dutch-purple bg-clip-text text-transparent">{value}</span>
  </div>
);

export default GameStatsPanel;
