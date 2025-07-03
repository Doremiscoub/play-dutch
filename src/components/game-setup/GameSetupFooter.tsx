
import React from 'react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Sparkles } from 'lucide-react';

interface GameSetupFooterProps {
  onStartGame: (playerNames: string[]) => void;
  playerNames: string[];
  canStartGame: boolean;
}

const GameSetupFooter: React.FC<GameSetupFooterProps> = ({ 
  onStartGame, 
  playerNames, 
  canStartGame 
}) => {
  return (
    <CardFooter className="bg-gradient-to-r from-neutral-50/80 via-background/60 to-neutral-50/80 border-t border-glass-border-light">
      <Button 
        onClick={() => onStartGame(playerNames)}
        className="w-full btn-glass-trinity font-display font-bold text-lg py-6 shadow-trinity"
        disabled={!canStartGame}
        size="lg"
      >
        <div className="flex items-center justify-center gap-3">
          <Play className="h-6 w-6" />
          <span>
            {canStartGame ? 'Commencer la partie' : 'Ajoutez des joueurs pour continuer'}
          </span>
          {canStartGame && <Sparkles className="h-5 w-5" />}
        </div>
      </Button>
    </CardFooter>
  );
};

export default GameSetupFooter;
