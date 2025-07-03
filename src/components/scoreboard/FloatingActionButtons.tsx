import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Plus, RotateCcw, Flag } from 'lucide-react';
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
  const buttonsContent = (
    <div 
      className="fixed bottom-6 right-6 flex flex-col-reverse gap-4 pointer-events-none"
      style={{ 
        position: 'fixed', 
        zIndex: 999999,
        bottom: '24px',
        right: '24px'
      }}
    >
      {/* Bouton principal - Ajouter une manche (en bas) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 10 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="pointer-events-auto"
      >
        <Button
          onClick={onAddRound}
          disabled={disabled}
          className="relative px-6 py-4 h-14 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple hover:from-dutch-blue/90 hover:to-dutch-purple/90 text-white shadow-xl hover:shadow-dutch-blue/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border border-white/20 overflow-hidden backdrop-blur-sm"
        >
          {/* Effet de brillance subtil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
          
          <div className="relative z-10 flex items-center gap-3">
            <Plus className="h-5 w-5 text-white" />
            <span className="font-medium text-white whitespace-nowrap">Ajouter une manche</span>
          </div>
        </Button>
      </motion.div>

      {/* Boutons secondaires */}
      <div className="flex flex-col gap-3">
        {/* Bouton Annuler */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 150 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-12 w-12 rounded-full transition-all duration-300 group overflow-hidden border backdrop-blur-md ${
              canUndo && !disabled
                ? 'bg-white/90 hover:bg-white text-orange-600 hover:text-orange-700 shadow-lg hover:shadow-xl border-white/40 hover:border-orange-200'
                : 'bg-white/60 text-gray-400 cursor-not-allowed border-gray-200/60 shadow-md'
            }`}
            title="Annuler la dernière manche"
          >
            <RotateCcw className="relative z-10 h-4 w-4 group-hover:-rotate-12 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Bouton Terminer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 150 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-12 w-12 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-white/40 hover:border-gray-200 backdrop-blur-md"
            title="Terminer la partie"
          >
            <Flag className="relative z-10 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </div>
  );

  // Use createPortal to render directly in document.body
  return typeof document !== 'undefined' 
    ? createPortal(buttonsContent, document.body)
    : null;
};

export default FloatingActionButtons;