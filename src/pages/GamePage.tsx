
import React, { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { toast } from 'sonner';
import AdSenseSlot from '@/components/AdSenseSlot';

const GamePage: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoadingGame, setIsLoadingGame] = useState<boolean>(true);
  
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
    handleRestart,
    createNewGame,
  } = useGameState();

  // Tentative d'initialisation de la partie si nécessaire
  useEffect(() => {
    const initializeGame = async () => {
      try {
        if (!players || players.length === 0) {
          console.info("Aucun joueur trouvé, tentative de création d'une nouvelle partie...");
          const success = createNewGame();
          
          if (!success) {
            console.error("Échec de l'initialisation du jeu");
            toast.error("Impossible de démarrer la partie");
          } else {
            console.info("Jeu initialisé avec succès avec", players.length, "joueurs");
            setIsInitialized(true);
          }
        } else {
          console.info("Partie existante détectée avec", players.length, "joueurs");
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la partie:", error);
        toast.error("Une erreur est survenue lors de l'initialisation");
      } finally {
        setIsLoadingGame(false);
      }
    };
    
    initializeGame();
  }, [createNewGame, players.length]);

  // Vérification des parties sauvegardées
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      const savedGame = localStorage.getItem('current_dutch_game');
      if (savedGame) {
        const parsedGame = JSON.parse(savedGame);
        const lastUpdated = new Date(parsedGame.lastUpdated);
        const now = new Date();
        const hoursSinceLastUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLastUpdate > 24) {
          const confirmResume = window.confirm('Une partie non terminée a été trouvée. Voulez-vous la reprendre?');
          if (!confirmResume) {
            localStorage.removeItem('current_dutch_game');
            handleRestart();
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse de la partie sauvegardée:", error);
      localStorage.removeItem('current_dutch_game');
    }
  }, [handleRestart, isInitialized]);

  // Calcul des statistiques des joueurs
  const playersWithStats = updateAllPlayersStats(players);

  // Affichage d'un indicateur de chargement pendant l'initialisation
  if (isLoadingGame) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dutch-blue mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Chargement de la partie...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <div />
        <main className="mx-auto max-w-screen-lg w-full">
          <GameContent
            players={playersWithStats}
            roundHistory={roundHistory}
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
        </main>
        {/* Affichage conditionnel de l'AdSenseSlot uniquement si la partie est initialisée */}
        {isInitialized && <AdSenseSlot />}
      </div>
      <div className="lg:hidden">
        <GameContent
          players={playersWithStats}
          roundHistory={roundHistory}
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
      </div>
    </>
  );
};

export default GamePage;
