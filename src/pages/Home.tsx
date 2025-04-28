
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, History, BookOpen, Settings, LogIn, ExternalLink, Trophy } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { animationVariants } from '@/utils/animationUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { ModernTitle } from '@/components/ui/modern-title';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useAuth();
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);

  useEffect(() => {
    const userId = user?.id;
    const savedGame = localStorage.getItem(userId ? `current_dutch_game_${userId}` : 'current_dutch_game');
    setHasSavedGame(!!savedGame);
  }, [user]);

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      
      <div className="relative z-10 container mx-auto px-3 py-8 flex flex-col min-h-screen">
        <header className="mb-auto">
          <TooltipProvider>
            <nav className="flex justify-end space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="vision-glass"
                    size="icon-lg"
                    className="rounded-full"
                    onClick={() => navigate('/history')}
                  >
                    <History className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Historique</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="vision-glass"
                    size="icon-lg"
                    className="rounded-full"
                    onClick={() => navigate('/rules')}
                  >
                    <BookOpen className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Règles du jeu</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="vision-glass"
                    size="icon-lg"
                    className="rounded-full"
                    onClick={() => navigate('/settings')}
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Paramètres</TooltipContent>
              </Tooltip>
            </nav>
          </TooltipProvider>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ModernTitle withSparkles variant="h1" className="text-6xl mb-2" withIcon>Dutch</ModernTitle>
            <p className="text-gray-600">Votre compagnon de jeu</p>
          </motion.div>
          
          <div className="w-full max-w-xs space-y-4">
            {isLoaded && (
              <>
                {isSignedIn ? (
                  <>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full"
                    >
                      <Button 
                        className="w-full h-14 rounded-full shadow-md"
                        variant="gradient-animated"
                        onClick={() => navigate('/game/setup')}
                      >
                        <Plus className="mr-2 h-5 w-5" />
                        Nouvelle partie
                      </Button>
                    </motion.div>
                    
                    {hasSavedGame && (
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="w-full"
                      >
                        <Button 
                          className="w-full h-14 rounded-full shadow-md"
                          variant="gradient-orange"
                          onClick={() => navigate('/game')}
                        >
                          <Trophy className="mr-2 h-5 w-5" />
                          Reprendre la partie
                        </Button>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full"
                    >
                      <Button 
                        className="w-full h-14 rounded-full shadow-md"
                        variant="gradient-animated"
                        onClick={() => navigate('/sign-in')}
                      >
                        <LogIn className="mr-2 h-5 w-5" />
                        Connexion / Inscription
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full"
                    >
                      <Button 
                        className="w-full h-14 rounded-full shadow-md"
                        variant="vision-glass"
                        onClick={() => navigate('/game/setup')}
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Jouer sans compte
                        <Badge className="ml-2 bg-dutch-purple/20 text-dutch-purple border-none text-xs">Rapide</Badge>
                      </Button>
                    </motion.div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
        
        <footer className="mt-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Badge variant="outline" className="bg-white/50 text-gray-500 text-xs">
              Version 1.0.0
            </Badge>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
