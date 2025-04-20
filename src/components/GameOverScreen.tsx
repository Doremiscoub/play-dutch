
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
      
      {/* Animation of luminous particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-yellow-400/30 blur-sm"
            animate={{
              x: [Math.random() * 100, Math.random() * window.innerWidth],
              y: [Math.random() * 100, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Pulsing ring effect around victorious message */}
      <motion.div
        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-dutch-blue/5"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
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
      
      {/* Gradient animation styles - CSS in JS for this component */}
      <style jsx>{`
        @keyframes gradientBg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-animation {
          animation: gradientBg 6s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default GameOverScreen;
