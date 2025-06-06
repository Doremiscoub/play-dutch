
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Undo2, Square } from 'lucide-react';
import { motion } from 'framer-motion';

interface StickyActionButtonsProps {
  onAddRound: () => void;
  onUndoLastRound: () => void;
  onEndGame: () => void;
  canUndo: boolean;
  disabled?: boolean;
}

const StickyActionButtons: React.FC<StickyActionButtonsProps> = ({
  onAddRound,
  onUndoLastRound,
  onEndGame,
  canUndo,
  disabled = false,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Main Add Round Button - Full width on mobile, max-width on desktop */}
          <motion.div 
            className="flex-1 max-w-md mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={onAddRound}
              disabled={disabled}
              className="w-full h-14 bg-gradient-to-r from-dutch-blue to-dutch-purple hover:from-dutch-purple hover:to-dutch-orange text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              <Plus className="h-6 w-6 mr-3" />
              Ajouter une manche
            </Button>
          </motion.div>

          {/* Secondary Action Buttons */}
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onUndoLastRound}
                disabled={!canUndo || disabled}
                className="h-14 w-14 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 transition-all duration-200 hover:shadow-lg"
                title="Annuler la dernière manche"
              >
                <Undo2 className="h-6 w-6 text-gray-600" />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onEndGame}
                disabled={disabled}
                className="h-14 w-14 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 transition-all duration-200 hover:shadow-lg"
                title="Terminer la partie"
              >
                <Square className="h-6 w-6 text-gray-600" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyActionButtons;
