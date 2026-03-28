
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { logger } from '@/utils/logger';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  
  // Désactiver les transitions pour les routes critiques
  const disableTransition = location.pathname === '/setup';

  logger.debug('🔄 PageTransition render for path:', location.pathname);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      scale: prefersReducedMotion ? 1 : 1.02
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: prefersReducedMotion ? 0.1 : 0.2
  };

  if (disableTransition) {
    return (
      <div className="min-h-screen relative z-10">
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen relative z-10"
        onAnimationStart={() => logger.debug('🎭 Animation started for:', location.pathname)}
        onAnimationComplete={() => logger.debug('🎭 Animation completed for:', location.pathname)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
