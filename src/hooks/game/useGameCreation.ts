import { useCallback } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Player, RoundHistoryEntry } from '@/types';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { avatarColors, getRandomEmoji } from './constants';

interface UseGameCreationProps {
  scoreLimit: number;
  saveCurrentGame: (players: Player[], roundHistory: RoundHistoryEntry[], scoreLimit: number, gameStartTime: Date | null, isGameOver?: boolean) => Promise<boolean>;
  setPlayers: (players: Player[]) => void;
  setGameStartTime: (time: Date | null) => void;
  setIsInitialized: (initialized: boolean) => void;
  setInitError: (error: string | null) => void;
  setRoundHistory: (history: RoundHistoryEntry[]) => void;
  setShowGameOver: (show: boolean) => void;
  setShowScoreForm: (show: boolean) => void;
}

export const useGameCreation = ({
  scoreLimit,
  saveCurrentGame,
  setPlayers,
  setGameStartTime,
  setIsInitialized,
  setInitError,
  setRoundHistory,
  setShowGameOver,
  setShowScoreForm
}: UseGameCreationProps) => {
  
  const createNewGame = useCallback(async (playerNames: string[]): Promise<boolean> => {
    if (!playerNames || playerNames.length < 2) {
      setInitError('Il faut au moins 2 joueurs pour démarrer');
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return false;
    }

    try {
      console.log('🚀 useGameCreation: Creating new game with players:', playerNames);
      setInitError(null);
      
      // Validation des noms de joueurs
      const validPlayerNames = playerNames.filter(name => name && name.trim().length > 0);
      if (validPlayerNames.length < 2) {
        throw new Error('Noms de joueurs invalides');
      }
      
      const newPlayers: Player[] = validPlayerNames.map((name, index) => ({
        id: uuidv4(),
        name: name.trim(),
        emoji: getRandomEmoji(),
        totalScore: 0,
        rounds: [],
        avatarColor: avatarColors[index % avatarColors.length]
      }));
      
      const startTime = new Date();
      
      console.log('🧹 useGameCreation: Clearing previous state...');
      // Clear any existing state first
      setPlayers([]);
      setRoundHistory([]);
      setShowGameOver(false);
      setShowScoreForm(false);
      
      console.log('⚡ useGameCreation: Setting new state...');
      // Set new state
      setPlayers(newPlayers);
      setGameStartTime(startTime);
      setIsInitialized(true);
      
      console.log('💾 useGameCreation: Saving game state...');
      // Sauvegarde SYNCHRONE et vérifiée
      const saveResult = await saveCurrentGame(newPlayers, [], scoreLimit, startTime);
      
      if (saveResult) {
        // Sauvegarde additionnelle directe en localStorage pour assurer la persistance
        const gameData = {
          players: newPlayers,
          roundHistory: [],
          isGameOver: false,
          scoreLimit,
          gameStartTime: startTime.toISOString(),
          lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameData));
        localStorage.setItem(STORAGE_KEYS.GAME_ACTIVE, 'true');
        localStorage.removeItem(STORAGE_KEYS.PLAYER_SETUP);
        
        console.log('✅ useGameCreation: Game state saved successfully');
        console.log('🔍 useGameCreation: localStorage check:', !!localStorage.getItem(STORAGE_KEYS.CURRENT_GAME));
      } else {
        console.error('❌ useGameCreation: Failed to save game state');
        // Ne pas échouer même si la sauvegarde échoue, continuer avec l'état React
      }
      
      console.log('🎉 useGameCreation: Game created successfully with', newPlayers.length, 'players');
      toast.success(`Partie créée avec ${newPlayers.length} joueurs !`);
      return true;
    } catch (error) {
      console.error('💥 useGameCreation: Game initialization failed:', error);
      setInitError('Erreur lors de l\'initialisation du jeu');
      toast.error('Erreur lors de l\'initialisation du jeu');
      
      // Reset state on error
      setPlayers([]);
      setGameStartTime(null);
      setIsInitialized(false);
      return false;
    }
  }, [scoreLimit, saveCurrentGame, setRoundHistory, setPlayers, setGameStartTime, setIsInitialized, setInitError, setShowGameOver, setShowScoreForm]);

  return { createNewGame };
};