
import React from 'react';
import { Button } from '@/components/ui/button';

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
    <div className="sticky bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <Button 
          variant="dutch-primary"
          onClick={onAddRound}
          className="flex-1 h-14 text-base font-medium shadow-lg"
          disabled={disabled}
        >
          Ajouter une manche
        </Button>

        <Button
          variant="dutch-glass"
          size="icon"
          onClick={onUndoLastRound}
          disabled={!canUndo || disabled}
          className="h-12 w-12 backdrop-blur-xl"
        >
          <span className="sr-only">Annuler</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12H6.75a.75.75 0 0 0 0 1.5h4.19l-1.97 1.97a.75.75 0 1 0 1.06 1.06l3.22-3.22a.75.75 0 0 0 0-1.06l-3.22-3.22Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>

        <Button
          variant="dutch-glass"
          size="icon"
          onClick={onEndGame}
          disabled={disabled}
          className="h-12 w-12 backdrop-blur-xl"
        >
          <span className="sr-only">Terminer la partie</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V12a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5Zm-2.25 6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default StickyActionButtons;
