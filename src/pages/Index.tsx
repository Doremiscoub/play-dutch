
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { StructuredData } from '@/components/seo/StructuredData';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureCard } from '@/components/home/FeatureCard';
import { FooterSection } from '@/components/home/FooterSection';
import { createGameFeatures } from '@/data/game-features';

const Index = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne'
  });

  const gameFeatures = createGameFeatures(navigate);

  return (
    <>
      <StructuredData 
        type="WebApplication" 
        data={{
          name: 'Dutch Card Game',
          description: 'Application web pour le jeu de cartes Dutch',
          applicationCategory: 'Game',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR'
          }
        }} 
      />
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-10">
        <HeroSection />

        {/* Cartes de fonctionnalités style Uno */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-10">
          {gameFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <FooterSection />
      </div>
    </>
  );
};

export default Index;
