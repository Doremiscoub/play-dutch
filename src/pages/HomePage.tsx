
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameHero, GameText } from '@/components/ui/game-typography';
import { GameButton } from '@/components/ui/game-button';
import { GameCard } from '@/components/ui/game-card';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import { HowToPlaySection } from '@/components/home/HowToPlaySection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CTASection } from '@/components/home/CTASection';
import { Users, Play, Trophy, Settings } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Le compteur de score ultime',
    description: 'Comptez vos points facilement avec Dutch Card Game ! Interface moderne, IA commentateur, et 100% gratuit. Parfait pour vos parties entre amis.',
    keywords: 'dutch, card game, jeu de cartes, compteur score, gratuit, amis, partie',
    type: 'website',
    url: 'https://dutch-card-game.lovable.app',
  });

  const handleNewGame = () => {
    // Clear any previous game data
    localStorage.removeItem('current_dutch_game');
    localStorage.removeItem('dutch_player_setup');
    navigate('/game/setup');
  };

  const handleContinueGame = () => {
    navigate('/game');
  };

  const hasActiveGame = localStorage.getItem('current_dutch_game') || localStorage.getItem('dutch_player_setup');

  return (
    <UnifiedPageLayout
      backgroundVariant="default"
      withAnimation={true}
      className="min-h-screen"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <motion.section 
          className="text-center py-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GameCard variant="glass" className="p-8 mb-8">
            <GameHero 
              color="gameGradient" 
              effect="shadow"
              className="mb-6 animate-game-bounce"
            >
              DUTCH CARD GAME
            </GameHero>
            
            <GameText 
              variant="adventure" 
              color="primary"
              className="mb-8"
            >
              Le compteur de score ultime pour vos parties entre amis !
            </GameText>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {hasActiveGame ? (
                <>
                  <GameButton
                    variant="uno"
                    size="xl"
                    onClick={handleContinueGame}
                    className="min-w-48"
                  >
                    <Play className="mr-2 h-6 w-6" />
                    Reprendre la partie
                  </GameButton>
                  <GameButton
                    variant="pokemon"
                    size="xl"
                    onClick={handleNewGame}
                    className="min-w-48"
                  >
                    <Users className="mr-2 h-6 w-6" />
                    Nouvelle partie
                  </GameButton>
                </>
              ) : (
                <GameButton
                  variant="uno"
                  size="xl"
                  onClick={handleNewGame}
                  className="min-w-48"
                >
                  <Users className="mr-2 h-6 w-6" />
                  Commencer à jouer
                </GameButton>
              )}
            </motion.div>

            {/* Feature badges */}
            <motion.div 
              className="flex justify-center gap-3 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GameCard variant="score" className="px-4 py-2">
                <GameText variant="caption" color="accent">
                  ✅ 100% Gratuit
                </GameText>
              </GameCard>
              <GameCard variant="score" className="px-4 py-2">
                <GameText variant="caption" color="primary">
                  📱 Fonctionne hors-ligne
                </GameText>
              </GameCard>
              <GameCard variant="score" className="px-4 py-2">
                <GameText variant="caption" color="secondary">
                  🤖 IA Commentateur
                </GameText>
              </GameCard>
            </motion.div>
          </GameCard>

          {/* Quick Action Cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <GameCard 
              variant="playingCard" 
              interactive={true}
              onClick={() => navigate('/history')}
              className="p-6 text-center"
            >
              <Trophy className="h-12 w-12 mx-auto mb-4 text-dutch-orange" />
              <GameText variant="cardTitle" className="mb-2">
                Historique
              </GameText>
              <GameText variant="body" color="default">
                Consultez vos parties précédentes et statistiques
              </GameText>
            </GameCard>

            <GameCard 
              variant="playingCard" 
              interactive={true}
              onClick={() => navigate('/rules')}
              className="p-6 text-center"
            >
              <div className="h-12 w-12 mx-auto mb-4 bg-dutch-blue rounded-full flex items-center justify-center">
                <GameText variant="scoreDisplay" color="white" className="text-2xl">
                  ?
                </GameText>
              </div>
              <GameText variant="cardTitle" className="mb-2">
                Règles
              </GameText>
              <GameText variant="body" color="default">
                Apprenez les règles du Dutch en quelques minutes
              </GameText>
            </GameCard>

            <GameCard 
              variant="playingCard" 
              interactive={true}
              onClick={() => navigate('/settings')}
              className="p-6 text-center"
            >
              <Settings className="h-12 w-12 mx-auto mb-4 text-dutch-purple" />
              <GameText variant="cardTitle" className="mb-2">
                Paramètres
              </GameText>
              <GameText variant="body" color="default">
                Personnalisez votre expérience de jeu
              </GameText>
            </GameCard>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <FeaturesSection />

        {/* How to Play Section */}
        <HowToPlaySection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </UnifiedPageLayout>
  );
};

export default HomePage;
