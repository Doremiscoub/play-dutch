import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import DetailedGameStats from './DetailedGameStats';

interface StatisticsViewProps {
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
}

const StatisticsView: React.FC<StatisticsViewProps> = ({
  players,
  roundCount,
  scoreLimit,
  roundHistory
}) => {
  return (
    <motion.div
      key="stats-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <DetailedGameStats
        players={players}
        roundCount={roundCount}
        scoreLimit={scoreLimit}
        roundHistory={roundHistory}
      />
    </motion.div>
  );
};

export default StatisticsView;