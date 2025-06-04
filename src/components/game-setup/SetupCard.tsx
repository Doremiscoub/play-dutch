
import React from 'react';
import { motion } from 'framer-motion';
import { GameCard } from '@/components/ui/game-card';
import { GameText } from '@/components/ui/game-typography';

interface SetupCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const SetupCard: React.FC<SetupCardProps> = ({ title, children, delay = 0 }) => {
  const transitionProps = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };
  
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...transitionProps, delay }}
      whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
    >
      <GameCard variant="glass" className="mb-8 p-6">
        <GameText variant="cardTitle" gameColor="primary" className="mb-4">
          {title}
        </GameText>
        {children}
      </GameCard>
    </motion.div>
  );
};

export default SetupCard;
