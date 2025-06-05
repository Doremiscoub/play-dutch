
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PlayerShuffleButtonProps {
  onShuffle: () => void;
  playerCount: number;
}

const PlayerShuffleButton: React.FC<PlayerShuffleButtonProps> = ({
  onShuffle,
  playerCount
}) => {
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.1 : 0.4 }
    }
  };

  if (playerCount <= 2) {
    return null;
  }

  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="flex justify-center"
    >
      <Button
        variant="ghost"
        onClick={onShuffle}
        className="bg-white/70 hover:bg-white/90 border border-dutch-purple/30 text-dutch-purple"
      >
        <Shuffle className="h-4 w-4 mr-2" />
        Mélanger l'ordre
      </Button>
    </motion.div>
  );
};

export default PlayerShuffleButton;
