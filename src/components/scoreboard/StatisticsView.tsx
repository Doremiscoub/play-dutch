import React from 'react';
import { Player } from '@/types';
import { StatsDashboardSinglePage } from '@/components/statistics/StatsDashboardSinglePage';

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
    <StatsDashboardSinglePage 
      players={players}
      roundCount={roundCount}
      scoreLimit={scoreLimit}
      roundHistory={roundHistory}
    />
  );
};

export default StatisticsView;