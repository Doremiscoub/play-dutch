
import React from 'react';
import { motion } from 'framer-motion';

interface FunPlayerCardHolographicEffectProps {
  isWinner: boolean;
  isLastPlace: boolean;
}

const FunPlayerCardHolographicEffect: React.FC<FunPlayerCardHolographicEffectProps> = ({
  isWinner,
  isLastPlace
}) => {
  if (!isWinner && !isLastPlace) return null;

  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        animate={{ x: ['-100%', '100%'] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
        animate={{ y: ['-100%', '100%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
      />
    </div>
  );
};

export default FunPlayerCardHolographicEffect;
