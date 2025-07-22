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
          className="relative group px-8 py-4 h-16 rounded-full lg-elevation-04 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
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
            variant="liquidPopover"
            size="icon-lg"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-14 w-14 rounded-2xl transition-all duration-300 group overflow-hidden backdrop-blur-xl border-2 ${
              canUndo && !disabled
                ? 'bg-gradient-to-br from-orange-600/95 via-orange-500/90 to-red-600/85 border-orange-200/70 hover:border-orange-100/90 shadow-xl shadow-orange-600/30 hover:shadow-2xl hover:shadow-orange-600/40 hover:scale-105'
                : 'bg-gray-600/85 border-gray-300/60 opacity-70 cursor-not-allowed'
            }`}
            title="Annuler la dernière manche"
          >
            {/* Fond blanc pour améliorer la visibilité */}
            <div className="absolute inset-0 bg-white/10 rounded-2xl" />
            
            {/* Effet de brillance au survol */}
            {canUndo && !disabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out rounded-2xl" />
            )}
            
            {/* Particules flottantes pour bouton actif */}
            {canUndo && !disabled && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 left-2 w-1 h-1 bg-white/70 rounded-full animate-ping" />
                <div className="absolute bottom-3 right-2 w-1.5 h-1.5 bg-orange-100/90 rounded-full animate-pulse" />
              </div>
            )}
            
            <RotateCcw className={`relative z-10 h-5 w-5 transition-all duration-300 stroke-[2.5] ${
              canUndo && !disabled 
                ? 'text-white drop-shadow-lg group-hover:-rotate-12 group-hover:scale-110' 
                : 'text-white/80'
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
            variant="liquidPopover"
            size="icon-lg"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/80 via-purple-400/70 to-blue-500/60 border-2 border-purple-300/50 hover:border-purple-200/70 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 group overflow-hidden backdrop-blur-xl hover:scale-105"
            title="Terminer la partie"
          >
            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out rounded-2xl" />
            
            {/* Particules flottantes */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-ping" />
              <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-purple-200/80 rounded-full animate-pulse" />
            </div>
            
            <Flag className="relative z-10 h-5 w-5 text-white drop-shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
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