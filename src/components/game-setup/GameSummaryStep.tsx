import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gamepad2, Trophy, Clock, Users, Edit, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SetupPlayer, ESTIMATED_MINUTES_PER_PLAYER } from './types';

interface GameSummaryStepProps {
  playerCount: number;
  players: SetupPlayer[];
  onStartGame: () => void;
  onBack: () => void;
  onEditPlayers: () => void;
  onEditCount: () => void;
}

const GameSummaryStep: React.FC<GameSummaryStepProps> = ({
  playerCount,
  players,
  onStartGame,
  onBack,
  onEditPlayers,
  onEditCount
}) => {
  const gameEstimate = playerCount * ESTIMATED_MINUTES_PER_PLAYER;

  return (
    <div className="space-y-6 p-6">
      {/* Header simple */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-lg border border-white/30">
          <div className="text-4xl">🏁</div>
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
          Tout est prêt !
        </h1>
        <p className="text-neutral-700 font-medium">
          Vérifiez les détails avant de commencer
        </p>
      </div>

      {/* Statistiques de la partie */}
      <Card className="card-glass bg-white/90 border border-white/60">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div 
              className="space-y-2 p-3 rounded-xl bg-white/80 hover:bg-white transition-all cursor-pointer border border-neutral-200"
              onClick={onEditCount}
            >
              <div className="text-xl font-bold text-trinity-blue-600">{playerCount}</div>
              <div className="text-xs text-neutral-600 flex items-center gap-1 justify-center">
                <Users className="h-3 w-3" />
                Joueurs
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-60 hover:opacity-100">
                <Edit className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="space-y-2 p-3 rounded-xl bg-white/80 border border-neutral-200">
              <div className="text-xl font-bold text-trinity-purple-600">~{gameEstimate}min</div>
              <div className="text-xs text-neutral-600 flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" />
                Durée
              </div>
            </div>
            
            <div className="space-y-2 p-3 rounded-xl bg-white/80 border border-neutral-200">
              <div className="text-xl font-bold text-trinity-orange-600">Dutch</div>
              <div className="text-xs text-neutral-600 flex items-center gap-1 justify-center">
                <Trophy className="h-3 w-3" />
                Mode
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des joueurs avec possibilité de modification */}
      <Card className="card-glass bg-white/90 border border-white/60">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-trinity-orange-700">
              Joueurs ({players.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onEditPlayers}
              className="bg-white border-neutral-300 hover:bg-trinity-purple-50 hover:border-trinity-purple-300 text-neutral-700 rounded-lg text-sm"
            >
              <Edit className="h-3 w-3 mr-1" />
              Modifier
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {players.map((player, index) => (
              <div 
                key={`${player.name}-${index}`}
                className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border border-neutral-200 shadow-sm"
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                  index === 0 ? 'from-amber-400 to-amber-600' :
                  index === 1 ? 'from-gray-300 to-gray-500' :
                  index === 2 ? 'from-orange-400 to-orange-600' :
                  'from-trinity-blue-400 to-trinity-purple-500'
                } flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {index + 1}
                </div>
                <div className="text-2xl">{player.emoji}</div>
                <div className="flex-1">
                  <div className="font-semibold text-neutral-800">{player.name}</div>
                  <div className="text-xs text-neutral-500">
                    {index === 0 ? 'Premier joueur' : `Position ${index + 1}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message d'encouragement */}
      <div className="text-center p-4 bg-gradient-to-r from-trinity-blue-50 via-trinity-purple-50 to-trinity-orange-50 rounded-xl border border-white/50">
        <p className="text-lg font-semibold text-trinity-purple-700 mb-1">
          🎉 C'est parti !
        </p>
        <p className="text-sm text-neutral-700">
          Le Professor Cartouche vous accompagnera avec ses commentaires et conseils.
        </p>
      </div>

      {/* Navigation et démarrage */}
      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex-1 py-4 text-lg font-bold rounded-xl bg-white border-neutral-300 hover:bg-neutral-50 text-neutral-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        
        <div className="flex-2">
          <Button
            onClick={onStartGame}
            size="lg"
            className="w-full py-4 text-lg font-black rounded-xl shadow-lg bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 text-white hover:from-trinity-blue-700 hover:via-trinity-purple-700 hover:to-trinity-orange-700 transform transition-all duration-300 border-2 border-trinity-blue-500"
          >
            <Gamepad2 className="h-5 w-5 mr-2" />
            Commencer la partie !
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSummaryStep;