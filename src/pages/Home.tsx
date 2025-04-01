
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, History, Settings, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useUser } from '@clerk/clerk-react';

/**
 * Page d'accueil avec navigation vers les différentes fonctionnalités
 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [clickCount, setClickCount] = useState(0);

  const handleStartGame = () => {
    navigate('/game');
  };

  const handleGoToHistory = () => {
    navigate('/history');
  };

  const handleGoToSettings = () => {
    navigate('/settings');
  };

  const handleGoToRules = () => {
    navigate('/rules');
  };

  const handleLogoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      
      if (newCount >= 7) {
        // Navigate to easter egg when clicked 7 times
        navigate('/easter-egg');
        return 0;
      }
      
      return newCount;
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="smooth" />
      </div>
      
      {/* Main Content */}
      <div className="w-full max-w-md px-4 py-8 flex flex-col items-center justify-center gap-6 z-10">
        {/* Logo and title */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="text-6xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent relative"
            onClick={handleLogoClick}
          >
            Dutch
            <motion.div 
              className="absolute -right-6 -top-6"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 10, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <span className="text-dutch-orange text-xl">★</span>
            </motion.div>
          </motion.div>
          <p className="text-gray-600 mt-2 text-lg">
            Votre compagnon de jeu
          </p>
        </motion.div>
        
        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button 
              onClick={handleStartGame}
              className="w-full py-6 rounded-full bg-white/80 text-dutch-blue hover:bg-white/90 backdrop-blur-sm border border-white/40 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg font-medium"
            >
              <Play className="h-5 w-5 text-dutch-blue" />
              Nouvelle partie
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              onClick={handleGoToHistory}
              className="w-full py-6 rounded-full bg-white/80 text-dutch-purple hover:bg-white/90 backdrop-blur-sm border border-white/40 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg font-medium"
            >
              <History className="h-5 w-5 text-dutch-purple" />
              Historique
            </Button>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                onClick={handleGoToRules}
                className="w-full py-6 rounded-full bg-white/80 text-dutch-orange hover:bg-white/90 backdrop-blur-sm border border-white/40 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base font-medium"
              >
                <BookOpen className="h-5 w-5 text-dutch-orange" />
                Règles
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                onClick={handleGoToSettings}
                className="w-full py-6 rounded-full bg-white/80 text-dutch-green hover:bg-white/90 backdrop-blur-sm border border-white/40 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base font-medium"
              >
                <Settings className="h-5 w-5 text-dutch-green" />
                Réglages
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-xs text-gray-500 mt-16 absolute bottom-6"
        >
          Version 1.0
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
