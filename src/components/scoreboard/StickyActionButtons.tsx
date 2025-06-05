
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Nouvelle manche */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button
          onClick={onAddRound}
          variant="gradient"
          size="icon-lg"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl bg-gradient-to-r from-dutch-blue to-dutch-purple"
          title="Nouvelle manche"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Annuler */}
      {canUndo && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            onClick={onUndo}
            variant="ghost"
            size="icon-lg"
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-md hover:shadow-lg text-dutch-purple hover:bg-white/90"
            title="Annuler la dernière manche"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </motion.div>
      )}

      {/* Terminer la partie */}
      {canEndGame && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            onClick={onEndGame}
            variant="ghost"
            size="icon-lg"
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-md hover:shadow-lg text-dutch-orange hover:bg-white/90"
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
