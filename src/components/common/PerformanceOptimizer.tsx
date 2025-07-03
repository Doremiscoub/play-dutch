import React from 'react';
import { motion } from 'framer-motion';

const PerformanceOptimizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Optimisation des animations selon les préférences de l'utilisateur
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Configuration d'animation adaptative
  const animationConfig = {
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    animate: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }
  };

  return (
    <motion.div
      {...animationConfig}
      style={{
        willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
        transform: 'translateZ(0)' // Force GPU acceleration
      }}
    >
      {children}
    </motion.div>
  );
};

export default PerformanceOptimizer;