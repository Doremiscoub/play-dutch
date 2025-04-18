
import React, { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { useLocation } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Home, Refresh } from 'lucide-react';

const GamePageErrorFallback = ({ error, errorInfo, errorCode, reset }: { 
  error: Error; 
  errorInfo: ErrorInfo; 
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
            <Refresh className="h-4 w-4" />
            Réessayer
          </Button>
        )}
        
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="w-full flex items-center gap-2"
        >
          <Refresh className="h-4 w-4" />
          Rafraîchir la page
        </Button>
        
        <Button 
          onClick={() => window.location.href = '/'} 
          className="w-full flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Retour à l'accueil
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
  
  // Journalisation pour le suivi du composant
  useEffect(() => {
    console.info("GamePage: Montage du composant");
    
    // Délai d'initialisation pour s'assurer que tout est prêt
    const initTimer = setTimeout(() => {
      setIsReady(true);
    }, 200);
    
    return () => {
      console.info("GamePage: Démontage du composant");
      clearTimeout(initTimer);
      setIsReady(false);
    };
  }, []);
  
  // Journalisation des états principaux
  useEffect(() => {
    if (players && Array.isArray(players)) {
      console.info("GamePage: Mise à jour des données", {
        playerCount: players.length,
        roundCount: roundHistory?.length || 0,
        showGameOver
      });
    }
  }, [players, roundHistory, showGameOver]);
  
  // Vérifier les longues périodes d'inactivité
  useEffect(() => {
    const checkInactivity = () => {
      try {
        const savedGame = localStorage.getItem('current_dutch_game');
        if (!savedGame) return;
        
        const parsedGame = JSON.parse(savedGame);
        if (!parsedGame.lastUpdated) return;
        
        const lastUpdated = new Date(parsedGame.lastUpdated);
        const now = new Date();
        const hoursSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        // Si la dernière mise à jour date de plus de 24h, confirmer avec l'utilisateur
        if (hoursSinceLastUpdate > 24) {
          const confirmResume = window.confirm('Une partie non terminée a été trouvée, mais elle n\'a pas été mise à jour depuis plus de 24 heures. Voulez-vous la reprendre?');
          
          if (!confirmResume) {
            // Si l'utilisateur ne veut pas reprendre, nettoyer et redémarrer
            localStorage.removeItem('current_dutch_game');
            handleRestart();
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse de la partie sauvegardée:", error);
      }
    };
    
    // Vérifier l'inactivité après un court délai pour laisser le temps à l'initialisation
    if (isReady) {
      const timeoutId = setTimeout(checkInactivity, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [handleRestart, isReady]);
  
  // Protection contre les données invalides
  const safePlayersWithStats = Array.isArray(players) && players.length > 0
    ? updateAllPlayersStats(players)
    : [];
  
  const safeRoundHistory = Array.isArray(roundHistory) ? roundHistory : [];
  
  // Stocker le chemin actuel dans localStorage pour l'historique de navigation
  useEffect(() => {
    localStorage.setItem('dutch_previous_route', location.pathname);
  }, [location]);
  
  // Afficher un chargement si les données ne sont pas prêtes
  if (!isReady) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent"></div>
      </div>
    );
  }
  
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
