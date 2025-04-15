
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, ArrowLeft, Play, Star, Sparkles, PartyPopper, Flame, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { Player } from '@/types';
import { toast } from 'sonner';
import AnimatedBackground from './AnimatedBackground';

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

  // Effet de confetti pour le gagnant - Amélioré
  const triggerConfetti = () => {
    if (isConfettiTriggered) return;
    
    // Confetti plus abondants et colorés
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5, x: 0.5 },
      colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981', '#FBBF24']
    });
    
    // Seconde vague de confetti après un délai
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.5 }
      });
      
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.5 }
      });
    }, 800);
    
    setIsConfettiTriggered(true);
  };

  // Déclencher les confettis au chargement
  useEffect(() => {
    triggerConfetti();
    
    // Timer pour relancer des confettis périodiquement
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: Math.random() * 0.3 + 0.2, x: Math.random() },
        colors: ['#1EAEDB', '#8B5CF6', '#F97316', '#10B981']
      });
    }, 3500);
    
    return () => clearInterval(confettiInterval);
  }, []);

  // Continuer la partie avec une nouvelle limite
  const handleContinueGame = () => {
    const newLimit = 100; // Valeur par défaut
    onContinueGame(newLimit);
    toast.success(`La partie continue ! Nouvelle limite : ${currentScoreLimit + newLimit} points`);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fond animé festif */}
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground variant="default" />
        
        {/* Overlay avec dégradé festif */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-orange-500/10"></div>
      </div>
      
      {/* Animation de particules lumineuses */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-yellow-400/30 blur-sm"
            animate={{
              x: [Math.random() * 100, Math.random() * window.innerWidth],
              y: [Math.random() * 100, Math.random() * window.innerHeight],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 relative"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center mb-4"
        >
          <div className="bg-gradient-to-r from-dutch-orange to-dutch-purple p-2.5 rounded-full shadow-lg">
            <PartyPopper className="h-10 w-10 text-white" />
          </div>
        </motion.div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent">
          Félicitations !
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          {podium[0]?.name} remporte la partie avec {podium[0]?.totalScore} points !
        </p>
      </motion.div>
      
      {/* Podium */}
      <div className="flex justify-center w-full mb-10">
        <div className="relative flex items-end justify-center w-full max-w-xl overflow-visible">
          {/* Position 2 - Argent */}
          {podium[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-2"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden mb-2 shadow-md">
                  <span className="text-3xl">{podium[1].name.charAt(0)}</span>
                </div>
                <div className="w-24 h-40 bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-lg flex flex-col items-center justify-center p-1 shadow-lg">
                  <Medal className="h-6 w-6 text-gray-400 mb-1" />
                  <p className="font-bold text-sm mb-1">{podium[1].name}</p>
                  <p className="text-xs text-gray-600 bg-white/70 px-2 py-1 rounded-full">{podium[1].totalScore} pts</p>
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
                {/* Couronne animée */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: [-5, -8, -5], opacity: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2"
                >
                  <Award className="h-10 w-10 text-yellow-500 filter drop-shadow-lg" />
                </motion.div>
                
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-500 mb-2" />
                </motion.div>
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-yellow-100 to-yellow-300 flex items-center justify-center overflow-hidden mb-2 shadow-md">
                  <span className="text-4xl">{podium[0].name.charAt(0)}</span>
                </div>
                <div className="w-28 h-56 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-t-lg flex flex-col items-center justify-center p-2 relative shadow-lg">
                  <Trophy className="h-8 w-8 text-yellow-500 mb-2 drop-shadow" />
                  <p className="font-bold text-base mb-1">{podium[0].name}</p>
                  <p className="text-sm text-gray-800 bg-white/70 px-3 py-1 rounded-full font-bold">{podium[0].totalScore} pts</p>
                  <div className="absolute -top-2 left-0 right-0 flex justify-center">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 filter drop-shadow" />
                  </div>
                  
                  {/* Rayonnement derrière le vainqueur */}
                  <motion.div
                    className="absolute -inset-4 -z-10 opacity-20"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 rounded-full blur-lg" />
                  </motion.div>
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
                <div className="w-16 h-16 rounded-full border-4 border-white bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center overflow-hidden mb-2 shadow-md">
                  <span className="text-2xl">{podium[2].name.charAt(0)}</span>
                </div>
                <div className="w-20 h-32 bg-gradient-to-b from-orange-50 to-orange-100 rounded-t-lg flex flex-col items-center justify-center p-1 shadow-lg">
                  <Medal className="h-5 w-5 text-orange-700 mb-1" />
                  <p className="font-bold text-xs mb-1">{podium[2].name}</p>
                  <p className="text-xs text-gray-600 bg-white/70 px-2 py-0.5 rounded-full">{podium[2].totalScore} pts</p>
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
          <Card className="p-4 bg-white/80 backdrop-blur-sm border border-white shadow-xl">
            {sortedPlayers.slice(3).map((player, index) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                key={player.id}
                className="flex justify-between items-center mb-2 last:mb-0 p-2 hover:bg-gray-50/50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 shadow-sm">
                    <span>{index + 4}</span>
                  </div>
                  <span>{player.name}</span>
                </div>
                <span className="font-medium bg-gray-100 px-2 py-0.5 rounded-full">{player.totalScore} pts</span>
              </motion.div>
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
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            className="w-full h-12 rounded-xl bg-gradient-to-r from-dutch-purple to-dutch-blue text-white hover:opacity-90 shadow-lg border border-white/20"
            onClick={handleContinueGame}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue bg-[length:200%_100%] opacity-80"
                style={{ animation: "gradient-x 8s linear infinite" }} />
            <div className="relative flex items-center">
              <Play className="mr-2 h-4 w-4" />
              Continuer la partie (+100 pts)
            </div>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full"
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl border border-dutch-blue/30 bg-white/70 backdrop-blur-sm hover:bg-white shadow-md"
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
            className="w-full h-12 rounded-xl text-gray-500 hover:bg-white/50"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
      
      {/* Style pour l'animation de gradient */}
      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </div>
  );
};

export default GameOverScreen;
