
import { useEffect } from 'react';
import useGameState from './useGameState';
import { useAchievements } from './useAchievements';

export const useGameStateWithAchievements = () => {
  const gameState = useGameState();
  const { checkAchievements } = useAchievements();

  // Check achievements when players or rounds change
  useEffect(() => {
    if (gameState.players && gameState.players.length > 0) {
      // Load game history from localStorage for achievement context
      const gameHistory = JSON.parse(localStorage.getItem('dutch_games') || '[]');
      
      gameState.players.forEach(player => {
        checkAchievements(player, gameHistory);
      });
    }
  }, [gameState.players, gameState.roundHistory, checkAchievements]);

  return {
    ...gameState,
    checkAchievements
  };
};
