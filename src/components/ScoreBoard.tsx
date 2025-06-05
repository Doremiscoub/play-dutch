
import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import UnifiedTopBar from './scoreboard/UnifiedTopBar';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';
import AICommentatorEnhanced from './ai-commentator/AICommentatorEnhanced';
import StickyActionButtons from './scoreboard/StickyActionButtons';
import ScoreBoardHeader from './scoreboard/ScoreBoardHeader';
import ScoreBoardContent from './scoreboard/ScoreBoardContent';
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
  console.log('ScoreBoard: Component rendered', { playersCount: players?.length, roundHistoryLength: roundHistory.length });
  
  const {
    selectedPlayer,
    currentView,
    sortedPlayers,
    roundCount,
    handleAddRound,
    handleUndo,
    handleEndGame,
    handleViewChange,
    handlePlayerSelect
  } = useScoreBoardLogic({
    players,
    roundHistory,
    onUndoLastRound,
    onEndGame,
    openScoreForm
  });

  return (
    <div className="min-h-screen relative">
      {/* Top Bar Unifiée */}
      <UnifiedTopBar 
        title="Tableau des scores"
        roundCount={roundCount}
        scoreLimit={scoreLimit}
      />

      <div className="p-4 pb-24">
        {/* Commentateur IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AICommentatorEnhanced 
            players={players}
            roundCount={roundCount}
            scoreLimit={scoreLimit}
          />
        </motion.div>

        {/* View Toggle Buttons */}
        <ScoreBoardHeader 
          currentView={currentView}
          onViewChange={handleViewChange}
        />

        {/* Content based on current view */}
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

        {/* End Game Confirmation */}
        <EndGameConfirmationDialog
          isOpen={showGameEndConfirmation}
          onConfirm={onConfirmEndGame}
          onCancel={onCancelEndGame}
        />
      </div>

      {/* Sticky Action Buttons - Outside main container for proper positioning */}
      <StickyActionButtons
        onAddRound={handleAddRound}
        onUndo={handleUndo}
        onEndGame={handleEndGame}
        canUndo={roundHistory.length > 0}
        canEndGame={true}
      />
    </div>
  );
};

export default React.memo(ScoreBoard);
