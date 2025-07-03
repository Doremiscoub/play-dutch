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
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none" style={{ position: 'fixed', zIndex: 99999 }}>
      {/* Bouton principal - Ajouter une manche */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 10 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="pointer-events-auto"
      >
        <Button
          onClick={onAddRound}
          disabled={disabled}
          size="lg"
          className="relative h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 hover:from-emerald-500 hover:via-blue-600 hover:to-purple-700 text-white shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group border-2 border-white/40 overflow-hidden backdrop-blur-sm"
        >
          {/* Particules animées */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-2 left-3 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
            <div className="absolute top-4 right-2 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-3 left-2 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Effet de brillance rotatif */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
          
          <Plus className="relative z-20 h-8 w-8 text-white group-hover:rotate-180 transition-transform duration-500 drop-shadow-lg stroke-[2.5]" />
          
          {/* Halo au survol */}
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />
        </Button>
      </motion.div>

      {/* Boutons secondaires avec design amélioré */}
      <div className="flex flex-col gap-3">
        {/* Bouton Annuler */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 150 }}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-14 w-14 rounded-full transition-all duration-300 group overflow-hidden border-2 backdrop-blur-sm ${
              canUndo && !disabled
                ? 'bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white shadow-xl hover:shadow-orange-500/30 border-white/40'
                : 'bg-gray-200/80 text-gray-400 cursor-not-allowed border-gray-300/40 shadow-md'
            }`}
            title="Annuler la dernière manche"
          >
            {/* Effet pulsant pour bouton actif */}
            {canUndo && !disabled && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-600" />
                <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
              </>
            )}
            
            <Undo2 className="relative z-10 h-6 w-6 group-hover:-rotate-12 transition-transform duration-300 drop-shadow-sm" />
          </Button>
        </motion.div>

        {/* Bouton Terminer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 150 }}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-xl hover:shadow-purple-500/30 transition-all duration-300 group overflow-hidden border-2 border-white/40 backdrop-blur-sm"
            title="Terminer la partie"
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-600" />
            
            {/* Points lumineux */}
            <div className="absolute top-2 right-3 w-1 h-1 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-3 w-1 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <Square className="relative z-10 h-6 w-6 group-hover:rotate-90 transition-transform duration-400 drop-shadow-sm" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingActionButtons;