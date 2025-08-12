import React from 'react';
import { Player } from '@/types';
import { OptimizedStatsDashboard } from '@/components/statistics/OptimizedStatsDashboard';
import { MobileStatsOptimizer } from '@/components/statistics/MobileStatsOptimizer';
import useIsMobile from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return isMobile ? (
    <MobileStatsOptimizer 
      players={players}
      roundCount={roundCount}
      scoreLimit={scoreLimit}
      roundHistory={roundHistory}
    />
  ) : (
    <OptimizedStatsDashboard 
      players={players}
      roundCount={roundCount}
      scoreLimit={scoreLimit}
      roundHistory={roundHistory}
    />
  );
};

export default StatisticsView;