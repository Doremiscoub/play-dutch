
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocalGameSetup from '@/components/LocalGameSetup';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const GameSetupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = (playerNames: string[]) => {
    if (!playerNames || playerNames.length === 0 || playerNames.some(name => !name.trim())) {
      toast.error('Veuillez entrer le nom de tous les joueurs');
      return;
    }
    
    const newPlayers = playerNames.map(name => ({
      id: uuidv4(),
      name: name.trim(),
      totalScore: 0,
      rounds: []
    }));
    
    const currentGame = {
      players: newPlayers,
      roundHistory: [],
      lastUpdated: new Date(),
      gameStartTime: new Date()
    };
    
    localStorage.setItem('current_dutch_game', JSON.stringify(currentGame));
    
    toast.success('La partie commence !');
    navigate('/game');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full"
    >
      <LocalGameSetup onStartGame={handleStartGame} />
    </motion.div>
  );
};

export default GameSetupPage;
