
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Scissors, TrendingUp, TrendingDown } from 'lucide-react';

interface PlayerCardRecentRoundsProps {
  player: Player;
  rank: number;
}

const PlayerCardRecentRounds: React.FC<PlayerCardRecentRoundsProps> = ({ player, rank }) => {
  const recentRounds = player.rounds.slice(-5);
  
  if (recentRounds.length === 0) {
    return (
      <div className="mt-4 p-3 bg-gray-50/60 rounded-xl border border-gray-200/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">Dernières manches</span>
          <span className="text-xs text-gray-400">Aucun score</span>
        </div>
        <div className="text-center text-gray-400 text-sm py-2">
          Aucune manche jouée
        </div>
      </div>
    );
  }

  const lastRoundScore = recentRounds[recentRounds.length - 1]?.score;
  const isLastRoundDutch = recentRounds[recentRounds.length - 1]?.isDutch;
  
  // Calculer la tendance (si amélioration ou dégradation)
  const trend = (() => {
    if (recentRounds.length < 2) return null;
    const lastTwo = recentRounds.slice(-2);
    if (lastTwo[1].score < lastTwo[0].score) return 'up'; // Amélioration (score plus bas)
    if (lastTwo[1].score > lastTwo[0].score) return 'down'; // Dégradation (score plus haut)
    return 'stable';
  })();

  return (
    <div className="mt-4 p-3 bg-gray-50/60 rounded-xl border border-gray-200/50">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-600">Dernières manches</span>
        <div className="flex items-center gap-2">
          {trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
          {trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
          <span className="text-xs text-gray-500">{recentRounds.length} score{recentRounds.length > 1 ? 's' : ''}</span>
        </div>
      </div>
      
      {/* Last round highlight - Design subtil */}
      {lastRoundScore !== undefined && (
        <motion.div 
          className={`mb-3 p-2 rounded-lg border-l-3 transition-all duration-200 ${
            isLastRoundDutch 
              ? 'bg-red-50/60 border-l-red-400 text-red-700' 
              : lastRoundScore === 0 
                ? 'bg-green-50/60 border-l-green-400 text-green-700'
                : 'bg-blue-50/60 border-l-blue-400 text-blue-700'
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium opacity-80">Dernière</span>
            <div className="flex items-center gap-1.5">
              {isLastRoundDutch && <Scissors className="h-3 w-3" />}
              <span className="font-bold text-base">{lastRoundScore}</span>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Rounds history */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {recentRounds.map((round, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 px-2 py-1 rounded-md text-xs font-medium border transition-all duration-200 ${
              round.isDutch
                ? 'bg-red-100/80 text-red-700 border-red-300/60'
                : round.score === 0
                  ? 'bg-green-100/80 text-green-700 border-green-300/60'
                  : 'bg-gray-100/80 text-gray-700 border-gray-300/60'
            }`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center gap-1">
              {round.isDutch && <Scissors className="h-2.5 w-2.5" />}
              <span>{round.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlayerCardRecentRounds;
