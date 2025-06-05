
import { useGameLoader } from './persistence/useGameLoader';
import { useGameSaver } from './persistence/useGameSaver';
import { useGameHistory } from './persistence/useGameHistory';

export const useGamePersistence = () => {
  const { loadGameState, recoverEmergencySave } = useGameLoader();
  const { saveGameState } = useGameSaver();
  const { saveGameToHistory, deleteGameFromHistory } = useGameHistory();

  return {
    loadGameState,
    saveGameState,
    saveGameToHistory,
    deleteGameFromHistory,
    recoverEmergencySave
  };
};
