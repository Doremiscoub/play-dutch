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
  hideWhenModalOpen?: boolean;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onAddRound,
  onUndoLastRound,
  onEndGame,
  canUndo,
  disabled = false,
  hideWhenModalOpen = false,
}) => {
  // Ne pas afficher les boutons si un modal est ouvert
  if (hideWhenModalOpen) return null;
  const buttonsContent = (
    <div 
      className={`floating-action-buttons fixed right-4 sm:right-6 flex flex-col-reverse gap-2 sm:gap-3 pointer-events-none ${hideWhenModalOpen ? 'floating-buttons-hidden' : ''}`}
      style={{ 
        position: 'fixed', 
        bottom: 'max(env(safe-area-inset-bottom, 20px), 80px)',
        right: '16px',
        zIndex: 40
      }}
    >
      {/* Bouton principal - Ajouter une manche (en bas, centré) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.1 
        }}
        whileHover={{ 
          scale: 1.03, 
          y: -2,
          transition: { duration: 0.15 }
        }}
        whileTap={{ scale: 0.97 }}
        className="pointer-events-auto"
      >
        <Button
          onClick={onAddRound}
          disabled={disabled}
          variant="trinity"
          size="xl"
          className="relative group px-3 sm:px-6 py-2.5 sm:py-3 h-11 sm:h-14 rounded-full lg-elevation-04 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden min-w-[44px]"
          aria-label="Ajouter une nouvelle manche"
        >
          {/* Arrière-plan semi-transparent pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-orange-500/20 rounded-full" />
          
          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
          
          {/* Contenu du bouton avec contraste amélioré */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <div className="p-1 sm:p-1.5 rounded-full bg-white/30 backdrop-blur-sm">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-white stroke-[3] drop-shadow-lg" />
            </div>
            <span className="font-bold text-white whitespace-nowrap tracking-wide text-sm sm:text-lg drop-shadow-lg hidden xs:inline">
              Ajouter une manche
            </span>
            <span className="font-bold text-white text-sm drop-shadow-lg xs:hidden">
              Ajouter
            </span>
          </div>
          
          {/* Ombre colorée dynamique */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-orange-400/30 blur-xl -z-10 group-hover:scale-110 transition-transform duration-300" />
        </Button>
      </motion.div>

      {/* Boutons secondaires alignés avec le bouton principal */}
      <div className="flex flex-col gap-2 sm:gap-3 items-end" style={{ marginRight: '0px' }}>
        {/* Bouton Annuler */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.05, 
            type: "spring", 
            stiffness: 150,
            damping: 12 
          }}
          whileHover={{ 
            scale: 1.05, 
            transition: { duration: 0.1 }
          }}
          whileTap={{ scale: 0.96 }}
          className="pointer-events-auto"
        >
          <Button
            variant="liquidPopover"
            size="icon-lg"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-11 w-11 sm:h-12 sm:w-12 min-w-[44px] min-h-[44px] rounded-2xl transition-all duration-200 group overflow-hidden backdrop-blur-xl border-2 ${
              canUndo && !disabled
                ? 'bg-gradient-to-br from-orange-600/95 via-orange-500/90 to-red-600/85 border-orange-200/70 hover:border-orange-100/90 shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-600/35'
                : 'bg-gray-600/85 border-gray-300/60 opacity-70 cursor-not-allowed'
            }`}
            aria-label="Annuler la dernière manche"
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
            
            <RotateCcw className={`relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 stroke-[2.5] ${
              canUndo && !disabled 
                ? 'text-white drop-shadow-lg group-hover:-rotate-12 group-hover:scale-110' 
                : 'text-white/80'
            }`} />
          </Button>
        </motion.div>

        {/* Bouton Terminer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.02, 
            type: "spring", 
            stiffness: 150,
            damping: 12 
          }}
          whileHover={{ 
            scale: 1.05, 
            transition: { duration: 0.1 }
          }}
          whileTap={{ scale: 0.96 }}
          className="pointer-events-auto"
        >
          <Button
            variant="liquidPopover"
            size="icon-lg"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-11 w-11 sm:h-12 sm:w-12 min-w-[44px] min-h-[44px] rounded-2xl bg-gradient-to-br from-purple-500/80 via-purple-400/70 to-blue-500/60 border-2 border-purple-300/50 hover:border-purple-200/70 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-200 group overflow-hidden backdrop-blur-xl"
            aria-label="Terminer la partie en cours"
            title="Terminer la partie"
          >
            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out rounded-2xl" />
            
            {/* Particules flottantes */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-ping" />
              <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-purple-200/80 rounded-full animate-pulse" />
            </div>
            
            <Flag className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
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