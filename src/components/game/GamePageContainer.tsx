
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import GameOverScreen from '@/components/GameOverScreen';
import TournamentProgress from '@/components/tournament/TournamentProgress';
import NewRoundScoreForm from '@/components/NewRoundScoreForm';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import TournamentResultsView from './TournamentResultsView';
import ScoreBoard from '@/features/scoreboard/ScoreBoard';
import { AICommentator } from '@/features/ai-commentator';
import { useGameTopBarProps } from './GameTopBarLogic';
import { useGameRoundHandler } from './GameRoundHandler';
import { useNavigate } from 'react-router-dom';
import { useMobileAdaptation } from '@/hooks/useMobileAdaptation';
import { cn } from '@/lib/utils';

interface GamePageContainerProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  showGameOver: boolean;
  showGameEndConfirmation: boolean;
  scoreLimit: number;
  gameStartTime?: Date;
  gameMode: 'quick' | 'tournament';
  currentTournament: any;
  tournamentProgress: any;
  showScoreForm: boolean;
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onRequestEndGame: () => void;
  onConfirmEndGame: () => void;
  onCancelEndGame: () => void;
  onContinueGame: (newLimit: number) => void;
  onRestart: () => void;
  onOpenScoreForm: () => void;
  onCloseScoreForm: () => void;
  onBackToSetup: () => void;
}

const GamePageContainer: React.FC<GamePageContainerProps> = ({
  players,
  roundHistory,
  showGameOver,
  showGameEndConfirmation,
  scoreLimit,
  gameStartTime,
  gameMode,
  currentTournament,
  tournamentProgress,
  showScoreForm,
  onAddRound,
  onUndoLastRound,
  onRequestEndGame,
  onConfirmEndGame,
  onCancelEndGame,
  onContinueGame,
  onRestart,
  onOpenScoreForm,
  onCloseScoreForm,
  onBackToSetup
}) => {
  const navigate = useNavigate();
  console.log('GamePageContainer: Rendering with gameMode:', gameMode);

  const { handleAddNewRound } = useGameRoundHandler({ onAddRound, onCloseScoreForm });

  // Show tournament results if completed
  if (gameMode === 'tournament' && currentTournament?.isCompleted) {
    return (
      <TournamentResultsView
        currentTournament={currentTournament}
        onBackToSetup={onBackToSetup}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  const topBarProps = useGameTopBarProps({
    showGameOver,
    roundHistoryLength: roundHistory.length,
    scoreLimit,
    onNavigateHome: () => navigate('/'),
    gameStartTime
  });

  return (
    <div className="min-h-screen relative">
      {/* UnifiedHeader centralisée */}
      <UnifiedHeader {...topBarProps} />

      {/* TournamentProgress pour les tournois */}
      {gameMode === 'tournament' && currentTournament && tournamentProgress && !showGameOver && (
        <div className="pt-4 px-4 pb-4">
          <TournamentProgress
            tournament={currentTournament}
            currentProgress={tournamentProgress}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {showGameOver ? (
          <motion.div
            key="game-over"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4"
          >
            <GameOverScreen
              players={players}
              onRestart={onRestart}
              onContinueGame={onContinueGame}
              currentScoreLimit={scoreLimit}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game-board"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={gameMode === 'tournament' ? "pt-4" : ""}
          >
            <div className="bg-gradient-to-br from-trinity-blue-50 via-background to-trinity-purple-50 min-h-screen pb-32">
              <div className="mx-auto max-w-6xl px-4">
                {/* Professeur Cartouche */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 pt-4"
                >
                  <AICommentator 
                    players={players}
                    roundCount={roundHistory.length}
                    scoreLimit={scoreLimit}
                  />
                </motion.div>

                {/* ScoreBoard */}
                <ScoreBoard
                  players={players}
                  roundHistory={roundHistory}
                  onAddRound={handleAddNewRound}
                  onUndoLastRound={onUndoLastRound}
                  onEndGame={onRequestEndGame}
                  showGameEndConfirmation={showGameEndConfirmation}
                  onConfirmEndGame={onConfirmEndGame}
                  onCancelEndGame={onCancelEndGame}
                  scoreLimit={scoreLimit}
                  openScoreForm={onOpenScoreForm}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NewRoundScoreForm
        players={players}
        open={showScoreForm}
        onClose={onCloseScoreForm}
        onSubmit={handleAddNewRound}
      />
    </div>
  );
};

export default GamePageContainer;
