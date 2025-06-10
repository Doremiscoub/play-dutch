
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import EnhancedPlayerCard from './EnhancedPlayerCard';
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
  console.log('ScoreBoardContent: Rendering with', { 
    currentView, 
    sortedPlayersCount: sortedPlayers?.length,
    playersCount: players?.length,
    roundCount,
    selectedPlayer: selectedPlayer?.name 
  });

  // Vérification de sécurité avec logs détaillés
  if (!players || players.length === 0) {
    console.error('ScoreBoardContent: No players found, cannot render content');
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
      >
        <div className="space-y-3">
          <div className="text-6xl">🎮</div>
          <h3 className="text-xl font-bold text-gray-700">Aucun joueur trouvé</h3>
          <p className="text-gray-500">Veuillez créer une partie avec des joueurs</p>
        </div>
      </motion.div>
    );
  }

  const safeSortedPlayers = sortedPlayers || [];
  const safeRoundHistory = roundHistory || [];

  if (safeSortedPlayers.length === 0) {
    console.warn('ScoreBoardContent: No sorted players available, using original players array');
  }

  const playersToDisplay = safeSortedPlayers.length > 0 ? safeSortedPlayers : players;

  return (
    <AnimatePresence mode="wait">
      {currentView === 'list' ? (
        <motion.div
          key="list-view"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {playersToDisplay.map((player, index) => (
            <EnhancedPlayerCard
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
            roundHistory={safeRoundHistory}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScoreBoardContent;
