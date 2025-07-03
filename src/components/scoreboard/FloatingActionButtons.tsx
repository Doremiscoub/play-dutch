import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Undo2, Square } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingActionButtonsProps {
  onAddRound: () => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
  canUndo: boolean;
  disabled?: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onAddRound,
  onUndoLastRound,
  onEndGame,
  canUndo,
  disabled = false,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3" style={{ position: 'fixed' }}>
      {/* Add Round Button - Primary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onAddRound}
          disabled={disabled}
          size="lg"
          className="h-16 w-16 rounded-full bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange hover:from-dutch-purple hover:via-dutch-orange hover:to-dutch-blue text-white shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group border-2 border-white/20 backdrop-blur-sm"
        >
          <Plus className="h-7 w-7 group-hover:scale-110 transition-transform drop-shadow-sm" />
        </Button>
      </motion.div>

      {/* Secondary Actions */}
      <div className="flex flex-col gap-2">
        {/* Undo Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className="h-12 w-12 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border-2 border-dutch-blue/20 hover:border-dutch-blue/40 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed group"
            title="Annuler la dernière manche"
          >
            <Undo2 className="h-5 w-5 text-dutch-blue group-hover:text-dutch-purple transition-colors drop-shadow-sm" />
          </Button>
        </motion.div>

        {/* End Game Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={onEndGame}
            disabled={disabled}
            className="h-12 w-12 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl border-2 border-dutch-purple/20 hover:border-dutch-purple/40 transition-all duration-300 shadow-lg hover:shadow-xl group"
            title="Terminer la partie"
          >
            <Square className="h-5 w-5 text-dutch-purple group-hover:text-dutch-orange transition-colors drop-shadow-sm" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingActionButtons;