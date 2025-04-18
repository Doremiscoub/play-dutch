
import React, { useEffect, useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedBackground from '@/components/AnimatedBackground';

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
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [initializationTimeout, setInitializationTimeout] = useState(false);
  const [errorState, setErrorState] = useState<{hasError: boolean, message: string}>({
    hasError: false,
    message: ""
  });
  
  const gameState = useGameState();
  const { players, roundHistory, showGameOver, showGameEndConfirmation, scoreLimit } = gameState;
  
  // Vérification de l'état du jeu
  const checkGameState = useCallback(() => {
    console.info("Vérification de l'état du jeu:", {
      playersExist: Array.isArray(players) && players.length > 0,
      playerCount: Array.isArray(players) ? players.length : 0
    });
    
    // Si aucun joueur n'est disponible, vérifier les causes possibles
    if (!Array.isArray(players) || players.length === 0) {
      console.warn("Aucun joueur disponible, vérification des causes possibles");
      
      // Vérifier si une configuration existe
      const playerSetup = localStorage.getItem('dutch_player_setup');
      
      // Vérifier si une initialisation est en cours
      const initCompleted = localStorage.getItem('dutch_initialization_completed') === 'true';
      
      if (playerSetup) {
        console.info("Configuration trouvée mais non initialisée, forçage de création");
        
        // Forcer une nouvelle tentative d'initialisation
        localStorage.setItem('dutch_new_game_requested', 'true');
        localStorage.removeItem('dutch_initialization_completed');
        
        // Recharger la page pour forcer l'initialisation
        setTimeout(() => {
          window.location.reload();
        }, 500);
        
        return false;
      } else if (!initCompleted) {
        console.info("Initialisation non terminée ou échouée");
        
        // Rediriger vers la page de configuration
        toast.error("Initialisation de la partie incomplète");
        navigate('/game/setup');
        return false;
      } else {
        // Redirection vers configuration
        toast.error("Aucun joueur disponible. Veuillez configurer une nouvelle partie.");
        navigate('/game/setup');
        return false;
      }
    }
    
    return true;
  }, [players, navigate]);
  
  // Initialisation lors du montage du composant
  useEffect(() => {
    console.info("GamePage: Montage du composant");
    
    // Marquer la page comme visitée
    localStorage.setItem('dutch_game_page_visited', 'true');
    
    // Définir un timeout pour détecter les problèmes d'initialisation
    const timeoutHandler = setTimeout(() => {
      if (!Array.isArray(players) || players.length === 0) {
        setInitializationTimeout(true);
        console.warn("Timeout d'initialisation atteint");
      }
    }, 3000); // Augmentation du timeout pour permettre l'initialisation
    
    // Définir un délai pour considérer la page comme prête
    const initTimer = setTimeout(() => {
      setIsReady(true);
    }, 800); // Augmentation du délai d'initialisation
    
    // Nettoyage lors du démontage
    return () => {
      console.info("GamePage: Démontage du composant");
      clearTimeout(initTimer);
      clearTimeout(timeoutHandler);
      setIsReady(false);
      setInitializationTimeout(false);
    };
  }, []);
  
  // Vérification de l'état du jeu une fois prêt
  useEffect(() => {
    if (isReady) {
      try {
        checkGameState();
      } catch (error) {
        console.error("Erreur lors de la vérification de l'état du jeu:", error);
        setErrorState({
          hasError: true,
          message: "Erreur lors de la vérification de l'état du jeu"
        });
      }
    }
  }, [isReady, checkGameState]);
  
  // Gestion du timeout d'initialisation
  useEffect(() => {
    if (initializationTimeout) {
      console.warn("Timeout d'initialisation atteint, navigation vers la configuration");
      
      // En cas de timeout, forcer la redirection vers la configuration
      navigate('/game/setup');
    }
  }, [initializationTimeout, navigate]);
  
  // Enregistrement du chemin précédent pour la navigation
  useEffect(() => {
    localStorage.setItem('dutch_previous_route', location.pathname);
  }, [location]);
  
  // Affichage d'un loader pendant l'initialisation
  if (!isReady) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent"></div>
      </div>
    );
  }
  
  // Affichage d'une erreur en cas de problème
  if (errorState.hasError) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col p-6">
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground variant="default" />
        </div>
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{errorState.message}</AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate('/game/setup')} 
          className="mt-4 bg-dutch-blue text-white"
        >
          Configurer une nouvelle partie
        </Button>
      </div>
    );
  }
  
  // Affichage si aucun joueur n'est disponible
  if (!Array.isArray(players) || players.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col p-6">
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground variant="default" />
        </div>
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertTitle>Aucun joueur disponible</AlertTitle>
          <AlertDescription>
            Veuillez configurer une nouvelle partie.
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate('/game/setup')} 
          className="mt-4 bg-dutch-blue text-white"
        >
          Configurer une partie
        </Button>
      </div>
    );
  }
  
  // Préparation des données pour l'affichage
  const safePlayersWithStats = updateAllPlayersStats(players);
  const safeRoundHistory = Array.isArray(roundHistory) ? roundHistory : [];
  
  // Rendu du contenu du jeu
  return (
    <ErrorBoundary FallbackComponent={GamePageErrorFallback}>
      <GameContent
        players={safePlayersWithStats}
        roundHistory={safeRoundHistory}
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
