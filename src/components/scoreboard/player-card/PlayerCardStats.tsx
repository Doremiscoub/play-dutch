
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, BarChart3, Award } from 'lucide-react';
import { Player } from '@/types';

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

  const stats = [
    { icon: Target, label: 'Moy', value: averageScore, color: 'blue' },
    { icon: Trophy, label: 'Best', value: bestRoundScore, color: 'green' },
    { icon: BarChart3, label: 'Pire', value: worstRoundScore, color: 'red' },
    { icon: Award, label: 'Régu', value: consistency.toFixed(1), color: 'purple' }
  ];

  const getStatColors = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50/80 border-blue-200/60',
      green: 'text-green-600 bg-green-50/80 border-green-200/60',
      red: 'text-red-600 bg-red-50/80 border-red-200/60',
      purple: 'text-purple-600 bg-purple-50/80 border-purple-200/60'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 border backdrop-blur-sm transition-all duration-200 hover:shadow-sm hover:scale-[1.02] ${getStatColors(stat.color)}`}
          whileHover={{ y: -1 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <stat.icon className="h-3.5 w-3.5 flex-shrink-0" />
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs font-medium opacity-75 flex-shrink-0">{stat.label}</span>
            <span className="font-semibold text-sm truncate">{stat.value}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PlayerCardStats;
