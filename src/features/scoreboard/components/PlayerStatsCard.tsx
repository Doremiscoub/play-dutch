
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

  return { name: "Joueur", color: "text-muted-foreground" };
};

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({ player }) => {
  const stats = player.stats;

  if (!stats) {
    return (
      <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
        <h3 className="text-sm font-semibold text-foreground mb-2">Aucune statistique disponible</h3>
      </div>
    );
  }

  // Déterminer si l'évolution est positive (meilleur) ou négative (moins bien)
  const isImprovementPositive = stats.improvementRate < 0;
  const playerProfile = determinePlayerProfile(player);

  return (
    <motion.div
      className="bg-white rounded-xl p-5 border border-border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-2">
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
        <div className="bg-dutch-purple text-white p-3 rounded-full font-bold text-xl w-20 h-20 flex items-center justify-center shadow-sm">
          {player.totalScore}
        </div>
      </div>

      <div className="space-y-2">
        {/* Moyenne */}
        <div className="flex items-center justify-between bg-cyan-50 p-2.5 rounded-lg border border-cyan-100">
          <div className="flex items-center">
            <Target className="h-4 w-4 text-cyan-600 mr-2" />
            <span className="text-foreground text-sm font-medium">Moyenne</span>
          </div>
          <span className="font-semibold text-foreground">{stats.averageScore} pts</span>
        </div>

        {/* Meilleur round */}
        <div className="flex items-center justify-between bg-green-50 p-2.5 rounded-lg border border-green-100">
          <div className="flex items-center">
            <Award className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-foreground text-sm font-medium">Meilleur round</span>
          </div>
          <span className="font-semibold text-foreground">{stats.bestRound} pts</span>
        </div>

        {/* Pire round */}
        <div className="flex items-center justify-between bg-red-50 p-2.5 rounded-lg border border-red-100">
          <div className="flex items-center">
            <Frown className="h-4 w-4 text-red-500 mr-2" />
            <span className="text-foreground text-sm font-medium">Pire round</span>
          </div>
          <span className="font-semibold text-foreground">{stats.worstRound} pts</span>
        </div>

        {/* Nombre de Dutch */}
        <div className="flex items-center justify-between bg-orange-50 p-2.5 rounded-lg border border-orange-100">
          <div className="flex items-center">
            <Award className="h-4 w-4 text-orange-600 mr-2" />
            <span className="text-foreground text-sm font-medium">Dutch réussis</span>
          </div>
          <span className="font-semibold text-foreground">{stats.dutchCount}</span>
        </div>

        {/* Taux d'amélioration */}
        <div className="flex items-center justify-between bg-purple-50 p-2.5 rounded-lg border border-purple-100">
          <div className="flex items-center">
            {isImprovementPositive ? (
              <TrendingDown className="h-4 w-4 text-purple-600 mr-2" />
            ) : (
              <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
            )}
            <span className="text-foreground text-sm font-medium">Progression</span>
          </div>
          <span className="font-semibold text-foreground">
            {isImprovementPositive ? '' : '+'}{stats.improvementRate} pts
          </span>
        </div>

        {/* Consistance */}
        <div className="flex items-center justify-between bg-blue-50 p-2.5 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <Gauge className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-foreground text-sm font-medium">Consistance</span>
          </div>
          <span className="font-semibold text-foreground">{stats.consistencyScore.toFixed(1)}</span>
        </div>

        {/* Streak */}
        {stats.streakInfo && stats.streakInfo.best > 1 && (
          <div className="flex items-center justify-between bg-amber-50 p-2.5 rounded-lg border border-amber-100">
            <div className="flex items-center">
              <Repeat className="h-4 w-4 text-amber-600 mr-2" />
              <span className="text-foreground text-sm font-medium">Meilleure série</span>
            </div>
            <span className="font-semibold text-foreground">{stats.streakInfo.best}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PlayerStatsCard;
