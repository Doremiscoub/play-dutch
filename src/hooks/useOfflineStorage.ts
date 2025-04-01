
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
  useEffect(() => {
    if (gameState === 'playing' && players.length > 0) {
      const currentGame = {
        players,
        roundHistory,
        lastUpdated: new Date()
      };
      localStorage.setItem('current_dutch_game', JSON.stringify(currentGame));
    }
  }, [gameState, players, roundHistory]);
  
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
      useGameStore.setState({ 
        players: savedGame.players,
        roundHistory: savedGame.roundHistory,
        gameState: 'playing'
      });
      
      // Mettre à jour les statistiques après avoir restauré la partie
      setTimeout(() => updatePlayerStats(), 0);
      
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
