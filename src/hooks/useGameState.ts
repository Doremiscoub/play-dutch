
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { resetNotificationFlags } from '@/utils/playerInitializer';
import { useCurrentGame } from './game/useCurrentGame';
import { useRounds } from './game/useRounds';
import { useScoreLimit } from './game/useScoreLimit';
import { toast } from 'sonner';

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

  // Cette fonction sauvegarde l'état actuel du jeu
  const saveCurrentGameState = useCallback(() => {
    if (players.length > 0) {
      console.info('Sauvegarde de l\'état du jeu');
      saveGameState({
        players,
        roundHistory,
        isGameOver: showGameOver,
        scoreLimit,
        gameStartTime
      });
    }
  }, [players, roundHistory, showGameOver, scoreLimit, gameStartTime, saveGameState]);

  // Sauvegarde automatique à chaque changement d'état important
  useEffect(() => {
    if (players.length > 0) {
      saveCurrentGameState();
    }
  }, [players, roundHistory, showGameOver, saveCurrentGameState]);

  // Effet d'initialisation - C'est ici que nous devons corriger le problème
  useEffect(() => {
    try {
      console.info("Tentative d'initialisation du jeu...");
      
      if (initializationCompleted.current) {
        console.info("Initialisation déjà complétée, ignorer");
        return;
      }
      
      if (initializationAttempted.current) {
        console.info("Initialisation déjà tentée, ignorer");
        return;
      }
      
      if (initializationInProgress.current) {
        console.info("Initialisation déjà en cours, ignorer");
        return;
      }
      
      initializationAttempted.current = true;
      resetNotificationFlags();
      
      const initializeGame = async () => {
        console.info('Initialisation du jeu...');
        
        // Vérifier si une nouvelle partie est explicitement demandée
        const isNewGameRequested = localStorage.getItem('dutch_new_game_requested') === 'true';
        console.info('Nouvelle partie demandée:', isNewGameRequested);
        
        // Vérifier le mode de jeu (local ou multijoueur)
        const gameMode = localStorage.getItem('dutch_game_mode') || 'local';
        console.info('Mode de jeu détecté:', gameMode);
        
        if (isNewGameRequested) {
          console.info("Nouvelle partie demandée, création...");
          if (gameMode === 'local') {
            const success = await createNewGame();
            if (!success) {
              console.error("Échec de création de la nouvelle partie locale");
              toast.error("Impossible de créer une nouvelle partie");
              navigate('/game/setup');
            }
            return;
          } else {
            // Gérer le mode multijoueur (à implémenter plus tard)
            console.info("Mode multijoueur demandé mais non implémenté, création d'une partie locale");
            const success = await createNewGame();
            if (!success) {
              console.error("Échec de création de la partie");
              toast.error("Impossible de créer une nouvelle partie");
              navigate('/game/setup');
            }
            return;
          }
        }
        
        // Sinon, essayer de charger une partie existante
        console.info("Tentative de chargement d'une partie existante");
        const savedGame = loadGameState();
        
        if (savedGame && savedGame.players && savedGame.players.length > 0) {
          console.info("Chargement d'une partie existante avec", savedGame.players.length, "joueurs");
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
        } else {
          console.info("Aucune partie sauvegardée trouvée, tentative de création d'une nouvelle partie");
          // Tenter de créer une nouvelle partie avec la config existante
          const success = await createNewGame();
          if (!success) {
            console.error("Échec de création de la nouvelle partie et aucune partie sauvegardée");
            toast.error("Impossible de créer ou charger une partie");
            navigate('/game/setup');
          }
        }
      };
      
      initializeGame();
    } catch (error) {
      console.error("Erreur lors de l'initialisation du jeu:", error);
      toast.error("Erreur lors de l'initialisation du jeu");
      navigate('/game/setup');
    } finally {
      // Réinitialiser le flag après un délai
      setTimeout(() => {
        initializationAttempted.current = false;
      }, 1000);
    }
  }, [createNewGame, loadGameState, navigate, setGameStartTime, setPlayers, setRoundHistory, setScoreLimit, setShowGameOver]);

  const handleUndoLastRound = useCallback(() => {
    try {
      const updatedPlayers = undoLastRound(players);
      
      if (updatedPlayers) {
        setPlayers(updatedPlayers);

        if (showGameOver) {
          setShowGameOver(false);
        }
      }

      return true;
    } catch (error) {
      console.error("Erreur lors de l'annulation de la dernière manche:", error);
      return false;
    }
  }, [players, undoLastRound, showGameOver, setPlayers, setShowGameOver]);

  const handleConfirmEndGame = useCallback(() => {
    try {
      saveGameToHistory(players, gameStartTime);
      setShowGameOver(true);
      setShowGameEndConfirmation(false);
      return true;
    } catch (error) {
      console.error("Erreur lors de la confirmation de fin de partie:", error);
      return false;
    }
  }, [players, gameStartTime, saveGameToHistory, setShowGameOver, setShowGameEndConfirmation]);

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
