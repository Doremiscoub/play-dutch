
import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GameSetupHeaderProps {
  title: string;
  subtitle: string;
}

const GameSetupHeader: React.FC<GameSetupHeaderProps> = ({ title, subtitle }) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center space-y-4"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent"
      >
        {title}
      </motion.h1>
      <motion.p 
        variants={itemVariants}
        className="text-lg text-gray-600"
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default GameSetupHeader;
