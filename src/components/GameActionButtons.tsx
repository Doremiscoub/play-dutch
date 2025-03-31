
import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad, Flag, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameActionButtonsProps {
  onUndoLastRound: () => void;
  onEndGame: () => void;
  onAddRound: () => void;
}

const GameActionButtons: React.FC<GameActionButtonsProps> = ({
  onUndoLastRound,
  onEndGame,
  onAddRound
}) => {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 flex items-center gap-3 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onUndoLastRound}
          variant="game-control"
          size="game-icon"
          className="shadow-md hover:shadow-lg"
          aria-label="Annuler la dernière manche"
        >
          <Undo2 className="h-5 w-5" />
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onEndGame}
          variant="game-control"
          size="game-icon"
          className="shadow-md hover:shadow-lg"
          aria-label="Terminer la partie"
        >
          <Flag className="h-5 w-5" />
        </Button>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dutch-orange via-dutch-pink to-dutch-orange rounded-full blur-[2px] opacity-30 animate-pulse-soft" />
        <Button
          onClick={onAddRound}
          variant="game-action"
          size="floating"
          className="shadow-lg hover:shadow-xl"
          aria-label="Nouvelle manche"
        >
          <Gamepad className="h-6 w-6" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default GameActionButtons;
