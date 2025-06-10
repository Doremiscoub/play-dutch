
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';

interface PlayerCardRecentRoundsProps {
  player: Player;
  rank: number;
}

const PlayerCardRecentRounds: React.FC<PlayerCardRecentRoundsProps> = ({ player, rank }) => {
  const recentRounds = player.rounds.slice(-5).reverse(); // 5 dernières manches

  if (recentRounds.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <p className="text-sm">Aucune manche jouée</p>
      </div>
    );
  }

  const getScoreColor = (score: number, index: number) => {
    if (score <= 10) return 'bg-green-100 text-green-700 border-green-200';
    if (score <= 20) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (score <= 30) return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const getTrend = () => {
    if (recentRounds.length < 2) return null;
    const current = recentRounds[0].score;
    const previous = recentRounds[1].score;
    
    if (current < previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (current > previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold text-gray-700">Manches récentes</h4>
        {getTrend()}
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {recentRounds.map((round, index) => (
          <motion.div
            key={`round-${index}`}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            className={`flex-shrink-0 px-3 py-2 rounded-xl border text-sm font-bold min-w-[50px] text-center ${getScoreColor(round.score, index)}`}
            whileHover={{ 
              scale: 1.1,
              y: -2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            {round.score}
          </motion.div>
        ))}
        
        {recentRounds.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: recentRounds.length * 0.1 + 0.2 }}
            className="flex-shrink-0 flex items-center"
          >
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </motion.div>
        )}
      </div>
      
      {/* Résumé des performances */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 rounded-xl p-3 border border-gray-200"
      >
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-500">Moyenne</div>
            <div className="text-sm font-bold text-gray-800">
              {Math.round(recentRounds.reduce((sum, r) => sum + r.score, 0) / recentRounds.length * 10) / 10}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Meilleure</div>
            <div className="text-sm font-bold text-green-600">
              {Math.min(...recentRounds.map(r => r.score))}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Pire</div>
            <div className="text-sm font-bold text-red-600">
              {Math.max(...recentRounds.map(r => r.score))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerCardRecentRounds;
