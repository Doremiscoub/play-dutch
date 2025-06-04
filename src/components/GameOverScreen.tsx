import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Player } from '@/types';
import { UnifiedBackground } from '@/components/ui/unified-background';
import GameOverHeader from '@/components/game/GameOverHeader';
import GamePodium from '@/components/game/GamePodium';
import OtherPlayersRanking from '@/components/game/OtherPlayersRanking';
import GameOverActionButtons from '@/components/game/GameOverActionButtons';
import { GameCard } from '@/components/ui/game-card';

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

  // Sort players by score (lowest = best)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const winner = sortedPlayers[0];
  
  // Trigger confetti for the winner - Enhanced celebration
  const triggerConfetti = () => {
    if (isConfettiTriggered) return;
    
    // Multiple waves of confetti
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981', '#FBBF24', '#FF6B6B', '#4CD4FF']
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.5 },
        colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981']
      });
      
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.5 },
        colors: ['#FF6B6B', '#4CD4FF', '#FFD166', '#C5F277']
      });
    }, 700);
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.2 },
        colors: ['#FFFFFF', '#E9D5FF', '#FDE68A', '#BFDBFE']
      });
    }, 1400);
    
    setIsConfettiTriggered(true);
    
    // Play celebration sound if available
    try {
      const audio = new Audio('/sounds/victory.mp3');
      audio.volume = 0.6;
      audio.play();
    } catch (error) {
      console.log('Sound not available');
    }
  };

  // Trigger confetti on load
  useEffect(() => {
    triggerConfetti();
    
    // Timer to relaunch confetti periodically for continuous celebration
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: Math.random() * 0.3 + 0.2, x: Math.random() },
        colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981', '#FFD166']
      });
    }, 3000);
    
    // Show celebration toast
    toast.success(`🎉 ${winner.name} remporte la partie !`, {
      duration: 5000,
      position: 'top-center',
    });
    
    return () => clearInterval(confettiInterval);
  }, [winner.name]);

  // Continue game with a new limit
  const handleContinueGame = (newLimit: number) => {
    onContinueGame(newLimit);
    toast.success(`La partie continue ! Nouvelle limite : ${currentScoreLimit + newLimit} points`);
  };

  return (
    <UnifiedBackground variant="default" className="min-h-screen relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 min-h-screen p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameCard variant="glass" className="p-8">
              {/* Header with congratulations message */}
              <GameOverHeader winner={winner} />
              
              {/* Podium */}
              <GamePodium players={players} />
              
              {/* Other players ranking */}
              <OtherPlayersRanking players={players} />
            </GameCard>
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GameOverActionButtons 
              onRestart={onRestart} 
              onContinueGame={handleContinueGame} 
            />
          </motion.div>
        </div>
      </div>
    </UnifiedBackground>
  );
};

export default GameOverScreen;
