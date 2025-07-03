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
      {/* Bouton principal - Ajouter une manche (en bas, centré) */}
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
          variant="trinity"
          size="xl"
          className="relative group px-8 py-4 h-16 rounded-full shadow-trinity transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {/* Arrière-plan semi-transparent pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-orange-500/20 rounded-full" />
          
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
          
          {/* Contenu du bouton avec contraste amélioré */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-1.5 rounded-full bg-white/30 backdrop-blur-sm">
              <Plus className="h-5 w-5 text-white stroke-[3] drop-shadow-lg" />
            </div>
            <span className="font-bold text-white whitespace-nowrap tracking-wide text-lg drop-shadow-lg">
              Ajouter une manche
            </span>
          </div>
          
          {/* Ombre colorée dynamique */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-orange-400/30 blur-xl -z-10 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </motion.div>

      {/* Boutons secondaires alignés avec le bouton principal */}
      <div className="flex flex-col gap-3 items-end" style={{ marginRight: '0px' }}>
        {/* Bouton Annuler */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: 40 }}
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
            variant="glass"
            size="icon-lg"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-14 w-14 rounded-full transition-all duration-300 group overflow-hidden shadow-glass hover:shadow-glass-lg ${
              canUndo && !disabled
                ? 'hover:border-trinity-orange-400 hover:text-trinity-orange-600'
                : 'opacity-50 cursor-not-allowed text-muted-foreground'
            }`}
            title="Annuler la dernière manche"
          >
            {/* Effet coloré au survol pour bouton actif */}
            {canUndo && !disabled && (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/60 to-orange-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            )}
            
            <RotateCcw className={`relative z-10 h-5 w-5 group-hover:-rotate-12 transition-transform duration-300 ${
              canUndo && !disabled ? 'group-hover:text-trinity-orange-700' : ''
            }`} />
          </Button>
        </motion.div>

        {/* Bouton Terminer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, x: 40 }}
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
            variant="glass"
            size="icon-lg"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-14 w-14 rounded-full shadow-glass hover:shadow-glass-lg transition-all duration-300 group overflow-hidden hover:border-trinity-purple-400 hover:text-trinity-purple-600"
            title="Terminer la partie"
          >
            {/* Effet coloré au survol */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 to-purple-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            
            <Flag className="relative z-10 h-5 w-5 group-hover:text-trinity-purple-700 group-hover:scale-110 transition-transform duration-300" />
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