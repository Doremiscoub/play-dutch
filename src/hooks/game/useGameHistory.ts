
import { useCallback } from 'react';
import { Player, Game } from '@/types';
import { toast } from 'sonner';
import { useLocalStorage } from '../use-local-storage';
import { v4 as uuidv4 } from 'uuid';
import { calculateGameDuration } from '@/utils/gameUtils';

const GAMES_HISTORY_KEY = 'dutch_games';

export const useGameHistory = () => {
  const [games, setGames] = useLocalStorage<Game[]>(GAMES_HISTORY_KEY, []);

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
      
      setGames(prev => {
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
    saveGameToHistory,
    deleteGameFromHistory
  };
};
