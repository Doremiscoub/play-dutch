
import { toast } from 'sonner';

export const validateScores = (scores: { [key: string]: number }, playerIds: string[]): boolean => {
  // Vérifier que tous les scores sont définis
  const allPlayersHaveScores = playerIds.every(id => 
    typeof scores[id] === 'number'
  );
  
  if (!allPlayersHaveScores) {
    toast.error('Tous les joueurs doivent avoir un score');
    return false;
  }
  
  return true;
};
