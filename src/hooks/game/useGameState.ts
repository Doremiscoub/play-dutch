
import { useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../use-local-storage';
import { useGamePersistence } from '../useGamePersistence';
import { useGameInitialization } from '../useGameInitialization';
import { useCurrentGame } from './useCurrentGame';
import { useRounds } from './useRounds';
import { useScoreLimit } from './useScoreLimit';
import { useGameFlow } from './useGameFlow';
import { verifyPlayerSetup } from '@/utils/playerInitializer';
import { toast } from 'sonner';

export const useGameState = () => {
  const navigate = useNavigate();
  const initializationAttempted = useRef(false);
  const initializationInProgress = useRef(false);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);

  const {
    players,
    setPlayers,
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
    initializationCompleted
  } = useGameInitialization();

  const {
    showGameOver,
    setShowGameOver,
    showGameEndConfirmation,
    setShowGameEndConfirmation,
    handleRequestEndGame,
    handleCancelEndGame,
    handleContinueGame: baseHandleContinueGame,
    handleRestart
  } = useGameFlow();

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
    if (initializationInProgress.current) {
      console.info("Initialisation déjà en cours, ignorer");
      return;
    }
    
    if (initializationAttempted.current) {
      console.info("Initialisation déjà tentée pendant cette session, ignorer");
      return;
    }
    
    initializationInProgress.current = true;
    initializationAttempted.current = true;
    
    console.info('Initialisation du jeu...');
    
    const isNewGameRequested = localStorage.getItem('dutch_new_game_requested') === 'true';
    console.info('Nouvelle partie demandée:', isNewGameRequested);
    
    if (isNewGameRequested) {
      console.info("Création d'une nouvelle partie demandée explicitement");
      
      if (!createNewGame()) {
        console.error("Échec lors de la création de la nouvelle partie");
        toast.error("Impossible de créer une nouvelle partie");
        navigate('/game/setup');
      }
      initializationInProgress.current = false;
      return;
    }
    
    console.info("Tentative de chargement d'une partie existante");
    const savedGame = loadGameState();
    
    if (savedGame?.players?.length > 0) {
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
      initializationInProgress.current = false;
    } else {
      console.info("Aucune partie sauvegardée trouvée, vérification de la configuration des joueurs");
      
      if (verifyPlayerSetup()) {
        console.info("Configuration de joueurs valide trouvée, création d'une nouvelle partie");
        localStorage.setItem('dutch_new_game_requested', 'true');
        
        if (!createNewGame()) {
          console.error("Échec lors de la création de la nouvelle partie");
          toast.error("Impossible de créer une nouvelle partie");
          navigate('/game/setup');
        }
      } else {
        console.info("Aucune configuration de joueurs valide, redirection vers la configuration");
        toast.info("Veuillez configurer une nouvelle partie");
        navigate('/game/setup');
      }
      initializationInProgress.current = false;
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
    handleContinueGame: (newLimit: number) => baseHandleContinueGame(newLimit, setScoreLimit),
    handleRestart
  };
};

export default useGameState;
