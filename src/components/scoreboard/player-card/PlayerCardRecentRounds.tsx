
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Zap } from 'lucide-react';
import { Player } from '@/types';
import { cn } from '@/lib/utils';

interface PlayerCardRecentRoundsProps {
  player: Player;
  rank: number;
}

const PlayerCardRecentRounds: React.FC<PlayerCardRecentRoundsProps> = ({ player, rank }) => {
  const recentRounds = player.rounds.slice(-5);

  if (recentRounds.length === 0) return null;

  return (
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
  );
};

export default PlayerCardRecentRounds;
