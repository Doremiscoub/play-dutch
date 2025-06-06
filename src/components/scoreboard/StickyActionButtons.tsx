
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Undo2, Square } from 'lucide-react';

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
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Main Add Round Button - Full width on mobile, max-width on desktop */}
          <Button 
            onClick={onAddRound}
            disabled={disabled}
            className="flex-1 max-w-md mx-auto h-12 bg-gradient-to-r from-dutch-blue to-dutch-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter une manche
          </Button>

          {/* Secondary Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="glass"
              size="icon"
              onClick={onUndoLastRound}
              disabled={!canUndo || disabled}
              className="h-12 w-12 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 transition-all duration-200"
              title="Annuler la dernière manche"
            >
              <Undo2 className="h-5 w-5 text-gray-600" />
            </Button>

            <Button
              variant="glass"
              size="icon"
              onClick={onEndGame}
              disabled={disabled}
              className="h-12 w-12 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 transition-all duration-200"
              title="Terminer la partie"
            >
              <Square className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyActionButtons;
