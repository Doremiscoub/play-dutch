
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
import ContextualAdBanner from './ads/ContextualAdBanner';
import { DESIGN_TOKENS } from '@/design';

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
  
  // Trigger confetti for the winner
  const triggerConfetti = () => {
    if (isConfettiTriggered) return;
    
    // Utiliser les couleurs centralisées pour les confettis
    const confettiColors = [
      DESIGN_TOKENS.primitive.dutch.blue[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.dutch.purple[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.dutch.orange[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.kids.lime[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.kids.pink[400].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.kids.turquoise[400].replace('hsl(', '').replace(')', '')
    ].map(color => `hsl(${color})`);
    
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: confettiColors
    });
    
    setTimeout(() => {
      const leftColors = confettiColors.slice(0, 3);
      const rightColors = confettiColors.slice(3);
      
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.5 },
        colors: leftColors
      });
      
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.5 },
        colors: rightColors
      });
    }, 700);
    
    setTimeout(() => {
      const whiteColors = [
        DESIGN_TOKENS.primitive.neutral[0],
        DESIGN_TOKENS.primitive.glass.purple50.replace('hsl(', '').replace(')', ''),
        DESIGN_TOKENS.primitive.glass.blue50.replace('hsl(', '').replace(')', '')
      ].map(color => color.includes('hsl') ? color : `hsl(${color})`);
      
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.2 },
        colors: whiteColors
      });
    }, 1400);
    
    setIsConfettiTriggered(true);
    
    try {
      const audio = new Audio('/sounds/victory.mp3');
      audio.volume = 0.6;
      audio.play();
    } catch (error) {
      console.log('Sound not available');
    }
  };

  useEffect(() => {
    // Définir les couleurs centralisées pour les confettis au début
    const confettiColors = [
      DESIGN_TOKENS.primitive.dutch.blue[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.dutch.purple[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.dutch.orange[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.kids.lime[500].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.kids.pink[400].replace('hsl(', '').replace(')', ''),
      DESIGN_TOKENS.primitive.kids.turquoise[400].replace('hsl(', '').replace(')', '')
    ].map(color => `hsl(${color})`);

    triggerConfetti();
    
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: Math.random() * 0.3 + 0.2, x: Math.random() },
        colors: confettiColors.slice(0, 4) // Utiliser les 4 premières couleurs
      });
    }, 3000);
    
    toast.success(`🎉 ${winner.name} remporte la partie !`, {
      duration: 5000,
      position: 'top-center',
    });
    
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-orange-500/15"></div>
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
          
          {/* Bannière contextuelle de fin de partie */}
          <ContextualAdBanner 
            placement="game-over"
            showProbability={0.8}
            autoHideDelay={20000}
          />

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
