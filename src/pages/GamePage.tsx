
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '@/hooks/useGameState';
import GamePageContainer from '@/components/game/GamePageContainer';
import PageShell from '@/components/layout/PageShell';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const gameState = useGameState();

  // Load existing game on mount
  useEffect(() => {
    if (!gameState.isInitialized) {
      const loaded = gameState.loadExistingGame();
      if (!loaded) {
        console.log('No existing game found, redirecting to setup');
        navigate('/setup');
      }
    }
  }, [gameState.isInitialized, gameState.loadExistingGame, navigate]);

  // Show loading if not initialized
  if (!gameState.isInitialized || !gameState.players || gameState.players.length === 0) {
    return (
      <PageShell variant="game">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center lg-card lg-tint-primary-50 rounded-xl p-8 lg-elevation-02 animate-lg-reveal">
            <div className="animate-spin rounded-full border-b-2 mx-auto mb-4 h-8 w-8 border-white"></div>
            <p className="text-white">Chargement de la partie...</p>
          </div>
        </div>
      </PageShell>
    );
  }

  const handleBackToSetup = () => {
    navigate('/setup');
  };

  return (
    <PageShell variant="game">
      <GamePageContainer
        players={gameState.players}
        roundHistory={gameState.roundHistory}
        showGameOver={gameState.showGameOver}
        showGameEndConfirmation={gameState.showGameEndConfirmation}
        scoreLimit={gameState.scoreLimit}
        gameMode="quick"
        currentTournament={null}
        tournamentProgress={null}
        showScoreForm={gameState.showScoreForm}
        onAddRound={gameState.handleAddRound}
        onUndoLastRound={gameState.handleUndoLastRound}
        onRequestEndGame={gameState.handleRequestEndGame}
        onConfirmEndGame={gameState.handleConfirmEndGame}
        onCancelEndGame={gameState.handleCancelEndGame}
        onContinueGame={gameState.handleContinueGame}
        onRestart={gameState.handleRestart}
        onOpenScoreForm={gameState.handleOpenScoreForm}
        onCloseScoreForm={gameState.handleCloseScoreForm}
        onBackToSetup={handleBackToSetup}
      />
    </PageShell>
  );
};

export default GamePage;
