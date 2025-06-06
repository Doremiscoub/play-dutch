
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Zap } from 'lucide-react';
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
  return (
    <div className="flex items-center gap-1">
      {hasPositiveTrend && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="p-1.5 bg-green-100 rounded-full shadow-sm"
          title="En amélioration !"
        >
          <TrendingUp className="h-4 w-4 text-green-600" />
        </motion.div>
      )}
      {hasNegativeTrend && (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="p-1.5 bg-red-100 rounded-full shadow-sm"
          title="En difficulté..."
        >
          <TrendingDown className="h-4 w-4 text-red-600" />
        </motion.div>
      )}
      {!hasPositiveTrend && !hasNegativeTrend && player.rounds.length > 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-1.5 bg-gray-100 rounded-full shadow-sm"
          title="Stable"
        >
          <Minus className="h-4 w-4 text-gray-500" />
        </motion.div>
      )}
      
      {dutchCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="p-1.5 bg-purple-100 rounded-full shadow-sm"
          title={`${dutchCount} Dutch réussi${dutchCount > 1 ? 's' : ''}`}
        >
          <Zap className="h-4 w-4 text-purple-600" />
        </motion.div>
      )}
      
      {currentStreak >= 3 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-1 bg-blue-100 rounded-full shadow-sm"
          title={`Série de ${currentStreak} manches régulières`}
        >
          <span className="text-xs font-bold text-blue-600">{currentStreak}x</span>
        </motion.div>
      )}
    </div>
  );
};

export default PlayerCardTrends;
