import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { toast } from 'sonner';
import AdSenseSlot from '@/components/AdSenseSlot';

const GamePage: React.FC = () => {
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

  useEffect(() => {
    if (!players || players.length === 0) {
      console.info("Aucun joueur trouvé, tentative de création d'une nouvelle partie...");
      const success = createNewGame();
      
      if (!success) {
        console.error("Échec de l'initialisation du jeu");
        toast.error("Impossible de démarrer la partie");
      } else {
        console.info("Jeu initialisé avec succès avec", players.length, "joueurs");
      }
    } else {
      console.info("Partie existante détectée avec", players.length, "joueurs");
    }
  }, [createNewGame, players.length]);

  useEffect(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    if (savedGame) {
      try {
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
      } catch (error) {
        console.error("Erreur lors de l'analyse de la partie sauvegardée:", error);
        localStorage.removeItem('current_dutch_game');
      }
    }
  }, [handleRestart]);

  const playersWithStats = updateAllPlayersStats(players);

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
        <AdSenseSlot />
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
