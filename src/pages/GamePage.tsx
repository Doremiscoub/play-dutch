
/**
 * Page principale de jeu avec gestion des états et tentatives de récupération
 */
import React, { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAuth } from '@/context/AuthContext';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import LoadingSpinner from '@/components/game/LoadingSpinner';
import ErrorDisplay from '@/components/game/ErrorDisplay';
import AdSenseLayout from '@/components/game/AdSenseLayout';
import { toast } from 'sonner';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [initError, setInitError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const [adsEnabled] = useLocalStorage('dutch_ads_enabled', true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initializationAttempted, setInitializationAttempted] = useState(false);
  
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
  
  // Initialiser le jeu au chargement du composant avec gestion d'erreur améliorée
  useEffect(() => {
    const initializeGame = async () => {
      // Ne pas réinitialiser si déjà tenté
      if (initializationAttempted) {
        return;
      }
      
      // Afficher un indicateur de chargement
      setIsInitializing(true);
      setInitError(null);
      setInitializationAttempted(true);
      
      try {
        // Si aucun joueur n'est présent, tenter de créer une nouvelle partie
        if (!players || players.length === 0) {
          console.info("Aucun joueur trouvé, tentative de création d'une nouvelle partie...");
          const success = createNewGame();
          
          if (!success) {
            console.error("Échec de l'initialisation du jeu");
            setInitError("Impossible de démarrer la partie. Veuillez configurer les joueurs.");
          }
        } else {
          console.info("Partie existante détectée avec", players.length, "joueurs");
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation du jeu:", error);
        setInitError("Une erreur est survenue lors de l'initialisation. Veuillez réessayer.");
        // Un seul toast d'erreur en cas d'exception non gérée
        toast.error("Erreur lors du chargement de la partie");
      } finally {
        // Désactiver l'indicateur de chargement
        setIsInitializing(false);
      }
    };
    
    initializeGame();
  }, [createNewGame, players, initializationAttempted]);
  
  // Marquer comme chargé après un court délai pour assurer la stabilité
  useEffect(() => {
    if (!isInitializing && !initError) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isInitializing, initError]);

  // Check for long inactivity with improved error handling
  useEffect(() => {
    try {
      const savedGame = localStorage.getItem('current_dutch_game');
      if (savedGame) {
        const parsedGame = JSON.parse(savedGame);
        const lastUpdated = new Date(parsedGame.lastUpdated);
        const now = new Date();
        const hoursSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLastUpdate > 24) {
          // Utiliser un toast de confirmation au lieu d'une alerte native
          toast.info(
            "Une partie non terminée a été trouvée. Voulez-vous la reprendre?",
            {
              duration: 10000,
              action: {
                label: "Reprendre",
                onClick: () => {
                  console.info("Reprise de la partie existante");
                }
              },
              cancel: {
                label: "Nouvelle partie",
                onClick: () => {
                  localStorage.removeItem('current_dutch_game');
                  handleRestart();
                  toast.success("Nouvelle partie créée");
                }
              }
            }
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse de la partie sauvegardée:", error);
      toast.error("Erreur lors de la vérification des parties sauvegardées");
      localStorage.removeItem('current_dutch_game');
    }
  }, [handleRestart]);
  
  // Optimiser les calculs de statistiques avec mémoisation
  const playersWithStats = React.useMemo(() => 
    updateAllPlayersStats(players), 
    [players]
  );
  
  // État de chargement
  if (isInitializing) {
    return <LoadingSpinner />;
  }
  
  // Gestion d'erreur
  if (initError) {
    return (
      <ErrorDisplay 
        error={initError}
        onRetry={() => {
          setInitializationAttempted(false);
          window.location.reload();
        }}
      />
    );
  }

  // Layout principal avec support pour AdSense
  return (
    <AdSenseLayout
      isSignedIn={isSignedIn}
      adsEnabled={adsEnabled}
      isLoaded={isLoaded}
    >
      <GameContent
        players={playersWithStats}
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
  );
};

export default GamePage;
