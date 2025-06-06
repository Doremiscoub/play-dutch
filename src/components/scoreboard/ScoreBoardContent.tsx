
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import FunPlayerCard from './FunPlayerCard';
import DetailedGameStats from './DetailedGameStats';
import ScoreTableView from '../ScoreTableView';

interface ScoreBoardContentProps {
  currentView: 'list' | 'table';
  sortedPlayers: Player[];
  players: Player[];
  roundCount: number;
  scoreLimit: number;
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  selectedPlayer: Player | null;
  onPlayerSelect: (player: Player) => void;
}

const ScoreBoardContent: React.FC<ScoreBoardContentProps> = ({
  currentView,
  sortedPlayers,
  players,
  roundCount,
  scoreLimit,
  roundHistory,
  selectedPlayer,
  onPlayerSelect
}) => {
  return (
    <AnimatePresence mode="wait">
      {currentView === 'list' ? (
        <motion.div
          key="list-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Players Cards */}
          <AnimatePresence>
            {sortedPlayers.map((player, index) => (
              <FunPlayerCard
                key={player.id}
                player={player}
                rank={index + 1}
                totalPlayers={players.length}
                onSelect={onPlayerSelect}
                isSelected={selectedPlayer?.id === player.id}
              />
            ))}
          </AnimatePresence>

          {/* Detailed Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <DetailedGameStats 
              players={players} 
              roundCount={roundCount}
              scoreLimit={scoreLimit}
              roundHistory={roundHistory}
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="table-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ScoreTableView 
            players={players} 
            roundHistory={roundHistory}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScoreBoardContent;
