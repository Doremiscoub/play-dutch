
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { TrendingUp, TrendingDown, Target, Zap, BarChart3, Trophy } from 'lucide-react';

interface DetailedGameStatsProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory?: { scores: number[], dutchPlayerId?: string }[];
}

const DetailedGameStats: React.FC<DetailedGameStatsProps> = ({ 
  players, 
  roundCount, 
  scoreLimit, 
  roundHistory = [] 
}) => {
  const calculateDetailedStats = () => {
    if (!players.length) return null;

    const totalRounds = roundCount;
    const totalPlayers = players.length;
    
    const allScores = players.flatMap(p => p.rounds.map(round => round.score));
    const averageScore = allScores.length 
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length * 10) / 10
      : 0;
    
    const bestScore = Math.min(...players.map(p => p.totalScore));
    const worstScore = Math.max(...players.map(p => p.totalScore));
    const dutchCount = roundHistory ? roundHistory.filter(r => r.dutchPlayerId).length : 0;
    
    // Calculate best and worst individual rounds
    const bestRound = allScores.length ? Math.min(...allScores) : 0;
    const worstRound = allScores.length ? Math.max(...allScores) : 0;
    
    // Calculate improvement rate (difference between best and worst round for each player)
    const improvementRates = players.map(player => {
      if (player.rounds.length < 2) return 0;
      const scores = player.rounds.map(r => r.score);
      const best = Math.min(...scores);
      const worst = Math.max(...scores);
      return worst - best;
    });
    const avgImprovement = improvementRates.length 
      ? Math.round(improvementRates.reduce((a, b) => a + b, 0) / improvementRates.length)
      : 0;
    
    // Calculate consistency (standard deviation)
    const playerConsistency = players.map(player => {
      if (player.rounds.length < 2) return 0;
      const scores = player.rounds.map(r => r.score);
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      const variance = scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) / scores.length;
      return Math.sqrt(variance);
    });
    const avgConsistency = playerConsistency.length 
      ? Math.round(playerConsistency.reduce((a, b) => a + b, 0) / playerConsistency.length * 10) / 10
      : 0;

    return { 
      totalRounds, 
      totalPlayers, 
      averageScore, 
      bestScore, 
      worstScore,
      dutchCount,
      bestRound,
      worstRound,
      avgImprovement,
      avgConsistency
    };
  };

  const stats = calculateDetailedStats();
  if (!stats) return null;

  const formatNumber = (num: number) => {
    return num.toString().replace(/^0+/, '') || '0';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-6 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl p-6"
    >
      <h3 className="text-xl font-semibold text-dutch-blue mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Statistiques de la partie
      </h3>
      
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
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/30">
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
    </motion.div>
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

export default DetailedGameStats;
