import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlayerScoreProps {
  totalScore: number;
  avgScore: number;
  scoreLimit?: number;
  theme: {
    text: string;
    accent: string;
    lightBg: string;
    border: string;
  };
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ 
  totalScore, 
  avgScore, 
  scoreLimit, 
  theme 
}) => {
  return (
    <motion.div 
      className="text-right"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className={cn(
          "relative px-3 py-2 rounded-xl backdrop-blur-md border overflow-hidden",
          "bg-glass-surface border-glass-border shadow-glass-md"
        )}
        whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
      >
        {/* Glassmorphism shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main score */}
        <motion.div 
          className={cn("text-2xl font-black leading-none", theme.text)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {totalScore}
        </motion.div>
        
        {/* Average score */}
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-60">📊</span>
          <span className="text-xs font-medium opacity-80">
            {avgScore} moy
          </span>
        </div>
        
        {/* Progress indicator */}
        {scoreLimit && (
          <div className="mt-2">
            <div className="w-full bg-white/20 rounded-full h-1">
              <motion.div 
                className={cn("h-1 rounded-full", theme.accent)}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(totalScore / scoreLimit * 100, 100)}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>
            <div className="text-xs opacity-60 mt-1 text-center">
              {Math.max(0, scoreLimit - totalScore)} restant
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PlayerScore;