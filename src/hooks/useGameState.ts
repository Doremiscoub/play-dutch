
/**
 * Main hook for game state management
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useRoundManagement } from './useRoundManagement';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { resetNotificationFlags } from '@/utils/playerInitializer';

/**
 * Main hook for complete game state management
 */
export const useGameState = () => {
  const navigate = useNavigate();
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  const initializationAttempted = useRef(false);
  
  // Use our modular hooks
  const {
    players, 
    setPlayers, 
    gameStartTime, 
    setGameStartTime,
    scoreLimit,
    setScoreLimit, 
    createNewGame, 
    initializationCompleted,
    initializationInProgress
  } = useGameInitialization();
  
  const { 
    showGameEndConfirmation, 
    setShowGameEndConfirmation, 
    handleRequestEndGame, 
    handleCancelEndGame, 
    handleContinueGame,
    handleRestart
  } = useGameContinuation(setShowGameOver, setScoreLimit, scoreLimit);
  
  const { loadGameState, saveGameState, saveGameToHistory } = useGamePersistence();
  const { roundHistory, setRoundHistory, addRound, undoLastRound } = useRoundManagement(scoreLimit, soundEnabled);
  
  // Initialize game from localStorage or URL parameters
  useEffect(() => {
    try {
      if (initializationCompleted.current || initializationAttempted.current || initializationInProgress.current) {
        console.info("Initialisation déjà tentée ou en cours, ignorer");
        return; // Avoid double initialization
      }
      
      initializationAttempted.current = true;
      console.info("Tentative d'initialisation du jeu...");
      resetNotificationFlags(); // Réinitialiser les flags de notification
      
      const initializeGame = () => {
        console.info('Initialisation du jeu...');
        
        // Vérifier si une nouvelle partie est explicitement demandée
        const isNewGameRequested = localStorage.getItem('dutch_new_game_requested') === 'true';
        
        if (isNewGameRequested) {
          console.info("Nouvelle partie demandée, création...");
          localStorage.removeItem('dutch_new_game_requested');
          createNewGame();
          return;
        }
        
        // Sinon, créer une nouvelle partie ou charger une existante
        const success = createNewGame();
        
        // Si la création échoue, essayer de charger une partie existante
        if (!success) {
          console.info("Tentative de chargement d'une partie existante");
          const savedGame = loadGameState();
          
          if (savedGame) {
            console.info("Chargement d'une partie existante");
            setPlayers(savedGame.players);
            setRoundHistory(savedGame.roundHistory || []);
            setScoreLimit(savedGame.scoreLimit || 100);
            
            if (savedGame.gameStartTime) {
              setGameStartTime(new Date(savedGame.gameStartTime));
            }
            
            if (savedGame.isGameOver) {
              setShowGameOver(true);
            }
            
            // Marquer l'initialisation comme terminée
            initializationCompleted.current = true;
            console.info("Initialisation depuis une sauvegarde réussie");
          } else {
            console.info("Aucune partie sauvegardée trouvée, redirection vers la configuration");
            navigate('/game/setup');
          }
        }
      };
      
      initializeGame();
    } catch (error) {
      console.error("Erreur lors de l'initialisation du jeu:", error);
      toast.error("Une erreur est survenue lors du chargement de la partie");
      navigate('/game/setup');
    } finally {
      // Réinitialiser le flag après un délai
      setTimeout(() => {
        initializationAttempted.current = false;
      }, 1000);
    }
  }, [loadGameState, navigate, setRoundHistory, createNewGame, setPlayers, setGameStartTime, setScoreLimit]);
  
  // Sauvegarde automatique lorsque l'état du jeu change
  useEffect(() => {
    try {
      if (players.length > 0) {
        const gameState = {
          players,
          roundHistory,
          isGameOver: showGameOver,
          scoreLimit,
          gameStartTime,
          lastUpdated: new Date()
        };
        
        saveGameState(gameState);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'état du jeu:", error);
    }
  }, [players, roundHistory, showGameOver, scoreLimit, gameStartTime, saveGameState]);
  
  // Ajout d'une nouvelle manche avec protection contre les doubles soumissions
  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    try {
      console.info("Ajout d'une nouvelle manche:", scores, "Dutch:", dutchPlayerId);
      const result = addRound(players, scores, dutchPlayerId);
      
      if (result) {
        const { updatedPlayers, isGameOver: gameOver } = result;
        setPlayers(updatedPlayers);
        
        if (gameOver) {
          setTimeout(() => {
            setShowGameOver(true);
          }, 500);
        }
        
        return true; // Indiquer que l'ajout a réussi
      }
      
      return false; // Indiquer que l'ajout a échoué
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une manche:", error);
      toast.error("Une erreur est survenue lors de l'ajout de la manche");
      return false;
    }
  };
  
  // Annulation de la dernière manche
  const handleUndoLastRound = () => {
    try {
      const updatedPlayers = undoLastRound(players, soundEnabled);
      setPlayers(updatedPlayers);
      
      // Si l'écran de fin de partie était affiché, le masquer
      if (showGameOver) {
        setShowGameOver(false);
      }
      
      return true; // Indiquer que l'annulation a réussi
    } catch (error) {
      console.error("Erreur lors de l'annulation de la dernière manche:", error);
      toast.error("Une erreur est survenue lors de l'annulation de la manche");
      return false;
    }
  };
  
  // Confirmation de fin de partie avec sauvegarde dans l'historique
  const handleConfirmEndGame = () => {
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      setShowGameEndConfirmation(false);
      return true;
    } catch (error) {
      console.error("Erreur lors de la confirmation de fin de partie:", error);
      toast.error("Une erreur est survenue lors de la sauvegarde de la partie");
      return false;
    }
  };

  return {
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    gameStartTime,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  };
};

export default useGameState;
