import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import FunPlayerCard from './FunPlayerCard';

// Lazy load des composants lourds
const ScoreTableView = lazy(() => import('../ScoreTableView'));
const StatisticsView = lazy(() => import('./StatisticsView'));

interface ScoreBoardContentLazyProps {
  currentView: 'list' | 'table' | 'stats';
  sortedPlayers: Player[];
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  selectedPlayer: Player | null;
  onPlayerSelect: (player: Player) => void;
}

/**
 * Composant de fallback pendant le chargement
 */
const LoadingFallback: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center py-12"
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 text-sm">Chargement...</p>
    </div>
  </motion.div>
);

/**
 * Version optimisée avec lazy loading
 */
const ScoreBoardContentLazy: React.FC<ScoreBoardContentLazyProps> = ({
  currentView,
  sortedPlayers,
  players,
  roundCount,
  scoreLimit,
  roundHistory,
  selectedPlayer,
  onPlayerSelect
}) => {
  const playersToDisplay = sortedPlayers.length > 0 ? sortedPlayers : players;

  if (currentView === 'list') {
    return (
      <motion.div
        key="list-view"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.25 }}
        className="space-y-3"
      >
        {playersToDisplay.map((player, index) => (
          <FunPlayerCard
            key={player.id}
            player={player}
            rank={index + 1}
            totalPlayers={players.length}
            onSelect={onPlayerSelect}
            isSelected={selectedPlayer?.id === player.id}
            scoreLimit={scoreLimit}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      {currentView === 'table' ? (
        <motion.div
          key="table-view"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          <ScoreTableView 
            players={players} 
            roundHistory={roundHistory}
          />
        </motion.div>
      ) : (
        <StatisticsView
          players={players}
          roundCount={roundCount}
          scoreLimit={scoreLimit}
          roundHistory={roundHistory}
        />
      )}
    </Suspense>
  );
};

export default ScoreBoardContentLazy;
