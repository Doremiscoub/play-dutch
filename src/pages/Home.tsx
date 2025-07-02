
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import EnhancedHeroSection from '@/components/home/EnhancedHeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';
import PageShell from '@/components/layout/PageShell';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes entre amis',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur Professeur Cartouche. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne, professeur cartouche'
  });

  return (
    <PageShell variant="default">
      {/* Header unifié avec style glassmorphique */}
      <UnifiedHeader 
        title="Dutch Card Game"
        showBackButton={false}
        showSettings={true}
      />

      {/* Enhanced Hero Section - titre 3D et particules */}
      <div className="pt-4">
        <EnhancedHeroSection />
      </div>

      <div className="relative z-10 px-4 pb-16">
        {/* Features Section */}
        <FeaturesSection />

        {/* Stats Section - statistiques sociales */}
        <StatsSection />

        {/* Final CTA Section */}
        <CTASection />

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 text-sm">
          <Button
            variant="ghost"
            onClick={() => navigate('/rules')}
            className="hover:text-dutch-primary glass-button"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Règles du jeu
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/history')}
            className="hover:text-dutch-primary glass-button"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Historique
          </Button>
        </div>
      </div>
    </PageShell>
  );
};

export default Home;
