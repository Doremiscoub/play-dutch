
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { PlayCircle, History, Book, Settings, Info, UserPlus, LogIn } from 'lucide-react';

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Arrière-plan avec vagues en bas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30">
          <AnimatedBackground variant="smooth" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#EBE4FF" fillOpacity="0.4" d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#F2D9FF" fillOpacity="0.6" d="M0,288L48,266.7C96,245,192,203,288,160C384,117,480,75,576,74.7C672,75,768,117,864,133.3C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#FFE5D9" fillOpacity="0.3" d="M0,192L48,202.7C96,213,192,235,288,213.3C384,192,480,128,576,128C672,128,768,192,864,224C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo et titre */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
          onClick={handleLogoClick}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent relative inline-block">
            Dutch
            <motion.span 
              className="absolute -top-5 -right-6 text-dutch-orange text-3xl transform rotate-12"
              animate={{ rotate: [12, 20, 12], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              ★
            </motion.span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">Votre compagnon de jeu</p>
        </motion.div>
        
        {/* Boutons d'action */}
        <div className="flex flex-col items-center w-full max-w-md gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full"
          >
            <Button 
              onClick={() => navigate('/game')}
              className="w-full py-6 px-4 text-lg font-medium bg-white rounded-2xl shadow-md hover:shadow-lg transition-all relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-2xl" />
              <PlayCircle className="mr-2 h-6 w-6 text-dutch-blue" />
              <span className="text-dutch-blue">Nouvelle partie</span>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="w-full"
          >
            <Button 
              onClick={() => navigate('/history')}
              className="w-full py-6 px-4 text-lg font-medium bg-white rounded-2xl shadow-md hover:shadow-lg transition-all relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-dutch-purple/5 to-dutch-blue/5 rounded-2xl" />
              <History className="mr-2 h-6 w-6 text-dutch-purple" />
              <span className="text-dutch-purple">Historique</span>
            </Button>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-3 w-full mt-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <Button 
                onClick={() => navigate('/rules')}
                className="w-full py-5 px-4 text-base font-medium bg-white rounded-2xl shadow-md hover:shadow-lg transition-all relative flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dutch-orange/5 to-dutch-orange/10 rounded-2xl" />
                <Book className="mr-2 h-5 w-5 text-dutch-orange" />
                <span className="text-dutch-orange">Règles</span>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <Button 
                onClick={() => navigate('/settings')}
                className="w-full py-5 px-4 text-base font-medium bg-white rounded-2xl shadow-md hover:shadow-lg transition-all relative flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/5 to-dutch-purple/5 rounded-2xl" />
                <Settings className="mr-2 h-5 w-5 text-gray-500" />
                <span className="text-gray-500">Réglages</span>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Section connexion/inscription */}
        <SignedOut>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex flex-row gap-3"
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <span className="bg-white/70 backdrop-blur-sm text-xs text-gray-500 px-3 py-1 rounded-full">
            Version 1.0
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
