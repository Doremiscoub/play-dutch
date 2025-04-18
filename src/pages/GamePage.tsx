
import React, { useEffect } from 'react';
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
  
  // Debug des valeurs localStorage au montage de la page
  useEffect(() => {
    console.debug('GamePage - Valeurs localStorage:', {
      dutch_player_setup: localStorage.getItem('dutch_player_setup'),
      current_dutch_game: localStorage.getItem('current_dutch_game'),
      dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
      dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
    });
  }, []);
  
  // Protection contre l'affichage pendant l'initialisation
  if (!isReady) {
    return <GameLoader message="Initialisation de la partie..." />;
  }

  // Affichage si aucun joueur n'est disponible après l'initialisation
  if (!players || players.length === 0) {
    console.warn("GamePage: Aucun joueur disponible après initialisation");
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
