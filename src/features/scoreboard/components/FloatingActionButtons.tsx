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
        bottom: 'max(env(safe-area-inset-bottom, 20px), 100px)',
        right: '16px',
        zIndex: 50
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
        whileTap={{ scale: 0.97 }}
        className="pointer-events-auto"
      >
        <Button
          onClick={onAddRound}
          disabled={disabled}
          variant="trinity"
          size="xl"
          className="relative group px-3 sm:px-6 py-2.5 sm:py-3 h-11 sm:h-14 rounded-full neon-blue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden min-w-[44px] hover:shadow-xl"
          aria-label="Ajouter une nouvelle manche"
        >
          {/* Contenu du bouton */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <div className="p-1 sm:p-1.5 rounded-full bg-white/20">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-white stroke-[3]" />
            </div>
            <span className="font-bold text-white whitespace-nowrap tracking-wide text-sm sm:text-lg hidden xs:inline">
              Ajouter une manche
            </span>
            <span className="font-bold text-white text-sm xs:hidden">
              Ajouter
            </span>
          </div>
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
          whileTap={{ scale: 0.96 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onUndoLastRound}
            disabled={!canUndo || disabled}
            className={`relative h-11 w-11 sm:h-12 sm:w-12 min-w-[44px] min-h-[44px] rounded-2xl transition-all duration-200 group overflow-hidden border-2 ${
              canUndo && !disabled
                ? 'bg-dutch-orange border-dutch-orange/60 hover:bg-dutch-orange/90 shadow-md hover:shadow-lg'
                : 'bg-muted-foreground/30 border-border opacity-70 cursor-not-allowed'
            }`}
            aria-label="Annuler la dernière manche"
            title="Annuler la dernière manche"
          >
            <RotateCcw className={`relative z-10 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200 stroke-[2.5] ${
              canUndo && !disabled
                ? 'text-white'
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
          whileTap={{ scale: 0.96 }}
          className="pointer-events-auto"
        >
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onEndGame}
            disabled={disabled}
            className="relative h-11 w-11 sm:h-12 sm:w-12 min-w-[44px] min-h-[44px] rounded-2xl bg-dutch-purple border-2 border-dutch-purple/60 hover:bg-dutch-purple/90 shadow-md hover:shadow-lg transition-all duration-200 group overflow-hidden"
            aria-label="Terminer la partie en cours"
            title="Terminer la partie"
          >
            <Flag className="relative z-10 h-4 w-4 sm:h-5 sm:w-5 text-white transition-all duration-200" />
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
