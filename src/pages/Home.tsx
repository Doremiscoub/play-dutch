
import React, { Suspense } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GameSettings from '@/components/GameSettings';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { ScrollSnapContainer, ScrollSnapSection } from '@/components/ui/scroll-snap-container';
import { useSEO } from '@/hooks/useSEO';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      {/* Google Fonts - Updated to Space Grotesk for fun, rounded look */}
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
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <ScrollSnapContainer className="min-h-screen relative overflow-hidden">
        <AnimatedBackground />
        
        {/* Updated Header with Profile and Settings only */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <Button
            variant="glass"
            size="icon"
            className="bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 rounded-full"
            aria-label="Profil utilisateur"
          >
            <User className="h-5 w-5" />
          </Button>
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
