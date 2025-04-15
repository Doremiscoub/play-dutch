
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
  Repeat,
  UserCircle2
} from 'lucide-react';

interface PlayerStatsCardProps {
  player: Player;
}

// Déterminer le profil du joueur en fonction de ses statistiques
const determinePlayerProfile = (player: Player) => {
  if (!player.stats) return null;
  
  const { averageScore, dutchCount, consistencyScore, improvementRate } = player.stats;
  
  if (dutchCount > 2) return { name: "Dutch Master", color: "text-dutch-blue" };
  if (consistencyScore > 8) return { name: "Régulier", color: "text-green-500" };
  if (improvementRate < -5) return { name: "Stratège", color: "text-dutch-purple" };
  if (averageScore < 10) return { name: "Élite", color: "text-amber-500" };
  if (averageScore > 20) return { name: "Débutant", color: "text-dutch-orange" };
  
  return { name: "Joueur", color: "text-gray-600" };
};

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
  const isImprovementPositive = stats.improvementRate < 0;
  const playerProfile = determinePlayerProfile(player);
  
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-white shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
        {player.name}
      </h3>
      
      {/* Profil de joueur */}
      {playerProfile && (
        <div className={`flex items-center mb-4 ${playerProfile.color}`}>
          <UserCircle2 className="h-5 w-5 mr-1.5" />
          <span className="text-sm font-medium">{playerProfile.name}</span>
        </div>
      )}
      
      {/* Badge de score total */}
      <div className="mb-4 flex items-center justify-center">
        <motion.div 
          className="bg-gradient-to-r from-dutch-blue to-dutch-purple p-3 rounded-full shadow-md text-white font-bold text-xl w-20 h-20 flex items-center justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 2 
          }}
        >
          {player.totalScore}
        </motion.div>
      </div>
      
      <div className="space-y-3">
        {/* Moyenne */}
        <div className="flex items-center justify-between bg-gray-100/70 p-2 rounded-lg">
          <div className="flex items-center">
            <Target className="h-4.5 w-4.5 text-dutch-blue mr-2" />
            <span className="text-gray-700 text-sm font-medium">Moyenne</span>
          </div>
          <span className="font-semibold text-dutch-blue">{stats.averageScore} pts</span>
        </div>
        
        {/* Meilleur round */}
        <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
          <div className="flex items-center">
            <Award className="h-4.5 w-4.5 text-green-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Meilleur round</span>
          </div>
          <span className="font-semibold text-green-600">{stats.bestRound} pts</span>
        </div>
        
        {/* Pire round */}
        <div className="flex items-center justify-between bg-red-50 p-2 rounded-lg">
          <div className="flex items-center">
            <Frown className="h-4.5 w-4.5 text-red-500 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Pire round</span>
          </div>
          <span className="font-semibold text-red-500">{stats.worstRound} pts</span>
        </div>
        
        {/* Nombre de Dutch */}
        <div className="flex items-center justify-between bg-amber-50 p-2 rounded-lg">
          <div className="flex items-center">
            <Award className="h-4.5 w-4.5 text-amber-600 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Dutch réussis</span>
          </div>
          <span className="font-semibold text-amber-600">{stats.dutchCount}</span>
        </div>
        
        {/* Taux d'amélioration */}
        <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
          <div className="flex items-center">
            {isImprovementPositive ? (
              <TrendingDown className="h-4.5 w-4.5 text-green-500 mr-2" />
            ) : (
              <TrendingUp className="h-4.5 w-4.5 text-red-500 mr-2" />
            )}
            <span className="text-gray-700 text-sm font-medium">Progression</span>
          </div>
          <span className={`font-semibold ${isImprovementPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isImprovementPositive ? '' : '+'}{stats.improvementRate} pts
          </span>
        </div>
        
        {/* Consistance */}
        <div className="flex items-center justify-between bg-purple-50 p-2 rounded-lg">
          <div className="flex items-center">
            <Gauge className="h-4.5 w-4.5 text-dutch-purple mr-2" />
            <span className="text-gray-700 text-sm font-medium">Consistance</span>
          </div>
          <span className="font-semibold text-dutch-purple">{stats.consistencyScore.toFixed(1)}</span>
        </div>
        
        {/* Streak */}
        {stats.streakInfo && stats.streakInfo.best > 1 && (
          <div className="flex items-center justify-between bg-indigo-50 p-2 rounded-lg">
            <div className="flex items-center">
              <Repeat className="h-4.5 w-4.5 text-indigo-600 mr-2" />
              <span className="text-gray-700 text-sm font-medium">Meilleure série</span>
            </div>
            <span className="font-semibold text-indigo-600">{stats.streakInfo.best}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerStatsCard;
