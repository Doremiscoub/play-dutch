
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';

interface PlayerCardRecentRoundsProps {
  player: Player;
  rank: number;
  colors: {
    gradient: string;
    border: string;
    glow: string;
    text: string;
  };
}

const PlayerCardRecentRounds: React.FC<PlayerCardRecentRoundsProps> = ({ 
  player, 
  rank,
  colors 
}) => {
  const recentRounds = player.rounds.slice(-5); // 5 dernières manches
  
  if (recentRounds.length === 0) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-2">🎯</div>
        <p className="text-gray-500 text-sm">Aucune manche jouée</p>
      </div>
    );
  }

  const getScoreEmoji = (score: number) => {
    if (score === 0) return '🎯';
    if (score <= 5) return '🔥';
    if (score <= 10) return '✨';
    if (score <= 15) return '👍';
    if (score <= 25) return '😐';
    return '💀';
  };

  const getScoreColor = (score: number) => {
    if (score === 0) return 'text-purple-600 bg-purple-100/80 border-purple-200';
    if (score <= 5) return 'text-green-600 bg-green-100/80 border-green-200';
    if (score <= 10) return 'text-blue-600 bg-blue-100/80 border-blue-200';
    if (score <= 15) return 'text-yellow-600 bg-yellow-100/80 border-yellow-200';
    if (score <= 25) return 'text-orange-600 bg-orange-100/80 border-orange-200';
    return 'text-red-600 bg-red-100/80 border-red-200';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📈</span>
        <h4 className={`font-bold ${colors.text}`}>
          Dernières manches
        </h4>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {recentRounds.map((round, index) => (
          <motion.div
            key={`round-${player.rounds.length - recentRounds.length + index}`}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-xl border backdrop-blur-sm
              transition-all duration-300 ${getScoreColor(round.score)}
            `}
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
          >
            <motion.span 
              className="text-base"
              animate={{ 
                rotate: round.score === 0 ? [0, 10, -10, 0] : 0,
                scale: round.score === 0 ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: round.score === 0 ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {getScoreEmoji(round.score)}
            </motion.span>
            
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {round.score}
              </span>
              {round.isDutch && (
                <motion.span 
                  className="text-xs font-medium text-orange-600"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🏆 Dutch
                </motion.span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Résumé des performances */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg mb-1">🔥</div>
            <div className="text-xs text-gray-600">Excellents</div>
            <div className={`font-bold ${colors.text}`}>
              {recentRounds.filter(r => r.score <= 5).length}
            </div>
          </div>
          
          <div>
            <div className="text-lg mb-1">👍</div>
            <div className="text-xs text-gray-600">Corrects</div>
            <div className={`font-bold ${colors.text}`}>
              {recentRounds.filter(r => r.score > 5 && r.score <= 15).length}
            </div>
          </div>
          
          <div>
            <div className="text-lg mb-1">💀</div>
            <div className="text-xs text-gray-600">Difficiles</div>
            <div className={`font-bold ${colors.text}`}>
              {recentRounds.filter(r => r.score > 15).length}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlayerCardRecentRounds;
