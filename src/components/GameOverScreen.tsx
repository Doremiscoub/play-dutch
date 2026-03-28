
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import AnimatedBackground from './AnimatedBackground';
import GameOverHeader from './game/GameOverHeader';
import GamePodium from './game/GamePodium';
import OtherPlayersRanking from './game/OtherPlayersRanking';
import GameOverActionButtons from './game/GameOverActionButtons';
import { ReceiptCard } from './ui/receipt-card';
import { ModernTitle } from './ui/modern-title';
import { useH5GameAds } from '@/hooks/useH5GameAds';
import { logger } from '@/utils/logger';

const CONFETTI_COLORS = [
  '#3B82F6', // blue
  '#8B5CF6', // purple
  '#F97316', // orange
  '#22C55E', // green
  '#EC4899', // pink
  '#14B8A6', // teal
];

interface GameOverScreenProps {
  players: Player[];
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
  currentScoreLimit: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  players,
  onRestart,
  onContinueGame,
  currentScoreLimit = 100
}) => {
  const [isConfettiTriggered, setIsConfettiTriggered] = useState<boolean>(false);
  const { showInterstitial } = useH5GameAds();

  // Sort players by score (lowest = best)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const winner = sortedPlayers[0];

  // Trigger confetti for the winner
  const triggerConfetti = () => {
    if (isConfettiTriggered) return;

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: CONFETTI_COLORS
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.5 },
        colors: CONFETTI_COLORS.slice(0, 3)
      });

      confetti({
        particleCount: 150,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.5 },
        colors: CONFETTI_COLORS.slice(3)
      });
    }, 700);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.2 },
        colors: ['#ffffff', '#E0E7FF', '#DBEAFE']
      });
    }, 1400);

    setIsConfettiTriggered(true);

    try {
      const audio = new Audio('/sounds/victory.mp3');
      audio.volume = 0.6;
      audio.play();
    } catch (error) {
      logger.debug('Sound not available');
    }
  };

  useEffect(() => {
    triggerConfetti();

    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: Math.random() * 0.3 + 0.2, x: Math.random() },
        colors: CONFETTI_COLORS.slice(0, 4)
      });
    }, 3000);

    toast.success(`🎉 ${winner.name} remporte la partie !`, {
      duration: 5000,
      position: 'top-center',
    });

    // Show interstitial ad at game over — natural break
    showInterstitial('game-over-screen');

    return () => clearInterval(confettiInterval);
  }, [winner.name]);

  const handleContinueGame = (newLimit: number) => {
    onContinueGame(newLimit);
    toast.success(`La partie continue ! Nouvelle limite : ${currentScoreLimit + newLimit} points`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header géré par GamePageContainer via UnifiedTopBar */}

      <div className="p-4 flex flex-col items-center justify-center relative pt-16">
        {/* Animated festive background */}
        <div className="absolute inset-0 -z-10">
          <AnimatedBackground />
        </div>

        {/* Main content */}
        <div className="w-full max-w-xl mx-auto z-10 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ModernTitle variant="h1" withSparkles className="text-center mb-6">
              🎉 Victoire ! 🎉
            </ModernTitle>
          </motion.div>

          <ReceiptCard className="w-full mb-6 p-6">
            <GameOverHeader winner={winner} />
            <GamePodium players={players} />
            <OtherPlayersRanking players={players} />
          </ReceiptCard>

          <GameOverActionButtons
            onRestart={onRestart}
            onContinueGame={handleContinueGame}
          />
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
