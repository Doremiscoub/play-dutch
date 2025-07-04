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
    <div className="space-y-8 p-6">
      {/* Header avec Professor */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <motion.div 
          className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center shadow-lg border border-white/30 overflow-hidden"
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
          <ProfessorAvatar size="md" animate={true} mood="thinking" showParticles={true} />
        </motion.div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 bg-clip-text text-transparent">
            Combien de joueurs ?
          </h1>
          <p className="text-neutral-700 font-medium max-w-md mx-auto">
            Choisissez le nombre de participants
          </p>
        </div>
      </motion.div>

      {/* Sélecteur de nombre */}
      <Card className="card-glass border-2 border-white/60 shadow-lg bg-white/90">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-8">
            {/* Bouton Moins */}
            <Button
              onClick={decrementCount}
              disabled={playerCount <= MIN_PLAYERS}
              size="lg"
              variant="default"
              className="w-14 h-14 bg-white border-2 border-neutral-300 hover:border-red-400 hover:bg-red-50 disabled:bg-neutral-100 disabled:border-neutral-200 disabled:cursor-not-allowed rounded-2xl shadow-md text-neutral-700 hover:text-red-600 disabled:text-neutral-400 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Minus className="w-6 h-6" strokeWidth={3} />
            </Button>

            {/* Affichage du nombre */}
            <motion.div
              key={playerCount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-trinity-blue-500 to-trinity-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {playerCount}
              </div>
              <span className="text-sm font-medium text-neutral-600">
                {playerCount === MIN_PLAYERS ? 'Minimum' : playerCount === MAX_PLAYERS ? 'Maximum' : 'Joueurs'}
              </span>
            </motion.div>

            {/* Bouton Plus */}
            <Button
              onClick={incrementCount}
              disabled={playerCount >= MAX_PLAYERS}
              size="lg"
              variant="default"
              className="w-14 h-14 bg-white border-2 border-neutral-300 hover:border-green-400 hover:bg-green-50 disabled:bg-neutral-100 disabled:border-neutral-200 disabled:cursor-not-allowed rounded-2xl shadow-md text-neutral-700 hover:text-green-600 disabled:text-neutral-400 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Plus className="w-6 h-6" strokeWidth={3} />
            </Button>
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

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 text-white hover:from-trinity-blue-700 hover:via-trinity-purple-700 hover:to-trinity-orange-700 shadow-lg border-2 border-trinity-blue-500"
        >
          <Users className="h-5 w-5 mr-2" />
          Suivant : Noms des joueurs
        </Button>
      </motion.div>
    </div>
  );
};

export default PlayerCountStep;