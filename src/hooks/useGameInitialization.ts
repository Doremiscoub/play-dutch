
/**
 * Hook for game initialization logic
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import { initializePlayers, clearPlayerSetup, verifyPlayerSetup, resetNotificationFlags } from '@/utils/playerInitializer';
import { cleanupGameState } from '@/utils/gameUtils';
import { v4 as uuidv4 } from 'uuid';

export const useGameInitialization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStartTime, setGameStartTime] = useState<Date | null>(null);
  const [scoreLimit, setScoreLimit] = useState<number>(100);
  const initializationCompleted = useRef(false);
  const initializationAttempted = useRef(false);
  const initializationInProgress = useRef(false);
  
  // Liste des couleurs disponibles pour les avatars
  const avatarColors = ['#8B5CF6', '#F97316', '#1EAEDB', '#10B981', '#EC4899', '#6366F1'];
  
  // Create a new game with player names from URL parameters or configuration
  const createNewGame = useCallback(async () => {
    try {
      console.info('Tentative de création d\'une nouvelle partie...');
      
      // Réinitialiser les flags de notification pour éviter les doublons
      resetNotificationFlags();
      
      // Prevent multiple initialization attempts
      if (initializationInProgress.current) {
        console.info('Initialisation déjà en cours, annulation de cette tentative');
        return false;
      }
      
      initializationAttempted.current = true;
      initializationInProgress.current = true;
      console.info('Création d\'une nouvelle partie...');
      
      // 1. Vérifier si les données sont disponibles dans l'URL
      const searchParams = new URLSearchParams(location.search);
      const playersParam = searchParams.get('players');
      const isNewGame = searchParams.get('new') === 'true';
      
      console.info('Paramètres URL:', { playersParam, isNewGame });
      
      // Si les données sont dans l'URL et c'est une nouvelle partie
      if (playersParam && isNewGame) {
        console.info('Initialisation depuis les paramètres URL');
        try {
          const playerNames = JSON.parse(decodeURIComponent(playersParam));
          console.info('Noms des joueurs depuis URL:', playerNames);
          
          if (Array.isArray(playerNames) && playerNames.length >= 2) {
            // Créer les joueurs directement depuis les paramètres URL
            const newPlayers: Player[] = playerNames.map((name, index) => {
              const playerName = name && typeof name === 'string' && name.trim() 
                ? name.trim() 
                : `Joueur ${index + 1}`;
                
              return {
                id: uuidv4(),
                name: playerName,
                totalScore: 0,
                rounds: [],
                avatarColor: avatarColors[index % avatarColors.length]
              };
            });
            
            console.info('Joueurs initialisés avec succès depuis URL:', newPlayers.map(p => p.name).join(', '));
            setPlayers(newPlayers);
            setGameStartTime(new Date());
            
            // Sauvegarder la configuration dans localStorage également pour la persistance
            localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
            
            // Effacer les paramètres URL après utilisation pour éviter la double initialisation
            navigate('/game', { replace: true });
            
            // Mark initialization as completed
            initializationCompleted.current = true;
            initializationInProgress.current = false;
            
            // Un seul toast de succès
            toast.success('Nouvelle partie créée !');
            return true;
          } else {
            console.warn('Format de données URL invalide, tentative avec localStorage');
          }
        } catch (error) {
          console.error("Erreur lors du parsing des paramètres URL:", error);
        }
      }
      
      // 2. Méthode de secours: initialisation via localStorage
      console.info('Tentative d\'initialisation via localStorage');
      
      // Debug: afficher le contenu de localStorage
      const playerSetup = localStorage.getItem('dutch_player_setup');
      console.info('État dutch_player_setup:', playerSetup);
      
      if (!playerSetup) {
        console.error('Configuration des joueurs introuvable dans localStorage');
        
        initializationAttempted.current = false;
        initializationInProgress.current = false;
        
        // Redirection vers la page de configuration
        navigate('/game/setup', { replace: true });
        return false;
      }

      // Verify setup exists before initializing
      const setupValid = verifyPlayerSetup();
      console.info('Vérification de la configuration localStorage:', setupValid ? 'VALIDE' : 'INVALIDE');
      
      if (!setupValid) {
        console.error('Configuration des joueurs invalide ou inexistante');
        
        initializationAttempted.current = false;
        initializationInProgress.current = false;
        
        navigate('/game/setup', { replace: true });
        return false;
      }
      
      const newPlayers = initializePlayers();
      if (!newPlayers || newPlayers.length < 2) {
        console.error('Moins de 2 joueurs configurés');
        
        initializationAttempted.current = false;
        initializationInProgress.current = false;
        
        navigate('/game/setup', { replace: true });
        return false;
      }
      
      // Validation supplémentaire des données des joueurs
      const validatedPlayers = newPlayers.map((player, index) => {
        if (!player.id) player.id = uuidv4();
        if (!player.name || typeof player.name !== 'string') {
          player.name = `Joueur ${index + 1}`;
        }
        if (!player.avatarColor) {
          player.avatarColor = avatarColors[index % avatarColors.length];
        }
        if (typeof player.totalScore !== 'number') {
          player.totalScore = 0;
        }
        if (!Array.isArray(player.rounds)) {
          player.rounds = [];
        }
        return player;
      });
      
      console.info('Joueurs initialisés avec succès:', validatedPlayers.map(p => p.name).join(', '));
      setPlayers(validatedPlayers);
      setGameStartTime(new Date());
      
      initializationCompleted.current = true;
      initializationInProgress.current = false;
      
      toast.success('Nouvelle partie créée !');
      return true;
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      
      initializationAttempted.current = false;
      initializationInProgress.current = false;
      
      return false;
    } finally {
      // Reset attempt flag after a delay to allow for further attempts if needed
      setTimeout(() => {
        initializationAttempted.current = false;
      }, 1000);
    }
  }, [navigate, location.search, avatarColors]);

  // Clean up function to ensure we don't leave partial state
  const cleanup = useCallback(() => {
    cleanupGameState();
    clearPlayerSetup();
    initializationCompleted.current = false;
    initializationAttempted.current = false;
    initializationInProgress.current = false;
    resetNotificationFlags();
  }, []);

  return {
    players,
    setPlayers,
    gameStartTime, 
    setGameStartTime,
    scoreLimit,
    setScoreLimit,
    createNewGame,
    cleanup,
    initializationCompleted,
    initializationInProgress
  };
};
