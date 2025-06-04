
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy, Crown, Sparkles } from 'lucide-react';
import { GameHeader, GameText } from '@/components/ui/game-typography';
import { GameCard } from '@/components/ui/game-card';

interface GameOverHeaderProps {
  winner: Player;
}

const GameOverHeader: React.FC<GameOverHeaderProps> = ({ winner }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="text-center mb-8"
    >
      {/* Celebration Header */}
      <div className="mb-6">
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <GameHeader gameColor="gameGradient" effect="shadow" className="text-5xl mb-4">
            <Trophy className="inline mr-4 h-12 w-12" />
            VICTOIRE !
            <Sparkles className="inline ml-4 h-12 w-12" />
          </GameHeader>
        </motion.div>

        <GameText variant="adventure" gameColor="primary" className="text-2xl">
          Félicitations au champion !
        </GameText>
      </div>

      {/* Winner Spotlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <GameCard variant="pokemonCard" className="p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4">
            <GameCard variant="unoCard" className="w-16 h-16 flex items-center justify-center">
              <Crown className="h-8 w-8 text-white" />
            </GameCard>
            
            <div className="text-center">
              <GameHeader gameColor="secondary" className="text-3xl mb-2">
                {winner.name}
              </GameHeader>
              <GameText variant="scoreDisplay" gameColor="accent" className="text-4xl">
                {winner.totalScore} points
              </GameText>
              <GameText variant="body" className="text-gray-700 mt-1">
                remporte la partie !
              </GameText>
            </div>
          </div>
        </GameCard>
      </motion.div>

      {/* Celebration Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6"
      >
        <GameText variant="adventure" gameColor="secondary" className="text-lg">
          🎉 Une partie mémorable ! 🎉
        </GameText>
      </motion.div>
    </motion.div>
  );
};

export default GameOverHeader;
