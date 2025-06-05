
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star } from 'lucide-react';

interface PlayerCardWinnerCrownProps {
  isWinner: boolean;
}

const PlayerCardWinnerCrown: React.FC<PlayerCardWinnerCrownProps> = ({ isWinner }) => {
  if (!isWinner) return null;

  return (
    <motion.div
      className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, scale: 0, rotate: -180, y: 10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
    >
      <div className="relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-amber-200/50">
          <Crown className="h-8 w-8 text-amber-500 drop-shadow-sm" />
        </div>
        <motion.div
          className="absolute -inset-2 z-50"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Star className="h-12 w-12 text-amber-400 opacity-30" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerCardWinnerCrown;
