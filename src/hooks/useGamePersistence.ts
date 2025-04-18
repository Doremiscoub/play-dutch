
/**
 * Hook pour la persistance des données de jeu
 */
import { useGameStorage } from './game/useGameStorage';
import { useGameHistory } from './game/useGameHistory';

export const useGamePersistence = () => {
  const { loadGameState, saveGameState, hasActiveGame } = useGameStorage();
  const { games, saveGameToHistory, deleteGameFromHistory } = useGameHistory();

  return {
    games,
    loadGameState,
    saveGameState,
    saveGameToHistory,
    deleteGameFromHistory,
    hasActiveGame
  };
};
