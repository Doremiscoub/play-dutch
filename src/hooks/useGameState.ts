import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useGameInitialization } from './useGameInitialization';
import { useGameContinuation } from './useGameContinuation';
import { verifyPlayerSetup } from '@/utils/playerInitializer';
import { useCurrentGame } from './game/useCurrentGame';
import { useRounds } from './game/useRounds';
import { useScoreLimit } from './game/useScoreLimit';
import { toast } from 'sonner';

export const useGameState = () => {
  const navigate = useNavigate();
  const initializationAttempted = useRef(false);
  const initializationProcessed = useRef(false);
  const maxInitWaitTime = useRef<NodeJS.Timeout | null>(null);
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

  const saveCurrentGameState = useCallback(() => {
    if (players && players.length > 0) {
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

  useEffect(() => {
    if (players && players.length > 0) {
      saveCurrentGameState();
    }
  }, [players, roundHistory, showGameOver, saveCurrentGameState]);

  useEffect(() => {
    if (initializationProcessed.current) {
      return;
    }
    
    initializationProcessed.current = true;
    console.debug('Valeurs localStorage au démarrage:', {
      dutch_player_setup: localStorage.getItem('dutch_player_setup'),
      current_dutch_game: localStorage.getItem('current_dutch_game'),
      dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
      dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
    });
    
    const isNewGameRequested = localStorage.getItem('dutch_new_game_requested') === 'true';
    
    if (isNewGameRequested) {
      console.info("Création d'une nouvelle partie demandée");
      
      const result = createNewGame();
      if (result && result.players?.length) {
        setPlayers(result.players);
        setRoundHistory([]);
        setScoreLimit(result.scoreLimit);
        
        // Charger l'état pour garantir la cohérence
        loadGameState();
        localStorage.removeItem('dutch_new_game_requested');
      }
      return;
    }
    
    console.info("Tentative de chargement d'une partie existante");
    const savedGame = loadGameState();
    
    if (savedGame && savedGame.players && savedGame.players.length > 0) {
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
      
      initializationCompleted.current = true;
      localStorage.setItem('dutch_initialization_completed', 'true');
      
      toast.success('Partie existante chargée !');
    } else {
      console.info("Aucune partie sauvegardée trouvée, vérification de la configuration des joueurs");
      
      const setupValid = verifyPlayerSetup();
      if (setupValid) {
        console.info("Configuration de joueurs valide trouvée, création d'une nouvelle partie");
        const success = createNewGame();
        if (!success && !initializationInProgress.current) {
          console.error("Échec lors de la création de la nouvelle partie");
          navigate('/game/setup');
        }
      } else {
        console.info("Aucune configuration de joueurs valide, redirection vers la configuration");
        toast.info("Veuillez configurer une nouvelle partie");
        navigate('/game/setup');
      }
    }
    
    console.debug('Valeurs localStorage après initialisation:', {
      dutch_player_setup: localStorage.getItem('dutch_player_setup'),
      current_dutch_game: localStorage.getItem('current_dutch_game'),
      dutch_new_game_requested: localStorage.getItem('dutch_new_game_requested'),
      dutch_initialization_completed: localStorage.getItem('dutch_initialization_completed')
    });
    
    return () => {
      if (maxInitWaitTime.current) {
        clearTimeout(maxInitWaitTime.current);
      }
    };
  }, [createNewGame, loadGameState, navigate, setGameStartTime, setPlayers, setRoundHistory, setScoreLimit, setShowGameOver, players]);

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
