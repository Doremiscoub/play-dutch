
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameSetup from '@/components/GameSetup';
import TournamentMode from '@/components/TournamentMode';
import InteractiveTutorial from '@/components/InteractiveTutorial';
import AnimatedBackground from '@/components/AnimatedBackground';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);

  const handleStartGame = (playerNames: string[]) => {
    navigate('/game', { state: { playerNames } });
  };

  useEffect(() => {
    const tutorialViewed = localStorage.getItem('tutorialViewed');
    if (!tutorialViewed) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('tutorialViewed', 'true');
    setShowTutorial(false);
  };

  const handleStartTournament = (tournamentName: string, players: string[], rounds: number) => {
    navigate('/tournament', { state: { tournamentName, players, rounds } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      
      <motion.div 
        className="container mx-auto p-6 flex flex-col items-center justify-center min-h-screen relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Dutch Blitz
        </motion.h1>

        <div className="space-y-6">
          <GameSetup onStartGame={handleStartGame} />
          
          <TournamentMode onStartTournament={handleStartTournament} />
          
          <InteractiveTutorial onComplete={handleTutorialComplete} />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
