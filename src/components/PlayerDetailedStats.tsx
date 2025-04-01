
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Clock, Star, Flame, TrendingUp, BarChart2 } from 'lucide-react';

interface PlayerDetailedStatsProps {
  player: Player;
}

const PlayerDetailedStats: React.FC<PlayerDetailedStatsProps> = ({ player }) => {
  const stats = player.stats;
  
  if (!stats) {
    return (
      <div className="text-center py-4 text-gray-500">
        Pas encore de statistiques disponibles
      </div>
    );
  }
  
  const animationVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.3 }
    })
  };
  
  // Calcul d'une note de performance sur 100
  const performanceScore = Math.max(0, Math.min(100, 100 - (player.totalScore / 2)));
  
  // Déterminer le style de la barre de progression
  const getProgressStyle = (value: number, max: number = 100) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    
    let color;
    if (percent >= 70) color = 'bg-green-500';
    else if (percent >= 40) color = 'bg-yellow-500';
    else color = 'bg-red-500';
    
    return {
      width: `${percent}%`,
      className: color
    };
  };
  
  // Style pour la barre de progression de performance
  const performanceStyle = getProgressStyle(performanceScore);
  
  // Style pour la barre de consistance
  const consistencyStyle = getProgressStyle(stats.consistencyScore * 10);
  
  // Calcul de "tendance" : positif = s'améliore, négatif = se dégrade
  const trendPercent = stats.improvementRate > 0 
    ? Math.min(100, stats.improvementRate * 10)  // Valeur positive (s'améliore)
    : Math.max(-100, stats.improvementRate * 10); // Valeur négative (se dégrade)
  
  const getTrendColor = () => {
    if (trendPercent > 0) return 'text-green-500';
    if (trendPercent < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-4">
      {/* Performance globale */}
      <motion.div 
        custom={0}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/60 rounded-lg p-3 border border-white/30 shadow-sm"
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-dutch-purple" />
            <span className="text-sm font-medium text-gray-700">Performance</span>
          </div>
          <span className="text-sm font-semibold">{Math.round(performanceScore)}/100</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${performanceStyle.className}`}
            style={{ width: performanceStyle.width }}
          ></div>
        </div>
      </motion.div>
      
      {/* Consistance */}
      <motion.div 
        custom={1}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/60 rounded-lg p-3 border border-white/30 shadow-sm"
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <BarChart2 className="h-4 w-4 text-dutch-blue" />
            <span className="text-sm font-medium text-gray-700">Consistance</span>
          </div>
          <span className="text-sm font-semibold">{stats.consistencyScore.toFixed(1)}/10</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${consistencyStyle.className}`}
            style={{ width: consistencyStyle.width }}
          ></div>
        </div>
      </motion.div>
      
      {/* Tendance */}
      {stats.improvementRate !== 0 && (
        <motion.div 
          custom={2}
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/60 rounded-lg p-3 border border-white/30 shadow-sm"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-dutch-orange" />
              <span className="text-sm font-medium text-gray-700">Tendance</span>
            </div>
            <span className={`text-sm font-semibold ${getTrendColor()}`}>
              {trendPercent > 0 ? '+' : ''}{trendPercent.toFixed(1)}%
            </span>
          </div>
          <div className="text-xs text-gray-600">
            {trendPercent > 0 
              ? 'Amélioration au fil de la partie'
              : trendPercent < 0 
                ? 'Performances en baisse'
                : 'Stable'}
          </div>
        </motion.div>
      )}
      
      {/* Statistiques détaillées */}
      <motion.div 
        custom={3}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/60 rounded-lg p-3 border border-white/30 shadow-sm"
      >
        <div className="text-sm font-medium text-gray-700 mb-2">Détails</div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm">
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            <span className="text-gray-600">Meilleur: {stats.bestRound ?? "-"}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-red-500" />
            <span className="text-gray-600">Pire: {stats.worstRound ?? "-"}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-dutch-purple" />
            <span className="text-gray-600">Dutch: {stats.dutchCount}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-dutch-blue" />
            <span className="text-gray-600">Moy: {stats.averageScore.toFixed(1)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerDetailedStats;
