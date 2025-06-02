
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
import { verifyPlayerSetup } from '@/utils/playerInitializer';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [initError, setInitError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const [adsEnabled] = useLocalStorage('dutch_ads_enabled', true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [initializationAttempted, setInitializationAttempted] = useState<boolean>(false);
  
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
  
  // Fonction de debug pour vérifier l'état du localStorage
  const debugLocalStorage = () => {
    try {
      const playerSetup = localStorage.getItem('dutch_player_setup');
      console.info("Debug - État dutch_player_setup:", playerSetup);
      
      // Vérifier si la configuration est valide
      const isValid = verifyPlayerSetup();
      console.info("Debug - Configuration valide:", isValid);
      
      return !!playerSetup && isValid;
    } catch (error) {
      console.error("Erreur lors du debug localStorage:", error);
      return false;
    }
  };
  
  useEffect(() => {
    const initializeGame = async () => {
      if (initializationAttempted) {
        return;
      }
      
      setIsInitializing(true);
      setInitError(null);
      setInitializationAttempted(true);
      
      try {
        // Vérifier d'abord si la configuration existe et est valide
        const hasValidSetup = debugLocalStorage();
        
        if (!hasValidSetup) {
          console.error("Aucune configuration valide trouvée");
          setInitError("Impossible de démarrer la partie. Veuillez configurer les joueurs.");
          setIsInitializing(false);
          // Rediriger vers la page de configuration après un délai
          setTimeout(() => {
            navigate('/game/setup');
          }, 2000);
          return;
        }
        
        if (!players || players.length === 0) {
          console.info("Aucun joueur trouvé, tentative de création d'une nouvelle partie...");
          const success = await createNewGame();
          
          if (!success) {
            console.error("Échec de l'initialisation du jeu");
            setInitError("Impossible de démarrer la partie. Redirection vers la configuration...");
            toast.error("Impossible de démarrer la partie");
            setTimeout(() => {
              navigate('/game/setup');
            }, 2000);
          } else {
            console.info("Nouvelle partie créée avec succès");
          }
        } else {
          console.info("Partie existante détectée avec", players.length, "joueurs");
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation du jeu:", error);
        setInitError("Une erreur est survenue lors de l'initialisation. Redirection...");
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
  
  // Effet pour déclencher l'animation de chargement
  useEffect(() => {
    if (!isInitializing && !initError && players && players.length > 0) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isInitializing, initError, players]);

  // Effet pour vérifier les parties sauvegardées
  useEffect(() => {
    try {
      const savedGame = localStorage.getItem('current_dutch_game');
      if (savedGame) {
        const parsedGame = JSON.parse(savedGame);
        const lastUpdated = new Date(parsedGame.lastUpdated);
        const now = new Date();
        const hoursSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLastUpdate > 24) {
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
    }
  }, [handleRestart]);
  
  // Calculer les statistiques des joueurs avec gestion d'erreur
  const playersWithStats = React.useMemo(() => {
    try {
      if (!players || players.length === 0) {
        console.warn("Aucun joueur disponible pour calculer les stats");
        return [];
      }
      return updateAllPlayersStats(players);
    } catch (error) {
      console.error("Erreur lors du calcul des statistiques:", error);
      toast.error("Erreur lors du calcul des statistiques");
      // Retourner les joueurs sans stats au lieu de faire crash
      return players;
    }
  }, [players]);
  
  // Afficher un spinner pendant le chargement
  if (isInitializing) {
    return <LoadingSpinner />;
  }
  
  // Afficher une erreur si l'initialisation a échoué
  if (initError) {
    return (
      <ErrorDisplay 
        error={initError}
        onRetry={() => {
          setInitializationAttempted(false);
          navigate('/game/setup');
        }}
      />
    );
  }

  // Afficher le contenu du jeu seulement si nous avons des joueurs
  if (!players || players.length === 0) {
    return (
      <ErrorDisplay 
        error="Aucun joueur trouvé pour cette partie. Redirection vers la configuration..."
        onRetry={() => {
          setInitializationAttempted(false);
          navigate('/game/setup');
        }}
      />
    );
  }

  // Validation supplémentaire avant le rendu
  if (!playersWithStats || playersWithStats.length === 0) {
    return (
      <ErrorDisplay 
        error="Erreur dans les données des joueurs. Redirection..."
        onRetry={() => {
          navigate('/game/setup');
        }}
      />
    );
  }

  // Afficher le contenu du jeu
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
