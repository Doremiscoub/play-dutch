
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl"
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
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {currentView === 'list' ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Section principale : Cartes des joueurs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* En-tête de section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="p-3 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-2xl shadow-lg">
                  <div className="text-white text-lg font-bold">🏆</div>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
                  Classement des joueurs
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-dutch-blue/30 to-transparent"></div>
              </motion.div>

              {/* Cartes des joueurs avec animations séquentielles */}
              <div className="space-y-4">
                {playersToDisplay.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 120
                    }}
                  >
                    <FunPlayerCard
                      player={player}
                      rank={index + 1}
                      totalPlayers={players.length}
                      onSelect={onPlayerSelect}
                      isSelected={selectedPlayer?.id === player.id}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Section statistiques détaillées - Restaurée complètement */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12"
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
            transition={{ duration: 0.4 }}
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
