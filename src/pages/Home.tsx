
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, History, BookOpen, Settings, LogIn, ExternalLink, Trophy } from 'lucide-react';
import ThemeSelector from '@/components/ThemeSelector';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useUser } from '@clerk/clerk-react';
import { animationVariants } from '@/utils/animationUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);

  useEffect(() => {
    // Vérifier s'il existe une partie sauvegardée
    const savedGame = localStorage.getItem('current_dutch_game');
    setHasSavedGame(!!savedGame);
  }, []);

  // Variants pour les animations Framer Motion
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

  // Sparkle SVG component
  const SparkleIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="ml-1 inline-block translate-y-[-2px]"
    >
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        fill="#F97316" 
        stroke="#F97316" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  // Afficher un loader pendant que Clerk charge
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 text-dutch-blue animate-spin mb-4 border-4 border-dutch-blue/30 border-t-dutch-blue rounded-full" />
          <div className="text-dutch-blue text-lg">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0">
        <AnimatedBackground variant="default" />
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col min-h-screen">
        <header className="mb-auto">
          <div className="flex justify-end">
            <ThemeSelector />
          </div>
        </header>
        
        <main className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Logo et titre */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
              Dutch <SparkleIcon />
            </h1>
            <p className="text-gray-600">Votre compagnon de jeu</p>
          </motion.div>
          
          {/* Boutons principaux */}
          <div className="w-full max-w-xs space-y-4">
            {isLoaded && (
              <>
                {/* Utilisateur connecté */}
                {isSignedIn ? (
                  <>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full"
                    >
                      <Button 
                        className="w-full bg-white text-dutch-blue hover:bg-white/90 border border-dutch-blue/20 h-14 rounded-full shadow-md"
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
                          className="w-full bg-white text-dutch-purple hover:bg-white/90 border border-dutch-purple/20 h-14 rounded-full shadow-md"
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
                    {/* Utilisateur non connecté */}
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="w-full"
                    >
                      <Button 
                        className="w-full h-14 rounded-full shadow-md relative overflow-hidden"
                        onClick={() => navigate('/sign-in')}
                        style={{
                          background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
                          color: "white",
                          border: "none"
                        }}
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
                        className="w-full bg-white text-dutch-purple hover:bg-white/90 border border-dutch-purple/20 h-14 rounded-full shadow-md"
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
            
            {/* Boutons secondaires */}
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
                        variant="outline" 
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm"
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
                        variant="outline" 
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm"
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
                        variant="outline" 
                        size="icon"
                        className="rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm"
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
