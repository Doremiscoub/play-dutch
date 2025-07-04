import { useState, useCallback } from 'react';
import { Player, RoundHistoryEntry } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const emojis = ['🎲', '🃏', '🎯', '⭐', '🔥', '💎', '🎪', '🚀', '🎨', '🎭'];

const GAME_KEY = 'dutch_simple_game';

interface GameState {
  players: Player[];
  roundHistory: RoundHistoryEntry[];
  scoreLimit: number;
  gameStartTime: Date | null;
  isGameOver: boolean;
}

export const useSimpleGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    roundHistory: [],
    scoreLimit: 100,
    gameStartTime: null,
    isGameOver: false
  });

  const saveToStorage = useCallback((state: GameState) => {
    try {
      localStorage.setItem(GAME_KEY, JSON.stringify({
        ...state,
        gameStartTime: state.gameStartTime?.toISOString()
      }));
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  }, []);

  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(GAME_KEY);
      if (!saved) return false;
      
      const parsed = JSON.parse(saved);
      if (!parsed.players || parsed.players.length === 0) return false;
      
      setGameState({
        ...parsed,
        gameStartTime: parsed.gameStartTime ? new Date(parsed.gameStartTime) : null
      });
      return true;
    } catch (error) {
      console.error('Load failed:', error);
      localStorage.removeItem(GAME_KEY);
      return false;
    }
  }, []);

  const createGame = useCallback((playerNames: string[]) => {
    if (playerNames.length < 2) {
      toast.error('Il faut au moins 2 joueurs');
      return false;
    }

    const players: Player[] = playerNames.map((name, index) => ({
      id: uuidv4(),
      name: name.trim(),
      emoji: emojis[index % emojis.length],
      totalScore: 0,
      rounds: [] as { score: number; isDutch: boolean }[],
      avatarColor: avatarColors[index % avatarColors.length]
    }));

    const newState: GameState = {
      players,
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: new Date(),
      isGameOver: false
    };

    setGameState(newState);
    
    if (saveToStorage(newState)) {
      toast.success(`Partie créée avec ${players.length} joueurs!`);
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [saveToStorage]);

  const addRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    const newRound: RoundHistoryEntry = { scores, dutchPlayerId };
    
    const updatedPlayers = gameState.players.map((player, index) => ({
      ...player,
      totalScore: player.totalScore + scores[index],
      rounds: [...player.rounds, { score: scores[index], isDutch: player.id === dutchPlayerId }]
    }));

    const newState = {
      ...gameState,
      players: updatedPlayers,
      roundHistory: [...gameState.roundHistory, newRound],
      isGameOver: updatedPlayers.some(p => p.totalScore >= gameState.scoreLimit)
    };

    setGameState(newState);
    saveToStorage(newState);
    
    toast.success('Manche ajoutée');
  }, [gameState, saveToStorage]);

  const undoLastRound = useCallback(() => {
    if (gameState.roundHistory.length === 0) return;

    const lastRound = gameState.roundHistory[gameState.roundHistory.length - 1];
    
    const updatedPlayers = gameState.players.map((player, index) => ({
      ...player,
      totalScore: player.totalScore - lastRound.scores[index],
      rounds: player.rounds.slice(0, -1)
    }));

    const newState = {
      ...gameState,
      players: updatedPlayers,
      roundHistory: gameState.roundHistory.slice(0, -1),
      isGameOver: false
    };

    setGameState(newState);
    saveToStorage(newState);
    
    toast.success('Dernière manche annulée');
  }, [gameState, saveToStorage]);

  const resetGame = useCallback(() => {
    localStorage.removeItem(GAME_KEY);
    setGameState({
      players: [],
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: null,
      isGameOver: false
    });
  }, []);

  return {
    ...gameState,
    createGame,
    addRound,
    undoLastRound,
    resetGame,
    loadFromStorage,
    hasGame: gameState.players.length > 0
  };
};