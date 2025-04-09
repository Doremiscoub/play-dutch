
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, ArrowLeft, Play, Star, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';

interface GameOverScreenProps {
  players: Player[];
  onRestart: () => void;
  onContinueGame: (newLimit: number) => void;
  currentScoreLimit: number;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  players, 
  onRestart,
  onContinueGame,
  currentScoreLimit = 100
}) => {
  const navigate = useNavigate();
  const [isConfettiTriggered, setIsConfettiTriggered] = useState<boolean>(false);

  // Trier les joueurs par score (du plus petit au plus grand)
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  
  // Podium (limité aux 3 premiers)
  const podium = sortedPlayers.slice(0, 3);

  // Médailles pour le podium
  const medals = [
    { color: '#FFD700', icon: <Trophy className="h-6 w-6 text-yellow-500" /> }, // Or
    { color: '#C0C0C0', icon: <Medal className="h-6 w-6 text-gray-400" /> },    // Argent
    { color: '#CD7F32', icon: <Medal className="h-6 w-6 text-orange-700" /> }   // Bronze
  ];

  // Effet de confetti pour le gagnant
  const triggerConfetti = () => {
    if (isConfettiTriggered) return;
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setIsConfettiTriggered(true);
  };

  // Déclencher les confettis au chargement
  React.useEffect(() => {
    triggerConfetti();
  }, []);

  // Continuer la partie avec une nouvelle limite
  const handleContinueGame = () => {
    const newLimit = currentScoreLimit + 100;
    onContinueGame(newLimit);
    toast.success(`La partie continue ! Nouvelle limite : ${newLimit} points`);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
          Fin de partie !
        </h1>
        <p className="text-lg text-gray-600">Un gagnant, des perdants, mais tous des champions !</p>
      </motion.div>
      
      {/* Podium */}
      <div className="flex justify-center w-full mb-10">
        <div className="relative flex items-end justify-center w-full max-w-xl">
          {/* Position 2 - Argent */}
          {podium[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-2"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center overflow-hidden mb-2">
                  <span className="text-3xl">{podium[1].name.charAt(0)}</span>
                </div>
                <div className="w-24 h-40 bg-gray-100 rounded-t-lg flex flex-col items-center justify-center p-1">
                  <Medal className="h-6 w-6 text-gray-400 mb-1" />
                  <p className="font-bold text-sm mb-1">{podium[1].name}</p>
                  <p className="text-xs text-gray-600">{podium[1].totalScore} pts</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Position 1 - Or */}
          {podium[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10 mx-2"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-500 mb-2" />
                </motion.div>
                <div className="w-24 h-24 rounded-full border-4 border-white bg-yellow-100 flex items-center justify-center overflow-hidden mb-2">
                  <span className="text-4xl">{podium[0].name.charAt(0)}</span>
                </div>
                <div className="w-28 h-56 bg-yellow-100 rounded-t-lg flex flex-col items-center justify-center p-2 relative">
                  <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                  <p className="font-bold text-base mb-1">{podium[0].name}</p>
                  <p className="text-sm text-gray-800">{podium[0].totalScore} pts</p>
                  <div className="absolute -top-2 left-0 right-0 flex justify-center">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Position 3 - Bronze */}
          {podium[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative mx-2"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-white bg-orange-50 flex items-center justify-center overflow-hidden mb-2">
                  <span className="text-2xl">{podium[2].name.charAt(0)}</span>
                </div>
                <div className="w-20 h-32 bg-orange-50 rounded-t-lg flex flex-col items-center justify-center p-1">
                  <Medal className="h-5 w-5 text-orange-700 mb-1" />
                  <p className="font-bold text-xs mb-1">{podium[2].name}</p>
                  <p className="text-xs text-gray-600">{podium[2].totalScore} pts</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Autres joueurs */}
      {sortedPlayers.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-md mb-8"
        >
          <p className="text-sm text-gray-500 mb-2 text-center">Autres participants</p>
          <Card className="p-4">
            {sortedPlayers.slice(3).map((player, index) => (
              <div key={player.id} className="flex justify-between items-center mb-2 last:mb-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    <span>{index + 4}</span>
                  </div>
                  <span>{player.name}</span>
                </div>
                <span>{player.totalScore} pts</span>
              </div>
            ))}
          </Card>
        </motion.div>
      )}
      
      {/* Actions */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            className="w-full h-12 rounded-xl bg-dutch-purple text-white hover:bg-dutch-purple/90"
            onClick={handleContinueGame}
          >
            <Play className="mr-2 h-4 w-4" />
            Continuer la partie (+100 pts)
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl border border-dutch-blue/30"
            onClick={onRestart}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Nouvelle partie
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="ghost" 
            className="w-full h-12 rounded-xl text-gray-500"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameOverScreen;
