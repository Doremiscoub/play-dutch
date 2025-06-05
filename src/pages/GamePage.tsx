
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '@/hooks/useGameState';
import GamePageContainer from '@/components/game/GamePageContainer';
import PageShell from '@/components/layout/PageShell';
import { DESIGN_COLORS, DESIGN_SPACING } from '@/design/tokens';

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
          <div className="text-center">
            <div 
              className="animate-spin rounded-full border-b-2 mx-auto mb-4"
              style={{ 
                height: DESIGN_SPACING[8], 
                width: DESIGN_SPACING[8],
                borderColor: DESIGN_COLORS.primary[500],
                marginBottom: DESIGN_SPACING[4]
              }}
            ></div>
            <p style={{ color: DESIGN_COLORS.neutral[700] }}>Chargement de la partie...</p>
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
        showScoreForm={false}
        onAddRound={gameState.handleAddRound}
        onUndoLastRound={gameState.handleUndoLastRound}
        onRequestEndGame={gameState.handleRequestEndGame}
        onConfirmEndGame={gameState.handleConfirmEndGame}
        onCancelEndGame={gameState.handleCancelEndGame}
        onContinueGame={gameState.handleContinueGame}
        onRestart={gameState.handleRestart}
        onOpenScoreForm={() => {}}
        onCloseScoreForm={() => {}}
        onBackToSetup={handleBackToSetup}
      />
    </PageShell>
  );
};

export default GamePage;
