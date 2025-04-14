
/**
 * Carte des statistiques d'un joueur
 */
import React from 'react';
import { Player } from '@/types';
import { motion } from 'framer-motion';
import { 
  TrendingDown,
  TrendingUp,
  Target,
  Award,
  Frown,
  Gauge,
  Repeat
} from 'lucide-react';

interface PlayerStatsCardProps {
  player: Player;
}

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ player }) => {
  const stats = player.stats;
  
  if (!stats) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Aucune statistique disponible</h3>
      </div>
    );
  }
  
  // Déterminer si l'évolution est positive (meilleur) ou négative (moins bien)
  const isImprovementPositive = stats.improvementRate > 0;
  
  return (
    <motion.div
      className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-sm font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-3">
        Statistiques de {player.name}
      </h3>
      
      <div className="space-y-3 text-xs">
        {/* Moyenne */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Target className="h-3.5 w-3.5 text-dutch-blue mr-2" />
            <span className="text-gray-600">Moyenne</span>
          </div>
          <span className="font-semibold">{stats.averageScore} pts</span>
        </div>
        
        {/* Meilleur round */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-3.5 w-3.5 text-dutch-purple mr-2" />
            <span className="text-gray-600">Meilleur round</span>
          </div>
          <span className="font-semibold">{stats.bestRound} pts</span>
        </div>
        
        {/* Pire round */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Frown className="h-3.5 w-3.5 text-dutch-orange mr-2" />
            <span className="text-gray-600">Pire round</span>
          </div>
          <span className="font-semibold">{stats.worstRound} pts</span>
        </div>
        
        {/* Nombre de Dutch */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-3.5 w-3.5 text-dutch-orange mr-2" />
            <span className="text-gray-600">Dutch réussis</span>
          </div>
          <span className="font-semibold">{stats.dutchCount}</span>
        </div>
        
        {/* Taux d'amélioration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isImprovementPositive ? (
              <TrendingDown className="h-3.5 w-3.5 text-green-500 mr-2" />
            ) : (
              <TrendingUp className="h-3.5 w-3.5 text-red-500 mr-2" />
            )}
            <span className="text-gray-600">Progression</span>
          </div>
          <span className={`font-semibold ${isImprovementPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isImprovementPositive ? '+' : ''}{stats.improvementRate} pts
          </span>
        </div>
        
        {/* Consistance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Gauge className="h-3.5 w-3.5 text-dutch-blue mr-2" />
            <span className="text-gray-600">Consistance</span>
          </div>
          <span className="font-semibold">{stats.consistencyScore.toFixed(1)}</span>
        </div>
        
        {/* Streak */}
        {stats.streakInfo && stats.streakInfo.best > 1 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Repeat className="h-3.5 w-3.5 text-dutch-purple mr-2" />
              <span className="text-gray-600">Meilleure série</span>
            </div>
            <span className="font-semibold">{stats.streakInfo.best}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerStatsCard;
