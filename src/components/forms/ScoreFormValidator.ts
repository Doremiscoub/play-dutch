
import { toast } from 'sonner';

// Flag to prevent duplicate error notifications
let validationErrorShown = false;

/**
 * Reset validation error flag
 */
export const resetValidationErrorFlag = () => {
  validationErrorShown = false;
};

/**
 * Validate player scores before submission
 * @param scores Object mapping player IDs to scores
 * @param playerIds Array of player IDs to validate
 * @returns boolean indicating if scores are valid
 */
export const validateScores = (scores: { [key: string]: number }, playerIds: string[]): boolean => {
  try {
    // Check if validation has already been done recently
    if (validationErrorShown) {
      console.info("Une validation d'erreur a déjà été affichée, pas de nouvelle notification");
      return false;
    }
    
    if (!scores || !playerIds || playerIds.length === 0) {
      toast.error('Données de score invalides');
      validationErrorShown = true;
      setTimeout(() => { validationErrorShown = false; }, 3000);
      return false;
    }
    
    // Verify all players have scores
    const allPlayersHaveScores = playerIds.every(id => 
      typeof scores[id] === 'number' || typeof scores[id] === 'string'
    );
    
    if (!allPlayersHaveScores) {
      toast.error('Tous les joueurs doivent avoir un score');
      validationErrorShown = true;
      setTimeout(() => { validationErrorShown = false; }, 3000);
      return false;
    }

    // Verify scores are numeric and valid
    const allScoresValid = playerIds.every(id => {
      const score = typeof scores[id] === 'string' ? parseFloat(scores[id]) : scores[id];
      return !isNaN(score) && isFinite(score);
    });
    
    if (!allScoresValid) {
      toast.error('Tous les scores doivent être des nombres valides');
      validationErrorShown = true;
      setTimeout(() => { validationErrorShown = false; }, 3000);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur de validation des scores:', error);
    if (!validationErrorShown) {
      toast.error('Erreur lors de la validation des scores');
      validationErrorShown = true;
      setTimeout(() => { validationErrorShown = false; }, 3000);
    }
    return false;
  }
};
