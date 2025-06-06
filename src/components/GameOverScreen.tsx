
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
  
  // Trigger confetti for the winner - Further enhanced
  const triggerConfetti = () => {
    if (isConfettiTriggered) return;
    
    // More abundant and colorful confetti
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981', '#FBBF24', '#FF6B6B', '#4CD4FF']
    });
    
    // Second wave of confetti after a delay
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
    
    // Third wave for extra celebration
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
    <div className="min-h-screen p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated festive background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground />
        
        {/* Overlay with festive gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-orange-500/15"></div>
      </div>
      
      {/* Main content */}
      <div className="w-full max-w-xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ModernTitle variant="h1" withSparkles className="text-center mb-6">
            Partie Terminée
          </ModernTitle>
        </motion.div>
        
        <ReceiptCard className="w-full mb-6 p-6">
          {/* Header with congratulations message */}
          <GameOverHeader winner={winner} />
          
          {/* Podium */}
          <GamePodium players={players} />
          
          {/* Other players ranking */}
          <OtherPlayersRanking players={players} />
        </ReceiptCard>
        
        {/* Action buttons */}
        <GameOverActionButtons 
          onRestart={onRestart} 
          onContinueGame={handleContinueGame} 
        />
      </div>
      
      {/* Fixed: Replace jsx prop with standard CSS */}
      <style>
        {`
        @keyframes gradientBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-animation {
          animation: gradientBg 6s ease infinite;
          background-size: 200% 200%;
        }
        `}
      </style>
    </div>
  );
};

export default GameOverScreen;
