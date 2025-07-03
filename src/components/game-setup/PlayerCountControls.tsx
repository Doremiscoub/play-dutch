
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PlayerCountControlsProps {
  playerCount: number;
  onAddPlayer: () => void;
  onRemovePlayer: () => void;
  minPlayers?: number;
  maxPlayers?: number;
}

const PlayerCountControls: React.FC<PlayerCountControlsProps> = ({
  playerCount,
  onAddPlayer,
  onRemovePlayer,
  minPlayers = 2,
  maxPlayers = 10
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

  return (
    <motion.div 
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center gap-8"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemovePlayer}
        disabled={playerCount <= minPlayers}
        className="h-16 w-16 rounded-2xl btn-glass hover:border-trinity-blue-400 text-trinity-blue-600 disabled:opacity-30"
      >
        <Minus className="h-8 w-8" />
      </Button>

      <div className="text-6xl font-bold text-trinity font-display min-w-[120px] text-center">
        {playerCount}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onAddPlayer}
        disabled={playerCount >= maxPlayers}
        className="h-16 w-16 rounded-2xl btn-glass hover:border-trinity-orange-400 text-trinity-orange-600 disabled:opacity-30"
      >
        <Plus className="h-8 w-8" />
      </Button>
    </motion.div>
  );
};

export default PlayerCountControls;
