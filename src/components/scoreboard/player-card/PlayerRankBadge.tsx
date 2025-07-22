import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlayerRankBadgeProps {
  rank: number;
  isWinner: boolean;
}

const PlayerRankBadge: React.FC<PlayerRankBadgeProps> = ({ rank, isWinner }) => {
  const getRankTheme = () => {
    const themes = {
      1: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
      2: "bg-gradient-to-br from-orange-500 to-orange-600 text-white", 
      3: "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white",
      4: "bg-gradient-to-br from-green-500 to-green-600 text-white",
      5: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
    };
    return themes[rank as keyof typeof themes] || "bg-gradient-to-br from-gray-500 to-gray-600 text-white";
  };

  return (
    <motion.div 
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-md overflow-hidden",
        getRankTheme()
      )}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-glass-surface/20 backdrop-blur-sm" />
      
      {/* Winner crown */}
      {isWinner && (
        <motion.div 
          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <span className="text-[8px]">👑</span>
        </motion.div>
      )}
      
      <span className="relative z-10 font-black">{rank}</span>
    </motion.div>
  );
};

export default PlayerRankBadge;