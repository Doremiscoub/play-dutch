import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gamepad2, Trophy, Clock, Users, Edit, Sparkles } from 'lucide-react';
import ProfessorAvatar from '@/components/game/ProfessorAvatar';
import { Badge } from '@/components/ui/badge';
import { Player, ESTIMATED_MINUTES_PER_PLAYER } from './types';

interface GameSummaryStepProps {
  playerCount: number;
  players: Player[];
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
    <div className="space-y-8">
      {/* Header avec Professor excité */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div 
          className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-lg border border-white/30 overflow-hidden"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ProfessorAvatar size="lg" animate={true} mood="excited" showParticles={true} />
        </motion.div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
          Tout est prêt !
        </h1>
        <p className="text-neutral-700 font-medium">
          Vérifiez les détails de votre partie avant de commencer
        </p>
      </motion.div>

      {/* Statistiques de la partie */}
      <Card className="card-glass bg-white/80 border-2 border-white/60">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-trinity-purple-700 flex items-center gap-2 justify-center">
            <Sparkles className="h-5 w-5" />
            Résumé de la partie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <motion.div 
              className="space-y-2 p-4 rounded-2xl bg-white/70 hover:bg-white transition-all cursor-pointer border border-neutral-200"
              whileHover={{ scale: 1.02 }}
              onClick={onEditCount}
            >
              <div className="text-2xl font-bold text-trinity-blue-600">{playerCount}</div>
              <div className="text-sm text-neutral-700 flex items-center gap-1 justify-center">
                <Users className="h-4 w-4" />
                Joueurs
              </div>
              <Button variant="ghost" size="sm" className="opacity-60 hover:opacity-100">
                <Edit className="h-3 w-3" />
              </Button>
            </motion.div>
            
            <div className="space-y-2 p-4 rounded-2xl bg-white/70 border border-neutral-200">
              <div className="text-2xl font-bold text-trinity-purple-600">~{gameEstimate}min</div>
              <div className="text-sm text-neutral-700 flex items-center gap-1 justify-center">
                <Clock className="h-4 w-4" />
                Durée estimée
              </div>
            </div>
            
            <div className="space-y-2 p-4 rounded-2xl bg-white/70 border border-neutral-200">
              <div className="text-2xl font-bold text-trinity-orange-600">Dutch</div>
              <div className="text-sm text-neutral-700 flex items-center gap-1 justify-center">
                <Trophy className="h-4 w-4" />
                Mode de jeu
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des joueurs avec possibilité de modification */}
      <Card className="card-glass bg-white/80 border-2 border-white/60">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-trinity-orange-700 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Ordre des joueurs
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onEditPlayers}
              className="bg-white border-neutral-300 hover:bg-trinity-purple-50 hover:border-trinity-purple-300 text-neutral-700 rounded-xl"
            >
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {players.map((player, index) => (
              <motion.div 
                key={`${player.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl border border-neutral-200 shadow-sm"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                  index === 0 ? 'from-amber-400 to-amber-600' :
                  index === 1 ? 'from-gray-300 to-gray-500' :
                  index === 2 ? 'from-orange-400 to-orange-600' :
                  'from-trinity-blue-400 to-trinity-purple-500'
                } flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {index + 1}
                </div>
                <div className="text-3xl">{player.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-neutral-800">{player.name}</div>
                  <div className="text-sm text-neutral-600 flex items-center gap-2">
                    {index === 0 && <Badge variant="secondary" className="bg-amber-100 text-amber-700">Premier joueur</Badge>}
                    {index === 1 && <Badge variant="secondary" className="bg-neutral-100 text-neutral-700 border border-neutral-300">Deuxième</Badge>}
                    {index === 2 && <Badge variant="secondary" className="bg-orange-100 text-orange-700 border border-orange-300">Troisième</Badge>}
                    {index > 2 && <span className="text-neutral-600">Joueur {index + 1}</span>}
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
        className="text-center p-6 bg-gradient-to-r from-trinity-blue-50 via-trinity-purple-50 to-trinity-orange-50 rounded-2xl border border-white/50"
      >
        <p className="text-lg font-semibold text-trinity-purple-700 mb-2">
          🎉 Prêt pour une partie épique !
        </p>
        <p className="text-neutral-700">
          Le Professor Cartouche vous accompagnera tout au long de la partie avec ses commentaires hilarants et ses conseils stratégiques.
        </p>
      </motion.div>

      {/* Navigation et démarrage */}
      <div className="flex gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="flex-1 py-6 text-lg font-bold rounded-2xl bg-white border-neutral-300 hover:bg-neutral-50 text-neutral-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
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
            className="w-full py-6 text-xl font-black rounded-2xl shadow-xl bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 text-white hover:from-trinity-blue-700 hover:via-trinity-purple-700 hover:to-trinity-orange-700 transform transition-all duration-300 border-2 border-trinity-blue-500"
          >
            <Gamepad2 className="h-6 w-6 mr-3" />
            Commencer la partie !
            <Sparkles className="h-5 w-5 ml-3" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameSummaryStep;