
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalGameSetup from '@/components/LocalGameSetup';
import ScoreBoard from '@/components/ScoreBoard/index';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import useGameStore from '@/store/useGameStore';
import useOfflineStorage from '@/hooks/useOfflineStorage';
import useTournamentStore from '@/store/useTournamentStore';
import { sounds } from '@/config/uiConfig';

/**
 * Page principale du jeu
 * Gère le flux entre l'écran de setup et le tableau de score
 */
const GamePage: React.FC = () => {
  // Récupérer l'état global du jeu
  const { 
    players, roundHistory, startGame, addRound, undoLastRound, 
    endGame, confirmEndGame, cancelEndGame, updatePlayerStats,
    showGameEndConfirmation, games
  } = useGameStore();
  
  const { currentTournament, updateTournamentWithGameResult } = useTournamentStore();
  
  // Hook pour la gestion du stockage hors-ligne
  const { getSavedGame, hasOngoingGame, restoreSavedGame } = useOfflineStorage();
  
  // État local - important: setting this to 'setup' by default
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  
  const navigate = useNavigate();

  // Effet pour initialiser l'état à partir du stockage local si une partie est en cours
  useEffect(() => {
    if (hasOngoingGame()) {
      const success = restoreSavedGame();
      if (success) {
        setGameState('playing');
      }
    }
  }, []);
  
  // Effet pour mettre à jour les stats des joueurs quand les rounds changent
  // FIX: This was causing the infinite loop. We now check if players have rounds
  // and only call updatePlayerStats when needed.
  useEffect(() => {
    // Only update stats if there are players with rounds
    const hasRounds = players.length > 0 && players[0].rounds.length > 0;
    
    // We only want to update stats if the rounds actually exist
    // The players state might already include updated stats from other operations
    if (hasRounds && !players[0].stats) {
      updatePlayerStats();
    }
  }, [players.length, players.map(p => p.rounds.length).join(',')]);
  
  // Gestionnaires d'événements
  const handleStartGame = (playerNames: string[]) => {
    startGame(playerNames);
    setGameState('playing');
    toast.success('La partie commence !');
  };

  const handleAddRound = (scores: number[], dutchPlayerId?: string) => {
    addRound(scores, dutchPlayerId);
    
    // Jouer le son
    if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
      try {
        new Audio(sounds.cardSound).play().catch(err => console.error("Sound error:", err));
      } catch (err) {
        console.error("Sound error:", err);
      }
    }
    
    toast.success('Manche ajoutée !');
    
    // Vérifier si la partie est terminée (100 points ou plus)
    const playersTotalWithNewScores = players.map((player, index) => ({
      ...player,
      newTotal: player.totalScore + scores[index]
    }));
    
    const gameOver = playersTotalWithNewScores.some(p => p.newTotal >= 100);
    
    if (gameOver) {
      handleConfirmEndGame();
    }
  };
  
  const handleUndoLastRound = () => {
    undoLastRound();
    
    // Jouer le son
    if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
      try {
        new Audio(sounds.undoSound).play().catch(err => console.error("Sound error:", err));
      } catch (err) {
        console.error("Sound error:", err);
      }
    }
    
    toast.success('Dernière manche annulée !');
  };
  
  const handleEndGame = () => {
    endGame();
  };
  
  const handleConfirmEndGame = () => {
    confirmEndGame();
    
    // Si on est dans un tournoi, mettre à jour les résultats du tournoi
    if (currentTournament) {
      const latestGame = games[games.length - 1];
      updateTournamentWithGameResult(latestGame);
    }
    
    launchConfetti();
    
    // Jouer le son de victoire
    if (window.localStorage.getItem('dutch_sound_enabled') !== 'false') {
      try {
        new Audio(sounds.winSound).play().catch(err => console.error("Sound error:", err));
      } catch (err) {
        console.error("Sound error:", err);
      }
    }
    
    // Rediriger vers le podium
    setTimeout(() => {
      navigate('/history');
    }, 2000);
  };
  
  const handleCancelEndGame = () => {
    cancelEndGame();
  };
  
  // Fonction pour lancer des confettis
  const launchConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#1EAEDB', '#F97316', '#8B5CF6'],
      });
    }, 250);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {gameState === 'setup' ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LocalGameSetup onStartGame={handleStartGame} />
          </motion.div>
        ) : (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScoreBoard 
              players={players}
              onAddRound={handleAddRound}
              onEndGame={handleEndGame}
              onUndoLastRound={handleUndoLastRound}
              roundHistory={roundHistory}
              showGameEndConfirmation={showGameEndConfirmation}
              onConfirmEndGame={handleConfirmEndGame}
              onCancelEndGame={handleCancelEndGame}
              isMultiplayer={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamePage;
