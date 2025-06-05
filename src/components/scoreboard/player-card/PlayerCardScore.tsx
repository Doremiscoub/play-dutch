
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerCardScoreProps {
  score: number;
  rank: number;
  roundCount: number;
  isWinner: boolean;
}

const PlayerCardScore: React.FC<PlayerCardScoreProps> = ({ score, rank, roundCount, isWinner }) => {
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
    <div className="text-right ml-4">
      <motion.div
        className={cn(getScoreStyle(score), "tracking-tight mb-1 relative")}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, delay: rank * 0.1 + 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        {score}
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
        {roundCount} manche{roundCount > 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default PlayerCardScore;
