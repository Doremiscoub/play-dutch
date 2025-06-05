
import React from 'react';
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

interface AnimatedPlayerBadgeProps {
  position: number;
  isFirst?: boolean;
  className?: string;
}

const AnimatedPlayerBadge: React.FC<AnimatedPlayerBadgeProps> = ({ 
  position, 
  isFirst = false, 
  className = "" 
}) => {
  return (
    <motion.div 
      className={`w-10 h-10 rounded-xl bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 flex items-center justify-center text-sm font-bold text-dutch-blue border-2 border-dutch-blue/30 relative ${className}`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {position}
      {isFirst && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className="h-4 w-4 text-yellow-500" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedPlayerBadge;
