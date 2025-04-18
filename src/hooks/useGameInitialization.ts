
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
      console.info('État actuel - initializationCompleted:', initializationCompleted.current);
      console.info('État actuel - initializationAttempted:', initializationAttempted.current);
      console.info('État actuel - initializationInProgress:', initializationInProgress.current);
      
      // Réinitialiser les flags de notification pour éviter les doublons
      resetNotificationFlags();
      
      // Protection contre les initialisations multiples
      if (initializationInProgress.current) {
        console.info('Initialisation déjà en cours, annulation de cette tentative');
        return false;
      }
      
      initializationInProgress.current = true;
      
      console.info('Tentative d\'initialisation via localStorage');
      
      // Vérifier si la configuration des joueurs est valide
      const setupValid = verifyPlayerSetup();
      console.info('Vérification de la configuration localStorage:', setupValid ? 'VALIDE' : 'INVALIDE');
      
      if (!setupValid) {
        console.error('Impossible de créer une partie: la configuration des joueurs est invalide');
        
        // Réinitialisation des flags
        initializationInProgress.current = false;
        
        // Redirection vers la configuration
        toast.error("Configuration de la partie invalide");
        navigate('/game/setup');
        return false;
      }
      
      // IMPORTANT: Nettoyer la partie en cours AVANT de créer une nouvelle partie
      console.info('Nettoyage de la partie existante avant création...');
      localStorage.removeItem('current_dutch_game');
      
      // Initialiser les joueurs à partir des données localStorage
      const newPlayers = initializePlayers();
      console.info('Joueurs initialisés:', newPlayers);
      
      if (!newPlayers || newPlayers.length < 2) {
        console.error('Impossible de créer une partie: moins de 2 joueurs configurés ou erreur d\'initialisation');
        
        // Réinitialisation des flags
        initializationInProgress.current = false;
        
        // Redirection vers la configuration
        toast.error("Impossible d'initialiser les joueurs");
        navigate('/game/setup');
        return false;
      }
      
      console.info('Joueurs initialisés avec succès:', newPlayers.length, 'joueurs');
      
      // Mise à jour de l'état des joueurs
      setPlayers(newPlayers);
      
      // Initialisation du temps de départ
      const now = new Date();
      setGameStartTime(now);
      
      // Marquer l'initialisation comme terminée
      initializationCompleted.current = true;
      initializationInProgress.current = false;
      
      // Confirmer dans localStorage que l'initialisation est terminée
      localStorage.setItem('dutch_initialization_completed', 'true');
      
      // Supprimer le flag de nouvelle partie après initialisation réussie
      localStorage.removeItem('dutch_new_game_requested');
      
      toast.success('Nouvelle partie locale créée !');
      
      // Ne pas supprimer la configuration des joueurs immédiatement 
      // pour permettre une récupération en cas d'erreur
      setTimeout(() => {
        if (initializationCompleted.current) {
          clearPlayerSetup();
        }
      }, 2000);
      
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
