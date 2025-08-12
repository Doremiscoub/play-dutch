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
  const [showFull, setShowFull] = React.useState(false);

  if (!isMobile) {
    return (
      <OptimizedStatsDashboard 
        players={players}
        roundCount={roundCount}
        scoreLimit={scoreLimit}
        roundHistory={roundHistory}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted/50 transition"
          onClick={() => setShowFull((v) => !v)}
          aria-pressed={showFull}
        >
          {showFull ? 'Mode compact' : 'Mode complet'}
        </button>
      </div>

      <MobileStatsOptimizer 
        players={players}
        roundCount={roundCount}
        scoreLimit={scoreLimit}
        roundHistory={roundHistory}
      />

      {showFull && (
        <div className="pt-2">
          <OptimizedStatsDashboard 
            players={players}
            roundCount={roundCount}
            scoreLimit={scoreLimit}
            roundHistory={roundHistory}
          />
        </div>
      )}
    </div>
  );
};

export default StatisticsView;