
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
  
  // Create a new game with player names from URL parameters or configuration
  const createNewGame = useCallback(() => {
    try {
      console.info('Tentative de création d\'une nouvelle partie...');
      
      // Réinitialiser les flags de notification pour éviter les doublons
      resetNotificationFlags();
      
      // Prevent multiple initialization attempts
      if (initializationAttempted.current) {
        console.info('Une initialisation a déjà été tentée, annulation de cette tentative');
        return false;
      }
      
      if (initializationInProgress.current) {
        console.info('Initialisation déjà en cours, annulation de cette tentative');
        return false;
      }
      
      initializationAttempted.current = true;
      initializationInProgress.current = true;
      console.info('Création d\'une nouvelle partie...');
      
      // Complete cleanup to ensure no residual data
      cleanupGameState();
      
      // 1. Vérifier si les données sont disponibles dans l'URL
      const searchParams = new URLSearchParams(location.search);
      const playersParam = searchParams.get('players');
      const isNewGame = searchParams.get('new') === 'true';
      
      // Si les données sont dans l'URL et c'est une nouvelle partie
      if (playersParam && isNewGame) {
        console.info('Initialisation depuis les paramètres URL');
        try {
          const playerNames = JSON.parse(decodeURIComponent(playersParam));
          
          if (Array.isArray(playerNames) && playerNames.length >= 2) {
            // Créer les joueurs directement depuis les paramètres URL
            const newPlayers: Player[] = playerNames.map(name => ({
              id: uuidv4(),
              name: name && name.trim() ? name.trim() : `Joueur ${Math.floor(Math.random() * 1000)}`,
              totalScore: 0,
              rounds: []
            }));
            
            console.info('Joueurs initialisés avec succès depuis URL:', newPlayers.map(p => p.name).join(', '));
            setPlayers(newPlayers);
            setGameStartTime(new Date());
            
            // Effacer les paramètres URL après utilisation pour éviter la double initialisation
            navigate('/game', { replace: true });
            
            // Mark initialization as completed
            initializationCompleted.current = true;
            initializationInProgress.current = false;
            
            toast.success('Nouvelle partie créée !');
            return true;
          }
        } catch (error) {
          console.error("Erreur lors du parsing des paramètres URL:", error);
          // Si erreur avec paramètres URL, on continue avec l'ancienne méthode
        }
      }
      
      // 2. Méthode de secours: initialisation via localStorage
      console.info('Tentative d\'initialisation via localStorage');
      
      // Verify setup exists before initializing
      const setupValid = verifyPlayerSetup();
      console.info('Vérification de la configuration localStorage:', setupValid ? 'VALIDE' : 'INVALIDE');
      
      if (!setupValid) {
        console.error('Impossible de créer une partie: la configuration des joueurs est invalide ou inexistante');
        
        // Nettoyer les flags et états
        initializationAttempted.current = false;
        initializationInProgress.current = false;
        
        // Redirection uniquement si c'est la première tentative d'initialisation
        navigate('/game/setup');
        return false;
      }
      
      const newPlayers = initializePlayers();
      if (!newPlayers || newPlayers.length < 2) {
        console.error('Impossible de créer une partie: moins de 2 joueurs configurés');
        
        // Nettoyer les flags et états
        initializationAttempted.current = false;
        initializationInProgress.current = false;
        
        // Redirection uniquement si c'est la première tentative d'initialisation
        navigate('/game/setup');
        return false;
      }
      
      // Ensure we're starting with a clean state
      console.info('Joueurs initialisés avec succès:', newPlayers.map(p => p.name).join(', '));
      setPlayers(newPlayers);
      setGameStartTime(new Date());
      
      // Mark initialization as completed
      initializationCompleted.current = true;
      initializationInProgress.current = false;
      
      toast.success('Nouvelle partie créée !');
      return true;
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      
      // Nettoyer les flags et états
      initializationAttempted.current = false;
      initializationInProgress.current = false;
      
      navigate('/game/setup');
      return false;
    } finally {
      // Reset attempt flag after a delay to allow for further attempts if needed
      setTimeout(() => {
        initializationAttempted.current = false;
      }, 1000);
    }
  }, [navigate, location.search]);

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
