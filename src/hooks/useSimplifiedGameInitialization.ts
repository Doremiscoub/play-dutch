
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

export const useSimplifiedGameInitialization = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const initializationInProgress = useRef(false);
  
  const createNewGame = useCallback(async (): Promise<boolean> => {
    // Protection contre les appels multiples
    if (initializationInProgress.current) {
      console.log('useSimplifiedGameInitialization: Initialization already in progress');
      return isInitialized;
    }

    console.log('useSimplifiedGameInitialization: Starting game initialization...');
    initializationInProgress.current = true;
    
    try {
      setInitError(null);
      
      // Récupérer les données des joueurs depuis localStorage
      const playerSetup = localStorage.getItem('dutch_player_setup');
      console.log('useSimplifiedGameInitialization: Player setup from localStorage:', playerSetup);
      
      if (!playerSetup) {
        console.error('useSimplifiedGameInitialization: No player configuration found');
        setInitError('Aucune configuration de joueurs trouvée');
        toast.error('Aucune configuration de joueurs trouvée. Veuillez configurer une partie.');
        setTimeout(() => navigate('/game/setup'), 1000);
        return false;
      }
      
      let playerData: any[] = [];
      
      try {
        playerData = JSON.parse(playerSetup);
        console.log('useSimplifiedGameInitialization: Parsed player data:', playerData);
      } catch (error) {
        console.error('useSimplifiedGameInitialization: Failed to parse player data:', error);
        setInitError('Configuration des joueurs invalide');
        toast.error('Configuration des joueurs invalide');
        localStorage.removeItem('dutch_player_setup'); // Nettoyer les données corrompues
        setTimeout(() => navigate('/game/setup'), 1000);
        return false;
      }
      
      // Vérifier que les données sont valides
      if (!Array.isArray(playerData) || playerData.length < 2) {
        console.error('useSimplifiedGameInitialization: Invalid player data:', playerData);
        setInitError('Il faut au moins 2 joueurs pour démarrer');
        toast.error('Il faut au moins 2 joueurs pour démarrer une partie');
        setTimeout(() => navigate('/game/setup'), 1000);
        return false;
      }
      
      // Créer les objets Player - support pour ancien et nouveau format
      const newPlayers: Player[] = playerData.map((data: any, index: number) => {
        let name: string;
        let emoji: string;
        
        if (typeof data === 'string') {
          // Format simple (array de strings)
          name = data;
          emoji = getRandomEmoji();
        } else if (data && typeof data === 'object') {
          // Format objet
          name = data.name || `Joueur ${index + 1}`;
          emoji = data.emoji || getRandomEmoji();
        } else {
          // Fallback
          name = `Joueur ${index + 1}`;
          emoji = getRandomEmoji();
        }
        
        return {
          id: uuidv4(),
          name: name.trim() || `Joueur ${index + 1}`,
          emoji,
          totalScore: 0,
          rounds: [],
          avatarColor: avatarColors[index % avatarColors.length]
        };
      });
      
      console.log('useSimplifiedGameInitialization: Players created successfully:', newPlayers.map(p => ({ name: p.name, emoji: p.emoji })));
      
      setPlayers(newPlayers);
      setGameStartTime(new Date());
      setIsInitialized(true);
      
      // Marquer le jeu comme actif
      localStorage.setItem('dutch_game_active', 'true');
      
      // Nettoyer la configuration maintenant qu'elle a été utilisée
      localStorage.removeItem('dutch_player_setup');
      
      // Toast de succès
      toast.success(`Partie créée avec ${newPlayers.length} joueurs !`, {
        duration: 2000
      });
      
      return true;
    } catch (error) {
      console.error('useSimplifiedGameInitialization: Game initialization failed:', error);
      setInitError('Erreur lors de l\'initialisation du jeu');
      toast.error('Erreur lors de l\'initialisation du jeu');
      return false;
    } finally {
      initializationInProgress.current = false;
    }
  }, [navigate, isInitialized]);

  const cleanup = useCallback(() => {
    console.log('useSimplifiedGameInitialization: Cleaning up game state');
    setPlayers([]);
    setGameStartTime(null);
    setIsInitialized(false);
    setInitError(null);
    initializationInProgress.current = false;
    localStorage.removeItem('current_dutch_game');
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
    cleanup
  };
};
