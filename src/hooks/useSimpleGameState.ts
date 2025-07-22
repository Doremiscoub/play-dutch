import { useState, useCallback, useEffect } from 'react';
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

// Store global pour partager l'état entre tous les composants
let globalGameState: GameState = {
  players: [],
  roundHistory: [],
  scoreLimit: 100,
  gameStartTime: null,
  isGameOver: false
};

export const useSimpleGameState = () => {
  const [gameState, setGameState] = useState<GameState>(globalGameState);
  
  // Synchroniser avec le store global au montage
  useEffect(() => {
    setGameState(globalGameState);
  }, []);

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
      
      const newState = {
        ...parsed,
        gameStartTime: parsed.gameStartTime ? new Date(parsed.gameStartTime) : null
      };
      
      // Mettre à jour le store global ET l'état local
      globalGameState = newState;
      setGameState(newState);
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

    // Mettre à jour le store global ET l'état local
    globalGameState = newState;
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

    // Déterminer qui a fait Dutch (le plus bas score de la manche)
    const minScore = Math.min(...scores);
    const dutchPlayerIndex = scores.indexOf(minScore);
    const actualDutchPlayerId = updatedPlayers[dutchPlayerIndex]?.id;

    const newState = {
      ...gameState,
      players: updatedPlayers,
      roundHistory: [...gameState.roundHistory, { ...newRound, dutchPlayerId: actualDutchPlayerId }],
      isGameOver: updatedPlayers.some(p => p.totalScore >= gameState.scoreLimit)
    };

    globalGameState = newState;
    setGameState(newState);
    saveToStorage(newState);
    
    const dutchPlayerName = updatedPlayers[dutchPlayerIndex]?.name;
    toast.success(`Manche ajoutée - ${dutchPlayerName} a fait Dutch !`);
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

    globalGameState = newState;
    setGameState(newState);
    saveToStorage(newState);
    
    toast.success('Dernière manche annulée');
  }, [gameState, saveToStorage]);

  const resetGame = useCallback(() => {
    // Nettoyer toutes les anciennes clés de stockage
    localStorage.removeItem(GAME_KEY);
    localStorage.removeItem('current_dutch_game');
    localStorage.removeItem('game_active');
    localStorage.removeItem('player_setup');
    
    const emptyState = {
      players: [],
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: null,
      isGameOver: false
    };
    
    globalGameState = emptyState;
    setGameState(emptyState);
    
    toast.success('Partie réinitialisée');
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