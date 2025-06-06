
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
    roundHistoryLength: roundHistory?.length,
    scoreLimit,
    showGameEndConfirmation
  });
  
  // Vérification de sécurité des props
  if (!players || players.length === 0) {
    console.warn('ScoreBoard: No players provided');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dutch-blue/5 to-dutch-purple/5">
        <div className="text-center bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-lg">
          <p className="text-gray-700 text-lg">Aucun joueur trouvé</p>
          <p className="text-gray-500 text-sm mt-2">Créez une nouvelle partie pour commencer</p>
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
    <div className="min-h-screen relative bg-gradient-to-br from-dutch-blue/5 via-dutch-purple/5 to-dutch-orange/5">
      {/* Page glassmorphique avec effets Dutch */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-dutch-purple/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-dutch-blue/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute right-1/3 top-1/3 w-60 h-60 bg-gradient-to-br from-dutch-orange/5 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10 p-4 pb-32 space-y-6">
        {/* Toggle Liste/Tableau avec glassmorphisme */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ScoreBoardTabs
            currentView={currentView}
            onViewChange={handleViewChange}
          />
        </motion.div>

        {/* Commentateur IA Complet avec avatar Professeur Cartouche */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 120 }}
          className="mb-8"
        >
          <EnhancedAICommentator 
            players={players}
            roundCount={roundCount}
            scoreLimit={scoreLimit}
          />
        </motion.div>

        {/* Content based on current view avec animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
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
        </motion.div>

        {/* End Game Confirmation */}
        <EndGameConfirmationDialog
          isOpen={showGameEndConfirmation}
          onConfirm={onConfirmEndGame}
          onCancel={onCancelEndGame}
        />
      </div>

      {/* Sticky Action Buttons - Position fixe avec glassmorphisme */}
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
