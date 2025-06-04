
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UnifiedButton } from '@/components/ui/unified-button';
import { UnifiedCard } from '@/components/ui/unified-card';
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
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Le jeu de cartes convivial pour vos soirées entre amis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex"
            >
              <UnifiedCard variant="light" interactive padding="lg" className="w-full flex flex-col">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="h-12 w-12 rounded-full bg-dutch-blue/10 flex items-center justify-center mb-4">
                    <PlayCircle className="h-6 w-6 text-dutch-blue" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">Jouer</h2>
                  <p className="text-gray-600 mb-4 flex-grow">Commencez une nouvelle partie avec vos amis</p>
                  <UnifiedButton 
                    onClick={() => navigate('/game')} 
                    variant="primary"
                    size="lg"
                    className="w-full mt-auto"
                  >
                    Démarrer
                  </UnifiedButton>
                </div>
              </UnifiedCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex"
            >
              <UnifiedCard variant="light" interactive padding="lg" className="w-full flex flex-col">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="h-12 w-12 rounded-full bg-dutch-purple/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-dutch-purple" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">Règles du jeu</h2>
                  <p className="text-gray-600 mb-4 flex-grow">Apprenez à jouer avec les règles complètes</p>
                  <UnifiedButton 
                    onClick={() => navigate('/rules')} 
                    variant="secondary"
                    size="lg"
                    className="w-full mt-auto"
                  >
                    Consulter
                  </UnifiedButton>
                </div>
              </UnifiedCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex"
            >
              <UnifiedCard variant="light" interactive padding="lg" className="w-full flex flex-col">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="h-12 w-12 rounded-full bg-dutch-orange/10 flex items-center justify-center mb-4">
                    <ClipboardList className="h-6 w-6 text-dutch-orange" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">Historique</h2>
                  <p className="text-gray-600 mb-4 flex-grow">Consultez l'historique de vos parties</p>
                  <UnifiedButton 
                    onClick={() => navigate('/history')} 
                    variant="accent"
                    size="lg"
                    className="w-full mt-auto"
                  >
                    Voir
                  </UnifiedButton>
                </div>
              </UnifiedCard>
            </motion.div>
          </div>

          {/* Footer avec liens SEO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-gray-500 text-sm space-y-3"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button 
                onClick={() => navigate('/about')}
                className="hover:text-dutch-blue transition-colors"
              >
                À propos
              </button>
              <span>•</span>
              <button 
                onClick={() => navigate('/privacy')}
                className="hover:text-dutch-blue transition-colors"
              >
                Confidentialité
              </button>
              <span>•</span>
              <button 
                onClick={() => navigate('/terms')}
                className="hover:text-dutch-blue transition-colors"
              >
                Conditions
              </button>
            </div>
            <p>© {new Date().getFullYear()} Dutch Card Game</p>
          </motion.div>
        </div>
      </UnifiedBackground>
    </>
  );
};

export default Index;
