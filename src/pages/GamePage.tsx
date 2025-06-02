
import React, { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/game/LoadingSpinner';
import ErrorDisplay from '@/components/game/ErrorDisplay';
import AdSenseLayout from '@/components/game/AdSenseLayout';
import { toast } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [initializationAttempted, setInitializationAttempted] = useState<boolean>(false);
  const { isSignedIn } = useAuth();
  const [adsEnabled] = useLocalStorage('dutch_ads_enabled', true);
  const [isLoaded, setIsLoaded] = useState(false);
  
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
    handleRestart,
    createNewGame,
  } = useGameState();
  
  useEffect(() => {
    const initializeGame = async () => {
      if (initializationAttempted) {
        return;
      }
      
      setIsInitializing(true);
      setInitializationAttempted(true);
      
      try {
        console.info('GamePage: Starting initialization...');
        
        if (!players || players.length === 0) {
          console.info('GamePage: No players found, creating new game...');
          const success = await createNewGame();
          
          if (!success) {
            console.error('GamePage: Failed to create new game');
            toast.error("Impossible de démarrer la partie");
            setTimeout(() => {
              navigate('/game/setup');
            }, 2000);
            return;
          }
        } else {
          console.info('GamePage: Using existing players:', players.length);
        }
      } catch (error) {
        console.error("GamePage: Initialization error:", error);
        toast.error("Erreur lors du chargement de la partie");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } finally {
        setIsInitializing(false);
      }
    };
    
    initializeGame();
  }, [createNewGame, players, initializationAttempted, navigate]);
  
  useEffect(() => {
    if (!isInitializing && players && players.length > 0) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isInitializing, players]);

  const GameErrorFallback = ({ error }: { error: Error }) => (
    <ErrorDisplay 
      error={`Erreur de rendu: ${error.message}`}
      onRetry={() => {
        window.location.reload();
      }}
    />
  );

  if (isInitializing) {
    return <LoadingSpinner />;
  }

  if (!players || players.length === 0) {
    return (
      <ErrorDisplay 
        error="Aucun joueur trouvé. Redirection vers la configuration..."
        onRetry={() => {
          navigate('/game/setup');
        }}
      />
    );
  }

  return (
    <ErrorBoundary FallbackComponent={GameErrorFallback}>
      <AdSenseLayout
        isSignedIn={isSignedIn}
        adsEnabled={adsEnabled}
        isLoaded={isLoaded}
      >
        <GameContent
          players={players}
          roundHistory={roundHistory}
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
      </AdSenseLayout>
    </ErrorBoundary>
  );
};

export default GamePage;
