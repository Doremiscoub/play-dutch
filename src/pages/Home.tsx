
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { User, Play, BookOpen, Trophy, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameSettings from '@/components/GameSettings';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche'
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header with settings */}
      <header className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 rounded-full"
          aria-label="Profil utilisateur"
        >
          <User className="h-5 w-5" />
        </Button>
        <GameSettings />
      </header>

      {/* Enhanced Hero Section - titre 3D et particules */}
      <EnhancedHeroSection />

      <div className="relative z-10 px-4 pb-16">
        {/* Features Section */}
        <FeaturesSection />

        {/* Stats Section - statistiques sociales */}
        <StatsSection />

        {/* Final CTA Section */}
        <CTASection />

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 text-sm text-gray-600">
          <Button
            variant="ghost"
            onClick={() => navigate('/rules')}
            className="hover:text-dutch-blue"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Règles du jeu
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/history')}
            className="hover:text-dutch-blue"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Historique
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/settings')}
            className="hover:text-dutch-blue"
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
