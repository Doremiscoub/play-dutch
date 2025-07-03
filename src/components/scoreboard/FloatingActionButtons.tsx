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
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {/* Bouton principal - Ajouter une manche */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onAddRound}
          disabled={disabled}
          size="lg"
          className="relative h-16 w-16 rounded-full bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange hover:from-dutch-purple hover:via-dutch-orange hover:to-dutch-blue text-white shadow-2xl hover:shadow-dutch-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group border-0 overflow-hidden"
        >
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
          
          {/* Icône */}
          <Plus className="relative z-10 h-7 w-7 group-hover:rotate-90 transition-transform duration-300 drop-shadow-lg" />
          
          {/* Ring effect au survol */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-dutch-blue/40 to-dutch-orange/40 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 -z-10 blur-md" />
        </Button>
      </motion.div>

      {/* Boutons secondaires */}
      <div className="flex flex-col gap-2">
        {/* Bouton Annuler */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-12 w-12 rounded-full backdrop-blur-xl shadow-xl border-0 transition-all duration-300 group overflow-hidden ${
              canUndo && !disabled
                ? 'bg-white/95 hover:bg-white text-dutch-blue hover:text-dutch-purple shadow-lg hover:shadow-xl'
                : 'bg-white/40 text-gray-400 cursor-not-allowed'
            }`}
            title="Annuler la dernière manche"
          >
            {/* Effet de brillance pour bouton actif */}
            {canUndo && !disabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dutch-blue/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            )}
            
            <Undo2 className="relative z-10 h-5 w-5 group-hover:rotate-12 transition-transform duration-200 drop-shadow-sm" />
          </Button>
        </motion.div>

        {/* Bouton Terminer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-12 w-12 rounded-full bg-white/95 hover:bg-white backdrop-blur-xl shadow-xl border-0 text-dutch-purple hover:text-dutch-orange transition-all duration-300 group overflow-hidden"
            title="Terminer la partie"
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dutch-purple/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            
            <Square className="relative z-10 h-5 w-5 group-hover:rotate-45 transition-transform duration-300 drop-shadow-sm" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingActionButtons;