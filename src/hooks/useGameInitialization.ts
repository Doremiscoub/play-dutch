
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
  
  // Create a new game with player names from localStorage configuration
  const createNewGame = useCallback(() => {
    try {
      console.info('Tentative de création d\'une nouvelle partie...');
      
      // Réinitialiser les flags de notification pour éviter les doublons
      resetNotificationFlags();
      
      // Protection contre les initialisations multiples
      if (initializationInProgress.current) {
        console.info('Initialisation déjà en cours, annulation de cette tentative');
        return false;
      }
      
      initializationInProgress.current = true;
      
      // IMPORTANT: Nettoyer la partie en cours AVANT de créer une nouvelle partie
      console.info('Nettoyage de la partie existante avant création...');
      localStorage.removeItem('current_dutch_game');
      
      console.info('Tentative d\'initialisation via localStorage');
      
      const setupValid = verifyPlayerSetup();
      console.info('Vérification de la configuration localStorage:', setupValid ? 'VALIDE' : 'INVALIDE');
      
      if (!setupValid) {
        console.error('Impossible de créer une partie: la configuration des joueurs est invalide');
        
        // Réinitialisation des flags
        initializationInProgress.current = false;
        
        // Redirection vers la configuration
        navigate('/game/setup');
        return false;
      }
      
      const newPlayers = initializePlayers();
      console.info('Joueurs initialisés:', newPlayers);
      
      if (!newPlayers || newPlayers.length < 2) {
        console.error('Impossible de créer une partie: moins de 2 joueurs configurés ou erreur d\'initialisation');
        
        // Réinitialisation des flags
        initializationInProgress.current = false;
        
        // Redirection vers la configuration
        navigate('/game/setup');
        return false;
      }
      
      console.info('Joueurs initialisés avec succès:', newPlayers.length, 'joueurs');
      
      setPlayers(newPlayers);
      setGameStartTime(new Date());
      
      // Marquer l'initialisation comme terminée
      initializationCompleted.current = true;
      initializationInProgress.current = false;
      
      toast.success('Nouvelle partie locale créée !');
      return true;
    } catch (error) {
      console.error("Erreur lors de la création d'une nouvelle partie:", error);
      toast.error("Une erreur est survenue lors de la création de la partie");
      
      // Réinitialisation des flags
      initializationInProgress.current = false;
      
      navigate('/game/setup');
      return false;
    }
  }, [navigate]);

  // Nettoyage complet pour éviter les états partiels
  const cleanup = useCallback(() => {
    cleanupGameState();
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
