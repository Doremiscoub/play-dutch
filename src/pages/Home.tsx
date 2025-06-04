
import React, { Suspense } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GameSettings from '@/components/GameSettings';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { ScrollSnapContainer, ScrollSnapSection } from '@/components/ui/scroll-snap-container';
import { useSEO } from '@/hooks/useSEO';

// Lazy load components for better performance
const EnhancedHeroSection = React.lazy(() => import('@/components/home/EnhancedHeroSection'));
const SEOContentSection = React.lazy(() => import('@/components/home/SEOContentSection'));

const Home: React.FC = () => {
  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche'
  });

  return (
    <>
      {/* Google Fonts */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect" 
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <ScrollSnapContainer className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        
        {/* Settings positioned in top-right */}
        <div className="absolute top-4 right-4 z-50">
          <GameSettings />
        </div>
        
        <ScrollSnapSection align="center">
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center">
              <LoadingSkeleton variant="hero" />
            </div>
          }>
            <EnhancedHeroSection />
          </Suspense>
        </ScrollSnapSection>
        
        <ScrollSnapSection align="start">
          <Suspense fallback={
            <div className="min-h-screen bg-white/80 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <LoadingSkeleton key={i} variant="card" />
                  ))}
                </div>
              </div>
            </div>
          }>
            <SEOContentSection />
          </Suspense>
        </ScrollSnapSection>
      </ScrollSnapContainer>
    </>
  );
};

export default Home;
