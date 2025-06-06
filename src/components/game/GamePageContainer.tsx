
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@/types';
import GameOverScreen from '@/components/GameOverScreen';
import TournamentResults from '@/components/tournament/TournamentResults';
import ScoreBoardWithAds from '@/components/scoreboard/ScoreBoardWithAds';
import TournamentProgress from '@/components/tournament/TournamentProgress';
import GameModeHandler from '@/components/game/GameModeHandler';
import NewRoundScoreForm from '@/components/NewRoundScoreForm';
import UnifiedTopBar from '@/components/scoreboard/UnifiedTopBar';
import AdSenseLayout from '@/components/game/AdSenseLayout';
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

  // Show tournament results if completed
  if (gameMode === 'tournament' && currentTournament?.isCompleted) {
    return (
      <div className="min-h-screen">
        <UnifiedTopBar 
          title="Résultats du tournoi"
          showBackButton
          onBack={() => navigate('/')}
          showSettings={true}
        />
        <div className="p-4">
          <div className="max-w-2xl mx-auto pt-8">
            <TournamentResults
              tournament={currentTournament}
              onNewTournament={onBackToSetup}
              onBackToHome={() => navigate('/')}
            />
          </div>
        </div>
      </div>
    );
  }

  const handleAddNewRound = (scores: number[], dutchPlayerId?: string) => {
    console.log('GamePageContainer: Adding new round');
    onAddRound(scores, dutchPlayerId);
    onCloseScoreForm();
  };

  // Déterminer les props de la topbar selon l'état
  const getTopBarProps = () => {
    if (showGameOver) {
      return {
        title: "Partie terminée",
        showBackButton: true,
        onBack: () => navigate('/'),
        showSettings: true
      };
    }
    
    if (gameMode === 'tournament' && currentTournament && tournamentProgress) {
      return null; // Pas de topbar, on utilise TournamentProgress
    }
    
    return {
      title: "Partie en cours",
      roundCount: roundHistory.length,
      scoreLimit: scoreLimit,
      showBackButton: true,
      onBack: () => navigate('/'),
      showSettings: true
    };
  };

  const topBarProps = getTopBarProps();

  return (
    <div className="min-h-screen relative">
      {/* UnifiedTopBar centralisée */}
      {topBarProps && <UnifiedTopBar {...topBarProps} />}

      {/* TournamentProgress pour les tournois (remplace la topbar) */}
      {gameMode === 'tournament' && currentTournament && tournamentProgress && !showGameOver && (
        <div className="pt-4 px-4 pb-4">
          <TournamentProgress
            tournament={currentTournament}
            currentProgress={tournamentProgress}
          />
        </div>
      )}

      {/* Layout AdSense avec 3 colonnes */}
      <AdSenseLayout
        isSignedIn={false}
        adsEnabled={true}
        isLoaded={true}
      >
        <AnimatePresence mode="wait">
          {showGameOver ? (
            <motion.div
              key="game-over"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              <GameModeHandler
                gameMode={gameMode}
                players={players}
                onGameEnd={onRequestEndGame}
                onRestart={onRestart}
              >
                <ScoreBoardWithAds
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
              </GameModeHandler>
            </motion.div>
          )}
        </AnimatePresence>
      </AdSenseLayout>

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
