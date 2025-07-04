import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, Minus } from 'lucide-react';
import { MIN_PLAYERS, MAX_PLAYERS, ESTIMATED_MINUTES_PER_PLAYER } from './types';

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
  console.log('🎯 PlayerCountStep: Démarrage du composant', { playerCount });
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
    <div className="space-y-8 p-6">
      {/* Header simple */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-lg border border-white/30">
          <div className="text-4xl">🎯</div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
            Combien de joueurs ?
          </h1>
          <p className="text-neutral-700 font-medium max-w-md mx-auto">
            Choisissez le nombre de participants
          </p>
        </div>
      </div>

      {/* Sélecteur de nombre */}
      <Card className="card-glass border-2 border-white/60 shadow-lg bg-white/90">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-8">
            {/* Bouton Moins */}
            <div>
              <Button
                onClick={decrementCount}
                disabled={playerCount <= MIN_PLAYERS}
                size="lg"
                variant="default"
                className="relative w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 disabled:bg-neutral-200/50 disabled:cursor-not-allowed rounded-2xl shadow-2xl text-neutral-700 hover:text-red-500 disabled:text-neutral-400 transition-all duration-300 overflow-hidden group"
              >
                {/* Effet de brillance glassmorphique */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Particules d'effet */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-red-400 rounded-full animate-ping" />
                  <div className="absolute bottom-3 right-3 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
                
                <Minus className="w-10 h-10 relative z-10 text-white" strokeWidth={4} />
              </Button>
            </div>

            {/* Affichage du nombre */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                {/* Halo lumineux */}
                <div className="absolute -inset-2 bg-gradient-to-br from-trinity-blue-400/30 via-trinity-purple-400/30 to-trinity-orange-400/30 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Compteur principal */}
                <div className="relative w-28 h-28 bg-white/25 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl flex items-center justify-center">
                  <span className="text-4xl font-black bg-gradient-to-br from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
                    {playerCount}
                  </span>
                </div>
              </div>
              
              <span className="text-sm font-bold bg-gradient-to-r from-trinity-blue-600 to-trinity-purple-600 bg-clip-text text-transparent px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
                ✨ Joueurs ✨
              </span>
            </div>

            {/* Bouton Plus */}
            <div>
              <Button
                onClick={incrementCount}
                disabled={playerCount >= MAX_PLAYERS}
                size="lg"
                variant="default"
                className="relative w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 hover:bg-white/30 disabled:bg-neutral-200/50 disabled:cursor-not-allowed rounded-2xl shadow-2xl text-neutral-700 hover:text-green-500 disabled:text-neutral-400 transition-all duration-300 overflow-hidden group"
              >
                {/* Effet de brillance glassmorphique */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Particules d'effet */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full animate-ping" />
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                </div>
                
                <Plus className="w-10 h-10 relative z-10 text-white" strokeWidth={4} />
              </Button>
            </div>
          </div>

          <div className="text-center mt-6">
            <div className="bg-trinity-blue-50 rounded-xl p-4 border border-trinity-blue-200">
              <p className="text-lg font-semibold text-trinity-blue-700 mb-1">
                ~{playerCount * ESTIMATED_MINUTES_PER_PLAYER} minutes
              </p>
              <p className="text-sm text-trinity-blue-600">
                Durée estimée de la partie
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <Button
          onClick={onNext}
          size="lg"
          className="w-full py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 text-white hover:from-trinity-blue-700 hover:via-trinity-purple-700 hover:to-trinity-orange-700 shadow-lg border-2 border-trinity-blue-500"
        >
          <Users className="h-5 w-5 mr-2" />
          Suivant : Noms des joueurs
        </Button>
      </div>
    </div>
  );
};

export default PlayerCountStep;