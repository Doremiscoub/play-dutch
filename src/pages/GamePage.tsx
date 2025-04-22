
import React, { useEffect, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameContent from '@/components/GameContent';
import { updateAllPlayersStats } from '@/utils/playerStatsCalculator';
import { toast } from 'sonner';

const ADSENSE_CLIENT = "ca-pub-2046195502734056";
const ADSENSE_SLOT = "8421933386";

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

  // Initialiser le jeu au chargement du composant
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

  // Check for long inactivity
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

  // Apply stats to players
  const playersWithStats = updateAllPlayersStats(players);

  // Inject AdSense script once on mount (only desktop)
  const adsLoaded = useRef(false);
  useEffect(() => {
    if (adsLoaded.current) return;
    if (typeof window === "undefined" || !window.document) return;

    // Load the AdSense script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = "anonymous";
    // To avoid duplicate script
    script.id = "adsbygooglejs";
    if (!document.getElementById("adsbygooglejs")) {
      document.head.appendChild(script);
    }
    adsLoaded.current = true;
  }, []);

  // Kick off AdSense slot rendering when slot appears
  const asideRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Try to render ad when the ins appears in DOM
    if (asideRef.current) {
      // Only if <ins> present
      const ad = asideRef.current.querySelector("ins.adsbygoogle");
      if (ad && typeof window.adsbygoogle !== "undefined") {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          // silent fail
        }
      }
    }
  }, []);

  return (
    <>
      {/* Desktop layout: 3 columns */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        {/* Left dead-space (future ad slot?) */}
        <div></div>
        {/* Main ScoreBoard area */}
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
        {/* Right AdSense slot */}
        <aside className="ads-slot flex items-start justify-center" ref={asideRef}>
          {/* AdSense code: rendered as DOM so script finds the slot */}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={ADSENSE_CLIENT}
            data-ad-slot={ADSENSE_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </aside>
      </div>
      {/* Mobile: ScoreBoard full width */}
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

