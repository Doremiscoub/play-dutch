
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import GameOverScreen from '@/components/GameOverScreen';
import TournamentProgress from '@/components/tournament/TournamentProgress';
import NewRoundScoreForm from '@/components/NewRoundScoreForm';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import TournamentResultsView from './TournamentResultsView';
import GameContentView from './GameContentView';
import { useGameTopBarProps } from './GameTopBarLogic';
import { useGameRoundHandler } from './GameRoundHandler';
import { useNavigate } from 'react-router-dom';

interface GamePageContainerProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  showGameOver: boolean;
  showGameEndConfirmation: boolean;
  scoreLimit: number;
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
    onNavigateHome: () => navigate('/')
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
          <GameContentView
            gameMode={gameMode}
            players={players}
            roundHistory={roundHistory}
            scoreLimit={scoreLimit}
            onGameEnd={onRequestEndGame}
            onRestart={onRestart}
            onAddRound={handleAddNewRound}
            onUndoLastRound={onUndoLastRound}
            onRequestEndGame={onRequestEndGame}
            showGameEndConfirmation={showGameEndConfirmation}
            onConfirmEndGame={onConfirmEndGame}
            onCancelEndGame={onCancelEndGame}
            onOpenScoreForm={onOpenScoreForm}
          />
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
