
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { UnifiedButton } from '@/components/ui/unified-button';
import { UnifiedCard } from '@/components/ui/unified-card';
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
    <UnifiedCard variant="glass" padding="lg" className="text-center space-y-8">
      <div>
        <h2 className="text-trinity text-2xl font-bold mb-3">
          🎮 Combien de joueurs ?
        </h2>
        <p className="text-neutral-600 text-lg">
          Choisissez le nombre de participants pour votre partie de Dutch
        </p>
      </div>

      {/* Sélecteur de nombre de joueurs */}
      <div className="flex items-center justify-center gap-6">
        <UnifiedButton
          variant="secondary"
          size="lg"
          onClick={decrementCount}
          disabled={playerCount <= MIN_PLAYERS}
          className="w-14 h-14 rounded-xl"
        >
          <Minus className="h-6 w-6" />
        </UnifiedButton>

        <div className="text-center">
          <div className="text-6xl font-bold text-trinity mb-2">
            {playerCount}
          </div>
          <div className="text-sm text-neutral-500">
            {playerCount === 1 ? 'joueur' : 'joueurs'}
          </div>
        </div>

        <UnifiedButton
          variant="secondary"
          size="lg"
          onClick={incrementCount}
          disabled={playerCount >= MAX_PLAYERS}
          className="w-14 h-14 rounded-xl"
        >
          <Plus className="h-6 w-6" />
        </UnifiedButton>
      </div>

      {/* Boutons rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[2, 3, 4, 5].map((count) => (
          <UnifiedButton
            key={count}
            variant={playerCount === count ? "primary" : "ghost"}
            size="md"
            onClick={() => onPlayerCountChange(count)}
            className="py-3 rounded-xl font-semibold"
          >
            {count}
          </UnifiedButton>
        ))}
      </div>

      {/* Informations utiles */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4">
        <p className="text-sm text-neutral-600">
          <strong>💡 Conseil :</strong> Le Dutch est plus amusant avec 3-4 joueurs pour des parties équilibrées
        </p>
      </div>

      {/* Bouton suivant */}
      <UnifiedButton
        variant="primary"
        size="lg"
        onClick={onNext}
        className="w-full py-4 text-lg font-bold"
      >
        Continuer avec {playerCount} {playerCount === 1 ? 'joueur' : 'joueurs'} 🚀
      </UnifiedButton>
    </UnifiedCard>
  );
};

export default PlayerCountStep;
