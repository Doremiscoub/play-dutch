
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GameSettings from '@/components/GameSettings';
import HeroSection from '@/components/home/HeroSection';
import SEOContentSection from '@/components/home/SEOContentSection';
import { useSEO } from '@/hooks/useSEO';

const Home: React.FC = () => {
  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche'
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Settings positioned in top-right */}
      <div className="absolute top-4 right-4 z-50">
        <GameSettings />
      </div>
      
      <HeroSection />
      <SEOContentSection />
    </div>
  );
};

export default Home;
