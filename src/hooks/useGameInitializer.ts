
import { useState, useEffect } from 'react';
import { useGameState } from './useGameState';
import { toast } from 'sonner';

export function useGameInitializer() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const { players, createNewGame } = useGameState();

  useEffect(() => {
    const initializeGame = async () => {
      setIsInitializing(true);
      setInitError(null);
      
      try {
        if (!players || players.length === 0) {
          console.info("Aucun joueur trouvé, tentative de création d'une nouvelle partie...");
          const success = createNewGame();
          
          if (!success) {
            setInitError("Impossible de démarrer la partie. Veuillez configurer les joueurs.");
            toast.error("Impossible de démarrer la partie");
            return;
          }
          
          toast.success("Partie créée avec succès");
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation du jeu:", error);
        setInitError("Une erreur est survenue lors de l'initialisation.");
        toast.error("Erreur lors du chargement de la partie");
      } finally {
        setIsInitializing(false);
      }
    };

    initializeGame();
  }, [players, createNewGame]);

  return { isInitializing, initError };
}
