
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, History, Settings as SettingsIcon, BookOpen, Trophy, 
  Circle, User, Users, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { Badge } from '@/components/ui/badge';
import useTournamentStore from '@/store/useTournamentStore';
import useGameStore from '@/store/useGameStore';
import GameSettings from '@/components/GameSettings';
import AdBanner from '@/components/AdBanner';

/**
 * Page d'accueil avec navigation vers les différentes fonctionnalités
 */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { games } = useGameStore();
  const { tournaments, currentTournament, setCurrentTournament } = useTournamentStore();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return window.localStorage.getItem('dutch_sound_enabled') !== 'false';
  });
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    window.localStorage.setItem('dutch_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

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

  const handleCircleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      
      if (newCount >= 7) {
        setShowEasterEgg(true);
        return 0;
      }
      
      if (newCount === 3) {
        toast.info('Continue d\'appuyer...', {
          position: 'bottom-center',
          duration: 1500,
        });
      }
      
      return newCount;
    });
  };

  const handleCloseEasterEgg = () => {
    setShowEasterEgg(false);
  };

  const handleStartTournament = () => {
    if (currentTournament) {
      navigate('/tournament');
    } else {
      // Créer un nouveau tournoi
      const newTournament = {
        id: `tournament-${Date.now()}`,
        name: `Tournoi du ${new Date().toLocaleDateString('fr-FR')}`,
        players: [],
        games: [],
        currentGame: null,
        completed: false,
        date: new Date(),
      };
      
      setCurrentTournament(newTournament);
      navigate('/tournament');
    }
  };

  const mainButtonVariants = {
    hover: { scale: 1.04, y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" },
    tap: { scale: 0.98, y: -2, boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)" }
  };

  const iconButtonVariants = {
    hover: { scale: 1.1, y: -3 },
    tap: { scale: 0.95, y: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background design elements */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      
      {/* Main Content */}
      <div className="container max-w-md mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Absolute positioned settings button */}
        <div className="absolute top-6 right-6 z-30">
          <GameSettings soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
        </div>
        
        {/* Logo and title */}
        <motion.div 
          className="mt-8 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-dutch-blue to-dutch-purple flex items-center justify-center shadow-lg relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
              onClick={handleCircleClick}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl font-bold relative z-10"
                whileTap={{ scale: 0.95 }}
              >
                <Circle className="h-10 w-10 text-dutch-purple" strokeWidth={3} />
              </motion.div>
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
            Dutch Blitz
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Compteur de score facile et fun
          </p>
        </motion.div>
        
        {/* Main Action Buttons */}
        <div className="space-y-4 flex-grow flex flex-col justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              onClick={handleStartGame}
              className="w-full py-8 text-lg font-semibold rounded-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple hover:from-dutch-blue/90 hover:to-dutch-purple/90 shadow-md hover:shadow-lg transition-all"
              variants={mainButtonVariants}
              whileHover="hover"
              whileTap="tap"
              as={motion.button}
            >
              <Play className="mr-2 h-5 w-5" />
              Nouvelle Partie
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <Button 
              onClick={handleStartTournament}
              className="w-full py-6 text-lg font-medium rounded-2xl bg-gradient-to-r from-dutch-orange to-dutch-yellow hover:from-dutch-orange/90 hover:to-dutch-yellow/90 shadow-md hover:shadow-lg transition-all"
              variants={mainButtonVariants}
              whileHover="hover"
              whileTap="tap"
              as={motion.button}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Mode Tournoi
            </Button>
            
            {currentTournament && !currentTournament.completed && (
              <Badge className="absolute -top-2 -right-1 bg-dutch-red shadow-sm">En cours</Badge>
            )}
          </motion.div>
          
          {/* Secondary Buttons */}
          <motion.div 
            className="grid grid-cols-3 gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div variants={iconButtonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="ghost"
                className="w-full h-full aspect-square flex flex-col items-center justify-center gap-2 rounded-xl bg-white/70 hover:bg-white/90 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md transition-all"
                onClick={handleGoToHistory}
              >
                <History className="h-6 w-6 text-dutch-blue" />
                <span className="text-xs font-medium text-gray-700">Historique</span>
              </Button>
            </motion.div>
            
            <motion.div variants={iconButtonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="ghost"
                className="w-full h-full aspect-square flex flex-col items-center justify-center gap-2 rounded-xl bg-white/70 hover:bg-white/90 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md transition-all"
                onClick={handleGoToRules}
              >
                <BookOpen className="h-6 w-6 text-dutch-orange" />
                <span className="text-xs font-medium text-gray-700">Règles</span>
              </Button>
            </motion.div>
            
            <motion.div variants={iconButtonVariants} whileHover="hover" whileTap="tap">
              <Button 
                variant="ghost"
                className="w-full h-full aspect-square flex flex-col items-center justify-center gap-2 rounded-xl bg-white/70 hover:bg-white/90 backdrop-blur-sm border border-white/40 shadow-sm hover:shadow-md transition-all"
                onClick={handleGoToSettings}
              >
                <SettingsIcon className="h-6 w-6 text-dutch-purple" />
                <span className="text-xs font-medium text-gray-700">Réglages</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl p-4 bg-white/80 backdrop-blur-sm border border-white/40 shadow-sm mb-6"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                <History className="h-4 w-4 text-dutch-blue" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Parties jouées</div>
                <div className="font-semibold">{games.length}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dutch-orange/10 flex items-center justify-center">
                <Trophy className="h-4 w-4 text-dutch-orange" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Tournois</div>
                <div className="font-semibold">{tournaments.length}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                {isSignedIn ? (
                  <User className="h-4 w-4 text-dutch-purple" />
                ) : (
                  <Users className="h-4 w-4 text-dutch-purple" />
                )}
              </div>
              <div>
                <div className="text-xs text-gray-500">Mode</div>
                <div className="font-semibold">{isSignedIn ? 'Connecté' : 'Local'}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-dutch-green/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-dutch-green" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Version</div>
                <div className="font-semibold">1.0.0</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ad Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-full flex justify-center mb-4"
        >
          <AdBanner format="horizontal" position="inline" />
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-xs text-gray-500 mt-auto pb-4"
        >
          Dutch Blitz Scoreboard © {new Date().getFullYear()}
        </motion.div>
      </div>
      
      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60" onClick={handleCloseEasterEgg}></div>
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 relative z-10 w-[90%] max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-dutch-orange to-dutch-red bg-clip-text text-transparent">
              Easter Egg découvert !
            </h2>
            <p className="text-gray-700 mb-4">
              Vous avez découvert un mini-jeu caché ! Voulez-vous y jouer ?
            </p>
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={handleCloseEasterEgg}
              >
                Annuler
              </Button>
              <Button 
                variant="dutch-orange"
                onClick={() => navigate('/easter-egg')}
              >
                Jouer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
