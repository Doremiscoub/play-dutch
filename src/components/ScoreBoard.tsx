
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';

import FloatingActionButtons from './scoreboard/FloatingActionButtons';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import ScoreBoardContent from './scoreboard/ScoreBoardContent';
import ScoreBoardTabs from './scoreboard/ScoreBoardTabs';
import { useScoreBoardLogic } from './scoreboard/ScoreBoardHooks';

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
      {/* Contenu principal */}
      <div className="space-y-6">
        {/* Toggle des vues avec 3 options */}
        <ScoreBoardTabs
          currentView={currentView}
          onViewChange={handleViewChange}
        />

        {/* Contenu principal */}
        <ScoreBoardContent
          currentView={currentView}
          sortedPlayers={sortedPlayers}
          players={players}
          roundCount={roundCount}
          scoreLimit={scoreLimit}
          roundHistory={roundHistory}
          selectedPlayer={selectedPlayer}
          onPlayerSelect={handlePlayerSelect}
        />
      </div>

      {/* End Game Confirmation */}
      <EndGameConfirmationDialog
        isOpen={showGameEndConfirmation}
        onConfirm={onConfirmEndGame}
        onCancel={onCancelEndGame}
      />

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        onAddRound={handleAddRound}
        onUndoLastRound={handleUndo}
        onEndGame={handleEndGame}
        canUndo={roundHistory.length > 0}
      />
    </div>
  );
};

export default React.memo(ScoreBoard);
