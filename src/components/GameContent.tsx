
/**
 * Contenu principal de la page de jeu avec gestion d'erreurs renforcée
 */
import React, { useEffect, useState } from 'react';
import { Player } from '@/types';
import ErrorBoundary from './ErrorBoundary';
import ScoreBoard from './scoreboard/ScoreBoard';
import GameResultOverlay from './game/GameResultOverlay';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
  // État pour suivre l'initialisation sécurisée du composant
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  
  // Journalisation pour suivre le cycle de vie
  useEffect(() => {
    console.info("GameContent: Montage du composant");
    setHasMounted(true);
    
    // Délai court pour permettre aux sous-composants de s'initialiser correctement
    const initTimer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => {
      console.info("GameContent: Démontage du composant");
      clearTimeout(initTimer);
      setHasMounted(false);
      setIsInitialized(false);
    };
  }, []);
  
  // Journalisation des changements dans les données principales
  useEffect(() => {
    if (hasMounted) {
      console.info("GameContent: Mise à jour du tableau des scores", {
        playerCount: Array.isArray(players) ? players.length : 0,
        roundCount: Array.isArray(roundHistory) ? roundHistory.length : 0,
        showGameOver
      });
    }
  }, [players, roundHistory, showGameOver, hasMounted]);

  // Fallback UI en cas d'erreur avec détails améliorés
  const ErrorFallback = ({ error, errorInfo, errorCode, reset }: { 
    error: Error; 
    errorInfo: React.ErrorInfo; 
    errorCode: string;
    reset?: () => void;
  }) => (
    <div className="p-6 bg-white rounded-lg shadow-md m-4">
      <Alert variant="destructive" className="mb-6">
        <AlertTitle className="text-xl font-bold mb-2">Une erreur est survenue</AlertTitle>
        <AlertDescription>
          <p className="text-red-600 mb-4">{error.message}</p>
          <div className="text-xs text-muted-foreground mt-2 font-mono">Code: {errorCode}</div>
        </AlertDescription>
      </Alert>
      
      <div className="text-gray-600 mb-4">
        <p>Essayez de rafraîchir la page ou de revenir à l'accueil.</p>
        
        {process.env.NODE_ENV !== 'production' && (
          <details className="mt-4 text-xs">
            <summary className="cursor-pointer">Détails techniques</summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto">
              {errorInfo?.componentStack || error.stack}
            </pre>
          </details>
        )}
      </div>
      
      <div className="flex gap-4">
        {reset && (
          <button 
            onClick={reset}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Réessayer
          </button>
        )}
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Rafraîchir
        </button>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Accueil
        </button>
      </div>
    </div>
  );

  // Protection contre l'affichage pendant l'initialisation
  if (!hasMounted || !isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Tableau des scores */}
      {players.length > 0 ? (
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

      {/* Overlay de fin de partie - Implémentation plus robuste */}
      {showGameOver && players.length > 0 && (
        <GameResultOverlay
          key={`game-over`}
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
