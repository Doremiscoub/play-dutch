
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Sparkles, ThumbsUp } from 'lucide-react';
import { Player } from '@/types';

interface PlayerCommentProps {
  player: Player;
  lastRoundScore?: number;
  roundCount: number;
}

export const PlayerComment: React.FC<PlayerCommentProps> = ({
  player,
  lastRoundScore,
  roundCount
}) => {
  if (lastRoundScore === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-dutch-purple font-medium flex items-center"
      >
        <Sparkles className="h-3 w-3 mr-1" /> Dutch parfait !
      </motion.div>
    );
  }
  
  if (lastRoundScore && lastRoundScore <= 3) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-green-600 font-medium flex items-center"
      >
        <ThumbsUp className="h-3 w-3 mr-1" /> Belle manche !
      </motion.div>
    );
  }
  
  if (lastRoundScore && lastRoundScore >= 10) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-dutch-orange font-medium flex items-center"
      >
        <ChevronUp className="h-3 w-3 mr-1" /> Aïe, ça fait mal...
      </motion.div>
    );
  }
  
  if (player.stats && roundCount >= 3) {
    const improvementRate = player.stats.improvementRate;
    
    if (improvementRate && improvementRate <= -2) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-dutch-blue font-medium flex items-center"
        >
          <ChevronDown className="h-3 w-3 mr-1" /> En progression !
        </motion.div>
      );
    }
    
    if (improvementRate && improvementRate >= 2) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-dutch-orange font-medium flex items-center"
        >
          <ChevronUp className="h-3 w-3 mr-1" /> Attention à la pente...
        </motion.div>
      );
    }
  }
  
  return null;
};
