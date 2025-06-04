
import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { Trophy } from 'lucide-react';
import { ModernTitle } from '@/components/ui/modern-title';
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
        <motion.div 
          className="relative flex items-center justify-center"
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 rounded-full blur-md opacity-70 gradient-shift"></div>
          <Trophy className="h-12 w-12 text-yellow-600 drop-shadow-md" />
        </motion.div>
      </motion.div>

      <ModernTitle 
        variant="h2"
        withSparkles
        className="mb-4"
      >
        Félicitations !
      </ModernTitle>

      <div className="flex items-center justify-center gap-3 mb-6">
        <PlayerRankBadge position={1} size="lg" />
        <p className="text-xl font-semibold text-dutch-purple">
          {winner.name}
        </p>
      </div>

      <div className="text-center px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-lg shadow-sm">
        <p className="text-amber-800">
          Score final : <span className="font-bold">{winner.totalScore} points</span>
        </p>
      </div>
    </div>
  );
};

export default GameOverHeader;
