
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from './use-local-storage';
import { useGamePersistence } from './useGamePersistence';
import { useRoundManagement } from './useRoundManagement';
import { initializePlayers } from '@/utils/playerInitializer';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';

export const useGameState = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [showGameOver, setShowGameOver] = useState<boolean>(false);
  const [showGameEndConfirmation, setShowGameEndConfirmation] = useState<boolean>(false);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [soundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  const { loadGameState, saveGameState, saveGameToHistory } = useGamePersistence();
  const { roundHistory, setRoundHistory, addRound, undoLastRound } = useRoundManagement(scoreLimit, soundEnabled);
  
  // Initialize game from localStorage
  useEffect(() => {
    const initializeGame = () => {
      const savedGame = loadGameState();
      
      if (savedGame) {
        setPlayers(savedGame.players);
        setRoundHistory(savedGame.roundHistory || []);
        setScoreLimit(savedGame.scoreLimit || 100);
        
        if (savedGame.gameStartTime) {
          setGameStartTime(new Date(savedGame.gameStartTime));
        }
        
        if (savedGame.isGameOver) {
          setShowGameOver(true);
        }
      } else {
        createNewGame();
      }
    };
    
    initializeGame();
  }, [loadGameState]);
  
  // Save game state to localStorage when it changes
  useEffect(() => {
    if (players.length > 0) {
      const gameState = {
        players,
        roundHistory,
        isGameOver: showGameOver,
        scoreLimit,
        gameStartTime
      };
      
      saveGameState(gameState);
    }
  }, [players, roundHistory, showGameOver, scoreLimit, gameStartTime, saveGameState]);
  
  // Create a new game with player names from setup
  const createNewGame = useCallback(() => {
    const newPlayers = initializePlayers();
    if (newPlayers) {
      setPlayers(newPlayers);
      setRoundHistory([]);
      setShowGameOver(false);
      setGameStartTime(new Date());
    } else {
      navigate('/game/setup');
    }
  }, [navigate]);
  
  // Add a new round
  const handleAddRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    const result = addRound(players, scores, dutchPlayerId);
    
    if (result) {
      const { updatedPlayers, isGameOver: gameOver } = result;
      setPlayers(updatedPlayers);
      
      if (gameOver) {
        setTimeout(() => {
          setShowGameOver(true);
        }, 500);
      }
    }
  }, [players, addRound]);
  
  // Undo the last round
  const handleUndoLastRound = useCallback(() => {
    const updatedPlayers = undoLastRound(players, soundEnabled);
    setPlayers(updatedPlayers);
    
    // If game over screen was shown, hide it
    if (showGameOver) {
      setShowGameOver(false);
    }
  }, [players, undoLastRound, soundEnabled, showGameOver]);
  
  // Request to end the game
  const handleRequestEndGame = useCallback(() => {
    setShowGameEndConfirmation(true);
  }, []);
  
  // Confirm ending the game
  const handleConfirmEndGame = useCallback(() => {
    saveGameToHistory(players, gameStartTime);
    setShowGameOver(true);
    setShowGameEndConfirmation(false);
  }, [saveGameToHistory, players, gameStartTime]);
  
  // Cancel ending the game
  const handleCancelEndGame = useCallback(() => {
    setShowGameEndConfirmation(false);
  }, []);
  
  // Continue game with a new score limit
  const handleContinueGame = useCallback((newLimit: number) => {
    setScoreLimit(newLimit);
    setShowGameOver(false);
  }, []);
  
  // Restart with a new game
  const handleRestart = useCallback(() => {
    localStorage.removeItem('current_dutch_game');
    navigate('/game/setup');
  }, [navigate]);
  
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
