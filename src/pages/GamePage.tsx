
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
import { verifyPlayerSetup } from '@/utils/playerInitializer';

const GamePageErrorFallback = ({ error, reset }: { 
  error: Error;
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
          
          {process.env.NODE_ENV !== 'production' && (
            <details className="mt-4 text-xs">
              <summary className="cursor-pointer">Détails techniques</summary>
              <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto max-h-[300px]">
                {error.stack}
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
  const [errorState, setErrorState] = useState<{hasError: boolean, message: string}>({
    hasError: false,
    message: ""
  });
  
  const gameState = useGameState();
  const { players, roundHistory, showGameOver, showGameEndConfirmation, scoreLimit } = gameState;
  
  // Enregistrement du chemin précédent pour la navigation
  useEffect(() => {
    localStorage.setItem('dutch_previous_route', location.pathname);
  }, [location]);
  
  // Initialisation lors du montage du composant avec délai pour que le hook useGameState ait le temps d'initialiser
  useEffect(() => {
    console.info("GamePage: Montage du composant");
    
    // Marquer la page comme visitée
    localStorage.setItem('dutch_game_page_visited', 'true');
    
    // Définir un délai pour considérer la page comme prête
    const initTimer = setTimeout(() => {
      setIsReady(true);
    }, 600);
    
    // Nettoyage lors du démontage
    return () => {
      console.info("GamePage: Démontage du composant");
      clearTimeout(initTimer);
      setIsReady(false);
    };
  }, []);
  
  // Vérification structurée des données après initialisation
  useEffect(() => {
    // Ne vérifier qu'une fois que nous sommes prêts
    if (!isReady) return;
    
    console.info("GamePage: Vérification de l'état une fois prêt:", {
      playersExist: Array.isArray(players) && players.length > 0,
      playersCount: players?.length || 0
    });
    
    // Si aucun joueur n'est disponible, faire une vérification plus approfondie
    if (!players || players.length === 0) {
      // Vérifier si une configuration valide existe
      const isValidSetup = verifyPlayerSetup();
      
      if (isValidSetup) {
        console.info("Configuration de joueurs valide trouvée, mais non initialisée");
        
        // Forcer la création d'une nouvelle partie
        localStorage.setItem('dutch_new_game_requested', 'true');
        
        // Recharger la page pour déclencher l'initialisation
        window.location.reload();
      } else {
        console.warn("Aucune configuration de joueurs valide trouvée, redirection vers la configuration");
        
        // Même après délai, s'il n'y a pas de joueurs, rediriger vers setup
        toast.error("Aucun joueur disponible. Configurez une nouvelle partie.");
        
        // Délai pour éviter les redirections trop rapides
        setTimeout(() => {
          navigate('/game/setup');
        }, 300);
      }
    }
  }, [isReady, players, navigate]);
  
  // Affichage d'un loader pendant l'initialisation
  if (!isReady) {
    return (
      <div className="min-h-screen w-full relative">
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground variant="default" />
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-dutch-blue border-t-transparent"></div>
        </div>
      </div>
    );
  }
  
  // Affichage d'une erreur en cas de problème
  if (errorState.hasError) {
    return (
      <div className="min-h-screen w-full relative">
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground variant="default" />
        </div>
        <div className="flex justify-center items-center min-h-screen flex-col p-6">
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
      </div>
    );
  }
  
  // Affichage si aucun joueur n'est disponible après l'initialisation
  if (!players || players.length === 0) {
    return (
      <div className="min-h-screen w-full relative">
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground variant="default" />
        </div>
        <div className="flex justify-center items-center min-h-screen flex-col p-6">
          <Alert variant="warning" className="mb-6 max-w-md">
            <AlertTitle>Configuration de partie requise</AlertTitle>
            <AlertDescription>
              Veuillez configurer une nouvelle partie pour commencer à jouer.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => navigate('/game/setup')} 
            className="mt-4 bg-dutch-blue text-white"
          >
            Configurer une partie
          </Button>
        </div>
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
