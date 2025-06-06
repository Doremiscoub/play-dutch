
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
      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-xl">
        <p className="text-gray-500">Aucun joueur pour le moment</p>
        <p className="text-sm text-gray-400 mt-2">Veuillez créer une partie avec des joueurs</p>
      </div>
    );
  }

  const safeSortedPlayers = sortedPlayers || [];
  const safeRoundHistory = roundHistory || [];

  if (safeSortedPlayers.length === 0) {
    console.warn('ScoreBoardContent: No sorted players available');
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {currentView === 'list' ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Players Cards - Section principale */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Classement des joueurs</h2>
              {safeSortedPlayers.map((player, index) => (
                <FunPlayerCard
                  key={player.id}
                  player={player}
                  rank={index + 1}
                  totalPlayers={players.length}
                  onSelect={onPlayerSelect}
                  isSelected={selectedPlayer?.id === player.id}
                />
              ))}
            </div>

            {/* Detailed Stats - Section importante restaurée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-8"
            >
              <DetailedGameStats 
                players={players} 
                roundCount={roundCount}
                scoreLimit={scoreLimit}
                roundHistory={safeRoundHistory}
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
              roundHistory={safeRoundHistory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoreBoardContent;
