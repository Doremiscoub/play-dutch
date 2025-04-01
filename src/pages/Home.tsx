
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/clerk-react';
import PageLayout from '@/components/PageLayout';
import { Database, ShieldCheck, Users, UserCircle, TrendingUp, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { COMMON_STYLES } from '@/config/uiConfig';
import Logo from '@/components/Logo';
import { useDeviceDetect } from '@/hooks/use-mobile';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const clerk = useClerk();
  const user = clerk.user;
  const isLoaded = clerk.loaded;
  const { isMobile } = useDeviceDetect();

  // Redirige directement vers la page de jeu pour "Jouer sans compte"
  const handlePlayOffline = () => {
    navigate('/game');
  };

  if (!isLoaded) {
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

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto pt-8 pb-20">
        <div className="text-center mb-12">
          <Logo size="xl" className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
            Dutch
            <span className="ml-2 text-lg">✨</span>
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Votre compagnon de jeu pour toutes vos parties de cartes Dutch
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonAnimationVariants}
          >
            <Button
              variant="default"
              size={isMobile ? "default" : "lg"}
              className="w-full py-6 rounded-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg"
              onClick={handlePlayOffline}
            >
              <Users className="mr-2 h-5 w-5" />
              Jouer sans compte
            </Button>
          </motion.div>

          {!user && (
            <>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
              >
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="w-full py-6 rounded-2xl bg-white text-dutch-purple border border-dutch-purple/20"
                  onClick={() => navigate('/sign-in')}
                >
                  <UserCircle className="mr-2 h-5 w-5" />
                  Se connecter
                </Button>
              </motion.div>

              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
              >
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="w-full py-6 rounded-2xl bg-white text-dutch-orange border border-dutch-orange/20"
                  onClick={() => navigate('/sign-up')}
                >
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Créer un compte
                </Button>
              </motion.div>
            </>
          )}

          {user && (
            <>
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
              >
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="w-full py-6 rounded-2xl bg-white text-dutch-purple border border-dutch-purple/20"
                  onClick={() => navigate('/multiplayer')}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Partie multijoueur
                </Button>
              </motion.div>

              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonAnimationVariants}
              >
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className="w-full py-6 rounded-2xl bg-white text-dutch-orange border border-dutch-orange/20"
                  onClick={() => navigate('/profile')}
                >
                  <UserCircle className="mr-2 h-5 w-5" />
                  Mon profil
                </Button>
              </motion.div>
            </>
          )}

          <div className="pt-4 grid grid-cols-2 gap-3">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimationVariants}
            >
              <Button
                variant="outline"
                className="w-full rounded-xl bg-white/70 text-gray-700 border border-gray-200"
                onClick={() => navigate('/history')}
              >
                <Database className="mr-2 h-4 w-4" />
                Historique
              </Button>
            </motion.div>

            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimationVariants}
            >
              <Button
                variant="outline"
                className="w-full rounded-xl bg-white/70 text-gray-700 border border-gray-200"
                onClick={() => navigate('/stats')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Statistiques
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-500 text-xs">
          <p>Version 1.0.0</p>
          <p className="mt-1">
            <a
              href="https://github.com/yourusername/dutch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-dutch-blue transition-colors"
            >
              <Coffee className="h-3 w-3 mr-1" />
              Supporter le projet
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
