
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react';

interface PlayerCardStatsProps {
  player: Player;
  rank: number;
  compact?: boolean;
  colors: {
    gradient: string;
    border: string;
    glow: string;
    text: string;
  };
}

const PlayerCardStats: React.FC<PlayerCardStatsProps> = ({ 
  player, 
  rank, 
  compact = false,
  colors 
}) => {
  const avgScore = player.rounds.length > 0 
    ? Math.round(player.rounds.reduce((sum, round) => sum + round.score, 0) / player.rounds.length * 10) / 10
    : 0;
    
  const bestRound = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score))
    : 0;
    
  const worstRound = player.rounds.length > 0 
    ? Math.max(...player.rounds.map(r => r.score))
    : 0;

  const dutchCount = player.rounds.filter(round => round.isDutch).length;

  // Version compacte pour la vue normale
  if (compact) {
    const recentRounds = player.rounds.slice(-3);
    const hasPositiveTrend = recentRounds.length >= 2 && 
      recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;
    const hasNegativeTrend = recentRounds.length >= 2 && 
      recentRounds[recentRounds.length - 1].score > recentRounds[recentRounds.length - 2].score;

    return (
      <div className="flex items-center justify-between">
        {/* Tendance avec emoji */}
        <div className="flex items-center gap-2">
          {hasPositiveTrend && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100/80 border border-green-300/50 text-green-700 text-xs font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ y: [-1, 0, -1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🔥
              </motion.span>
              En forme
            </motion.div>
          )}
          
          {hasNegativeTrend && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100/80 border border-orange-300/50 text-orange-700 text-xs font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📈
              </motion.span>
              Difficile
            </motion.div>
          )}

          {dutchCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100/80 border border-purple-300/50 text-purple-700 text-xs font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🏆
              </motion.span>
              {dutchCount} Dutch
            </motion.div>
          )}
        </div>

        {/* Score moyen highlighted */}
        <motion.div
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm border border-white/40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs text-gray-600">📊</span>
          <span className={`text-sm font-bold ${colors.text}`}>
            {avgScore}
          </span>
          <span className="text-xs text-gray-500">moy</span>
        </motion.div>
      </div>
    );
  }

  // Version détaillée pour la vue étendue
  const stats = [
    { 
      icon: '🎯', 
      label: 'Moyenne', 
      value: avgScore, 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50/80 border-blue-200/60'
    },
    { 
      icon: '⭐', 
      label: 'Meilleur', 
      value: bestRound, 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50/80 border-green-200/60'
    },
    { 
      icon: '💀', 
      label: 'Pire', 
      value: worstRound, 
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50/80 border-red-200/60'
    },
    { 
      icon: '🎮', 
      label: 'Manches', 
      value: player.rounds.length, 
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50/80 border-purple-200/60'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 200
          }}
          className={`${stat.bgColor} rounded-xl p-3 border backdrop-blur-sm transition-all duration-300`}
          whileHover={{ 
            scale: 1.05,
            y: -2,
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.span 
              className="text-lg"
              animate={index === 1 && rank === 1 ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{
                duration: 2,
                repeat: index === 1 && rank === 1 ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {stat.icon}
            </motion.span>
            <span className="text-xs font-medium text-gray-600">
              {stat.label}
            </span>
          </div>
          
          <motion.div 
            className="text-xl font-bold text-gray-800"
            animate={index === 1 && rank === 1 ? {
              scale: [1, 1.1, 1],
              color: ['#1f2937', '#059669', '#1f2937']
            } : {}}
            transition={{
              duration: 2,
              repeat: index === 1 && rank === 1 ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            {stat.value}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default PlayerCardStats;
