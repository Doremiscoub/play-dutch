import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, Minus } from 'lucide-react';
import ProfessorAvatar from '@/components/game/ProfessorAvatar';
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
    <div className="space-y-8">
      {/* Header avec Professor */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-lg border border-white/30 overflow-hidden">
          <ProfessorAvatar size="md" animate={true} mood="thinking" showParticles={false} />
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
          Combien de joueurs ?
        </h1>
        <p className="text-neutral-600 font-medium">
          Choisissez le nombre de participants pour votre partie de Dutch
        </p>
      </motion.div>

      {/* Sélecteur de nombre */}
      <Card className="card-glass">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-trinity-purple-700 flex items-center gap-2 justify-center">
            <Users className="h-5 w-5" />
            Nombre de joueurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={decrementCount}
                disabled={playerCount <= MIN_PLAYERS}
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-2xl bg-white/60 border-white/60 hover:bg-trinity-blue-50 hover:border-trinity-blue-300 disabled:opacity-30"
              >
                <Minus className="h-6 w-6" />
              </Button>
            </motion.div>

            <motion.div
              key={playerCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-trinity-blue-500 via-trinity-purple-500 to-trinity-orange-500 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                {playerCount}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {playerCount === MIN_PLAYERS ? 'Minimum' : playerCount === MAX_PLAYERS ? 'Maximum' : 'Joueurs'}
              </span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={incrementCount}
                disabled={playerCount >= MAX_PLAYERS}
                size="lg"
                variant="outline"
                className="w-16 h-16 rounded-2xl bg-white/60 border-white/60 hover:bg-trinity-orange-50 hover:border-trinity-orange-300 disabled:opacity-30"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-trinity-purple-600">
              Durée estimée : ~{playerCount * ESTIMATED_MINUTES_PER_PLAYER} minutes
            </p>
            <p className="text-sm text-gray-500">
              Plus il y a de joueurs, plus la partie sera longue et amusante !
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bouton suivant */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full py-6 text-xl font-bold rounded-2xl shadow-lg bg-gradient-to-r from-trinity-blue-500 via-trinity-purple-500 to-trinity-orange-500 text-white hover:from-trinity-blue-600 hover:via-trinity-purple-600 hover:to-trinity-orange-600"
        >
          Suivant : Noms des joueurs
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountStep;