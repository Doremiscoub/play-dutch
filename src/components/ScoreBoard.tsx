
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';

import StickyActionButtons from './scoreboard/StickyActionButtons';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import DetailedGameStats from './scoreboard/DetailedGameStats';
import GameStatsPanel from './scoreboard/GameStatsPanel';
import DesktopSidePanel from './scoreboard/DesktopSidePanel';
import ScoreTableView from './ScoreTableView';

import { useScoreBoardLogic } from './scoreboard/ScoreBoardHooks';
import FunPlayerCard from './scoreboard/FunPlayerCard';

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  onAddRound,
  onUndoLastRound,
  onEndGame,
  roundHistory = [],
  showGameEndConfirmation = false,
  onConfirmEndGame,
  onCancelEndGame,
  scoreLimit = 100,
  openScoreForm
}) => {
  console.log('ScoreBoard: Component rendered', { 
    playersCount: players?.length, 
    roundHistoryLength: roundHistory?.length,
    scoreLimit,
    showGameEndConfirmation
  });
  
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Vérification de sécurité des props
  if (!players || players.length === 0) {
    console.warn('ScoreBoard: No players provided');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
          <p className="text-gray-700 text-lg">Aucun joueur trouvé</p>
          <p className="text-gray-500 text-sm mt-2">Créez une nouvelle partie pour commencer</p>
        </div>
      </div>
    );
  }

  const {
    currentView,
    sortedPlayers,
    roundCount,
    handleAddRound,
    handleUndo,
    handleEndGame,
    handleViewChange
  } = useScoreBoardLogic({
    players,
    roundHistory,
    onUndoLastRound,
    onEndGame,
    openScoreForm
  });

  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Layout Desktop avec panneau latéral */}
      <div className="flex gap-6">
        {/* Contenu principal */}
        <div className="flex-1 space-y-6">
          {/* Toggle Liste/Tableau avec style glassmorphisme */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center items-center space-x-4 mb-8 mt-4 px-4"
          >
            <motion.button
              onClick={() => handleViewChange('list')}
              className={`px-8 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium min-w-[180px] glass-button ${
                currentView === 'list'
                  ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg scale-105'
                  : 'hover:bg-white/30'
              }`}
              whileHover={{ scale: currentView === 'list' ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="h-4 w-4">📊</span>
              Classement détaillé
            </motion.button>
            
            <motion.button
              onClick={() => handleViewChange('table')}
              className={`px-8 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium min-w-[180px] glass-button ${
                currentView === 'table'
                  ? 'bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg scale-105'
                  : 'hover:bg-white/30'
              }`}
              whileHover={{ scale: currentView === 'table' ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="h-4 w-4">📋</span>
              Tableau des manches
            </motion.button>
          </motion.div>

          {/* Contenu principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentView === 'list' ? (
              <div className="space-y-4">
                {sortedPlayers.map((player, index) => (
                  <FunPlayerCard
                    key={player.id}
                    player={player}
                    rank={index + 1}
                    totalPlayers={players.length}
                    onSelect={handlePlayerSelect}
                    isSelected={selectedPlayer?.id === player.id}
                  />
                ))}
              </div>
            ) : (
              <ScoreTableView 
                players={players} 
                roundHistory={roundHistory}
              />
            )}
          </motion.div>

          {/* Statistiques détaillées de la partie */}
          <DetailedGameStats
            players={players}
            roundCount={roundCount}
            scoreLimit={scoreLimit}
            roundHistory={roundHistory}
          />
        </div>

        {/* Panneau latéral desktop */}
        <div className="hidden lg:block w-80">
          <DesktopSidePanel
            showAICommentator={false}
            players={players}
            roundHistory={roundHistory}
            selectedPlayer={selectedPlayer}
          />
          
          <div className="mt-6">
            <GameStatsPanel
              players={players}
              roundHistory={roundHistory}
            />
          </div>
        </div>
      </div>

      {/* End Game Confirmation */}
      <EndGameConfirmationDialog
        isOpen={showGameEndConfirmation}
        onConfirm={onConfirmEndGame}
        onCancel={onCancelEndGame}
      />

      {/* Sticky Action Buttons */}
      <StickyActionButtons
        onAddRound={handleAddRound}
        onUndoLastRound={handleUndo}
        onEndGame={handleEndGame}
        canUndo={roundHistory.length > 0}
      />
    </div>
  );
};

export default React.memo(ScoreBoard);
