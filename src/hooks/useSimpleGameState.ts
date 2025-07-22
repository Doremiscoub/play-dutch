
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

// Store global singleton pour garantir une seule source de vérité
class GameStateManager {
  private static instance: GameStateManager;
  private state: GameState = {
    players: [],
    roundHistory: [],
    scoreLimit: 100,
    gameStartTime: null,
    isGameOver: false
  };
  private listeners = new Set<() => void>();

  static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  getState(): GameState {
    return { ...this.state };
  }

  setState(newState: Partial<GameState>) {
    this.state = { ...this.state, ...newState };
    console.log('🎯 Global state updated:', this.state);
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  saveToStorage(): boolean {
    try {
      localStorage.setItem(GAME_KEY, JSON.stringify({
        ...this.state,
        gameStartTime: this.state.gameStartTime?.toISOString()
      }));
      console.log('💾 Game saved to localStorage');
      return true;
    } catch (error) {
      console.error('❌ Save failed:', error);
      return false;
    }
  }

  loadFromStorage(): boolean {
    try {
      const saved = localStorage.getItem(GAME_KEY);
      if (!saved) {
        console.log('📂 No saved game found');
        return false;
      }
      
      const parsed = JSON.parse(saved);
      if (!parsed.players || parsed.players.length === 0) {
        console.log('📂 Invalid saved game, removing');
        localStorage.removeItem(GAME_KEY);
        return false;
      }
      
      this.state = {
        ...parsed,
        gameStartTime: parsed.gameStartTime ? new Date(parsed.gameStartTime) : null
      };
      
      console.log('📂 Game loaded from localStorage:', this.state);
      this.listeners.forEach(listener => listener());
      return true;
    } catch (error) {
      console.error('❌ Load failed:', error);
      localStorage.removeItem(GAME_KEY);
      return false;
    }
  }

  reset() {
    this.state = {
      players: [],
      roundHistory: [],
      scoreLimit: 100,
      gameStartTime: null,
      isGameOver: false
    };
    localStorage.removeItem(GAME_KEY);
    console.log('🔄 Game state reset');
    this.listeners.forEach(listener => listener());
  }
}

export const useSimpleGameState = () => {
  const manager = GameStateManager.getInstance();
  const [gameState, setGameState] = useState<GameState>(manager.getState());
  
  useEffect(() => {
    console.log('🔗 useSimpleGameState hook mounted');
    const unsubscribe = manager.subscribe(() => {
      setGameState(manager.getState());
    });
    
    return () => {
      console.log('🔗 useSimpleGameState hook unmounted');
      unsubscribe();
    };
  }, [manager]);

  const createGame = useCallback((playerNames: string[]) => {
    console.log('🎮 Creating game with players:', playerNames);
    
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

    manager.setState(newState);
    
    if (manager.saveToStorage()) {
      toast.success(`Partie créée avec ${players.length} joueurs!`);
      return true;
    } else {
      toast.error('Erreur de sauvegarde');
      return false;
    }
  }, [manager]);

  const addRound = useCallback((scores: number[], dutchPlayerId?: string) => {
    const currentState = manager.getState();
    const newRound: RoundHistoryEntry = { scores, dutchPlayerId };
    
    const updatedPlayers = currentState.players.map((player, index) => ({
      ...player,
      totalScore: player.totalScore + scores[index],
      rounds: [...player.rounds, { score: scores[index], isDutch: player.id === dutchPlayerId }]
    }));

    const minScore = Math.min(...scores);
    const dutchPlayerIndex = scores.indexOf(minScore);
    const actualDutchPlayerId = updatedPlayers[dutchPlayerIndex]?.id;

    const newState = {
      ...currentState,
      players: updatedPlayers,
      roundHistory: [...currentState.roundHistory, { ...newRound, dutchPlayerId: actualDutchPlayerId }],
      isGameOver: updatedPlayers.some(p => p.totalScore >= currentState.scoreLimit)
    };

    manager.setState(newState);
    manager.saveToStorage();
    
    const dutchPlayerName = updatedPlayers[dutchPlayerIndex]?.name;
    toast.success(`Manche ajoutée - ${dutchPlayerName} a fait Dutch !`);
  }, [manager]);

  const undoLastRound = useCallback(() => {
    const currentState = manager.getState();
    if (currentState.roundHistory.length === 0) return;

    const lastRound = currentState.roundHistory[currentState.roundHistory.length - 1];
    
    const updatedPlayers = currentState.players.map((player, index) => ({
      ...player,
      totalScore: player.totalScore - lastRound.scores[index],
      rounds: player.rounds.slice(0, -1)
    }));

    const newState = {
      ...currentState,
      players: updatedPlayers,
      roundHistory: currentState.roundHistory.slice(0, -1),
      isGameOver: false
    };

    manager.setState(newState);
    manager.saveToStorage();
    
    toast.success('Dernière manche annulée');
  }, [manager]);

  const resetGame = useCallback(() => {
    manager.reset();
    toast.success('Partie réinitialisée');
  }, [manager]);

  const loadFromStorage = useCallback(() => {
    return manager.loadFromStorage();
  }, [manager]);

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
