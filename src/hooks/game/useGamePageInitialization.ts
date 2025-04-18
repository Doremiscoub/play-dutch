
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useGamePageInitialization = () => {
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.info("GamePage: Montage du composant");
    
    const checkReady = () => {
      const ls = localStorage.getItem('current_dutch_game');
      try {
        const ready = !!(ls && JSON.parse(ls).players?.length);
        setIsReady(ready);
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'état:', error);
      }
    };

    checkReady();
    const id = setInterval(checkReady, 200);
    
    return () => {
      console.info("GamePage: Démontage du composant");
      clearInterval(id);
    };
  }, []);

  return { isReady };
};
