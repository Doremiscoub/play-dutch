
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { motion } from 'framer-motion'; // Added missing import
import { Player } from '@/types';
import AnimatedBackground from './AnimatedBackground';
import GameOverHeader from './game/GameOverHeader';
import GamePodium from './game/GamePodium';
import OtherPlayersRanking from './game/OtherPlayersRanking';
import GameOverActionButtons from './game/GameOverActionButtons';
import GradientAnimationStyles from './game/GradientAnimationStyles';

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
  
  // Trigger confetti for the winner - Enhanced
  const triggerConfetti = () => {
    if (isConfettiTriggered) return;
    
    // More abundant and colorful confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981', '#FBBF24']
    });
    
    // Second wave of confetti after a delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.5 }
      });
      
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.5 }
      });
    }, 800);
    
    setIsConfettiTriggered(true);
  };

  // Trigger confetti on load
  useEffect(() => {
    triggerConfetti();
    
    // Timer to relaunch confetti periodically
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: Math.random() * 0.3 + 0.2, x: Math.random() },
        colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981']
      });
    }, 3500);
    
    return () => clearInterval(confettiInterval);
  }, []);

  // Continue game with a new limit
  const handleContinueGame = (newLimit: number) => {
    onContinueGame(newLimit);
    toast.success(`La partie continue ! Nouvelle limite : ${currentScoreLimit + newLimit} points`);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated festive background */}
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground variant="default" />
        
        {/* Overlay with festive gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-orange-500/10"></div>
      </div>
      
      {/* Animation of luminous particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-yellow-400/30 blur-sm"
            animate={{
              x: [Math.random() * 100, Math.random() * window.innerWidth],
              y: [Math.random() * 100, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Header with congratulations message */}
      <GameOverHeader winner={winner} />
      
      {/* Podium */}
      <GamePodium players={players} />
      
      {/* Other players ranking */}
      <OtherPlayersRanking players={players} />
      
      {/* Action buttons */}
      <GameOverActionButtons 
        onRestart={onRestart} 
        onContinueGame={handleContinueGame} 
      />
      
      {/* Gradient animation styles */}
      <GradientAnimationStyles />
    </div>
  );
};

export default GameOverScreen;
