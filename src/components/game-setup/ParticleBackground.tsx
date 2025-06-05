
import React from 'react';
import { motion } from 'framer-motion';

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  particleCount = 20, 
  className = "" 
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-dutch-blue/30 to-dutch-purple/30 rounded-full"
          animate={{
            x: [0, Math.random() * 300 - 150, 0],
            y: [0, Math.random() * 300 - 150, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
