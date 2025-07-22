import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, TrendingUp, Trophy } from 'lucide-react';
import { Player } from '@/types';

interface PlayerDetailsProps {
  player: Player;
  isExpanded: boolean;
  isWinner: boolean;
  bestRound: number;
  hasPositiveTrend: boolean;
  recentRounds: Array<{ score: number; isDutch: boolean }>;
  theme: {
    text: string;
    lightBg: string;
    border: string;
  };
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  player,
  isExpanded,
  isWinner,
  bestRound,
  hasPositiveTrend,
  recentRounds,
  theme
}) => {
  const getScoreColor = (score: number) => {
    if (score === 0) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (score <= 5) return 'bg-green-100 text-green-700 border-green-200';
    if (score <= 15) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border-t border-glass-border/30 pt-3 mt-3"
        >
          {/* Recent rounds */}
          <div className="mb-4">
            <h4 className={cn("text-sm font-bold mb-2 flex items-center gap-1", theme.text)}>
              📈 Dernières manches
            </h4>
            <div className="flex gap-2 flex-wrap">
              {recentRounds.map((round, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "px-2 py-1 rounded-lg border text-xs font-bold",
                    getScoreColor(round.score)
                  )}
                >
                  {round.score}
                  {round.isDutch && ' 🏆'}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detailed stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={cn(
              "p-3 rounded-xl border bg-glass-surface",
              "border-glass-border backdrop-blur-sm"
            )}>
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Meilleur</span>
              </div>
              <div className={cn("font-bold", theme.text)}>{bestRound}</div>
            </div>
            
            <div className={cn(
              "p-3 rounded-xl border bg-glass-surface",
              "border-glass-border backdrop-blur-sm"
            )}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Tendance</span>
              </div>
              <div className={cn("font-bold", theme.text)}>
                {hasPositiveTrend ? '📈 ↗️' : '📊 →'}
              </div>
            </div>
          </div>

          {/* Winner badge */}
          {isWinner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-xl text-center"
            >
              <div className="flex items-center justify-center gap-2 text-yellow-700 font-bold text-sm">
                <Trophy className="h-4 w-4" />
                🎉 Champion de la partie !
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayerDetails;