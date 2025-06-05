
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Crown, TrendingUp, TrendingDown, Minus, Trophy, Target, BarChart3, Award } from 'lucide-react';
import PlayerRankBadge from '../game/PlayerRankBadge';
import { cn } from '@/lib/utils';

interface FunPlayerCardProps {
  player: Player;
  rank: number;
  totalPlayers: number;
  onSelect: (player: Player) => void;
  isSelected: boolean;
}

const FunPlayerCard: React.FC<FunPlayerCardProps> = ({
  player,
  rank,
  totalPlayers,
  onSelect,
  isSelected
}) => {
  const isWinner = rank === 1;
  const isLastPlace = rank === totalPlayers;
  const recentRounds = player.rounds.slice(-5); // Augmenté à 5 dernières manches
  const hasPositiveTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;
  const hasNegativeTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score > recentRounds[recentRounds.length - 2].score;

  // Calcul de la moyenne
  const averageScore = player.rounds.length > 0 
    ? (player.totalScore / player.rounds.length).toFixed(1)
    : '0.0';

  // Meilleur et pire score de manche
  const bestRoundScore = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score))
    : 0;
  const worstRoundScore = player.rounds.length > 0 
    ? Math.max(...player.rounds.map(r => r.score))
    : 0;

  // Nombre de Dutch
  const dutchCount = player.rounds.filter(round => round.isDutch).length;

  const getScoreColor = (score: number) => {
    if (score <= 0) return 'text-emerald-600 font-bold';
    if (score <= 15) return 'text-green-600 font-semibold';
    if (score <= 30) return 'text-yellow-600 font-semibold';
    if (score <= 50) return 'text-orange-600 font-semibold';
    return 'text-red-600 font-bold';
  };

  const getCardStyle = () => {
    if (isWinner) {
      return "bg-gradient-to-br from-amber-100/80 via-yellow-50/80 to-amber-100/80 border-amber-300/50 shadow-amber-200/20";
    }
    if (isLastPlace && totalPlayers > 2) {
      return "bg-gradient-to-br from-red-50/80 via-pink-50/80 to-red-50/80 border-red-200/50 shadow-red-100/20";
    }
    return "bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80 border-white/50";
  };

  // Style pour le score principal avec gradient
  const getScoreStyle = (score: number) => {
    if (isWinner) {
      return "bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg";
    }
    if (score <= 0) {
      return "bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg";
    }
    if (score <= 15) {
      return "bg-gradient-to-br from-green-500 via-lime-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg";
    }
    if (score <= 30) {
      return "bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg";
    }
    if (score <= 50) {
      return "bg-gradient-to-br from-orange-500 via-red-400 to-orange-600 bg-clip-text text-transparent drop-shadow-lg";
    }
    return "bg-gradient-to-br from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg";
  };

  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-3xl backdrop-blur-xl border shadow-lg transition-all duration-300 cursor-pointer",
        getCardStyle(),
        isSelected ? "ring-2 ring-dutch-blue/30 shadow-xl scale-[1.02]" : "hover:scale-[1.01] hover:shadow-xl"
      )}
      onClick={() => onSelect(player)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Winner Crown */}
      {isWinner && (
        <motion.div
          className="absolute -top-3 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Crown className="h-8 w-8 text-amber-500 drop-shadow-lg" />
        </motion.div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <PlayerRankBadge 
            position={rank} 
            size="lg" 
            showAnimation={true}
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-800">
                {player.name}
              </h3>
              {/* Trend Indicator */}
              {hasPositiveTrend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 bg-green-100 rounded-full"
                  title="En amélioration"
                >
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </motion.div>
              )}
              {hasNegativeTrend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 bg-red-100 rounded-full"
                  title="En dégradation"
                >
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </motion.div>
              )}
              {!hasPositiveTrend && !hasNegativeTrend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 bg-gray-100 rounded-full"
                  title="Stable"
                >
                  <Minus className="h-4 w-4 text-gray-500" />
                </motion.div>
              )}
            </div>
            
            {/* Enhanced Performance Indicators */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1 bg-white/50 rounded-lg px-2 py-1">
                <Target className="h-3 w-3 text-blue-500" />
                <span className="text-gray-600">Moy:</span>
                <span className="font-semibold text-blue-600">{averageScore}</span>
              </div>
              
              <div className="flex items-center gap-1 bg-white/50 rounded-lg px-2 py-1">
                <Trophy className="h-3 w-3 text-green-500" />
                <span className="text-gray-600">Min:</span>
                <span className="font-semibold text-green-600">{bestRoundScore}</span>
              </div>
              
              <div className="flex items-center gap-1 bg-white/50 rounded-lg px-2 py-1">
                <BarChart3 className="h-3 w-3 text-orange-500" />
                <span className="text-gray-600">Max:</span>
                <span className="font-semibold text-orange-600">{worstRoundScore}</span>
              </div>
              
              {dutchCount > 0 && (
                <div className="flex items-center gap-1 bg-white/50 rounded-lg px-2 py-1">
                  <Award className="h-3 w-3 text-purple-500" />
                  <span className="text-gray-600">Dutch:</span>
                  <span className="font-semibold text-purple-600">{dutchCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <motion.div
            className={cn(
              "text-5xl font-black tracking-tight mb-1",
              getScoreStyle(player.totalScore)
            )}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {player.totalScore}
          </motion.div>
          <div className="text-sm text-gray-500 font-medium">
            {player.rounds.length} manche{player.rounds.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Enhanced Recent Performance Chart */}
      {recentRounds.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span className="font-medium">Dernières manches</span>
            <span>{recentRounds.length} scores</span>
          </div>
          <div className="flex gap-1">
            {recentRounds.map((round, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className={cn(
                    "w-full h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm",
                    round.score <= 0 ? "bg-emerald-100 text-emerald-700" :
                    round.score <= 5 ? "bg-green-100 text-green-700" :
                    round.score <= 15 ? "bg-yellow-100 text-yellow-700" :
                    round.score <= 25 ? "bg-orange-100 text-orange-700" : 
                    "bg-red-100 text-red-700",
                    round.isDutch && "ring-2 ring-purple-400 ring-offset-1"
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  title={round.isDutch ? `Dutch: ${round.score} pts` : `${round.score} pts`}
                >
                  {round.score}
                </motion.div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      round.score <= 0 ? "bg-emerald-400" :
                      round.score <= 5 ? "bg-green-400" :
                      round.score <= 15 ? "bg-yellow-400" :
                      round.score <= 25 ? "bg-orange-400" : "bg-red-400"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(10, (round.score / 30) * 100))}%` }}
                    transition={{ delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FunPlayerCard;
