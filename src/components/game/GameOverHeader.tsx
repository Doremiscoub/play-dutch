
import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import { Player } from '@/types';

interface GameOverHeaderProps {
  winner: Player;
}

const GameOverHeader: React.FC<GameOverHeaderProps> = ({ winner }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 relative"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex justify-center mb-4"
      >
        <div className="bg-gradient-to-r from-dutch-orange to-dutch-purple p-2.5 rounded-full shadow-lg">
          <PartyPopper className="h-10 w-10 text-white" />
        </div>
      </motion.div>
      
      <h1 className="text-4xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
        Félicitations !
      </h1>
      <p className="text-lg text-gray-700 mt-2">
        {winner?.name} remporte la partie avec {winner?.totalScore} points !
      </p>
    </motion.div>
  );
};

export default GameOverHeader;
