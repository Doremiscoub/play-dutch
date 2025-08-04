import React from 'react';
import { Player } from '@/types';
import { StatsDashboard } from '@/components/statistics/StatsDashboard';

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
    <StatsDashboard 
      players={players}
      roundCount={roundCount}
      scoreLimit={scoreLimit}
      roundHistory={roundHistory}
    />
  );
};

export default StatisticsView;