
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import useGameState from '@/hooks/useGameState';
import ScoreBoardWithAds from '@/components/scoreboard/ScoreBoardWithAds';
import GameOverScreen from '@/components/GameOverScreen';
import NewRoundScoreForm from '@/components/NewRoundScoreForm';
import { toast } from 'sonner';
import { useTournamentState } from '@/hooks/useTournamentState';
import TournamentProgress from '@/components/tournament/TournamentProgress';
import TournamentResults from '@/components/tournament/TournamentResults';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [showScoreForm, setShowScoreForm] = useState<boolean>(false);
  const [gameInitialized, setGameInitialized] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<'quick' | 'tournament'>('quick');

  const {
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart,
    createNewGame
  } = useGameState();

  const {
    currentTournament,
    createTournament,
    startNextMatch,
    completeMatch,
    getCurrentMatch,
    getTournamentProgress,
    finalizeTournament
  } = useTournamentState();

  // Initialize game on component mount
  useEffect(() => {
    const initializeGame = async () => {
      try {
        const shouldReturnToGame = localStorage.getItem('dutch_return_to_game');
        if (shouldReturnToGame) {
          localStorage.removeItem('dutch_return_to_game');
        }

        // Check game mode
        const storedGameMode = localStorage.getItem('dutch_game_mode') as 'quick' | 'tournament' || 'quick';
        setGameMode(storedGameMode);

        if (storedGameMode === 'tournament') {
          // Initialize tournament mode
          const tournamentConfig = JSON.parse(localStorage.getItem('dutch_tournament_config') || '{}');
          
          if (!currentTournament && tournamentConfig.name) {
            createTournament(tournamentConfig.name, tournamentConfig.playerNames, tournamentConfig.rounds);
          }
          
          // Start a new match if needed
          if (currentTournament && !getCurrentMatch()) {
            startNextMatch();
          }
        }

        const success = await createNewGame();
        if (success) {
          setGameInitialized(true);
        } else {
          console.error('Failed to initialize game');
          navigate('/game/setup');
        }
      } catch (error) {
        console.error('Game initialization error:', error);
        navigate('/game/setup');
      }
    };

    if (!gameInitialized) {
      initializeGame();
    }
  }, [createNewGame, navigate, gameInitialized, currentTournament, createTournament, startNextMatch, getCurrentMatch]);

  const openScoreForm = () => {
    setShowScoreForm(true);
  };

  const closeScoreForm = () => {
    setShowScoreForm(false);
  };

  const handleAddNewRound = (scores: number[], dutchPlayerId?: string) => {
    const success = handleAddRound(scores, dutchPlayerId);
    if (success) {
      closeScoreForm();
    }
  };

  const handleTournamentGameEnd = () => {
    if (gameMode === 'tournament' && currentTournament && players) {
      const currentMatch = getCurrentMatch();
      if (currentMatch) {
        completeMatch(currentMatch.id, players);
      }
      
      // Check if tournament is complete
      const progress = getTournamentProgress();
      if (progress.current >= progress.total) {
        // Tournament is complete, show final results
        finalizeTournament();
      } else {
        // Start next match
        startNextMatch();
        handleRestart();
      }
    }
  };

  const handleBackToSetup = () => {
    localStorage.removeItem('dutch_game_mode');
    localStorage.removeItem('dutch_tournament_config');
    navigate('/game/setup');
  };

  // Show loading if game isn't initialized yet
  if (!gameInitialized || !players || players.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-dutch-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">
            {gameMode === 'tournament' ? 'Initialisation du tournoi...' : 'Initialisation de la partie...'}
          </p>
        </motion.div>
      </div>
    );
  }

  // Show tournament results if tournament is completed
  if (gameMode === 'tournament' && currentTournament?.isCompleted) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-2xl mx-auto pt-8">
          <TournamentResults
            tournament={currentTournament}
            onNewTournament={handleBackToSetup}
            onBackToHome={() => navigate('/')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Tournament Progress (if in tournament mode) */}
      {gameMode === 'tournament' && currentTournament && (
        <div className="pt-4 px-4 pb-4">
          <TournamentProgress
            tournament={currentTournament}
            currentProgress={getTournamentProgress()}
          />
        </div>
      )}

      {/* Enhanced floating "New Round" button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <EnhancedButton
          onClick={openScoreForm}
          variant="power"
          size="icon-lg"
          effect="glow"
          rarity="epic"
          withSparkles
          aria-label="Nouvelle manche"
        >
          <Plus className="h-6 w-6" />
        </EnhancedButton>
      </motion.div>

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
              onRestart={gameMode === 'tournament' ? handleTournamentGameEnd : handleRestart}
              onContinueGame={handleContinueGame}
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
            <ScoreBoardWithAds
              players={players}
              roundHistory={roundHistory}
              onAddRound={handleAddNewRound}
              onUndoLastRound={handleUndoLastRound}
              onEndGame={gameMode === 'tournament' ? handleTournamentGameEnd : handleRequestEndGame}
              showGameEndConfirmation={showGameEndConfirmation}
              onConfirmEndGame={gameMode === 'tournament' ? handleTournamentGameEnd : handleConfirmEndGame}
              onCancelEndGame={handleCancelEndGame}
              scoreLimit={scoreLimit}
              openScoreForm={openScoreForm}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <NewRoundScoreForm
        players={players}
        open={showScoreForm}
        onClose={closeScoreForm}
        onSubmit={handleAddNewRound}
      />
    </div>
  );
};

export default GamePage;
