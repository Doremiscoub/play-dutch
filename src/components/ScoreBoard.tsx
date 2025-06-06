
import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBoardProps } from '@/types';
import EndGameConfirmationDialog from './scoreboard/EndGameConfirmationDialog';
import EnhancedAICommentator from './ai-commentator/EnhancedAICommentator';
import StickyActionButtons from './scoreboard/StickyActionButtons';
import ScoreBoardTabs from './scoreboard/ScoreBoardTabs';
import SimplePlayerCard from './scoreboard/SimplePlayerCard';
import ScoreTableView from './ScoreTableView';
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-xl p-8 shadow-lg">
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
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Professeur Cartouche - En haut et centré */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <EnhancedAICommentator 
            players={players}
            roundCount={roundCount}
            scoreLimit={scoreLimit}
          />
        </motion.div>

        {/* Toggle Liste/Tableau simplifié */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ScoreBoardTabs
            currentView={currentView}
            onViewChange={handleViewChange}
          />
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
                <SimplePlayerCard
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
