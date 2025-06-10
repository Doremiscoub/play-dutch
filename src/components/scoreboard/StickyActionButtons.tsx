
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-2xl border-t border-white/60 shadow-2xl">
      {/* Effet de lueur en haut */}
      <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange opacity-60"></div>
      
      <div className="max-w-4xl mx-auto px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Main Add Round Button - Bouton principal avec gradient animé */}
          <motion.div 
            className="flex-1 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={onAddRound}
              disabled={disabled}
              className="w-full h-16 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange hover:from-dutch-purple hover:to-dutch-orange text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg relative overflow-hidden group"
            >
              {/* Effet shimmer sur le bouton principal */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
              
              <motion.div 
                className="flex items-center justify-center gap-3 relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-7 w-7" />
                Ajouter une manche
              </motion.div>
            </Button>
          </motion.div>

          {/* Secondary Action Buttons avec glassmorphisme */}
          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onUndoLastRound}
                disabled={!canUndo || disabled}
                className="h-16 w-16 bg-white/70 hover:bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-white/60 hover:border-white/80 transition-all duration-300 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed group"
                title="Annuler la dernière manche"
              >
                <Undo2 className="h-7 w-7 text-gray-600 group-hover:text-dutch-blue transition-colors duration-200" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onEndGame}
                disabled={disabled}
                className="h-16 w-16 bg-white/70 hover:bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-white/60 hover:border-white/80 transition-all duration-300 hover:shadow-xl group"
                title="Terminer la partie"
              >
                <Square className="h-7 w-7 text-gray-600 group-hover:text-dutch-purple transition-colors duration-200" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyActionButtons;
