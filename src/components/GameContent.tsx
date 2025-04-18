
/**
 * Contenu principal de la page de jeu
 */
import React from 'react';
import { Player } from '@/types';
import ErrorBoundary from './ErrorBoundary';
import ScoreBoard from './ScoreBoard';
import GameResultOverlay from './game/GameResultOverlay';

interface GameContentProps {
  players: Player[];
  roundHistory: { scores: number[], dutchPlayerId?: string }[];
  showGameOver: boolean;
  showGameEndConfirmation: boolean;
  scoreLimit: number;
  onAddRound: (scores: number[], dutchPlayerId?: string) => void;
  onUndoLastRound: () => void;
  onRequestEndGame: () => void;
  onConfirmEndGame: () => void;
  onCancelEndGame: () => void;
  onContinueGame: (newLimit: number) => void;
  onRestart: () => void;
}

const GameContent: React.FC<GameContentProps> = ({
  players,
  roundHistory,
  showGameOver,
  showGameEndConfirmation,
  scoreLimit,
  onAddRound,
  onUndoLastRound,
  onRequestEndGame,
  onConfirmEndGame,
  onCancelEndGame,
  onContinueGame,
  onRestart
}) => {
  // Fallback UI en cas d'erreur
  const ErrorFallback = ({ error }: { error: Error }) => (
    <div className="p-6 bg-red-50 rounded-lg border border-red-200 m-4">
      <h3 className="text-xl font-bold text-red-700 mb-2">Une erreur est survenue</h3>
      <p className="text-red-600 mb-4">
        {error.message}
      </p>
      <p className="text-gray-600">
        Essayez de rafraîchir la page ou de revenir à l'accueil.
      </p>
    </div>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Tableau des scores */}
      <ScoreBoard
        players={players}
        onAddRound={onAddRound}
        onUndoLastRound={onUndoLastRound}
        onEndGame={onRequestEndGame}
        roundHistory={roundHistory}
        showGameEndConfirmation={showGameEndConfirmation}
        onConfirmEndGame={onConfirmEndGame}
        onCancelEndGame={onCancelEndGame}
        scoreLimit={scoreLimit}
      />

      {/* Overlay de fin de partie */}
      {showGameOver && (
        <GameResultOverlay
          players={players}
          onContinue={onContinueGame}
          onRestart={onRestart}
          scoreLimit={scoreLimit}
        />
      )}
    </ErrorBoundary>
  );
};

export default GameContent;
