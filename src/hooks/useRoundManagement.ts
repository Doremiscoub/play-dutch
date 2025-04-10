
import { useState, useCallback } from 'react';
import { Player } from '@/types';
import { toast } from 'sonner';
import { updateAllPlayersStats, isGameOver } from '@/utils/playerStatsCalculator';

export const useRoundManagement = (scoreLimit: number, soundEnabled: boolean) => {
  const [roundHistory, setRoundHistory] = useState<{ scores: number[], dutchPlayerId?: string }[]>([]);
  
  // Add a new round
  const addRound = useCallback((
    players: Player[], 
    scores: number[], 
    dutchPlayerId?: string
  ): {
    updatedPlayers: Player[];
    isGameOver: boolean;
  } | null => {
    if (!players || players.length === 0) {
      toast.error('Erreur: aucun joueur trouvé');
      return null;
    }
    
    if (!scores || scores.length !== players.length) {
      toast.error('Erreur: nombre de scores incorrect');
      return null;
    }
    
    if (scores.some(score => isNaN(score))) {
      toast.error('Erreur: les scores doivent être des nombres valides');
      return null;
    }
    
    if (dutchPlayerId && scores.every(score => score === 0)) {
      toast.error('Un Dutch doit avoir au moins un joueur avec des points');
      return null;
    }
    
    setRoundHistory(prev => [...prev, { scores, dutchPlayerId }]);
    
    let gameIsOver = false;
    
    // Update player scores and stats
    const updatedPlayers = players.map((player, index) => {
      const isDutch = player.id === dutchPlayerId;
      const newRound = { 
        score: scores[index],
        isDutch 
      };
      const newTotalScore = player.totalScore + scores[index];
      
      return {
        ...player,
        rounds: [...player.rounds, newRound],
        totalScore: newTotalScore
      };
    });
    
    // Check if game is over and update all player stats
    const playersWithStats = updateAllPlayersStats(updatedPlayers);
    gameIsOver = isGameOver(playersWithStats, scoreLimit);
    
    // Play sound if enabled
    if (soundEnabled) {
      new Audio('/sounds/card-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    toast.success('Manche ajoutée !');
    
    return {
      updatedPlayers: playersWithStats,
      isGameOver: gameIsOver
    };
  }, [scoreLimit, soundEnabled]);

  // Undo the last round
  const undoLastRound = useCallback((players: Player[], soundEnabled: boolean): Player[] => {
    if (!players || players.length === 0 || !players[0].rounds || players[0].rounds.length === 0) {
      toast.error('Pas de manche à annuler !');
      return players;
    }
    
    setRoundHistory(prev => prev.slice(0, -1));
    
    const updatedPlayers = players.map(player => {
      if (!player.rounds || player.rounds.length === 0) return player;
      
      const lastRound = player.rounds[player.rounds.length - 1];
      const newTotalScore = player.totalScore - lastRound.score;
      
      return {
        ...player,
        rounds: player.rounds.slice(0, -1),
        totalScore: newTotalScore
      };
    });
    
    if (soundEnabled) {
      new Audio('/sounds/undo-sound.mp3').play().catch(err => console.error("Sound error:", err));
    }
    
    toast.success('Dernière manche annulée !');
    
    return updateAllPlayersStats(updatedPlayers);
  }, []);

  return {
    roundHistory,
    setRoundHistory,
    addRound,
    undoLastRound
  };
};
