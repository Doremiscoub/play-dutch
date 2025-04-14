
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Player } from '@/types';
import { Trophy, Target, Flag, TrendingUp, Star, Gauge, Zap, Crosshair, Activity, Focus, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Radar } from 'recharts';

interface PlayerDetailedStatsProps {
  player: Player;
  className?: string;
}

const PlayerDetailedStats: React.FC<PlayerDetailedStatsProps> = ({ player, className }) => {
  const stats = player.stats;
  
  if (!stats) {
    return null;
  }
  
  // Calculer les statistiques de style "FIFA"
  // Ces calculs sont simplifiés et peuvent être ajustés selon les besoins
  const regularity = Math.max(0, 100 - (stats.consistencyScore * 10)); // Inverser car une faible consistance = haute régularité
  const riskTaking = Math.min(100, (stats.worstRound || 0) / 3 * 10); // Plus le pire score est élevé, plus la prise de risque est élevée
  const momentum = stats.improvementRate > 0 
    ? Math.min(100, stats.improvementRate * 20) 
    : Math.max(0, 50 + stats.improvementRate * 10); // Ajustement pour les valeurs positives et négatives
  const concentration = Math.max(0, 100 - stats.consistencyScore * 5); // Moins de variation = plus de concentration
  
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

  // Données pour le graphique radar des stats "FIFA"
  const radarData = [
    { subject: 'Régularité', A: regularity, fullMark: 100 },
    { subject: 'Prise de risque', A: riskTaking, fullMark: 100 },
    { subject: 'Momentum', A: momentum, fullMark: 100 },
    { subject: 'Concentration', A: concentration, fullMark: 100 },
  ];

  return (
    <Card className={cn("bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm", className)}>
      <CardContent className="p-4">
        <h4 className="text-sm font-medium text-dutch-blue mb-3">Statistiques détaillées</h4>
        
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
        
        {/* Section des statistiques de style FIFA */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-dutch-purple mb-3">Profil de jeu</h4>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Régularité */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
              <div className="flex items-center mb-1">
                <Activity className="h-4 w-4 text-dutch-blue mr-2" />
                <span className="text-xs text-gray-600">Régularité</span>
              </div>
              <div className="mt-1 bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-gradient-to-r from-red-500 to-green-500 h-full rounded-full"
                  style={{ width: `${regularity}%` }}
                ></div>
              </div>
            </div>
            
            {/* Prise de risque */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
              <div className="flex items-center mb-1">
                <Crosshair className="h-4 w-4 text-dutch-orange mr-2" />
                <span className="text-xs text-gray-600">Prise de risque</span>
              </div>
              <div className="mt-1 bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-gradient-to-r from-green-500 to-orange-500 h-full rounded-full"
                  style={{ width: `${riskTaking}%` }}
                ></div>
              </div>
            </div>
            
            {/* Momentum */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
              <div className="flex items-center mb-1">
                <Brain className="h-4 w-4 text-dutch-purple mr-2" />
                <span className="text-xs text-gray-600">Momentum</span>
              </div>
              <div className="mt-1 bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-dutch-purple h-full rounded-full"
                  style={{ width: `${momentum}%` }}
                ></div>
              </div>
            </div>
            
            {/* Concentration */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
              <div className="flex items-center mb-1">
                <Focus className="h-4 w-4 text-dutch-green mr-2" />
                <span className="text-xs text-gray-600">Concentration</span>
              </div>
              <div className="mt-1 bg-gray-200 h-2 rounded-full">
                <div 
                  className="bg-gradient-to-r from-blue-300 to-blue-600 h-full rounded-full"
                  style={{ width: `${concentration}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDetailedStats;
