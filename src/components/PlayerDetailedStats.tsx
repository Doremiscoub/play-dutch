
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Player } from '@/types';
import { Trophy, Target, Flag, TrendingUp, Star, Gauge, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerDetailedStatsProps {
  player: Player;
  className?: string;
}

const PlayerDetailedStats: React.FC<PlayerDetailedStatsProps> = ({ player, className }) => {
  const stats = player.stats;
  
  if (!stats) {
    return null;
  }
  
  const statItems = [
    {
      icon: <Trophy className="h-4 w-4 text-dutch-orange" />,
      label: "Séries de victoires",
      value: stats.winStreak || 0,
      suffix: stats.winStreak === 1 ? "manche" : "manches",
      color: "text-dutch-orange"
    },
    {
      icon: <Target className="h-4 w-4 text-dutch-blue" />,
      label: "Meilleure manche",
      value: stats.bestRound !== null ? stats.bestRound : 'N/A',
      suffix: stats.bestRound === 1 ? "point" : "points",
      color: "text-dutch-blue"
    },
    {
      icon: <Flag className="h-4 w-4 text-dutch-pink" />,
      label: "Pire manche",
      value: stats.worstRound !== null ? stats.worstRound : 'N/A',
      suffix: stats.worstRound === 1 ? "point" : "points",
      color: "text-dutch-pink"
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-dutch-green" />,
      label: "Progression",
      value: stats.improvementRate > 0 ? `+${stats.improvementRate.toFixed(1)}` : stats.improvementRate.toFixed(1),
      suffix: "points/manche",
      color: stats.improvementRate < 0 ? "text-dutch-green" : "text-dutch-orange"
    },
    {
      icon: <Star className="h-4 w-4 text-purple-500" />,
      label: "Moyenne",
      value: stats.averageScore.toFixed(1),
      suffix: "points/manche",
      color: "text-purple-500"
    },
    {
      icon: <Gauge className="h-4 w-4 text-blue-500" />,
      label: "Consistance",
      value: stats.consistencyScore.toFixed(1),
      suffix: "",
      color: "text-blue-500"
    },
    {
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      label: "Dutch",
      value: stats.dutchCount,
      suffix: stats.dutchCount === 1 ? "fois" : "fois",
      color: "text-amber-500"
    }
  ];

  return (
    <Card className={cn("bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs text-gray-600">{stat.label}</span>
              </div>
              <div className="flex items-baseline">
                <span className={cn("text-lg font-bold", stat.color)}>
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </span>
                {stat.value !== 'N/A' && (
                  <span className="text-xs text-gray-500 ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDetailedStats;
