import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { UnifiedButton } from '@/components/ui/unified-button';
import { UnifiedCard } from '@/components/ui/unified-card';
import { MIN_PLAYERS, MAX_PLAYERS } from './types';
import { DESIGN_TOKENS } from '@/design';
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
  return <UnifiedCard variant="glass" padding="lg" className="text-center space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{
        background: DESIGN_TOKENS.gradients.trinity,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
          🎮 Combien de joueurs ?
        </h2>
        <p className="text-neutral-600 text-base sm:text-lg px-2">
          Choisissez le nombre de participants pour votre partie de Dutch
        </p>
      </div>

      {/* Sélecteur de nombre de joueurs */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 px-4">
        <UnifiedButton 
          variant="secondary" 
          size="lg" 
          onClick={decrementCount} 
          disabled={playerCount <= MIN_PLAYERS} 
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl text-white font-bold text-2xl sm:text-3xl touch-target min-h-[64px] shadow-lg hover:shadow-xl transition-all"
        >
          -
        </UnifiedButton>

        <div className="text-center flex-1 max-w-[140px] p-4">
          <div className="text-6xl sm:text-8xl font-bold mb-2 sm:mb-3 leading-none" style={{
          background: DESIGN_TOKENS.gradients.trinity,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
            {playerCount}
          </div>
          <div className="text-sm sm:text-base text-neutral-600 font-medium">
            {playerCount === 1 ? 'joueur' : 'joueurs'}
          </div>
        </div>

        <UnifiedButton 
          variant="secondary" 
          size="lg" 
          onClick={incrementCount} 
          disabled={playerCount >= MAX_PLAYERS} 
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl text-white font-bold text-2xl sm:text-3xl touch-target min-h-[64px] shadow-lg hover:shadow-xl transition-all"
        >
          +
        </UnifiedButton>
      </div>

      {/* Boutons rapides */}
      

      {/* Informations utiles */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-3 sm:p-4 mx-2">
        <p className="text-xs sm:text-sm text-neutral-600">
          <strong>💡 Conseil :</strong> Le Dutch est plus amusant avec 3-4 joueurs pour des parties équilibrées
        </p>
      </div>

      {/* Bouton suivant */}
      <UnifiedButton 
        variant="primary" 
        size="lg" 
        onClick={onNext} 
        className="w-full py-3 sm:py-4 text-base sm:text-lg font-bold touch-target min-h-[48px]"
      >
        Continuer avec {playerCount} {playerCount === 1 ? 'joueur' : 'joueurs'} 🚀
      </UnifiedButton>
    </UnifiedCard>;
};
export default PlayerCountStep;