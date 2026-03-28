import React from 'react';
import { Edit, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SetupPlayer } from './types';
import { cn } from '@/lib/utils';

interface GameSummaryStepProps {
  playerCount: number;
  players: SetupPlayer[];
  onStartGame: () => void;
  onBack: () => void;
  onEditPlayers: () => void;
  onEditCount: () => void;
}

const PLAYER_COLORS = [
  { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
  { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
  { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' },
  { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' },
  { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700' },
];

const GameSummaryStep: React.FC<GameSummaryStepProps> = ({
  playerCount,
  players,
  onStartGame,
  onBack,
  onEditPlayers,
  onEditCount
}) => {
  const validPlayers = players.filter(p => p.name && p.name.trim().length > 0);

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-2">
          Récapitulatif
        </h2>
        <p className="text-muted-foreground">
          Vérifiez les paramètres de votre partie avant de commencer
        </p>
      </div>

      {/* Configuration summary */}
      <div className="space-y-4">
        {/* Player count */}
        <div className="border border-gray-200 bg-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-foreground">Nombre de joueurs</div>
                <div className="text-sm text-muted-foreground">{playerCount} participants</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditCount}
              aria-label="Modifier le nombre de joueurs"
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </div>
        </div>

        {/* Player list */}
        <div className="border border-gray-200 bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-foreground">Joueurs</div>
                <div className="text-sm text-muted-foreground">{validPlayers.length} joueurs prêts</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditPlayers}
              aria-label="Modifier les noms des joueurs"
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {validPlayers.map((player, index) => {
              const color = PLAYER_COLORS[index % PLAYER_COLORS.length];
              return (
                <div
                  key={player.id}
                  className={cn(
                    'rounded-xl p-3 border flex items-center justify-center gap-2',
                    color.bg,
                    color.border
                  )}
                >
                  <span className="text-xl">{player.emoji}</span>
                  <span className={cn('font-medium text-sm', color.text)}>{player.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rules reminder */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-2">
          Rappel des règles
        </h3>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold mt-0.5">•</span>
            <span><strong className="text-foreground">Objectif :</strong> Avoir le score le plus bas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold mt-0.5">•</span>
            <span><strong className="text-foreground">Dutch :</strong> Le joueur avec le score le plus bas de la manche</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold mt-0.5">•</span>
            <span><strong className="text-foreground">Fin :</strong> Premier à 100 points, gagnant = score total le plus bas</span>
          </li>
        </ul>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex-1"
        >
          Retour
        </Button>

        <Button
          variant="default"
          size="lg"
          onClick={onStartGame}
          className="flex-[2] font-semibold"
        >
          Commencer la partie
        </Button>
      </div>
    </Card>
  );
};

export default GameSummaryStep;
