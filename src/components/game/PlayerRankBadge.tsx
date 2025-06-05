import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlayerRankBadgeProps {
  position: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

export default function PlayerRankBadge({
  position,
  className,
  size = 'md',
  showAnimation = true
}: PlayerRankBadgeProps) {
  const getPositionClass = () => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-200 text-gray-700";
      case 3:
        return "bg-gradient-to-r from-amber-700 to-amber-600 text-amber-100";
      default:
        return position <= 5 
          ? "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white" 
          : "bg-gradient-to-r from-gray-500 to-gray-400 text-white";
    }
  };
  
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  return (
    <motion.div
      className={cn(
        "badge-rank flex items-center justify-center font-bold rounded-full shadow-md",
        getPositionClass(),
        sizeClasses[size],
        showAnimation && "gradient-shift",
        className
      )}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.5 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {position}
    </motion.div>
  );
}
