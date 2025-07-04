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
      console.log('🚀 GAME_CREATION: Starting with players:', playerNames);
      setInitError(null);
      
      // Validation stricte des noms
      const validPlayerNames = playerNames.filter(name => name && name.trim().length >= 2);
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
      const gameData = {
        players: newPlayers,
        roundHistory: [],
        isGameOver: false,
        scoreLimit,
        gameStartTime: startTime.toISOString(),
        lastUpdated: new Date().toISOString(),
        validated: true
      };
      
      console.log('💾 GAME_CREATION: Direct save to localStorage...');
      // SAUVEGARDE DIRECTE ET SYNCHRONE - bypass les hooks complexes
      localStorage.setItem(STORAGE_KEYS.CURRENT_GAME, JSON.stringify(gameData));
      localStorage.setItem(STORAGE_KEYS.GAME_ACTIVE, 'true');
      localStorage.removeItem(STORAGE_KEYS.PLAYER_SETUP);
      
      // VÉRIFICATION IMMÉDIATE de la sauvegarde
      const savedData = localStorage.getItem(STORAGE_KEYS.CURRENT_GAME);
      if (!savedData) {
        throw new Error('Échec de sauvegarde critique');
      }
      
      const parsedData = JSON.parse(savedData);
      if (!parsedData.players || parsedData.players.length !== newPlayers.length) {
        throw new Error('Données sauvegardées corrompues');
      }
      
      console.log('✅ GAME_CREATION: Data saved and verified in localStorage');
      
      // MISE À JOUR de l'état React APRÈS sauvegarde confirmée
      setPlayers(newPlayers);
      setGameStartTime(startTime);
      setRoundHistory([]);
      setIsInitialized(true);
      setShowGameOver(false);
      setShowScoreForm(false);
      
      // Transfert sécurisé pour navigation
      sessionStorage.setItem('game_navigation_ready', 'true');
      
      console.log('🎉 GAME_CREATION: Game ready with', newPlayers.length, 'players');
      toast.success(`Partie créée avec ${newPlayers.length} joueurs !`);
      return true;
      
    } catch (error) {
      console.error('💥 GAME_CREATION: Critical failure:', error);
      setInitError(`Erreur: ${error.message}`);
      toast.error(`Erreur lors de la création: ${error.message}`);
      
      // Nettoyage complet en cas d'erreur
      localStorage.removeItem(STORAGE_KEYS.CURRENT_GAME);
      localStorage.removeItem(STORAGE_KEYS.GAME_ACTIVE);
      sessionStorage.removeItem('game_navigation_ready');
      setPlayers([]);
      setGameStartTime(null);
      setIsInitialized(false);
      return false;
    }
  }, [scoreLimit, setRoundHistory, setPlayers, setGameStartTime, setIsInitialized, setInitError, setShowGameOver, setShowScoreForm]);

  return { createNewGame };
};