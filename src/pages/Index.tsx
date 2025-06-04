
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UnifiedButton } from '@/components/ui/unified-button';
import { GameCard } from '@/components/ui/game-card';
import { GameText, GameHero, GameTitle, GameBadge } from '@/components/ui/game-text';
import { UnifiedBackground } from '@/components/ui/unified-background';
import { PlayCircle, ClipboardList, BookOpen, Zap, Trophy, Sparkles } from 'lucide-react';
import { ModernTitle } from '@/components/ui/modern-title';
import { useSEO } from '@/hooks/useSEO';
import { StructuredData } from '@/components/seo/StructuredData';

type GameFeatureColor = "fire" | "water" | "electric" | "grass" | "psychic" | "ice";

interface GameFeature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: GameFeatureColor;
  bgColor: string;
  borderColor: string;
  action: () => void;
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "accent";
  delay: number;
  badge: string;
}

const Index = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Dutch Card Game - Application gratuite pour jeu de cartes',
    description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Interface moderne, hors-ligne, avec IA commentateur. Parfait pour vos soirées entre amis.',
    keywords: 'dutch, jeu de cartes, application gratuite, score, soirée amis, cartes, jeu société, hors ligne'
  });

  const gameFeatures: GameFeature[] = [
    {
      icon: PlayCircle,
      title: "Jouer",
      description: "Commencez une partie épique avec vos amis",
      color: "fire",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-200",
      action: () => navigate('/game'),
      buttonText: "C'est parti !",
      buttonVariant: "primary",
      delay: 0.1,
      badge: "ACTION"
    },
    {
      icon: BookOpen,
      title: "Règles", 
      description: "Maîtrisez les techniques de champion",
      color: "water",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200",
      action: () => navigate('/rules'),
      buttonText: "Apprendre",
      buttonVariant: "secondary",
      delay: 0.2,
      badge: "GUIDE"
    },
    {
      icon: ClipboardList,
      title: "Historique",
      description: "Revivez vos victoires légendaires",
      color: "electric",
      bgColor: "bg-yellow-500/10", 
      borderColor: "border-yellow-200",
      action: () => navigate('/history'),
      buttonText: "Explorer",
      buttonVariant: "accent",
      delay: 0.3,
      badge: "STATS"
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
          {/* En-tête héroïque style Pokémon */}
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
                className="mb-4 relative z-10"
              >
                Dutch
              </GameHero>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer -z-10"></div>
            </div>
            
            <GameTitle 
              color="magic"
              align="center"
              spacing="wide"
              className="mb-6 animate-pulse-soft"
            >
              Card Battle Arena
            </GameTitle>
            
            <GameText 
              variant="large"
              color="muted"
              align="center"
              className="max-w-md mx-auto"
            >
              Affrontez vos amis dans des duels de cartes épiques ! 
              <Sparkles className="inline-block ml-2 text-yellow-500" size={16} />
            </GameText>
          </motion.div>

          {/* Cartes de fonctionnalités style Uno */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-10">
            {gameFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: feature.delay,
                    type: "spring",
                    stiffness: 120
                  }}
                  whileHover={{ 
                    y: -8, 
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="perspective-1000"
                >
                  <GameCard
                    variant="glass"
                    interactive
                    padding="lg"
                    className={`
                      flex flex-col h-full relative overflow-hidden
                      ${feature.bgColor} ${feature.borderColor}
                      hover:shadow-2xl hover:shadow-${feature.color}/20
                      transform-gpu
                    `}
                  >
                    {/* Badge en haut à droite */}
                    <div className="absolute top-4 right-4">
                      <GameBadge 
                        color={feature.color}
                        className="px-2 py-1 bg-white/80 rounded-full"
                      >
                        {feature.badge}
                      </GameBadge>
                    </div>
                    
                    <div className="flex flex-col items-center text-center h-full relative z-10">
                      {/* Icône avec effet électrique */}
                      <motion.div 
                        className={`
                          h-16 w-16 rounded-full ${feature.bgColor} 
                          flex items-center justify-center mb-6
                          border-2 ${feature.borderColor}
                          shadow-lg
                        `}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <IconComponent 
                          className={`h-8 w-8 text-${feature.color}`} 
                        />
                        {feature.color === 'electric' && (
                          <Zap className="absolute h-4 w-4 text-yellow-300 animate-pulse" />
                        )}
                      </motion.div>
                      
                      <GameText
                        as="h2"
                        variant="power"
                        color={feature.color}
                        transform="uppercase"
                        spacing="wider"
                        className="mb-3"
                      >
                        {feature.title}
                      </GameText>
                      
                      <GameText
                        variant="body"
                        color="muted"
                        align="center"
                        className="mb-6 flex-grow"
                      >
                        {feature.description}
                      </GameText>
                      
                      <UnifiedButton 
                        onClick={feature.action}
                        variant={feature.buttonVariant}
                        size="lg"
                        className="w-full mt-auto font-bold tracking-wide transform hover:scale-105 transition-all"
                      >
                        {feature.buttonText}
                        {feature.title === "Jouer" && <Trophy className="ml-2 h-4 w-4" />}
                      </UnifiedButton>
                    </div>
                    
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
                  </GameCard>
                </motion.div>
              );
            })}
          </div>

          {/* Footer avec style de badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center space-y-4"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button 
                onClick={() => navigate('/about')}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-semantic-on-surface-muted hover:text-semantic-primary hover:bg-white/20 transition-all font-medium tracking-wide"
              >
                À propos
              </button>
              <button 
                onClick={() => navigate('/privacy')}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-semantic-on-surface-muted hover:text-semantic-primary hover:bg-white/20 transition-all font-medium tracking-wide"
              >
                Confidentialité
              </button>
              <button 
                onClick={() => navigate('/terms')}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-semantic-on-surface-muted hover:text-semantic-primary hover:bg-white/20 transition-all font-medium tracking-wide"
              >
                Conditions
              </button>
            </div>
            
            <GameText 
              variant="caption" 
              color="light"
              align="center"
              className="font-medium"
            >
              © {new Date().getFullYear()} Dutch Card Game - Prêt pour l'aventure !
            </GameText>
          </motion.div>
        </div>
      </UnifiedBackground>
    </>
  );
};

export default Index;
