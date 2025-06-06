
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, Target } from 'lucide-react';
import { Player } from '@/types';

interface PlayerCardTrendsProps {
  player: Player;
  hasPositiveTrend: boolean;
  hasNegativeTrend: boolean;
  dutchCount: number;
  currentStreak: number;
}

const PlayerCardTrends: React.FC<PlayerCardTrendsProps> = ({
  player,
  hasPositiveTrend,
  hasNegativeTrend,
  dutchCount,
  currentStreak
}) => {
  const trends = [];

  // Tendance performance
  if (hasPositiveTrend) {
    trends.push({
      icon: TrendingUp,
      label: 'En forme',
      color: 'text-green-500 bg-green-50',
      animate: { y: [-2, 0, -2] }
    });
  } else if (hasNegativeTrend) {
    trends.push({
      icon: TrendingDown,
      label: 'En difficulté',
      color: 'text-red-500 bg-red-50',
      animate: { y: [2, 0, 2] }
    });
  }

  // Dutch count
  if (dutchCount > 0) {
    trends.push({
      icon: Zap,
      label: `${dutchCount} Dutch`,
      color: 'text-dutch-orange bg-orange-50',
      animate: { 
        scale: [1, 1.2, 1],
        rotate: [0, 10, 0]
      }
    });
  }

  // Streak
  if (currentStreak >= 2) {
    trends.push({
      icon: Target,
      label: `${currentStreak} de suite`,
      color: 'text-dutch-purple bg-purple-50',
      animate: { 
        x: [0, 3, 0],
        scale: [1, 1.05, 1]
      }
    });
  }

  if (trends.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {trends.map((trend, index) => (
        <motion.div
          key={`${trend.label}-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 200
          }}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border border-white/50 ${trend.color}`}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={trend.animate}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <trend.icon className="h-3 w-3" />
          </motion.div>
          <span>{trend.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default PlayerCardTrends;
