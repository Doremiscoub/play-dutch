
// This is a read-only file, so we can't modify it directly.
// Instead, let's create a new component that wraps ScoreBoard and adds our custom floating buttons.

import React from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Plus, Clock, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FloatingButtonsProps {
  onAddRound: () => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onAddRound,
  onUndoLastRound,
  onEndGame
}) => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
      >
        <Button
          onClick={onEndGame}
          size="icon"
          variant="pill-blue"
          className="bg-white text-dutch-blue shadow-lg border border-dutch-blue/20"
        >
          <Clock className="h-5 w-5" />
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.3 }}
      >
        <Button
          onClick={onUndoLastRound}
          size="icon"
          variant="pill-blue"
          className="bg-white text-dutch-orange shadow-lg border border-dutch-orange/20"
        >
          <ArrowUp className="h-5 w-5 transform -rotate-45" />
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onAddRound}
          variant="pill-purple"
          size="pill-lg"
          className="px-8 bg-gradient-to-r from-dutch-purple to-dutch-blue shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle manche
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingButtons;
