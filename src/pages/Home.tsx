
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Play, Clock, Info, Settings, UserPlus, LogIn, RefreshCw } from 'lucide-react';

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [hasPlayedBefore, setHasPlayedBefore] = useLocalStorage('dutch_has_played', false);
  const [hasGameInProgress, setHasGameInProgress] = useState(false);
  
  // Vérifier si l'utilisateur a déjà joué et s'il a une partie en cours
  useEffect(() => {
    const savedGames = localStorage.getItem('dutch_games');
    if (savedGames && JSON.parse(savedGames).length > 0) {
      setHasPlayedBefore(true);
    }
    
    // Vérifier s'il y a une partie en cours
    const currentGame = localStorage.getItem('current_dutch_game');
    if (currentGame) {
      setHasGameInProgress(true);
    }
  }, [setHasPlayedBefore]);

  // Démarrer une nouvelle partie
  const handleNewGame = () => {
    localStorage.removeItem('current_dutch_game'); // S'assurer qu'on commence une nouvelle partie
    navigate('/game');
  };

  // Reprendre la partie en cours
  const handleResumeGame = () => {
    navigate('/game');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8F9FA] to-[#FFFFFF]">
      {/* Quadrillage léger */}
      <div className="absolute inset-0">
        <div 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 24 0 M 0 0 L 0 24' stroke='%23DADADA' stroke-opacity='0.1' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
            backgroundSize: '24px 24px'
          }}
          className="absolute inset-0 opacity-10 z-0"
        />
      </div>
      
      {/* Points colorés animés */}
      <motion.div 
        className="absolute top-[10%] left-[10%] w-2 h-2 rounded-full bg-[#A78BFA]"
        animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute top-[30%] right-[15%] w-4 h-4 rounded-full bg-[#FDBA74]"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-[40%] left-[20%] w-3 h-3 rounded-full bg-[#6EE7B7]"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      <motion.div 
        className="absolute top-[15%] right-[25%] w-2 h-2 rounded-full bg-[#60A5FA]"
        animate={{ y: [0, -12, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 0.7 }}
      />
      <motion.div 
        className="absolute bottom-[30%] right-[10%] w-3 h-3 rounded-full bg-[#FDBA74]"
        animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", delay: 1.2 }}
      />
      
      {/* Vagues animées en bas - plus grandes et plus visibles */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-56 pointer-events-none">
        <motion.div
          animate={{ 
            x: [-20, 0, -20],
            y: [0, 5, 0]
          }}
          transition={{
            x: { duration: 20, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 10, repeat: Infinity, repeatType: "reverse" }
          }}
          className="w-[120%] h-48 bg-[#FDE68A] absolute bottom-[-10px] left-[-10%]"
          style={{
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            opacity: 0.6
          }}
        />
        <motion.div
          animate={{ 
            x: [20, 0, 20],
            y: [0, -5, 0]
          }}
          transition={{
            x: { duration: 15, repeat: Infinity, repeatType: "reverse" },
            y: { duration: 8, repeat: Infinity, repeatType: "reverse" }
          }}
          className="w-[120%] h-40 bg-[#E9D5FF] absolute bottom-0 left-[-10%]"
          style={{
            borderRadius: "60% 70% 0 0 / 100% 100% 0 0",
            opacity: 0.6
          }}
        />
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 pt-16">
        {/* Logo et titre */}
        <div className="text-center mb-14">
          <h1 className="text-[64px] font-bold relative inline-flex items-center">
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
              Dutch
            </span>
            <span className="text-[36px] ml-3 absolute -top-2 -right-11">✨</span>
          </h1>
          <p className="mt-2 text-[18px] text-[#4B5563]">Votre compagnon de jeu</p>
        </div>
        
        {/* Boutons d'action */}
        <div className="flex flex-col items-center w-full max-w-md gap-5">
          {hasGameInProgress && (
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button 
                onClick={handleResumeGame}
                className="w-full h-[70px] rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#4F46E5] shadow-lg shadow-blue-500/30 text-white font-semibold text-xl flex items-center justify-center"
              >
                <RefreshCw className="w-6 h-6 mr-3 text-white" />
                Reprendre la partie
              </Button>
            </motion.div>
          )}
          
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button 
              onClick={handleNewGame}
              className="w-full h-[70px] rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] shadow-lg shadow-purple-500/30 text-white font-semibold text-xl flex items-center justify-center"
            >
              <Play className="w-6 h-6 mr-3 text-white" />
              Nouvelle partie
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-5"
          >
            <Button 
              onClick={() => navigate('/history')}
              className="w-full h-[50px] rounded-xl bg-white shadow-md text-[#8B5CF6] font-semibold flex items-center justify-center border border-purple-100"
            >
              <Clock className="w-5 h-5 mr-2 text-[#8B5CF6]" />
              Historique
            </Button>
          </motion.div>
          
          <div className="flex w-full gap-3 mt-2">
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button 
                onClick={() => navigate('/rules')}
                className="w-full h-[50px] rounded-xl bg-white shadow-md text-[#F97316] font-semibold flex items-center justify-center border border-orange-100"
              >
                <Info className="w-5 h-5 mr-2 text-[#F97316]" />
                Règles
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.4 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button 
                onClick={() => navigate('/settings')}
                className="w-full h-[50px] rounded-xl bg-white shadow-md text-[#3B82F6] font-semibold flex items-center justify-center border border-blue-100"
              >
                <Settings className="w-5 h-5 mr-2 text-[#3B82F6]" />
                Réglages
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Badge de version */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="bg-white text-[12px] text-[#6B7280] px-3 py-1 rounded-full shadow-sm">
            Version 1.0
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
