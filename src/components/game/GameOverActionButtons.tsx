
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Plus } from 'lucide-react';

interface GameOverActionButtonsProps {
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
}

const GameOverActionButtons: React.FC<GameOverActionButtonsProps> = ({
  onRestart,
  onContinueGame
}) => {
  const [selectedLimit, setSelectedLimit] = useState<number>(50);

  const limits = [25, 50, 100];

  return (
    <div className="mt-8 space-y-4">
      <div>
        <h3 className="text-sm text-muted-foreground mb-3 text-center">Continuer la partie ?</h3>
        <div className="flex justify-center gap-2 mb-4">
          {limits.map(limit => (
            <Button
              key={limit}
              variant={selectedLimit === limit ? "default" : "outline"}
              size="sm"
              className={`rounded-full transition-colors ${
                selectedLimit === limit
                  ? "bg-dutch-blue text-white"
                  : "bg-white border border-border"
              }`}
              onClick={() => setSelectedLimit(limit)}
            >
              +{limit} pts
            </Button>
          ))}
        </div>

        <Button
          className="w-full bg-dutch-blue text-white hover:bg-dutch-blue/90 transition-colors rounded-2xl py-3"
          onClick={() => onContinueGame(selectedLimit)}
        >
          <Plus className="mr-2 h-5 w-5" />
          Continuer (+{selectedLimit} points)
        </Button>
      </div>

      <Button
        variant="outline"
        className="w-full bg-white border border-border rounded-2xl py-3"
        onClick={onRestart}
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Nouvelle partie
      </Button>
    </div>
  );
};

export default GameOverActionButtons;
