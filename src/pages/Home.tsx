
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogIn, ExternalLink, History, BookOpen, Settings, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import CTAButton from '@/components/ui/CTAButton';
import { useAuth } from '@/context/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [hasCurrentGame, setHasCurrentGame] = useState<boolean>(false);

  useEffect(() => {
    const savedGame = localStorage.getItem('current_dutch_game');
    setHasCurrentGame(!!savedGame);
  }, []);

  const handlePlayOffline = () => {
    localStorage.setItem('dutch_play_offline', 'true');
    navigate('/game/setup');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <AnimatedBackground variant="default" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Logo et titre */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
              Dutch
            </h1>
            <p className="text-gray-600">Votre compagnon de jeu</p>
          </motion.div>

          {/* Boutons CTA */}
          <div className="w-full max-w-xs space-y-4">
            {!isSignedIn ? (
              <>
                <CTAButton
                  icon={<LogIn className="w-6 h-6" />}
                  onClick={() => navigate('/sign-in')}
                >
                  Connexion / Inscription
                </CTAButton>

                <CTAButton
                  variant="outline"
                  icon={<ExternalLink className="w-5 h-5" />}
                  onClick={handlePlayOffline}
                >
                  Jouer sans compte
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-badge-purple/30">
                    Rapide
                  </span>
                </CTAButton>
              </>
            ) : (
              <>
                <CTAButton
                  icon={<Plus className="w-6 h-6" />}
                  onClick={() => navigate('/game/setup')}
                >
                  Nouvelle partie
                </CTAButton>

                {hasCurrentGame && (
                  <CTAButton
                    variant="outline"
                    icon={<RotateCcw className="w-5 h-5" />}
                    onClick={() => navigate('/game')}
                  >
                    Reprendre la dernière partie
                  </CTAButton>
                )}
              </>
            )}

            {/* Mode multijoueur (caché) */}
            <button className="mt-10 text-xs text-muted-foreground hidden" disabled>
              Mode multijoueur (à venir)
            </button>
          </div>

          {/* Navigation rapide */}
          <div className="mt-12 flex justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80"
              onClick={() => navigate('/history')}
            >
              <History className="h-5 w-5 text-dutch-orange" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80"
              onClick={() => navigate('/rules')}
            >
              <BookOpen className="h-5 w-5 text-dutch-purple" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5 text-dutch-blue" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
