
import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';
import AICommentatorEnhanced from './ai-commentator/AICommentatorEnhanced';
import StickyActionButtons from './scoreboard/StickyActionButtons';
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
      {/* Header géré par GamePageContainer via UnifiedTopBar */}
      
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
