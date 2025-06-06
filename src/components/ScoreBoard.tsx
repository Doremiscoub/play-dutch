
import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';
import EnhancedAICommentator from './ai-commentator/EnhancedAICommentator';
import StickyActionButtons from './scoreboard/StickyActionButtons';
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
    roundHistoryLength: roundHistory?.length 
  });
  
  // Vérification de sécurité des props
  if (!players || players.length === 0) {
    console.warn('ScoreBoard: No players provided');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">Aucun joueur trouvé</p>
        </div>
      </div>
    );
  }

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
        {/* Toggle Liste/Tableau */}
        <ScoreBoardTabs
          currentView={currentView}
          onViewChange={handleViewChange}
        />

        {/* Commentateur IA Complet avec toutes les fonctionnalités */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <EnhancedAICommentator 
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
