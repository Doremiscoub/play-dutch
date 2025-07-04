
import React from 'react';
import { motion } from 'framer-motion';

interface FunPlayerCardRankBadgeProps {
  rank: number;
  isWinner: boolean;
}

const FunPlayerCardRankBadge: React.FC<FunPlayerCardRankBadgeProps> = ({
  rank,
  isWinner
}) => {
  return (
    <motion.div
      className="absolute -top-4 -left-4 z-60 bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange text-white text-lg font-black rounded-full w-12 h-12 flex items-center justify-center shadow-glass-lg border-3 border-white/90 backdrop-blur-sm"
      initial={{ scale: 0, rotate: -270, z: -100 }}
      animate={{ scale: 1, rotate: 0, z: 0 }}
      transition={{ 
        delay: rank * 0.1 + 0.4, 
        type: "spring", 
        stiffness: 200,
        damping: 12
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: 15,
        z: 30,
        boxShadow: "0 15px 35px rgba(10, 132, 255, 0.4)"
      }}
    >
      <motion.span
        animate={isWinner ? {
          scale: [1, 1.1]
        } : {}}
        transition={{
          duration: 2,
          repeat: isWinner ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {rank}
      </motion.span>
    </motion.div>
  );
};

export default FunPlayerCardRankBadge;
