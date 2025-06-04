
import React, { Suspense } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import GameSettings from '@/components/GameSettings';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { ScrollSnapContainer, ScrollSnapSection } from '@/components/ui/scroll-snap-container';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import { PerformanceMonitor } from '@/components/ui/performance-monitor';
import { AccessibilityEnhancer } from '@/components/ui/accessibility-enhancer';
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
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche',
    gameInfo: {
      players: '2-10 joueurs',
      duration: '30-60 minutes',
      difficulty: 'Facile'
    },
    faqItems: [
      {
        question: 'Combien de joueurs peuvent jouer au Dutch ?',
        answer: 'Le Dutch Card Game supporte de 2 à 10 joueurs simultanément.'
      },
      {
        question: 'L\'application fonctionne-t-elle hors ligne ?',
        answer: 'Oui, l\'application fonctionne entièrement hors ligne une fois chargée.'
      },
      {
        question: 'Comment fonctionne le système de score ?',
        answer: 'L\'application calcule automatiquement les scores et détermine le "Dutch" (perdant) de chaque manche.'
      }
    ],
    breadcrumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'Dutch Card Game', url: '/' }
    ]
  });

  return (
    <AccessibilityEnhancer
      enableSkipLinks={true}
      enableFocusManagement={true}
      enableKeyboardNavigation={true}
    >
      <MobileOptimizer
        enableTouchOptimization={true}
        enableReducedMotion={true}
      >
        <PerformanceMonitor
          logPerformance={process.env.NODE_ENV === 'development'}
        />
        
        {/* Preload critical fonts for better performance */}
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
          
          {/* Enhanced Header with better accessibility */}
          <header className="absolute top-4 right-4 z-50 flex gap-2">
            <Button
              variant="glass"
              size="icon"
              className="bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 rounded-full"
              aria-label="Profil utilisateur"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Ouvrir le profil utilisateur</span>
            </Button>
            <GameSettings />
          </header>
          
          <ScrollSnapSection align="center">
            <main id="main-content" role="main">
              <Suspense fallback={
                <div className="h-screen flex items-center justify-center">
                  <LoadingSkeleton variant="hero" />
                  <span className="sr-only">Chargement de la section héros</span>
                </div>
              }>
                <EnhancedHeroSection />
              </Suspense>
            </main>
          </ScrollSnapSection>
          
          <ScrollSnapSection align="start">
            <section aria-label="Contenu principal et fonctionnalités">
              <Suspense fallback={
                <div className="min-h-screen bg-white/80 backdrop-blur-sm">
                  <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <LoadingSkeleton key={i} variant="card" />
                      ))}
                    </div>
                    <span className="sr-only">Chargement du contenu principal</span>
                  </div>
                </div>
              }>
                <SEOContentSection />
              </Suspense>
            </section>
          </ScrollSnapSection>
        </ScrollSnapContainer>
      </MobileOptimizer>
    </AccessibilityEnhancer>
  );
};

export default Home;
