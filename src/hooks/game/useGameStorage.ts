
import { useCallback } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from '../use-local-storage';

const GAME_STORAGE_KEY = 'current_dutch_game';

export const useGameStorage = () => {
  /**
   * Checks if a game is currently active
   */
  const hasActiveGame = useCallback((): boolean => {
    try {
      const savedGame = localStorage.getItem(GAME_STORAGE_KEY);
      if (!savedGame) {
        console.info("Pas de partie active: aucune donnée trouvée");
        return false;
      }
      
      const parsedGame = JSON.parse(savedGame);
      
      if (!parsedGame.players || !Array.isArray(parsedGame.players) || parsedGame.players.length === 0) {
        console.info("Pas de partie active: données de joueurs manquantes ou invalides");
        return false;
      }
      
      if (parsedGame.isGameOver === true) {
        console.info("Partie terminée, considérée comme inactive");
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification de partie active:', error);
      return false;
    }
  }, []);

  /**
   * Loads game state from localStorage
   */
  const loadGameState = useCallback(() => {
    try {
      const savedGame = localStorage.getItem(GAME_STORAGE_KEY);
      
      if (!savedGame) {
        console.info("Aucune partie sauvegardée trouvée");
        return null;
      }
      
      const parsedGame = JSON.parse(savedGame);
      
      if (!parsedGame.players || !Array.isArray(parsedGame.players)) {
        console.error("Format de partie invalide lors du chargement");
        localStorage.removeItem(GAME_STORAGE_KEY);
        throw new Error("Format de partie invalide");
      }
      
      if (parsedGame.players.some((p: any) => !p.id || !p.name || p.totalScore === undefined)) {
        console.error("Structure de joueurs invalide lors du chargement");
        localStorage.removeItem(GAME_STORAGE_KEY);
        throw new Error("Structure de joueurs invalide");
      }
      
      if (parsedGame.lastUpdated) {
        const lastUpdated = new Date(parsedGame.lastUpdated);
        const now = new Date();
        if ((now.getTime() - lastUpdated.getTime()) > 30 * 24 * 60 * 60 * 1000) {
          console.warn("Données de partie trop anciennes, création d'une nouvelle partie");
          localStorage.removeItem(GAME_STORAGE_KEY);
          return null;
        }
      }
      
      console.info("Partie chargée avec succès:", parsedGame.players.length, "joueurs");
      return parsedGame;
    } catch (error) {
      console.error('Erreur lors du chargement de la partie :', error);
      localStorage.removeItem(GAME_STORAGE_KEY);
      toast.error('Erreur lors du chargement de la partie');
      return null;
    }
  }, []);

  /**
   * Saves current game state to localStorage
   */
  const saveGameState = useCallback((gameState: {
    players: Player[];
    roundHistory: { scores: number[], dutchPlayerId?: string }[];
    isGameOver: boolean;
    scoreLimit: number;
    gameStartTime: Date | null;
  }) => {
    try {
      if (!gameState || !gameState.players || gameState.players.length === 0) {
        console.error("Tentative de sauvegarde avec un état de jeu invalide");
        return false;
      }
      
      if (gameState.players.some(p => !p.id || !p.name || p.totalScore === undefined || !Array.isArray(p.rounds))) {
        console.error("Structure de joueurs invalide pour la sauvegarde");
        return false;
      }
      
      const stateToSave = {
        ...gameState,
        lastUpdated: new Date()
      };
      
      localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(stateToSave));
      console.info('État de jeu sauvegardé avec succès:', new Date().toLocaleTimeString());
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état du jeu :', error);
      return false;
    }
  }, []);

  return {
    loadGameState,
    saveGameState,
    hasActiveGame
  };
};
