
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, RotateCcw, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StickyActionButtonsProps {
  onAddRound: () => void;
  onUndo: () => void;
  onEndGame: () => void;
  canUndo: boolean;
  canEndGame: boolean;
}

const StickyActionButtons: React.FC<StickyActionButtonsProps> = ({
  onAddRound,
  onUndo,
  onEndGame,
  canUndo,
  canEndGame
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      {/* Nouvelle manche - Toujours visible */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          onClick={onAddRound}
          variant="y2k-blue"
          size="icon-lg"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl"
          title="Nouvelle manche"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Annuler - Visible si on peut annuler */}
      {canUndo && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            onClick={onUndo}
            variant="vision-glass"
            size="icon-lg"
            className="w-12 h-12 rounded-full shadow-md hover:shadow-lg text-dutch-purple"
            title="Annuler la dernière manche"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </motion.div>
      )}

      {/* Terminer la partie - Toujours visible si la partie peut se terminer */}
      {canEndGame && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            onClick={onEndGame}
            variant="vision-glass"
            size="icon-lg"
            className="w-12 h-12 rounded-full shadow-md hover:shadow-lg text-dutch-orange"
            title="Terminer la partie"
          >
            <Flag className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default StickyActionButtons;
