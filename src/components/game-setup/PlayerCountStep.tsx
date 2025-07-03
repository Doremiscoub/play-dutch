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
    <div className="space-y-6">
      {/* Header avec Professor */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div 
          className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-xl border-4 border-white/30 overflow-hidden"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          <ProfessorAvatar size="lg" animate={true} mood="thinking" showParticles={true} />
        </motion.div>
        <div className="space-y-3">
          <h1 className="text-4xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
            Combien de joueurs ?
          </h1>
          <p className="text-lg text-neutral-600 font-medium max-w-md mx-auto">
            Choisissez le nombre de participants pour votre partie de Dutch
          </p>
        </div>
      </motion.div>

      {/* Sélecteur de nombre */}
      <Card className="card-glass border-2 border-white/40 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-bold text-trinity-purple-700 flex items-center gap-3 justify-center">
            <Users className="h-6 w-6" />
            Nombre de joueurs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={decrementCount}
                disabled={playerCount <= MIN_PLAYERS}
                size="lg"
                className="w-16 h-16 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-500/40 text-blue-700 font-bold text-2xl disabled:opacity-30 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
              >
                <Minus className="h-7 w-7" />
              </Button>
            </motion.div>

            <motion.div
              key={playerCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-400/80 via-purple-500/80 to-orange-400/80 flex items-center justify-center text-white text-4xl font-black shadow-xl border-3 border-white/60 backdrop-blur-sm">
                {playerCount}
              </div>
              <span className="text-lg font-semibold text-gray-800 bg-white/70 px-4 py-2 rounded-xl shadow-sm">
                {playerCount === MIN_PLAYERS ? 'Minimum' : playerCount === MAX_PLAYERS ? 'Maximum' : 'Joueurs'}
              </span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={incrementCount}
                disabled={playerCount >= MAX_PLAYERS}
                size="lg"
                className="w-16 h-16 rounded-2xl bg-orange-500/20 hover:bg-orange-500/30 border-2 border-orange-500/40 text-orange-700 font-bold text-2xl disabled:opacity-30 disabled:cursor-not-allowed shadow-lg backdrop-blur-sm"
              >
                <Plus className="h-7 w-7" />
              </Button>
            </motion.div>
          </div>

          <div className="text-center space-y-3">
            <div className="bg-purple-500/15 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30 shadow-sm">
              <p className="text-xl font-bold text-purple-800 mb-1">
                Durée estimée : ~{playerCount * ESTIMATED_MINUTES_PER_PLAYER} minutes
              </p>
              <p className="text-sm text-purple-700/80">
                Plus il y a de joueurs, plus la partie sera longue et amusante !
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8"
      >
        <Button
          onClick={onNext}
          size="lg"
          className="btn-kids-primary w-full py-6 text-xl font-bold rounded-2xl text-white"
        >
          <Users className="h-6 w-6 mr-3" />
          Suivant : Noms des joueurs
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountStep;