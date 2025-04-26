
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
    const savedGame = localStorage.getItem('current_dutch_game');
    setHasSavedGame(!!savedGame);
  }, []);

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
      
      <div className="relative z-10 container mx-auto px-3 py-16 flex flex-col min-h-screen">
        <header className="mb-auto">
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-12">
            <ModernTitle withSparkles variant="h1" className="mb-2">Dutch</ModernTitle>
            <p className="text-gray-600">Votre compagnon de jeu</p>
          </div>
          
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
                        variant="y2k-blue"
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
                          variant="y2k-purple"
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
                        className="w-full h-14 rounded-full shadow-md relative overflow-hidden"
                        variant="y2k-blue"
                        onClick={() => navigate('/sign-in')}
                      >
                        <span className="relative z-10 flex items-center">
                          <LogIn className="mr-2 h-5 w-5" />
                          Connexion / Inscription
                        </span>
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
                        variant="y2k-purple"
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
            
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={animationVariants.mainButton}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button 
                        variant="y2k-glass" 
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate('/history')}
                      >
                        <History className="h-5 w-5 text-dutch-orange" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Historique des parties</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={animationVariants.mainButton}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button 
                        variant="y2k-glass" 
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate('/rules')}
                      >
                        <BookOpen className="h-5 w-5 text-dutch-purple" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Règles du jeu</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      variants={animationVariants.mainButton}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button 
                        variant="y2k-glass" 
                        size="icon"
                        className="rounded-full"
                        onClick={() => navigate('/settings')}
                      >
                        <Settings className="h-5 w-5 text-dutch-blue" />
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Paramètres</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
