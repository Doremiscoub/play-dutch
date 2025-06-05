
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
  const [navigationBlocked, setNavigationBlocked] = useState<boolean>(false);

  console.log('GamePage: Component rendered');

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
    createNewGame,
    isInitialized
  } = useGameState();

  const {
    currentTournament,
    createTournament,
    startNextMatch,
    getCurrentMatch,
    getTournamentProgress
  } = useTournamentState();

  // Protection contre les navigations non désirées
  useEffect(() => {
    console.log('GamePage: Setting up navigation protection');
    
    // Marquer que nous sommes dans le jeu
    sessionStorage.setItem('dutch_in_game', 'true');
    
    // Bloquer temporairement la navigation automatique
    setNavigationBlocked(true);
    
    const timer = setTimeout(() => {
      setNavigationBlocked(false);
      console.log('GamePage: Navigation protection lifted');
    }, 2000);

    return () => {
      clearTimeout(timer);
      sessionStorage.removeItem('dutch_in_game');
    };
  }, []);

  // Memoïser la fonction d'initialisation pour éviter les re-renders
  const handleGameInitialization = useCallback(async (): Promise<boolean> => {
    console.log('GamePage: handleGameInitialization called');
    
    // Vérifier si on bloque encore les navigations
    if (navigationBlocked) {
      console.log('GamePage: Navigation blocked, preventing initialization redirect');
      return false;
    }
    
    try {
      const success = await createNewGame();
      console.log('GamePage: createNewGame result:', success);
      
      if (!success) {
        console.log('GamePage: Initialization failed, but not redirecting automatically');
        // Ne pas rediriger automatiquement, laisser l'utilisateur gérer
        return false;
      }
      return true;
    } catch (error) {
      console.error('GamePage: Game initialization error:', error);
      return false;
    }
  }, [createNewGame, navigationBlocked]);

  // Initialize game configuration avec protection contre les redirections automatiques
  useEffect(() => {
    console.log('GamePage: Configuration effect running');
    
    const shouldReturnToGame = localStorage.getItem('dutch_return_to_game');
    if (shouldReturnToGame) {
      console.log('GamePage: Removing return flag');
      localStorage.removeItem('dutch_return_to_game');
    }

    const storedGameMode = localStorage.getItem('dutch_game_mode') as 'quick' | 'tournament' || 'quick';
    console.log('GamePage: Setting game mode:', storedGameMode);
    setGameMode(storedGameMode);

    if (storedGameMode === 'tournament') {
      const tournamentConfig = JSON.parse(localStorage.getItem('dutch_tournament_config') || '{}');
      
      if (!currentTournament && tournamentConfig.name) {
        console.log('GamePage: Creating tournament from config');
        createTournament(tournamentConfig.name, tournamentConfig.playerNames, tournamentConfig.rounds);
      }
      
      if (currentTournament && !getCurrentMatch()) {
        console.log('GamePage: Starting next tournament match');
        startNextMatch();
      }
    }
  }, []);

  // Surveillance de l'état du jeu pour prévenir les pertes
  useEffect(() => {
    if (isInitialized && players && players.length > 0) {
      console.log('GamePage: Game properly loaded with', players.length, 'players');
      
      // Heartbeat pour maintenir l'état du jeu
      const heartbeat = setInterval(() => {
        const gameActive = localStorage.getItem('dutch_game_active');
        if (gameActive !== 'true') {
          console.log('GamePage: Restoring game active flag');
          localStorage.setItem('dutch_game_active', 'true');
        }
      }, 5000);

      return () => clearInterval(heartbeat);
    }
  }, [isInitialized, players]);

  // Memoïser les callbacks pour éviter les re-renders
  const openScoreForm = useCallback(() => {
    console.log('GamePage: Opening score form');
    setShowScoreForm(true);
  }, []);
  
  const closeScoreForm = useCallback(() => {
    console.log('GamePage: Closing score form');
    setShowScoreForm(false);
  }, []);

  const handleAddNewRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    console.log('GamePage: Adding new round with scores:', scores);
    const success = handleAddRound(scores, dutchPlayerId);
    if (success) {
      closeScoreForm();
    }
  }, [handleAddRound, closeScoreForm]);

  const handleBackToSetup = useCallback(() => {
    console.log('GamePage: Manual back to setup');
    localStorage.removeItem('dutch_game_mode');
    localStorage.removeItem('dutch_tournament_config');
    localStorage.removeItem('dutch_game_active');
    navigate('/game/setup');
  }, [navigate]);

  // Memoïser les données pour éviter les re-renders
  const tournamentProgress = useMemo(() => {
    return currentTournament ? getTournamentProgress() : null;
  }, [currentTournament, getTournamentProgress]);

  // Show tournament results if completed
  if (gameMode === 'tournament' && currentTournament?.isCompleted) {
    console.log('GamePage: Showing tournament results');
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

  console.log('GamePage: Rendering main game interface', {
    playersCount: players?.length || 0,
    showGameOver,
    gameMode,
    isInitialized,
    navigationBlocked
  });

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
