
/**
 * Hook pour la persistance des données de jeu
 */
import { useCallback } from 'react';
import { Player, Game } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from './use-local-storage';
import { v4 as uuidv4 } from 'uuid';
import { calculateGameDuration } from '@/utils/gameUtils';

/**
 * Hook pour gérer la persistance des données de jeu
 */
export const useGamePersistence = () => {
  const [games, setGames] = useLocalStorage<Game[]>('dutch_games', []);

  /**
   * Sauvegarde une partie terminée dans l'historique
   */
  const saveGameToHistory = useCallback((players: Player[], gameStartTime: Date | null) => {
    try {
      if (!players || players.length === 0) {
        throw new Error("Impossible de sauvegarder une partie sans joueurs");
      }
      
      const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
      const winner = sortedPlayers[0].name;
      const gameDuration = gameStartTime ? calculateGameDuration(gameStartTime) : '';
      
      const game: Game = {
        id: uuidv4(),
        date: new Date(),
        rounds: players[0]?.rounds.length || 0,
        players: players.map(p => ({ 
          name: p.name, 
          score: p.totalScore, 
          isDutch: p.rounds.some(r => r.isDutch) 
        })),
        winner,
        duration: gameDuration
      };
      
      // Éviter les duplications d'entrées
      setGames(prev => {
        // Vérifier si la partie existe déjà avec les mêmes joueurs et scores
        const isDuplicate = prev.some(g => 
          g.rounds === game.rounds && 
          g.winner === game.winner &&
          JSON.stringify(g.players) === JSON.stringify(game.players)
        );
        
        if (isDuplicate) {
          console.info("Partie déjà enregistrée dans l'historique, éviter le doublon");
          return prev;
        }
        
        return [...prev, game];
      });
      
      toast.success('Partie sauvegardée dans l\'historique');
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la partie :', error);
      toast.error('Erreur lors de la sauvegarde de la partie');
      return false;
    }
  }, [setGames]);

  /**
   * Vérifie si une partie est en cours
   */
  const hasActiveGame = useCallback((): boolean => {
    try {
      const savedGame = localStorage.getItem('current_dutch_game');
      if (!savedGame) return false;
      
      const parsedGame = JSON.parse(savedGame);
      
      // Vérification de validité de base
      if (!parsedGame.players || !Array.isArray(parsedGame.players) || parsedGame.players.length === 0) {
        console.info("Pas de partie active: données de joueurs manquantes ou invalides");
        return false;
      }
      
      // Si la partie est marquée comme terminée, elle n'est pas "active"
      if (parsedGame.isGameOver === true) {
        console.info("Partie terminée, considérée comme inactive");
        return false;
      }

      // Vérifier si des manches ont été jouées (partie réellement commencée)
      const hasPlayedRounds = parsedGame.players.some((p: any) => 
        p.rounds && Array.isArray(p.rounds) && p.rounds.length > 0
      );

      // Une partie est considérée active uniquement si elle a au moins une manche jouée
      return hasPlayedRounds;
    } catch (error) {
      console.error('Erreur lors de la vérification de partie active:', error);
      return false;
    }
  }, []);

  /**
   * Charge l'état initial du jeu depuis localStorage
   */
  const loadGameState = useCallback(() => {
    try {
      const savedGame = localStorage.getItem('current_dutch_game');
      
      if (savedGame) {
        const parsedGame = JSON.parse(savedGame);
        
        // Vérification de base des données chargées
        if (!parsedGame.players || !Array.isArray(parsedGame.players)) {
          console.error("Format de partie invalide lors du chargement");
          throw new Error("Format de partie invalide");
        }
        
        // Vérification de la structure attendue
        if (parsedGame.players.some((p: any) => !p.id || !p.name || p.totalScore === undefined)) {
          console.error("Structure de joueurs invalide lors du chargement");
          throw new Error("Structure de joueurs invalide");
        }
        
        // Vérifier la fraîcheur des données
        if (parsedGame.lastUpdated) {
          const lastUpdated = new Date(parsedGame.lastUpdated);
          const now = new Date();
          // Si plus de 7 jours, considérer comme périmée
          if ((now.getTime() - lastUpdated.getTime()) > 7 * 24 * 60 * 60 * 1000) {
            console.warn("Données de partie trop anciennes, création d'une nouvelle partie");
            return null;
          }
        }
        
        return parsedGame;
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la partie :', error);
      localStorage.removeItem('current_dutch_game'); // Supprimer les données corrompues
      toast.error('Erreur lors du chargement de la partie');
    }
    
    return null;
  }, []);

  /**
   * Sauvegarde l'état actuel du jeu dans localStorage
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
      
      // Vérification de structure
      if (gameState.players.some(p => !p.id || !p.name || p.totalScore === undefined || !Array.isArray(p.rounds))) {
        console.error("Structure de joueurs invalide pour la sauvegarde");
        return false;
      }
      
      const stateToSave = {
        ...gameState,
        lastUpdated: new Date()
      };
      
      localStorage.setItem('current_dutch_game', JSON.stringify(stateToSave));
      console.info('État de jeu sauvegardé avec succès:', new Date().toLocaleTimeString());
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'état du jeu :', error);
      return false;
    }
  }, []);

  /**
   * Supprime une partie de l'historique
   */
  const deleteGameFromHistory = useCallback((gameId: string) => {
    try {
      setGames(prev => prev.filter(game => game.id !== gameId));
      toast.success('Partie supprimée de l\'historique');
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la partie :', error);
      toast.error('Erreur lors de la suppression de la partie');
      return false;
    }
  }, [setGames]);

  return {
    games,
    loadGameState,
    saveGameState,
    saveGameToHistory,
    deleteGameFromHistory,
    hasActiveGame
  };
};
