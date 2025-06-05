
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star } from 'lucide-react';

interface FloatingWinnerBadgeProps {
  isWinner: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}

const FloatingWinnerBadge: React.FC<FloatingWinnerBadgeProps> = ({ isWinner, cardRef }) => {
  if (!isWinner) return null;

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: cardRef.current ? cardRef.current.offsetLeft + cardRef.current.offsetWidth / 2 - 24 : 0,
        top: cardRef.current ? cardRef.current.offsetTop - 16 : 0,
      }}
      initial={{ opacity: 0, scale: 0, rotate: -180, y: 10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
    >
      <div className="relative">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-amber-200/50">
          <Crown className="h-8 w-8 text-amber-500 drop-shadow-sm" />
        </div>
        <motion.div
          className="absolute -inset-2"
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

export default FloatingWinnerBadge;
