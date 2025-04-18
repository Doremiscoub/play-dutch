
/**
 * Contenu principal de la page de jeu
 */
import React, { useEffect } from 'react';
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
  // Journalisation pour suivre le cycle de vie
  useEffect(() => {
    console.info("GameContent: Montage du composant");
    return () => {
      console.info("GameContent: Démontage du composant");
    };
  }, []);
  
  // Journalisation des changements dans les données principales
  useEffect(() => {
    console.info("GameContent: Mise à jour du tableau des scores", {
      playerCount: players.length,
      roundCount: roundHistory.length,
      showGameOver
    });
  }, [players, roundHistory, showGameOver]);

  // Fallback UI en cas d'erreur
  const ErrorFallback = ({ error }: { error: Error }) => (
    <div className="p-6 bg-red-50 rounded-lg border border-red-200 m-4">
      <h3 className="text-xl font-bold text-red-700 mb-2">Une erreur est survenue</h3>
      <p className="text-red-600 mb-4">
        {error.message}
      </p>
      <p className="text-gray-600 mb-4">
        Essayez de rafraîchir la page ou de revenir à l'accueil.
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Retour à l'accueil
      </button>
    </div>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Tableau des scores */}
      {players && players.length > 0 ? (
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
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-md m-4 text-center">
          <p className="text-gray-700">Aucun joueur disponible. Veuillez configurer une nouvelle partie.</p>
        </div>
      )}

      {/* Overlay de fin de partie - Implémentation plus robuste avec clé qui ne change pas constamment */}
      {showGameOver && players && players.length > 0 && (
        <GameResultOverlay
          key={`game-over`} // Clé plus stable
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
