
import { useState } from 'react';
import { toast } from 'sonner';

export const useScoreLimit = () => {
  const [scoreLimit, setScoreLimit] = useState<number>(100);

  const updateScoreLimit = (newLimit: number) => {
    if (newLimit < 50 || newLimit > 500) {
      toast.error('La limite de score doit être entre 50 et 500');
      return false;
    }
    setScoreLimit(newLimit);
    return true;
  };

  return {
    scoreLimit,
    setScoreLimit,
    updateScoreLimit
  };
};
