
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
        {/* Cercles animés d'arrière-plan */}
        <motion.div
          className="absolute -z-10 w-24 h-24 rounded-full bg-gradient-to-r from-dutch-orange/20 to-dutch-purple/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -z-10 w-20 h-20 rounded-full bg-dutch-blue/10"
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Icône principale */}
        <div className="bg-gradient-to-r from-dutch-orange to-dutch-purple p-3 rounded-full shadow-lg z-10">
          <PartyPopper className="h-12 w-12 text-white" />
        </div>
      </motion.div>
      
      <motion.h1
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent px-1">
          Félicitations !
        </span>
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-3 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-3 shadow-md border border-white/80"
      >
        <p className="text-lg text-gray-700">
          <motion.span 
            className="font-bold text-dutch-purple"
            animate={{ 
              color: ['#8B5CF6', '#1EAEDB', '#F97316', '#8B5CF6']
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {winner?.name}
          </motion.span> remporte la partie avec{' '}
          <span className="font-bold text-dutch-orange">{winner?.totalScore}</span> points !
        </p>
      </motion.div>
    </motion.div>
  );
};

export default GameOverHeader;
