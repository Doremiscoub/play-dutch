
import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, BarChart3, Trophy, TrendingDown, Zap } from 'lucide-react';

interface GameStatsGridProps {
  stats: {
    totalRounds: number;
    totalPlayers: number;
    averageScore: number;
    bestScore: number;
    worstScore: number;
    dutchCount: number;
    bestRound: number;
    worstRound: number;
    avgImprovement: number;
    avgConsistency: number;
  };
}

const GameStatsGrid: React.FC<GameStatsGridProps> = ({ stats }) => {
  const formatNumber = (num: number) => {
    return num.toString().replace(/^0+/, '') || '0';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatItem 
          icon={<Target className="h-4 w-4" />}
          label="Joueurs" 
          value={formatNumber(stats.totalPlayers)} 
          badgeColor="bg-dutch-blue"
        />
        
        <StatItem 
          icon={<TrendingUp className="h-4 w-4" />}
          label="Manches" 
          value={formatNumber(stats.totalRounds)} 
          badgeColor="bg-dutch-purple"
        />
        
        <StatItem 
          icon={<BarChart3 className="h-4 w-4" />}
          label="Score moyen" 
          value={formatNumber(stats.averageScore)} 
          badgeColor="bg-dutch-orange"
        />
        
        <StatItem 
          icon={<Trophy className="h-4 w-4" />}
          label="Meilleur total" 
          value={formatNumber(stats.bestScore)} 
          badgeColor="bg-green-500"
        />
        
        <StatItem 
          icon={<TrendingDown className="h-4 w-4" />}
          label="Pire total" 
          value={formatNumber(stats.worstScore)} 
          badgeColor="bg-red-500"
        />
        
        <StatItem 
          icon={<Zap className="h-4 w-4" />}
          label="Total Dutch" 
          value={formatNumber(stats.dutchCount)} 
          badgeColor="bg-emerald-500"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/30">
        <StatItem 
          icon={<TrendingUp className="h-4 w-4" />}
          label="Meilleure manche" 
          value={formatNumber(stats.bestRound)} 
          badgeColor="bg-blue-500"
          subLabel="points"
        />
        
        <StatItem 
          icon={<TrendingDown className="h-4 w-4" />}
          label="Pire manche" 
          value={formatNumber(stats.worstRound)} 
          badgeColor="bg-orange-500"
          subLabel="points"
        />
        
        <StatItem 
          icon={<BarChart3 className="h-4 w-4" />}
          label="Écart moyen" 
          value={formatNumber(stats.avgImprovement)} 
          badgeColor="bg-purple-500"
          subLabel="points"
        />
        
        <StatItem 
          icon={<Target className="h-4 w-4" />}
          label="Régularité" 
          value={formatNumber(stats.avgConsistency)} 
          badgeColor="bg-indigo-500"
          subLabel="σ"
        />
      </div>
    </div>
  );
};

const StatItem: React.FC<{ 
  icon: React.ReactNode;
  label: string; 
  value: string | number; 
  badgeColor: string;
  subLabel?: string;
}> = ({ icon, label, value, badgeColor, subLabel }) => (
  <motion.div 
    className="bg-white/60 backdrop-blur-sm rounded-xl p-3 hover:bg-white/80 transition-all"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-2 mb-1">
      <div className={`w-6 h-6 rounded-full ${badgeColor} flex items-center justify-center text-white`}>
        {icon}
      </div>
      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold bg-gradient-to-br from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
        {value}
      </span>
      {subLabel && (
        <span className="text-xs text-gray-500">{subLabel}</span>
      )}
    </div>
  </motion.div>
);

export default GameStatsGrid;
