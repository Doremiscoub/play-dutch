
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const avatarColors = ['#8B5CF6', '#F97316', '#1EAEDB', '#10B981', '#EC4899', '#6366F1'];

export const useSimpleGameInitialization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  
  const createNewGame = useCallback(async (): Promise<boolean> => {
    try {
      console.info('Starting simple game initialization...');
      setInitError(null);
      
      // Check URL parameters first
      const searchParams = new URLSearchParams(location.search);
      const playersParam = searchParams.get('players');
      const isNewGame = searchParams.get('new') === 'true';
      
      let playerNames: string[] = [];
      
      if (playersParam && isNewGame) {
        try {
          playerNames = JSON.parse(decodeURIComponent(playersParam));
          console.info('Using players from URL:', playerNames);
        } catch (error) {
          console.warn('Failed to parse URL players, trying localStorage');
        }
      }
      
      // Fallback to localStorage
      if (playerNames.length === 0) {
        const playerSetup = localStorage.getItem('dutch_player_setup');
        if (playerSetup) {
          try {
            playerNames = JSON.parse(playerSetup);
            console.info('Using players from localStorage:', playerNames);
          } catch (error) {
            console.error('Failed to parse localStorage players:', error);
            setInitError('Configuration des joueurs invalide');
            return false;
          }
        }
      }
      
      // Validate player names
      if (!playerNames || playerNames.length < 2) {
        console.error('Not enough players configured');
        setInitError('Il faut au moins 2 joueurs pour démarrer');
        setTimeout(() => navigate('/game/setup'), 1000);
        return false;
      }
      
      // Create player objects
      const newPlayers: Player[] = playerNames.map((name, index) => ({
        id: uuidv4(),
        name: name.trim() || `Joueur ${index + 1}`,
        totalScore: 0,
        rounds: [],
        avatarColor: avatarColors[index % avatarColors.length]
      }));
      
      console.info('Players created successfully:', newPlayers.map(p => p.name));
      
      setPlayers(newPlayers);
      setGameStartTime(new Date());
      setIsInitialized(true);
      
      // Clear URL parameters after successful initialization
      if (isNewGame) {
        navigate('/game', { replace: true });
      }
      
      // Délai pour éviter les conflits avec d'autres notifications
      setTimeout(() => {
        toast.success('Partie créée avec succès !', {
          duration: 3000
        });
      }, 500);
      
      return true;
    } catch (error) {
      console.error('Game initialization failed:', error);
      setInitError('Erreur lors de l\'initialisation du jeu');
      return false;
    }
  }, [navigate, location.search]);

  const cleanup = useCallback(() => {
    console.info('Cleaning up game initialization state');
    setPlayers([]);
    setGameStartTime(null);
    setIsInitialized(false);
    setInitError(null);
    localStorage.removeItem('current_dutch_game');
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
    cleanup
  };
};
