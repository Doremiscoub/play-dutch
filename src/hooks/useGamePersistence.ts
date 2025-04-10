
import { useCallback } from 'react';
import { Player, Game } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from './use-local-storage';
import { v4 as uuidv4 } from 'uuid';

export const useGamePersistence = () => {
  const [games, setGames] = useLocalStorage<Game[]>('dutch_games', []);

  // Calculate game duration
  const getGameDuration = (startTime: Date): string => {
    const endTime = new Date();
    const diffMs = endTime.getTime() - startTime.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${remainingMins}min`;
    } else {
      return `${diffMins} minutes`;
    }
  };

  // Save game to history
  const saveGameToHistory = useCallback((players: Player[], gameStartTime: Date | null) => {
    try {
      const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
      const winner = sortedPlayers[0].name;
      const gameDuration = gameStartTime ? getGameDuration(gameStartTime) : '';
      
      const game: Game = {
        id: uuidv4(),
        date: new Date(),
        rounds: players[0]?.rounds.length || 0,
        players: players.map(p => ({ 
          name: p.name, 
          score: p.totalScore, 
          isDutch: p.rounds.some(r => r.isDutch) 
        })),
        winner,
        duration: gameDuration
      };
      
      setGames(prev => [...prev, game]);
      toast.success('Partie sauvegardée dans l\'historique');
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la partie :', error);
      toast.error('Erreur lors de la sauvegarde de la partie');
      return false;
    }
  }, [setGames]);

  // Load initial game state from localStorage
  const loadGameState = useCallback(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    
    if (savedGame) {
      try {
        return JSON.parse(savedGame);
      } catch (error) {
        console.error('Erreur lors du chargement de la partie :', error);
        return null;
      }
    }
    
    return null;
  }, []);

  // Save current game state to localStorage
  const saveGameState = useCallback((gameState: {
    players: Player[];
    roundHistory: { scores: number[], dutchPlayerId?: string }[];
    isGameOver: boolean;
    scoreLimit: number;
    gameStartTime: Date | null;
  }) => {
    const stateToSave = {
      ...gameState,
      lastUpdated: new Date()
    };
    
    localStorage.setItem('current_dutch_game', JSON.stringify(stateToSave));
  }, []);

  return {
    games,
    loadGameState,
    saveGameState,
    saveGameToHistory,
  };
};
