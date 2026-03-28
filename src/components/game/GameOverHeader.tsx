
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy } from 'lucide-react';
import PlayerRankBadge from './PlayerRankBadge';

interface GameOverHeaderProps {
  winner: Player;
}

const GameOverHeader: React.FC<GameOverHeaderProps> = ({ winner }) => {
  return (
    <div className="text-center mb-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}
        className="flex justify-center mb-4"
      >
        <div className="flex items-center justify-center">
          <Trophy className="h-12 w-12 text-yellow-600" />
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold text-foreground mb-4">
        Félicitations !
      </h2>

      <div className="flex items-center justify-center gap-3 mb-6">
        <PlayerRankBadge position={1} size="lg" />
        <p className="text-xl font-semibold text-dutch-purple">
          {winner.name}
        </p>
      </div>

      <div className="text-center px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-amber-800">
          Score final : <span className="font-bold">{winner.totalScore} points</span>
        </p>
      </div>
    </div>
  );
};

export default GameOverHeader;
