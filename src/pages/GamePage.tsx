
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
  const { isSignedIn } = useAuth();
  const [adsEnabled] = useLocalStorage('dutch_ads_enabled', true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  console.info('🎮 GamePage: Démarrage du rendu');
  
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
    console.info('🎮 GamePage: Effect d\'initialisation déclenché');
    
    const initializeGame = async () => {
      setIsInitializing(true);
      
      try {
        if (!players || players.length === 0) {
          console.info('🎮 GamePage: Aucun joueur trouvé, tentative de création');
          const success = await createNewGame();
          
          if (!success) {
            console.error('🎮 GamePage: Échec de la création de la partie');
            toast.error("Impossible de démarrer la partie");
            navigate('/game/setup');
            return;
          }
          
          console.info('🎮 GamePage: Partie créée avec succès');
        } else {
          console.info('🎮 GamePage: Joueurs existants trouvés:', players.length);
        }
      } catch (error) {
        console.error("🎮 GamePage: Erreur d'initialisation:", error);
        toast.error("Erreur lors du chargement de la partie");
        navigate('/game/setup');
      } finally {
        setIsInitializing(false);
      }
    };
    
    initializeGame();
  }, [createNewGame, navigate]);
  
  useEffect(() => {
    if (!isInitializing && players && players.length > 0) {
      console.info('🎮 GamePage: Finalisation du chargement');
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isInitializing, players]);

  const GameErrorFallback = ({ error }: { error: Error }) => {
    console.error('🎮 GamePage: Erreur de rendu capturée:', error);
    return (
      <ErrorDisplay 
        error={`Erreur de rendu: ${error.message}`}
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  };

  if (isInitializing) {
    console.info('🎮 GamePage: Affichage du spinner de chargement');
    return <LoadingSpinner />;
  }

  if (!players || players.length === 0) {
    console.warn('🎮 GamePage: Aucun joueur trouvé après initialisation');
    return (
      <ErrorDisplay 
        error="Aucun joueur trouvé. Redirection vers la configuration..."
        onRetry={() => {
          navigate('/game/setup');
        }}
      />
    );
  }

  console.info('🎮 GamePage: Rendu du contenu principal avec', players.length, 'joueurs');

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
