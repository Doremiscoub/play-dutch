
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/clerk-react';
import PageLayout from '@/components/PageLayout';
import { Clock, BookOpen, Settings, LogIn, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { useDeviceDetect } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, loaded } = useClerk();
  const { isMobile } = useDeviceDetect();

  // Redirige directement vers la page de jeu pour "Jouer sans compte"
  const handlePlayOffline = () => {
    navigate('/game');
  };

  // Redirige vers la reprise de partie
  const handleResumeLast = () => {
    // Vérifier s'il existe une partie en cours
    const currentGame = localStorage.getItem('current_dutch_game');
    
    if (currentGame) {
      navigate('/game');
    } else {
      // S'il n'y a pas de partie en cours, rediriger vers une nouvelle partie
      navigate('/game');
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Logo size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const buttonAnimationVariants = {
    hover: { y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" },
    tap: { y: 0, boxShadow: "0 5px 15px -5px rgba(0,0,0,0.1)" }
  };

  // Navigation vers les différentes sections
  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <PageLayout>
      <div className="max-w-md mx-auto pt-12 pb-20 px-4">
        <div className="text-center mb-16">
          <Logo size="xl" className="mx-auto mb-4" />
        </div>

        <div className="space-y-4">
          {!user ? (
            // Interface utilisateur déconnecté
            <>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full py-6 rounded-full bg-white text-dutch-blue border border-dutch-blue/20 shadow-md"
                  onClick={() => navigate('/sign-in')}
                >
                  <LogIn className="mr-3 h-5 w-5" />
                  Connexion / Inscription
                </Button>
              </motion.div>

              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
                className="relative"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full py-6 rounded-full bg-white text-dutch-purple border border-dutch-purple/20 shadow-md"
                  onClick={handlePlayOffline}
                >
                  <ExternalLink className="mr-3 h-5 w-5" />
                  Jouer sans compte
                  <Badge className="ml-3 bg-dutch-purple/10 text-dutch-purple border-dutch-purple/20 rounded-full px-3">
                    Rapide
                  </Badge>
                </Button>
              </motion.div>
            </>
          ) : (
            // Interface utilisateur connecté
            <>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="w-full py-6 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-md"
                  onClick={handlePlayOffline}
                >
                  <ExternalLink className="mr-3 h-5 w-5" />
                  Nouvelle partie
                </Button>
              </motion.div>

              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full py-6 rounded-full bg-white text-dutch-purple border border-dutch-purple/20 shadow-md"
                  onClick={handleResumeLast}
                >
                  <Clock className="mr-3 h-5 w-5" />
                  Reprendre une partie
                </Button>
              </motion.div>
            </>
          )}

          {/* Icônes de navigation commune aux deux interfaces */}
          <div className="pt-10 flex justify-center gap-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-full bg-white shadow-sm border border-gray-100 text-dutch-orange hover:text-dutch-orange/80 hover:bg-white"
                onClick={() => navigateTo('/history')}
              >
                <Clock className="h-6 w-6" />
              </Button>
              <p className="mt-2 text-xs text-gray-500">Historique</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-full bg-white shadow-sm border border-gray-100 text-dutch-purple hover:text-dutch-purple/80 hover:bg-white"
                onClick={() => navigateTo('/rules')}
              >
                <BookOpen className="h-6 w-6" />
              </Button>
              <p className="mt-2 text-xs text-gray-500">Règles</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-center"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 rounded-full bg-white shadow-sm border border-gray-100 text-dutch-blue hover:text-dutch-blue/80 hover:bg-white"
                onClick={() => navigateTo('/settings')}
              >
                <Settings className="h-6 w-6" />
              </Button>
              <p className="mt-2 text-xs text-gray-500">Réglages</p>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-400 text-xs">
          <p>Version 1.0.0</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
