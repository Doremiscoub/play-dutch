
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Crown, TrendingUp, TrendingDown, Minus, Trophy, Target } from 'lucide-react';
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
  const recentRounds = player.rounds.slice(-3);
  const hasPositiveTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score < recentRounds[recentRounds.length - 2].score;
  const hasNegativeTrend = recentRounds.length >= 2 && 
    recentRounds[recentRounds.length - 1].score > recentRounds[recentRounds.length - 2].score;

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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <PlayerRankBadge 
            position={rank} 
            size="lg" 
            showAnimation={true}
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-gray-800">
                {player.name}
              </h3>
              {/* Trend Indicator */}
              {hasPositiveTrend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 bg-green-100 rounded-full"
                >
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </motion.div>
              )}
              {hasNegativeTrend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 bg-red-100 rounded-full"
                >
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </motion.div>
              )}
              {!hasPositiveTrend && !hasNegativeTrend && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 bg-gray-100 rounded-full"
                >
                  <Minus className="h-4 w-4 text-gray-500" />
                </motion.div>
              )}
            </div>
            
            {/* Performance Indicators */}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              {player.rounds.length > 0 && (
                <>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span>Moy: {(player.totalScore / player.rounds.length).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3 w-3" />
                    <span>Min: {Math.min(...player.rounds.map(r => r.score))}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <motion.div
            className={cn(
              "text-4xl font-black tracking-tight",
              getScoreColor(player.totalScore)
            )}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
              {player.totalScore}
            </span>
          </motion.div>
          <div className="text-sm text-gray-500 font-medium">
            {player.rounds.length} manche{player.rounds.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Recent Performance Mini Chart */}
      {recentRounds.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Dernières manches</span>
            <span>{recentRounds.length} scores</span>
          </div>
          <div className="flex gap-1">
            {recentRounds.map((round, index) => (
              <motion.div
                key={index}
                className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    round.score <= 5 ? "bg-green-400" :
                    round.score <= 15 ? "bg-yellow-400" :
                    round.score <= 25 ? "bg-orange-400" : "bg-red-400"
                  )}
                  style={{ width: `${Math.min(100, (round.score / 30) * 100)}%` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FunPlayerCard;
