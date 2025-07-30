
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { GameText, GameHero, GameTitle } from '@/components/ui/game-text';

export const HeroSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="text-center mb-12"
    >
      <div className="relative">
        <GameHero 
          color="rainbow" 
          align="center" 
          transform="uppercase"
          spacing="wider"
          glow
          className="mb-3 sm:mb-4 relative z-10 text-4xl sm:text-5xl md:text-6xl"
        >
          Dutch
        </GameHero>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"></div>
      </div>
      
      <GameTitle 
        color="magic"
        align="center"
        spacing="wide"
        className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl"
      >
        Card Battle Arena
      </GameTitle>
      
      <GameText 
        variant="large"
        color="muted"
        align="center"
        className="max-w-sm sm:max-w-md mx-auto px-4 text-base sm:text-lg"
      >
        Affrontez vos amis dans des duels de cartes épiques ! 
        <Sparkles className="inline-block ml-2 text-yellow-500" size={14} />
      </GameText>
    </motion.div>
  );
};
