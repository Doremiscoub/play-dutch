
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Trophy, History, Book, Settings, PlayCircle, Info, UserPlus, LogIn } from 'lucide-react';

const Home = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const [hasPlayedBefore, setHasPlayedBefore] = useLocalStorage('dutch_has_played', false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  
  // Vérifier si l'utilisateur a déjà joué
  useEffect(() => {
    const savedGames = localStorage.getItem('dutch_games');
    if (savedGames && JSON.parse(savedGames).length > 0) {
      setHasPlayedBefore(true);
    }
  }, [setHasPlayedBefore]);

  // Easter egg
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    if (newCount >= 7) {
      setShowEasterEgg(true);
      setLogoClickCount(0);
    }
  };

  // Pour les animations des boutons
  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10
      } 
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="relative min-h-screen">
      {/* Arrière-plan animé */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground variant="smooth" />
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Logo et titre */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
          onClick={handleLogoClick}
        >
          <motion.img 
            src="/logo.png" 
            alt="Dutch Logo" 
            className="w-28 h-28 mx-auto mb-4"
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
          />
          <h1 className="text-4xl font-extrabold text-dutch-blue mb-1">Dutch</h1>
          <p className="text-lg text-gray-600">Votre compagnon de jeu</p>
        </motion.div>
        
        {/* Boutons d'action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          <motion.div
            custom={0}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              variant="dutch-blue" 
              size="xl"
              className="w-full py-7 rounded-2xl shadow-md text-lg flex items-center justify-center gap-3"
              onClick={() => navigate('/game')}
            >
              <PlayCircle className="h-6 w-6" />
              Jouer
            </Button>
          </motion.div>
          
          <motion.div
            custom={1}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              variant="dutch-glass" 
              size="xl"
              className="w-full py-7 rounded-2xl shadow-md text-lg flex items-center justify-center gap-3"
              onClick={() => navigate('/history')}
            >
              <History className="h-6 w-6" />
              Historique
            </Button>
          </motion.div>
          
          <motion.div
            custom={2}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              variant="dutch-glass" 
              size="xl"
              className="w-full py-7 rounded-2xl shadow-md text-lg flex items-center justify-center gap-3"
              onClick={() => navigate('/rules')}
            >
              <Book className="h-6 w-6" />
              Règles
            </Button>
          </motion.div>
          
          <motion.div
            custom={3}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              variant="dutch-glass" 
              size="xl"
              className="w-full py-7 rounded-2xl shadow-md text-lg flex items-center justify-center gap-3"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-6 w-6" />
              Paramètres
            </Button>
          </motion.div>
        </div>
        
        {/* Section connexion/inscription */}
        <SignedOut>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Button 
              variant="ghost" 
              className="bg-white/60 hover:bg-white/80 backdrop-blur-sm shadow-sm"
              onClick={() => navigate('/sign-in')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Se connecter
            </Button>
            <Button 
              variant="ghost" 
              className="bg-white/60 hover:bg-white/80 backdrop-blur-sm shadow-sm"
              onClick={() => navigate('/sign-up')}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              S'inscrire
            </Button>
          </motion.div>
        </SignedOut>
        
        {/* Badge de version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <span className="bg-white/70 backdrop-blur-sm text-xs text-gray-500 px-3 py-1 rounded-full">
            Version 1.2
          </span>
        </motion.div>
        
        {/* Easter egg */}
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-4 text-center max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-dutch-blue mb-3">Easter Egg trouvé !</h2>
              <p className="mb-4">Vous avez découvert un mini-jeu caché. Essayez-le !</p>
              <Button 
                variant="dutch-blue" 
                onClick={() => {
                  setShowEasterEgg(false);
                  navigate('/easter-egg');
                }}
                size="lg"
                className="w-full"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Jouer au mini-jeu
              </Button>
              <button
                className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setShowEasterEgg(false)}
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
