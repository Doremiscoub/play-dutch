
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGameState from '@/hooks/useGameState';
import ScoreBoardWithAds from '@/components/scoreboard/ScoreBoardWithAds';
import GameOverScreen from '@/components/GameOverScreen';
import NewRoundScoreForm from '@/components/NewRoundScoreForm';
import { useTournamentState } from '@/hooks/useTournamentState';
import TournamentProgress from '@/components/tournament/TournamentProgress';
import TournamentResults from '@/components/tournament/TournamentResults';
import GameInitializer from '@/components/game/GameInitializer';
import GameModeHandler from '@/components/game/GameModeHandler';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [showScoreForm, setShowScoreForm] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState<'quick' | 'tournament'>('quick');

  const {
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
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
    getCurrentMatch,
    getTournamentProgress
  } = useTournamentState();

  // Memoïser la fonction d'initialisation pour éviter les re-renders
  const handleGameInitialization = useCallback(async (): Promise<boolean> => {
    console.log('GamePage: handleGameInitialization called');
    
    try {
      const success = await createNewGame();
      console.log('GamePage: createNewGame result:', success);
      
      if (!success) {
        console.log('GamePage: Initialization failed, redirecting to setup');
        navigate('/game/setup');
        return false;
      }
      return true;
    } catch (error) {
      console.error('GamePage: Game initialization error:', error);
      navigate('/game/setup');
      return false;
    }
  }, [createNewGame, navigate]);

  // Initialize game configuration
  useEffect(() => {
    console.log('GamePage: Configuration effect running');
    
    const shouldReturnToGame = localStorage.getItem('dutch_return_to_game');
    if (shouldReturnToGame) {
      localStorage.removeItem('dutch_return_to_game');
    }

    const storedGameMode = localStorage.getItem('dutch_game_mode') as 'quick' | 'tournament' || 'quick';
    setGameMode(storedGameMode);

    if (storedGameMode === 'tournament') {
      const tournamentConfig = JSON.parse(localStorage.getItem('dutch_tournament_config') || '{}');
      
      if (!currentTournament && tournamentConfig.name) {
        createTournament(tournamentConfig.name, tournamentConfig.playerNames, tournamentConfig.rounds);
      }
      
      if (currentTournament && !getCurrentMatch()) {
        startNextMatch();
      }
    }
  }, []); // Pas de dépendances pour éviter les re-renders

  // Memoïser les callbacks pour éviter les re-renders
  const openScoreForm = useCallback(() => setShowScoreForm(true), []);
  const closeScoreForm = useCallback(() => setShowScoreForm(false), []);

  const handleAddNewRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    const success = handleAddRound(scores, dutchPlayerId);
    if (success) {
      closeScoreForm();
    }
  }, [handleAddRound, closeScoreForm]);

  const handleBackToSetup = useCallback(() => {
    localStorage.removeItem('dutch_game_mode');
    localStorage.removeItem('dutch_tournament_config');
    navigate('/game/setup');
  }, [navigate]);

  // Memoïser les données pour éviter les re-renders
  const tournamentProgress = useMemo(() => {
    return currentTournament ? getTournamentProgress() : null;
  }, [currentTournament, getTournamentProgress]);

  // Show tournament results if completed
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
    <GameInitializer onInitialize={handleGameInitialization} gameMode={gameMode}>
      <div className="min-h-screen relative">
        {gameMode === 'tournament' && currentTournament && tournamentProgress && (
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
            >
              <GameOverScreen
                players={players!}
                onRestart={handleRestart}
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
              <GameModeHandler
                gameMode={gameMode}
                players={players}
                onGameEnd={handleRequestEndGame}
                onRestart={handleRestart}
              >
                <ScoreBoardWithAds
                  players={players!}
                  roundHistory={roundHistory}
                  onAddRound={handleAddNewRound}
                  onUndoLastRound={handleUndoLastRound}
                  onEndGame={handleRequestEndGame}
                  showGameEndConfirmation={showGameEndConfirmation}
                  onConfirmEndGame={handleConfirmEndGame}
                  onCancelEndGame={handleCancelEndGame}
                  scoreLimit={scoreLimit}
                  openScoreForm={openScoreForm}
                />
              </GameModeHandler>
            </motion.div>
          )}
        </AnimatePresence>

        <NewRoundScoreForm
          players={players!}
          open={showScoreForm}
          onClose={closeScoreForm}
          onSubmit={handleAddNewRound}
        />
      </div>
    </GameInitializer>
  );
};

export default GamePage;
