
import React from 'react';
import { motion } from 'framer-motion';

interface PlayerCardShineEffectProps {
  isWinner: boolean;
}

const PlayerCardShineEffect: React.FC<PlayerCardShineEffectProps> = ({ isWinner }) => {
  if (!isWinner) return null;

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "loop",
        ease: "linear"
      }}
    />
  );
};

export default PlayerCardShineEffect;
