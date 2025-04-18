
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import LocalGameSetup from '@/components/LocalGameSetup';
import { cleanupGameState } from '@/utils/gameUtils';

const LocalGameSetupContainer: React.FC<{
  onStartGame: (playerNames: string[]) => void;
}> = ({ onStartGame }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    try {
      // Protection contre les clics multiples
      if (isProcessing) {
        console.info("LocalGameSetupContainer: Traitement déjà en cours, ignorer les clics multiples");
        return;
      }
      
      setIsProcessing(true);
      console.info('LocalGameSetupContainer: Démarrage de la partie avec les joueurs:', playerNames);
      
      // Validation des joueurs
      if (!playerNames || playerNames.length < 2) {
        toast.error('Il faut au moins 2 joueurs pour commencer une partie');
        setIsProcessing(false);
        return;
      }

      // 1. Nettoyage complet des données précédentes
      console.info('LocalGameSetupContainer: Nettoyage des données précédentes');
      cleanupGameState();
      
      // 2. Stocker les informations de la partie dans un ordre précis
      console.info('LocalGameSetupContainer: Configuration du mode de jeu');
      localStorage.setItem('dutch_game_mode', 'local');
      
      console.info('LocalGameSetupContainer: Enregistrement des noms de joueurs:', playerNames);
      localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
      
      // 3. Signaler qu'une nouvelle partie est demandée (EN DERNIER)
      console.info('LocalGameSetupContainer: Définition du flag de nouvelle partie');
      localStorage.setItem('dutch_new_game_requested', 'true');
      
      toast.success("Configuration des joueurs enregistrée");
      
      // 4. Attente pour s'assurer que localStorage est bien mis à jour
      setTimeout(() => {
        onStartGame(playerNames);
        
        // Réinitialiser l'état uniquement APRÈS la navigation
        setTimeout(() => {
          setIsProcessing(false);
        }, 500);
      }, 300);
    } catch (error) {
      console.error("LocalGameSetupContainer: Erreur lors de la configuration des joueurs:", error);
      toast.error("Erreur lors de la configuration des joueurs");
      setIsProcessing(false);
    }
  };

  return <LocalGameSetup onStartGame={handleStartGame} isSubmitting={isProcessing} />;
};

export default LocalGameSetupContainer;
