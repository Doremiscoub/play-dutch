import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  emoji: string;
  name: string;
}

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({ emoji, name }) => {
  return (
    <motion.div 
      className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden",
        "bg-glass-surface backdrop-blur-md border border-glass-border shadow-glass-sm"
      )}
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      {/* Glassmorphism shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      
      <span className="text-xl relative z-10" aria-label={`Avatar for ${name}`}>
        {emoji || '🎮'}
      </span>
    </motion.div>
  );
};

export default PlayerAvatar;