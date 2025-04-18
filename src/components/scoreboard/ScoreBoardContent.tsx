
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import PlayerListView from './PlayerListView';
import ScoreTableView from '../ScoreTableView';
import GameStatsPanel from './GameStatsPanel';

interface ScoreBoardContentProps {
  view: 'list' | 'table';
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  isDesktop: boolean;
  scoreLimit: number;
}

const ScoreBoardContent: React.FC<ScoreBoardContentProps> = ({
  view,
  players,
  roundHistory,
  isDesktop,
  scoreLimit
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className={`mt-8 ${isDesktop ? 'md:flex md:gap-6' : ''}`}>
      <div className={`${isDesktop ? 'md:w-3/4' : 'w-full'} z-20 relative`}>
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div
              key="list-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <PlayerListView 
                players={players}
                isDesktop={isDesktop}
                scoreLimit={scoreLimit}
                onPlayerSelect={setSelectedPlayer}
              />
            </motion.div>
          )}
          
          {view === 'table' && (
            <motion.div
              key="table-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white"
            >
              <ScoreTableView 
                players={players}
                roundHistory={roundHistory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {isDesktop && (
        <div className="md:w-1/4 md:max-h-screen md:sticky md:top-0">
          <GameStatsPanel
            players={players}
            roundHistory={roundHistory}
          />
        </div>
      )}
    </div>
  );
};

export default ScoreBoardContent;
