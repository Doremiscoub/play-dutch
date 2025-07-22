import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlayerInfoProps {
  name: string;
  isWinner: boolean;
  roundsCount: number;
  dutchCount: number;
  theme: {
    text: string;
  };
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ 
  name, 
  isWinner, 
  roundsCount, 
  dutchCount, 
  theme 
}) => {
  return (
    <div className="flex-1 min-w-0">
      <motion.h3 
        className={cn(
          "text-xl font-black truncate leading-tight",
          "bg-gradient-to-r from-current to-current bg-clip-text",
          theme.text
        )}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {isWinner && '👑 '}{name}
      </motion.h3>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <span className="flex items-center gap-1">
          🎯 <span className="font-medium">{roundsCount}</span>
        </span>
        {dutchCount > 0 && (
          <span className="flex items-center gap-1 text-orange-600">
            🏆 <span className="font-medium">{dutchCount}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;