
import React, { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';

const GamePageErrorFallback = ({ error, errorInfo, errorCode, reset }: { 
  error: Error; 
  errorInfo: React.ErrorInfo; 
  errorCode: string;
  reset?: () => void;
}) => (
  <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
    <div className="w-full max-w-lg">
      <Alert variant="destructive" className="mb-6">
        <AlertTitle className="text-xl font-bold mb-2">
          Une erreur critique est survenue
        </AlertTitle>
        <AlertDescription>
          <p className="mb-4">{error.message}</p>
          <div className="text-xs text-muted-foreground mt-2 font-mono">Code: {errorCode}</div>
          
          {process.env.NODE_ENV !== 'production' && (
            <details className="mt-4 text-xs">
              <summary className="cursor-pointer">Détails techniques</summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-[300px]">
                {errorInfo?.componentStack || error.stack}
              </pre>
            </details>
          )}
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col gap-3 mt-6">
        {reset && (
          <Button onClick={reset} variant="outline" className="w-full flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </Button>
        )}
        
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Rafraîchir la page
        </Button>
        
        <Button 
          onClick={() => window.location.href = '/game/setup'} 
          className="w-full flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Configurer une nouvelle partie
        </Button>
      </div>
    </div>
  </div>
);

const GamePage: React.FC = () => {
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
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
    handleRestart
  } = useGameState();
  
  useEffect(() => {
    console.info("GamePage: Montage du composant");
    
    // Reset flag
    localStorage.removeItem('dutch_game_page_visited');
    localStorage.setItem('dutch_game_page_visited', 'true');
    
    // Ajouter un délai pour s'assurer que l'initialisation est terminée
    const initTimer = setTimeout(() => {
      setIsReady(true);
    }, 300);
    
    return () => {
      console.info("GamePage: Démontage du composant");
      clearTimeout(initTimer);
      setIsReady(false);
    };
  }, []);
  
  useEffect(() => {
    if (players && Array.isArray(players)) {
      console.info("GamePage: Mise à jour des données", {
        playerCount: players.length,
        roundCount: roundHistory?.length || 0,
        showGameOver
      });
    }
  }, [players, roundHistory, showGameOver]);
  
  // Vérifier si l'état du jeu est valide
  const gameStateValid = Array.isArray(players) && players.length > 0;
  
  // Si la page est prête mais qu'aucun joueur n'est défini, rediriger vers la configuration
  useEffect(() => {
    if (isReady && !gameStateValid) {
      const redirectTimer = setTimeout(() => {
        console.warn("Aucun joueur disponible après initialisation, redirection vers la configuration");
        window.location.href = '/game/setup';
      }, 500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isReady, gameStateValid]);
  
  useEffect(() => {
    localStorage.setItem('dutch_previous_route', location.pathname);
  }, [location]);
  
  if (!isReady) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent"></div>
      </div>
    );
  }
  
  const safePlayersWithStats = Array.isArray(players) && players.length > 0
    ? updateAllPlayersStats(players)
    : [];
  
  const safeRoundHistory = Array.isArray(roundHistory) ? roundHistory : [];
  
  return (
    <ErrorBoundary FallbackComponent={GamePageErrorFallback}>
      <GameContent
        players={safePlayersWithStats}
        roundHistory={safeRoundHistory}
        showGameOver={showGameOver}
        showGameEndConfirmation={showGameEndConfirmation}
        scoreLimit={scoreLimit}
        onAddRound={handleAddRound}
        onUndoLastRound={handleUndoLastRound}
        onRequestEndGame={handleRequestEndGame}
        onConfirmEndGame={handleConfirmEndGame}
        onCancelEndGame={handleCancelEndGame}
        onContinueGame={handleContinueGame}
        onRestart={handleRestart}
      />
    </ErrorBoundary>
  );
};

export default GamePage;
