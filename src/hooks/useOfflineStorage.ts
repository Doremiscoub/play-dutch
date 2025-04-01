import { useEffect } from 'react';
import { Player } from '@/types';
import useGameStore from '@/store/useGameStore';

/**
 * Hook personnalisé pour gérer le stockage et la récupération des parties hors-ligne
 */
export const useOfflineStorage = () => {
  const { 
    players, 
    roundHistory, 
    gameState,
    updatePlayerStats
  } = useGameStore();
  
  // Sauvegarder l'état actuel du jeu à chaque modification
  // Use a ref to keep track of the previous state to avoid unnecessary saves
  useEffect(() => {
    if (gameState === 'playing' && players.length > 0) {
      // Create a lightweight check to avoid unnecessary localStorage writes
      const roundCount = players.length > 0 ? players[0].rounds.length : 0;
      
      // Use a custom key for storage
      const storageKey = 'current_dutch_game';
      
      // Only save if we actually have rounds to save
      if (roundCount > 0) {
        const currentGame = {
          players,
          roundHistory,
          lastUpdated: new Date()
        };
        
        // Attempt to save to localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(currentGame));
        } catch (error) {
          console.error('Error saving game to localStorage:', error);
        }
      }
    }
  }, [gameState, players.length, players.map(p => p.totalScore).join(','), roundHistory.length]);
  
  // Fonction pour récupérer une partie sauvegardée
  const getSavedGame = (): { players: Player[], roundHistory: { scores: number[], dutchPlayerId?: string }[] } | null => {
    const savedGame = localStorage.getItem('current_dutch_game');
    if (savedGame) {
      try {
        const parsedGame = JSON.parse(savedGame);
        return {
          players: parsedGame.players,
          roundHistory: parsedGame.roundHistory
        };
      } catch (e) {
        console.error("Erreur lors de la lecture des données sauvegardées:", e);
        return null;
      }
    }
    return null;
  };
  
  // Fonction pour effacer une partie sauvegardée
  const clearSavedGame = () => {
    localStorage.removeItem('current_dutch_game');
  };
  
  // Fonction pour vérifier si une partie est en cours
  const hasOngoingGame = (): boolean => {
    return localStorage.getItem('current_dutch_game') !== null;
  };
  
  // Fonction pour restaurer une partie sauvegardée
  const restoreSavedGame = (): boolean => {
    const savedGame = getSavedGame();
    if (savedGame) {
      // Ensure each player has a stats object to avoid infinite updates
      const playersWithStats = savedGame.players.map(player => {
        if (!player.stats) {
          return {
            ...player,
            stats: {
              bestRound: null,
              dutchCount: 0,
              averageScore: 0,
              worstRound: null,
              improvementRate: 0,
              consistencyScore: 0,
              winStreak: 0
            }
          };
        }
        return player;
      });
      
      useGameStore.setState({ 
        players: playersWithStats,
        roundHistory: savedGame.roundHistory,
        gameState: 'playing'
      });
      
      return true;
    }
    return false;
  };
  
  return {
    getSavedGame,
    clearSavedGame,
    hasOngoingGame,
    restoreSavedGame
  };
};

export default useOfflineStorage;
