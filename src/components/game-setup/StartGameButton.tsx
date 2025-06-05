
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StartGameButtonProps {
  onStartGame: () => void;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({ onStartGame }) => {
  const prefersReducedMotion = useReducedMotion();

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
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center pt-8"
    >
      <Button
        onClick={onStartGame}
        size="lg"
        className="bg-gradient-to-r from-dutch-blue-500 via-dutch-purple-500 to-dutch-orange-500 text-white font-bold text-xl px-12 py-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <Play className="h-6 w-6 mr-3" />
        Lancer la partie
      </Button>
    </motion.div>
  );
};

export default StartGameButton;
