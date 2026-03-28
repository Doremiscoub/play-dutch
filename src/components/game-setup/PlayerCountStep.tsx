import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus } from 'lucide-react';
import { MIN_PLAYERS, MAX_PLAYERS } from './types';

interface PlayerCountStepProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  onNext: () => void;
}

const PlayerCountStep: React.FC<PlayerCountStepProps> = ({
  playerCount,
  onPlayerCountChange,
  onNext
}) => {
  const incrementCount = () => {
    if (playerCount < MAX_PLAYERS) {
      onPlayerCountChange(playerCount + 1);
    }
  };

  const decrementCount = () => {
    if (playerCount > MIN_PLAYERS) {
      onPlayerCountChange(playerCount - 1);
    }
  };

  return (
    <Card className="p-6 text-center space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-2">
          Combien de joueurs ?
        </h2>
        <p className="text-gray-500 text-base sm:text-lg">
          Choisissez le nombre de participants pour votre partie de Dutch
        </p>
      </div>

      {/* Player count selector */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 px-4">
        <Button
          variant="outline"
          size="icon-lg"
          onClick={decrementCount}
          disabled={playerCount <= MIN_PLAYERS}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl text-lg font-bold"
          aria-label="Retirer un joueur"
        >
          <Minus className="h-5 w-5" />
        </Button>

        <div className="text-center flex-1 max-w-[140px] py-4">
          <div className="text-6xl sm:text-7xl font-display font-bold text-blue-600 mb-1 leading-none">
            {playerCount}
          </div>
          <div className="text-sm sm:text-base text-gray-500 font-medium">
            {playerCount === 1 ? 'joueur' : 'joueurs'}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon-lg"
          onClick={incrementCount}
          disabled={playerCount >= MAX_PLAYERS}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl text-lg font-bold"
          aria-label="Ajouter un joueur"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Tip */}
      <div className="bg-blue-50 rounded-xl p-4 mx-2">
        <p className="text-sm text-blue-700">
          <strong>Conseil :</strong> Le Dutch est plus amusant avec 3-4 joueurs pour des parties équilibrées
        </p>
      </div>

      {/* Next button */}
      <Button
        variant="default"
        size="lg"
        onClick={onNext}
        className="w-full py-3 sm:py-4 text-base sm:text-lg font-semibold"
        aria-label={`Continuer avec ${playerCount} ${playerCount === 1 ? 'joueur' : 'joueurs'}`}
      >
        Continuer avec {playerCount} {playerCount === 1 ? 'joueur' : 'joueurs'}
      </Button>
    </Card>
  );
};

export default PlayerCountStep;
