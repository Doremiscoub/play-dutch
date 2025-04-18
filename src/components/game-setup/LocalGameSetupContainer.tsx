
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import LocalGameSetup from '../LocalGameSetup';

const LocalGameSetupContainer: React.FC<{
  onStartGame: (playerNames: string[]) => void;
}> = ({ onStartGame }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    try {
      if (isProcessing) {
        console.info("Traitement déjà en cours, ignorer les clics multiples");
        return;
      }
      
      setIsProcessing(true);
      console.info('LocalGameSetupContainer: Démarrage de la partie avec les joueurs:', playerNames);
      
      if (playerNames.length < 2) {
        toast.error('Il faut au moins 2 joueurs pour commencer une partie');
        setIsProcessing(false);
        return;
      }

      // IMPORTANT: Nettoyage complet des données précédentes pour éviter les conflits
      console.info('LocalGameSetupContainer: Nettoyage des données précédentes');
      localStorage.removeItem('current_dutch_game');
      localStorage.removeItem('dutch_new_game_requested');
      localStorage.removeItem('dutch_game_page_visited');
      
      // Forcer un flag de création de nouvelle partie
      localStorage.setItem('dutch_new_game_requested', 'true');
      
      // Stocker explicitement le mode de jeu
      localStorage.setItem('dutch_game_mode', 'local');
      
      // Stocker les noms dans localStorage APRÈS avoir nettoyé les autres données
      console.info('LocalGameSetupContainer: Enregistrement des noms de joueurs:', playerNames);
      localStorage.setItem('dutch_player_setup', JSON.stringify(playerNames));
      
      toast.success("Configuration des joueurs enregistrée");
      
      // Délai pour s'assurer que localStorage est bien mis à jour
      setTimeout(() => {
        onStartGame(playerNames);
        setIsProcessing(false);
      }, 500); // Augmenter légèrement le délai pour s'assurer que tout est bien synchronisé
    } catch (error) {
      console.error("LocalGameSetupContainer: Erreur lors de la configuration des joueurs:", error);
      toast.error("Erreur lors de la configuration des joueurs");
      setIsProcessing(false);
    }
  };

  return <LocalGameSetup onStartGame={handleStartGame} isSubmitting={isProcessing} />;
};

export default LocalGameSetupContainer;
