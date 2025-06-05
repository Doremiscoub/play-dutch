
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Crown, TrendingUp, TrendingDown, Minus, Trophy, Target, BarChart3, Award, Star, Zap } from 'lucide-react';
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
  const recentRounds = player.rounds.slice(-5);
  
  // Calculs de tendance améliorés
  const hasPositiveTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;
  const hasNegativeTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score > recentRounds[recentRounds.length - 2].score;

  // Calculs de stats enrichies
  const averageScore = player.rounds.length > 0 
    ? (player.totalScore / player.rounds.length).toFixed(1)
    : '0.0';

  const bestRoundScore = player.rounds.length > 0 
    ? Math.min(...player.rounds.map(r => r.score))
    : 0;
  const worstRoundScore = player.rounds.length > 0 
    ? Math.max(...player.rounds.map(r => r.score))
    : 0;

  const dutchCount = player.rounds.filter(round => round.isDutch).length;
  
  // Calcul de consistance (écart-type)
  const consistency = (() => {
    if (player.rounds.length <= 1) return 0;
    const scores = player.rounds.map(r => r.score);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - avg, 2), 0) / scores.length;
    return Math.sqrt(variance);
  })();

  // Calcul de la série actuelle
  const currentStreak = (() => {
    if (player.rounds.length === 0) return 0;
    let streak = 1;
    const lastScore = player.rounds[player.rounds.length - 1].score;
    
    for (let i = player.rounds.length - 2; i >= 0; i--) {
      if (player.rounds[i].score <= lastScore + 5 && player.rounds[i].score >= lastScore - 5) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  })();

  const getCardStyle = () => {
    if (isWinner) {
      return "bg-gradient-to-br from-amber-100/90 via-yellow-50/90 to-amber-100/90 border-amber-300/60 shadow-amber-200/30 ring-2 ring-amber-300/30";
    }
    if (isLastPlace && totalPlayers > 2) {
      return "bg-gradient-to-br from-red-50/90 via-pink-50/90 to-red-50/90 border-red-200/60 shadow-red-100/30";
    }
    return "bg-gradient-to-br from-white/90 via-gray-50/70 to-white/90 border-white/60";
  };

  // Style amélioré pour le score principal avec plus d'effets
  const getScoreStyle = (score: number) => {
    if (isWinner) {
      return "bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-black text-6xl";
    }
    if (score <= 0) {
      return "bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-black text-5xl";
    }
    if (score <= 15) {
      return "bg-gradient-to-br from-green-400 via-lime-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-black text-5xl";
    }
    if (score <= 30) {
      return "bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-black text-5xl";
    }
    if (score <= 50) {
      return "bg-gradient-to-br from-orange-400 via-red-400 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-black text-5xl";
    }
    return "bg-gradient-to-br from-red-400 via-pink-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-black text-5xl";
  };

  return (
    <motion.div
      className={cn(
        "relative p-6 rounded-3xl backdrop-blur-xl border shadow-xl transition-all duration-300 cursor-pointer overflow-hidden",
        getCardStyle(),
        isSelected ? "ring-4 ring-dutch-blue/40 shadow-2xl scale-[1.02]" : "hover:scale-[1.01] hover:shadow-2xl"
      )}
      onClick={() => onSelect(player)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.1 }}
    >
      {/* Effet de brillance pour le gagnant */}
      {isWinner && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "linear"
          }}
        />
      )}

      {/* Couronne pour le gagnant */}
      {isWinner && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <Crown className="h-10 w-10 text-amber-500 drop-shadow-lg" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Star className="h-10 w-10 text-amber-400 opacity-60" />
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4 flex-1">
          <PlayerRankBadge 
            position={rank} 
            size="lg" 
            showAnimation={true}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-bold text-gray-800 truncate">
                {player.name}
              </h3>
              
              {/* Indicateurs de tendance améliorés */}
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
                
                {/* Badge Dutch si actif */}
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
                
                {/* Badge série si > 3 */}
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
            </div>
            
            {/* Stats enrichies en grille */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <motion.div 
                className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <Target className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-gray-600 text-xs">Moy:</span>
                <span className="font-bold text-blue-600">{averageScore}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <Trophy className="h-3.5 w-3.5 text-green-500" />
                <span className="text-gray-600 text-xs">Best:</span>
                <span className="font-bold text-green-600">{bestRoundScore}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <BarChart3 className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-gray-600 text-xs">Pire:</span>
                <span className="font-bold text-orange-600">{worstRoundScore}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1.5 bg-white/60 rounded-lg px-3 py-2 shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                <Award className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-gray-600 text-xs">Régu:</span>
                <span className="font-bold text-indigo-600">{consistency.toFixed(1)}</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Score principal stylisé */}
        <div className="text-right ml-4">
          <motion.div
            className={cn(getScoreStyle(player.totalScore), "tracking-tight mb-1 relative")}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, delay: rank * 0.1 + 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {player.totalScore}
            {/* Effet de pulse pour le leader */}
            {isWinner && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-yellow-500/30 rounded-lg blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            )}
          </motion.div>
          <div className="text-sm text-gray-500 font-medium">
            {player.rounds.length} manche{player.rounds.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Graphique des dernières manches amélioré */}
      {recentRounds.length > 0 && (
        <motion.div 
          className="mt-5 pt-4 border-t border-gray-200/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: rank * 0.1 + 0.4 }}
        >
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span className="font-semibold flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              Dernières manches
            </span>
            <span className="text-gray-400">{recentRounds.length} scores</span>
          </div>
          <div className="flex gap-1.5">
            {recentRounds.map((round, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  className={cn(
                    "w-full h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-md border-2 transition-all duration-200",
                    round.score <= 0 ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                    round.score <= 5 ? "bg-green-100 text-green-800 border-green-200" :
                    round.score <= 15 ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                    round.score <= 25 ? "bg-orange-100 text-orange-800 border-orange-200" : 
                    "bg-red-100 text-red-800 border-red-200",
                    round.isDutch && "ring-2 ring-purple-400 ring-offset-1 shadow-purple-200"
                  )}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.08 + rank * 0.1 + 0.5 }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  title={round.isDutch ? `Dutch: ${round.score} pts` : `${round.score} pts`}
                >
                  {round.isDutch && <Zap className="h-3 w-3 mr-1 text-purple-600" />}
                  {round.score}
                </motion.div>
                
                {/* Barre de progression améliorée */}
                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      round.score <= 0 ? "bg-gradient-to-r from-emerald-400 to-emerald-500" :
                      round.score <= 5 ? "bg-gradient-to-r from-green-400 to-green-500" :
                      round.score <= 15 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                      round.score <= 25 ? "bg-gradient-to-r from-orange-400 to-orange-500" : 
                      "bg-gradient-to-r from-red-400 to-red-500"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(10, (round.score / 30) * 100))}%` }}
                    transition={{ delay: index * 0.1 + rank * 0.1 + 0.6, duration: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FunPlayerCard;
