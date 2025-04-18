import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { resetNotificationFlags } from '@/utils/playerInitializer';
import { useCurrentGame } from './game/useCurrentGame';
import { useRounds } from './game/useRounds';
import { useScoreLimit } from './game/useScoreLimit';

export const useGameState = () => {
  const navigate = useNavigate();
  const initializationAttempted = useRef(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);

  const {
    players,
    setPlayers,
    showGameOver,
    setShowGameOver,
    handleAddRound
  } = useCurrentGame();

  const {
    roundHistory,
    setRoundHistory,
    undoLastRound
  } = useRounds(soundEnabled);

  const {
    scoreLimit,
    setScoreLimit
  } = useScoreLimit();

  const {
    gameStartTime,
    setGameStartTime,
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
      navigate('/game/setup');
    } finally {
      // Réinitialiser le flag après un délai
      setTimeout(() => {
        initializationAttempted.current = false;
      }, 1000);
    }
  }, [loadGameState, navigate, setRoundHistory, createNewGame, setPlayers, setGameStartTime, setScoreLimit]);

  const handleUndoLastRound = () => {
    try {
      const updatedPlayers = undoLastRound(players);
      setPlayers(updatedPlayers);

      if (showGameOver) {
        setShowGameOver(false);
      }

      return true;
    } catch (error) {
      console.error("Erreur lors de l'annulation de la dernière manche:", error);
      return false;
    }
  };

  const handleConfirmEndGame = () => {
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      setShowGameEndConfirmation(false);
      return true;
    } catch (error) {
      console.error("Erreur lors de la confirmation de fin de partie:", error);
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
