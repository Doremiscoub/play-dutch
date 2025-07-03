
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface FloatingWinnerBadgeProps {
  isWinner: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}

const FloatingWinnerBadge: React.FC<FloatingWinnerBadgeProps> = ({ isWinner, cardRef }) => {
  if (!isWinner) return null;

  return (
    <motion.div
      className="absolute -top-2 -right-2 z-40 pointer-events-none"
      initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        y: [0, -8, 0]
      }}
      exit={{ opacity: 0, scale: 0.3, rotate: 180 }}
      transition={{
        duration: 0.8,
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
    >
      <div className="relative">
        {/* Effet de lueur */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-lg opacity-60 animate-pulse"></div>
        
        {/* Badge principal */}
        <div className="relative bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-full p-3 shadow-xl border-2 border-white/80 backdrop-blur-sm">
          <Trophy className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingWinnerBadge;
