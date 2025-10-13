
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';

import FloatingActionButtonsMemo from './scoreboard/FloatingActionButtons.memo';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import ScoreBoardContentLazy from './scoreboard/ScoreBoardContent.lazy';
import ScoreBoardTabsMemo from './scoreboard/ScoreBoardTabs.memo';
import { useScoreBoardLogic } from './scoreboard/ScoreBoardHooks';
import { logger } from '@/utils/logger';

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
  openScoreForm,
  hideFloatingActionsWhenModalOpen = false
}) => {
  logger.debug('ScoreBoard: Component rendered', { 
    playersCount: players?.length, 
    roundHistoryLength: roundHistory?.length,
    scoreLimit,
    showGameEndConfirmation
  });
  
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  // Vérification de sécurité des props
  if (!players || players.length === 0) {
    logger.warn('ScoreBoard: No players provided');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center lg-card lg-tint-accent-60 rounded-xl p-8 lg-elevation-03 animate-lg-reveal">
          <p className="text-white text-lg font-bold">Aucun joueur trouvé</p>
          <p className="text-white/80 text-sm mt-2">Créez une nouvelle partie pour commencer</p>
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
        {/* Toggle des vues avec 3 options - Version mémoïsée */}
        <ScoreBoardTabsMemo
          currentView={currentView}
          onViewChange={handleViewChange}
        />

        {/* Contenu principal - Version avec lazy loading */}
        <ScoreBoardContentLazy
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

      {/* Floating Action Buttons - Version mémoïsée */}
      <FloatingActionButtonsMemo
        onAddRound={handleAddRound}
        onUndoLastRound={handleUndo}
        onEndGame={handleEndGame}
        canUndo={roundHistory.length > 0}
        hideWhenModalOpen={hideFloatingActionsWhenModalOpen}
      />
    </div>
  );
};

export default React.memo(ScoreBoard);
