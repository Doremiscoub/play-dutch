
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UnifiedButton } from '@/components/ui/unified-button';
import { GameCard } from '@/components/ui/game-card';
import { GameText } from '@/components/ui/game-text';
import { UnifiedBackground } from '@/components/ui/unified-background';
import { PlayCircle, ClipboardList, BookOpen } from 'lucide-react';
import { ModernTitle } from '@/components/ui/modern-title';
import { useSEO } from '@/hooks/useSEO';
import { StructuredData } from '@/components/seo/StructuredData';

const Index = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne'
  });

  const gameFeatures = [
    {
      icon: PlayCircle,
      title: "Jouer",
      description: "Commencez une nouvelle partie avec vos amis",
      color: "game-blue",
      action: () => navigate('/game'),
      buttonText: "Démarrer",
      buttonVariant: "primary" as const,
      delay: 0.1
    },
    {
      icon: BookOpen,
      title: "Règles du jeu", 
      description: "Apprenez à jouer avec les règles complètes",
      color: "game-purple",
      action: () => navigate('/rules'),
      buttonText: "Consulter",
      buttonVariant: "secondary" as const,
      delay: 0.2
    },
    {
      icon: ClipboardList,
      title: "Historique",
      description: "Consultez l'historique de vos parties",
      color: "game-orange", 
      action: () => navigate('/history'),
      buttonText: "Voir",
      buttonVariant: "accent" as const,
      delay: 0.3
    }
  ];

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
      
      <UnifiedBackground>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <ModernTitle withSparkles className="mb-4">
              Dutch Card Game
            </ModernTitle>
            <GameText 
              variant="body"
              color="muted"
              align="center"
              className="max-w-md mx-auto text-lg"
            >
              Le jeu de cartes convivial pour vos soirées entre amis
            </GameText>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-10">
            {gameFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <GameCard
                  key={index}
                  variant="glass"
                  interactive
                  padding="lg"
                  withAnimation
                  animationDelay={feature.delay}
                  className="flex flex-col h-full"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={`h-12 w-12 rounded-full bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                      <IconComponent className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    
                    <GameText
                      as="h2"
                      variant="h4"
                      className="mb-2"
                    >
                      {feature.title}
                    </GameText>
                    
                    <GameText
                      variant="body"
                      color="muted"
                      className="mb-4 flex-grow"
                    >
                      {feature.description}
                    </GameText>
                    
                    <UnifiedButton 
                      onClick={feature.action}
                      variant={feature.buttonVariant}
                      size="lg"
                      className="w-full mt-auto"
                    >
                      {feature.buttonText}
                    </UnifiedButton>
                  </div>
                </GameCard>
              );
            })}
          </div>

          {/* Footer avec liens SEO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center space-y-3"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button 
                onClick={() => navigate('/about')}
                className="text-gray-500 hover:text-game-blue transition-colors"
              >
                À propos
              </button>
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => navigate('/privacy')}
                className="text-gray-500 hover:text-game-blue transition-colors"
              >
                Confidentialité
              </button>
              <span className="text-gray-400">•</span>
              <button 
                onClick={() => navigate('/terms')}
                className="text-gray-500 hover:text-game-blue transition-colors"
              >
                Conditions
              </button>
            </div>
            <GameText variant="small" color="light">
              © {new Date().getFullYear()} Dutch Card Game
            </GameText>
          </motion.div>
        </div>
      </UnifiedBackground>
    </>
  );
};

export default Index;
