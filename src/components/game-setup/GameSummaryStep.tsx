import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gamepad2, Trophy, Clock, Users, Edit, Sparkles } from 'lucide-react';
import ProfessorAvatar from '@/components/game/ProfessorAvatar';
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
      {/* Header avec Professor excité */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div 
          className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-lg border border-white/30 overflow-hidden"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ProfessorAvatar size="md" animate={true} mood="excited" showParticles={true} />
        </motion.div>
        <h1 className="text-3xl font-black text-trinity">
          Tout est prêt !
        </h1>
        <p className="text-neutral-700 font-medium">
          Vérifiez les détails avant de commencer
        </p>
      </motion.div>

      {/* Statistiques de la partie */}
      <Card className="card-glass bg-white/90 border border-white/60">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <motion.div 
              className="space-y-2 p-3 rounded-xl bg-white/80 hover:bg-white transition-all cursor-pointer border border-neutral-200"
              whileHover={{ scale: 1.02 }}
              onClick={onEditCount}
            >
              <div className="text-xl font-bold text-primary">{playerCount}</div>
              <div className="text-xs text-neutral-600 flex items-center gap-1 justify-center">
                <Users className="h-3 w-3" />
                Joueurs
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-60 hover:opacity-100">
                <Edit className="h-3 w-3" />
              </Button>
            </motion.div>
            
            <div className="space-y-2 p-3 rounded-xl bg-white/80 border border-neutral-200">
              <div className="text-xl font-bold text-secondary">~{gameEstimate}min</div>
              <div className="text-xs text-neutral-600 flex items-center gap-1 justify-center">
                <Clock className="h-3 w-3" />
                Durée
              </div>
            </div>
            
            <div className="space-y-2 p-3 rounded-xl bg-white/80 border border-neutral-200">
              <div className="text-xl font-bold text-accent">Dutch</div>
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
            <CardTitle className="text-lg font-bold text-accent/80">
              Joueurs ({players.length})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onEditPlayers}
              className="bg-white border-neutral-300 hover:bg-secondary/10 hover:border-secondary/30 text-neutral-700 rounded-lg text-sm"
            >
              <Edit className="h-3 w-3 mr-1" />
              Modifier
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {players.map((player, index) => (
              <motion.div 
                key={`${player.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-white/90 rounded-xl border border-neutral-200 shadow-sm"
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${
                  index === 0 ? 'from-amber-400 to-amber-600' :
                  index === 1 ? 'from-gray-300 to-gray-500' :
                  index === 2 ? 'from-orange-400 to-orange-600' :
                  'from-primary/80 to-secondary/80'
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
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message d'encouragement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl border border-white/50"
      >
        <p className="text-lg font-semibold text-secondary mb-1">
          🎉 C'est parti !
        </p>
        <p className="text-sm text-neutral-700">
          Le Professor Cartouche vous accompagnera avec ses commentaires et conseils.
        </p>
      </motion.div>

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
        
        <motion.div 
          className="flex-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onStartGame}
            size="lg"
            className="w-full py-4 text-lg font-black rounded-xl shadow-lg btn-glass-trinity transform transition-all duration-300"
          >
            <Gamepad2 className="h-5 w-5 mr-2" />
            Commencer la partie !
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameSummaryStep;