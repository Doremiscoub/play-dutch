
import React, { useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { useLocation } from 'react-router-dom';

const GamePage: React.FC = () => {
  const location = useLocation();
  const {
    players,
    roundHistory,
    showGameOver,
    showGameEndConfirmation,
    scoreLimit,
    handleAddRound,
    handleUndoLastRound,
    handleRequestEndGame,
    handleConfirmEndGame,
    handleCancelEndGame,
    handleContinueGame,
    handleRestart
  } = useGameState();
  
  // Journalisation pour le suivi du composant
  useEffect(() => {
    console.info("GamePage: Montage du composant");
    return () => console.info("GamePage: Démontage du composant");
  }, []);
  
  // Journalisation des états principaux
  useEffect(() => {
    console.info("GamePage: Mise à jour des données", {
      playerCount: players?.length || 0,
      roundCount: roundHistory?.length || 0,
      showGameOver
    });
  }, [players, roundHistory, showGameOver]);
  
  // Vérifier les longues périodes d'inactivité
  useEffect(() => {
    const checkInactivity = () => {
      try {
        const savedGame = localStorage.getItem('current_dutch_game');
        if (!savedGame) return;
        
        const parsedGame = JSON.parse(savedGame);
        if (!parsedGame.lastUpdated) return;
        
        const lastUpdated = new Date(parsedGame.lastUpdated);
        const now = new Date();
        const hoursSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        // Si la dernière mise à jour date de plus de 24h, confirmer avec l'utilisateur
        if (hoursSinceLastUpdate > 24) {
          const confirmResume = window.confirm('Une partie non terminée a été trouvée, mais elle n\'a pas été mise à jour depuis plus de 24 heures. Voulez-vous la reprendre?');
          
          if (!confirmResume) {
            // Si l'utilisateur ne veut pas reprendre, nettoyer et redémarrer
            localStorage.removeItem('current_dutch_game');
            handleRestart();
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse de la partie sauvegardée:", error);
      }
    };
    
    // Vérifier l'inactivité après un court délai pour laisser le temps à l'initialisation
    const timeoutId = setTimeout(checkInactivity, 500);
    return () => clearTimeout(timeoutId);
  }, [handleRestart]);
  
  // Protection contre les données invalides
  const safePlayersWithStats = Array.isArray(players) && players.length > 0
    ? updateAllPlayersStats(players)
    : [];
  
  const safeRoundHistory = Array.isArray(roundHistory) ? roundHistory : [];
  
  // Stocker le chemin actuel dans localStorage pour l'historique de navigation
  useEffect(() => {
    localStorage.setItem('dutch_previous_route', location.pathname);
  }, [location]);
  
  return (
    <GameContent
      players={safePlayersWithStats}
      roundHistory={safeRoundHistory}
      showGameOver={showGameOver}
      showGameEndConfirmation={showGameEndConfirmation}
      scoreLimit={scoreLimit}
      onAddRound={handleAddRound}
      onUndoLastRound={handleUndoLastRound}
      onRequestEndGame={handleRequestEndGame}
      onConfirmEndGame={handleConfirmEndGame}
      onCancelEndGame={handleCancelEndGame}
      onContinueGame={handleContinueGame}
      onRestart={handleRestart}
    />
  );
};

export default GamePage;
