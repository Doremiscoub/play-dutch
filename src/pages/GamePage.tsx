
import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import ErrorBoundary from '@/components/ErrorBoundary';
import GameErrorBoundary from '@/components/game/GameErrorBoundary';
import GameLoader from '@/components/game/GameLoader';
import NoPlayersAlert from '@/components/game/NoPlayersAlert';
import { useGamePageInitialization } from '@/hooks/game/useGamePageInitialization';
import AnimatedBackground from '@/components/AnimatedBackground';

const GamePage: React.FC = () => {
  const { isReady } = useGamePageInitialization();
  const gameState = useGameState();
  const { players, roundHistory, showGameOver, showGameEndConfirmation, scoreLimit } = gameState;
  
  // Protection contre l'affichage pendant l'initialisation
  if (!isReady) {
    return <GameLoader />;
  }

  // Affichage si aucun joueur n'est disponible après l'initialisation
  if (!players || players.length === 0) {
    return <NoPlayersAlert />;
  }

  // Rendu principal avec gestion d'erreur
  return (
    <ErrorBoundary FallbackComponent={GameErrorBoundary}>
      <GameContent
        players={players}
        roundHistory={roundHistory}
        showGameOver={showGameOver}
        showGameEndConfirmation={showGameEndConfirmation}
        scoreLimit={scoreLimit}
        onAddRound={gameState.handleAddRound}
        onUndoLastRound={gameState.handleUndoLastRound}
        onRequestEndGame={gameState.handleRequestEndGame}
        onConfirmEndGame={gameState.handleConfirmEndGame}
        onCancelEndGame={gameState.handleCancelEndGame}
        onContinueGame={gameState.handleContinueGame}
        onRestart={gameState.handleRestart}
      />
    </ErrorBoundary>
  );
};

export default GamePage;
