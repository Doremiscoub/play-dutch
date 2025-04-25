
/**
 * Page principale de jeu avec gestion des états et tentatives de récupération
 */
import React, { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [initError, setInitError] = useState<string | null>(null);
  
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
      // Afficher un indicateur de chargement
      setIsInitializing(true);
      setInitError(null);
      
      try {
        // Si aucun joueur n'est présent, tenter de créer une nouvelle partie
        if (!players || players.length === 0) {
          console.info("Aucun joueur trouvé, tentative de création d'une nouvelle partie...");
          const success = createNewGame();
          
          if (!success) {
            console.error("Échec de l'initialisation du jeu");
            setInitError("Impossible de démarrer la partie. Veuillez configurer les joueurs.");
            toast.error("Impossible de démarrer la partie");
          } else {
            console.info("Jeu initialisé avec succès avec", players.length, "joueurs");
            toast.success("Partie chargée avec succès");
          }
        } else {
          console.info("Partie existante détectée avec", players.length, "joueurs");
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation du jeu:", error);
        setInitError("Une erreur est survenue lors de l'initialisation. Veuillez réessayer.");
        toast.error("Erreur lors du chargement de la partie");
      } finally {
        // Désactiver l'indicateur de chargement
        setIsInitializing(false);
      }
    };
    
    initializeGame();
  }, [createNewGame, players?.length]);
  
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
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-dutch-blue/20 border-t-dutch-blue rounded-full mx-auto mb-4 animate-spin"></div>
          <p className="text-gray-600">Chargement de la partie...</p>
        </motion.div>
      </div>
    );
  }
  
  // Gestion d'erreur
  if (initError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-red-200"
        >
          <h2 className="text-xl font-semibold text-red-600 mb-3">Échec du chargement</h2>
          <p className="text-gray-700 mb-4">{initError}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => navigate('/game/setup')}
              className="px-4 py-2 bg-dutch-blue text-white rounded-lg hover:bg-dutch-blue/90 transition-colors"
            >
              Configurer une partie
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
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
  );
};

export default GamePage;
