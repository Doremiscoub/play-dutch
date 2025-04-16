
import { toast } from 'sonner';

export const validateScores = (scores: { [key: string]: number }, playerIds: string[]): boolean => {
  try {
    // Verify all players have scores
    const allPlayersHaveScores = playerIds.every(id => 
      typeof scores[id] === 'number'
    );
    
    if (!allPlayersHaveScores) {
      toast.error('Tous les joueurs doivent avoir un score');
      return false;
    }

    // Verify scores are numeric
    const allScoresValid = playerIds.every(id => 
      !isNaN(scores[id]) && isFinite(scores[id])
    );
    
    if (!allScoresValid) {
      toast.error('Tous les scores doivent être des nombres valides');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur de validation des scores:', error);
    toast.error('Erreur lors de la validation des scores');
    return false;
  }
};
