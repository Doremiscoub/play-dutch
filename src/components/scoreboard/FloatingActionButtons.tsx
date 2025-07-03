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
        bottom: '20px',
        right: '20px'
      }}
    >
      {/* Bouton principal - Ajouter une manche (en bas) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          delay: 0.2 
        }}
        whileHover={{ 
          scale: 1.05, 
          y: -4,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.98 }}
        className="pointer-events-auto"
      >
        <Button
          onClick={onAddRound}
          disabled={disabled}
          className="relative group px-6 py-4 h-16 rounded-full shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--dutch-blue)), hsl(var(--dutch-purple)))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
          
          {/* Contenu du bouton */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-1 rounded-full bg-white/20">
              <Plus className="h-5 w-5 text-white stroke-[2.5]" />
            </div>
            <span className="font-semibold text-white whitespace-nowrap tracking-wide">
              Ajouter une manche
            </span>
          </div>
          
          {/* Ombre colorée dynamique */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl -z-10 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </motion.div>

      {/* Boutons secondaires avec design glassmorphic amélioré */}
      <div className="flex flex-col gap-3">
        {/* Bouton Annuler */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.1, 
            type: "spring", 
            stiffness: 120,
            damping: 12 
          }}
          whileHover={{ 
            scale: 1.08, 
            transition: { duration: 0.15 }
          }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-14 w-14 rounded-full transition-all duration-300 group overflow-hidden backdrop-blur-md shadow-lg hover:shadow-xl ${
              canUndo && !disabled
                ? 'bg-white/90 hover:bg-white text-orange-600 hover:text-orange-700 border border-orange-200/50 hover:border-orange-300/70'
                : 'bg-white/60 text-gray-400 cursor-not-allowed border border-gray-200/60'
            }`}
            title="Annuler la dernière manche"
          >
            {/* Effet subtil au survol pour bouton actif */}
            {canUndo && !disabled && (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            )}
            
            <RotateCcw className="relative z-10 h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Bouton Terminer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.05, 
            type: "spring", 
            stiffness: 120,
            damping: 12 
          }}
          whileHover={{ 
            scale: 1.08, 
            transition: { duration: 0.15 }
          }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-14 w-14 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-200/50 hover:border-gray-300/70 backdrop-blur-md"
            title="Terminer la partie"
          >
            {/* Effet subtil au survol */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-gray-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            
            <Flag className="relative z-10 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
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