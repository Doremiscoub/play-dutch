
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { BarChart3, Target, TrendingUp, Award } from 'lucide-react';

interface PlayerCardStatsProps {
  player: Player;
  rank: number;
}

const PlayerCardStats: React.FC<PlayerCardStatsProps> = ({ player, rank }) => {
  const avgScore = player.rounds.length > 0 
    ? Math.round(player.rounds.reduce((sum, round) => sum + round.score, 0) / player.rounds.length * 10) / 10
    : 0;
    
  const bestRound = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score))
    : 0;
    
  const worstRound = player.rounds.length > 0 
    ? Math.max(...player.rounds.map(r => r.score))
    : 0;

  const stats = [
    { 
      icon: Target, 
      label: 'Moyenne', 
      value: avgScore, 
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      icon: TrendingUp, 
      label: 'Meilleure', 
      value: bestRound, 
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      icon: BarChart3, 
      label: 'Pire', 
      value: worstRound, 
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50'
    },
    { 
      icon: Award, 
      label: 'Manches', 
      value: player.rounds.length, 
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
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
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 200
          }}
          className={`${stat.bgColor} rounded-xl p-3 border border-white/50 hover:scale-105 transition-all duration-300`}
          whileHover={{ 
            y: -2,
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 bg-gradient-to-r ${stat.color} rounded-lg shadow-sm`}>
              <stat.icon className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-600 truncate">
              {stat.label}
            </span>
          </div>
          
          <motion.div 
            className="text-lg font-bold text-gray-800"
            animate={index === 1 && rank === 1 ? {
              scale: [1, 1.1],
              color: ['#1f2937', '#059669']
            } : {}}
            transition={{
              duration: 2,
              repeat: index === 1 && rank === 1 ? Infinity : 0,
              repeatType: "reverse",
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
