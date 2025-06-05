
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const avatarColors = ['#8B5CF6', '#F97316', '#1EAEDB', '#10B981', '#EC4899', '#6366F1'];

const getRandomEmoji = () => {
  const emojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '😊', '😋'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export const useGameInitialization = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const initializationLock = useRef(false);
  
  const createNewGame = useCallback(async (playerNames: string[]): Promise<boolean> => {
    if (initializationLock.current) {
      console.log('Game initialization already in progress');
      return false;
    }

    if (!playerNames || playerNames.length < 2) {
      setInitError('Il faut au moins 2 joueurs pour démarrer');
      toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
      return false;
    }

    console.log('Creating new game with players:', playerNames);
    initializationLock.current = true;
    
    try {
      setInitError(null);
      
      // Create player objects
      const newPlayers: Player[] = playerNames.map((name, index) => ({
        id: uuidv4(),
        name: name.trim() || `Joueur ${index + 1}`,
        emoji: getRandomEmoji(),
        totalScore: 0,
        rounds: [],
        avatarColor: avatarColors[index % avatarColors.length]
      }));
      
      console.log('Players created successfully:', newPlayers);
      
      const startTime = new Date();
      
      setPlayers(newPlayers);
      setGameStartTime(startTime);
      setIsInitialized(true);
      
      // Save to localStorage with a single key
      const gameData = {
        players: newPlayers,
        gameStartTime: startTime.toISOString(),
        scoreLimit,
        roundHistory: [],
        isGameOver: false
      };
      
      localStorage.setItem('dutch_current_game', JSON.stringify(gameData));
      localStorage.setItem('dutch_game_active', 'true');
      
      // Clear any old configuration data
      localStorage.removeItem('dutch_player_setup');
      
      toast.success(`Partie créée avec ${newPlayers.length} joueurs !`);
      
      return true;
    } catch (error) {
      console.error('Game initialization failed:', error);
      setInitError('Erreur lors de l\'initialisation du jeu');
      toast.error('Erreur lors de l\'initialisation du jeu');
      return false;
    } finally {
      initializationLock.current = false;
    }
  }, [scoreLimit]);

  const loadExistingGame = useCallback((): boolean => {
    try {
      const savedGame = localStorage.getItem('dutch_current_game');
      if (!savedGame) {
        return false;
      }

      const gameData = JSON.parse(savedGame);
      
      if (!gameData.players || gameData.players.length === 0) {
        return false;
      }

      setPlayers(gameData.players);
      setGameStartTime(gameData.gameStartTime ? new Date(gameData.gameStartTime) : null);
      setScoreLimit(gameData.scoreLimit || 100);
      setIsInitialized(true);
      
      console.log('Existing game loaded successfully');
      return true;
    } catch (error) {
      console.error('Failed to load existing game:', error);
      localStorage.removeItem('dutch_current_game');
      return false;
    }
  }, []);

  const cleanup = useCallback(() => {
    console.log('Cleaning up game state');
    setPlayers([]);
    setGameStartTime(null);
    setIsInitialized(false);
    setInitError(null);
    initializationLock.current = false;
    localStorage.removeItem('dutch_current_game');
    localStorage.removeItem('dutch_game_active');
    localStorage.removeItem('dutch_player_setup');
  }, []);

  return {
    players,
    setPlayers,
    gameStartTime, 
    setGameStartTime,
    scoreLimit,
    setScoreLimit,
    isInitialized,
    initError,
    createNewGame,
    loadExistingGame,
    cleanup
  };
};
