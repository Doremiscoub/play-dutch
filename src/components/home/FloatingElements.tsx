
import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FloatingElements: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 backdrop-blur-xl"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            scale: 0.8,
            opacity: 0.3
          }}
          animate={prefersReducedMotion ? {
            opacity: [0.3, 0.5, 0.3]
          } : { 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            scale: [0.8, 1, 0.9],
            opacity: [0.3, 0.6, 0.4]
          }}
          transition={{
            duration: prefersReducedMotion ? 8 : 25 + i * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
