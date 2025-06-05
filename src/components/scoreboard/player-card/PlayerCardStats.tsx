
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, BarChart3, Award } from 'lucide-react';
import { Player } from '@/types';
import { cn } from '@/lib/utils';

interface PlayerCardStatsProps {
  player: Player;
  rank: number;
}

const PlayerCardStats: React.FC<PlayerCardStatsProps> = ({ player, rank }) => {
  const averageScore = player.rounds.length > 0 
    ? (player.totalScore / player.rounds.length).toFixed(1)
    : '0.0';

  const bestRoundScore = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score))
    : 0;
  const worstRoundScore = player.rounds.length > 0 
    ? Math.max(...player.rounds.map(r => r.score))
    : 0;

  // Calcul de consistance (écart-type)
  const consistency = (() => {
    if (player.rounds.length <= 1) return 0;
    const scores = player.rounds.map(r => r.score);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - avg, 2), 0) / scores.length;
    return Math.sqrt(variance);
  })();

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <motion.div 
        className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
        whileHover={{ scale: 1.02 }}
      >
        <Target className="h-3.5 w-3.5 text-blue-500" />
        <span className="text-gray-600 text-xs">Moy:</span>
        <span className="font-bold text-blue-600">{averageScore}</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
        whileHover={{ scale: 1.02 }}
      >
        <Trophy className="h-3.5 w-3.5 text-green-500" />
        <span className="text-gray-600 text-xs">Best:</span>
        <span className="font-bold text-green-600">{bestRoundScore}</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
        whileHover={{ scale: 1.02 }}
      >
        <BarChart3 className="h-3.5 w-3.5 text-orange-500" />
        <span className="text-gray-600 text-xs">Pire:</span>
        <span className="font-bold text-orange-600">{worstRoundScore}</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
        whileHover={{ scale: 1.02 }}
      >
        <Award className="h-3.5 w-3.5 text-indigo-500" />
        <span className="text-gray-600 text-xs">Régu:</span>
        <span className="font-bold text-indigo-600">{consistency.toFixed(1)}</span>
      </motion.div>
    </div>
  );
};

export default PlayerCardStats;
