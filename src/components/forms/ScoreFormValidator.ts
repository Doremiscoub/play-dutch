
import { toast } from 'sonner';

// Flag to prevent duplicate error notifications
let validationErrorShown = false;

/**
 * Validate player scores before submission
 * @param scores Object mapping player IDs to scores
 * @param playerIds Array of player IDs to validate
 * @returns boolean indicating if scores are valid
 */
export const validateScores = (scores: { [key: string]: number }, playerIds: string[]): boolean => {
  try {
    // Reset notification flag for new validation
    validationErrorShown = false;
    
    if (!scores || !playerIds || playerIds.length === 0) {
      if (!validationErrorShown) {
        toast.error('Données de score invalides');
        validationErrorShown = true;
      }
      return false;
    }
    
    // Verify all players have scores
    const allPlayersHaveScores = playerIds.every(id => 
      typeof scores[id] === 'number' || typeof scores[id] === 'string'
    );
    
    if (!allPlayersHaveScores) {
      if (!validationErrorShown) {
        toast.error('Tous les joueurs doivent avoir un score');
        validationErrorShown = true;
      }
      return false;
    }

    // Verify scores are numeric and valid
    const allScoresValid = playerIds.every(id => {
      const score = typeof scores[id] === 'string' ? parseFloat(scores[id]) : scores[id];
      return !isNaN(score) && isFinite(score);
    });
    
    if (!allScoresValid) {
      if (!validationErrorShown) {
        toast.error('Tous les scores doivent être des nombres valides');
        validationErrorShown = true;
      }
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur de validation des scores:', error);
    if (!validationErrorShown) {
      toast.error('Erreur lors de la validation des scores');
      validationErrorShown = true;
    }
    return false;
  }
};
