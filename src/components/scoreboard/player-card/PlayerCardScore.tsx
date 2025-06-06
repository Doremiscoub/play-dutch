
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface PlayerCardScoreProps {
  score: number;
  rank: number;
  roundCount: number;
  isWinner: boolean;
}

const PlayerCardScore: React.FC<PlayerCardScoreProps> = ({
  score,
  rank,
  roundCount,
  isWinner
}) => {
  const getTrendIcon = () => {
    if (rank <= 2) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (rank >= 4) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };

  return (
    <motion.div
      className="text-right"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: rank * 0.1 + 0.2 }}
    >
      {/* Score principal avec effets pour le gagnant */}
      <motion.div
        className={`text-4xl font-black mb-1 ${
          isWinner 
            ? 'bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent' 
            : 'text-gray-800'
        }`}
        animate={isWinner ? {
          scale: [1, 1.05, 1],
          textShadow: [
            '0 0 0px rgba(255, 215, 0, 0)',
            '0 0 20px rgba(255, 215, 0, 0.8)',
            '0 0 0px rgba(255, 215, 0, 0)'
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: isWinner ? Infinity : 0,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
      >
        {score}
      </motion.div>
      
      {/* Indicateur de tendance avec animation */}
      <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {roundCount} manches
        </motion.span>
        {getTrendIcon() && (
          <motion.div
            animate={{ 
              y: rank <= 2 ? [-2, 0, -2] : [2, 0, 2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {getTrendIcon()}
          </motion.div>
        )}
      </div>
      
      {/* Badge de position avec glow pour le gagnant */}
      {isWinner && (
        <motion.div
          className="mt-2 inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
          animate={{
            boxShadow: [
              '0 0 0px rgba(255, 215, 0, 0)',
              '0 0 15px rgba(255, 215, 0, 0.8)',
              '0 0 0px rgba(255, 215, 0, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            👑
          </motion.div>
          Champion
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlayerCardScore;
