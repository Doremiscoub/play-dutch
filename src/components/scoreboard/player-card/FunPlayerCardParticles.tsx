
import React from 'react';
import { motion } from 'framer-motion';

const FunPlayerCardParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {/* Primary Floating Orb */}
      <motion.div 
        className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-dutch-purple/20 via-dutch-blue/15 to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2],
          rotate: [0, 180],
          opacity: [0.3, 0.6],
          x: [0, 10],
          y: [0, -5]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut" 
        }}
      />
      
      {/* Secondary Floating Orb */}
      <motion.div 
        className="absolute -left-16 -bottom-16 w-64 h-64 bg-gradient-to-br from-dutch-orange/20 via-dutch-purple/15 to-transparent rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3],
          rotate: [0, 180],
          opacity: [0.2, 0.5],
          x: [0, -8],
          y: [0, 8]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 3
        }}
      />
      
      {/* Tertiary Accent Orb */}
      <motion.div 
        className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-dutch-blue/25 via-dutch-orange/15 to-transparent rounded-full blur-2xl"
        animate={{ 
          scale: [0.8, 1.1],
          opacity: [0.1, 0.4],
          rotate: [0, 180]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </div>
  );
};

export default FunPlayerCardParticles;
