
import React, { useEffect } from 'react';
import { Player, Game } from '@/types';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Share2, Trophy, Download, Home, PlayCircle, MedalIcon, Award, Medal } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import AnimatedBackground from './AnimatedBackground';

interface GamePodiumProps {
  players: Player[];
  onNewGame: () => void;
  gameDuration?: string;
}

const GamePodium: React.FC<GamePodiumProps> = ({ players, onNewGame, gameDuration }) => {
  const navigate = useNavigate();
  const sortedPlayers = [...players].sort((a, b) => a.totalScore - b.totalScore);
  const winner = sortedPlayers[0];
  
  useEffect(() => {
    // Launch confetti when component mounts
    launchConfetti();
  }, []);
  
  const launchConfetti = () => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#3B82F6', '#8B5CF6', '#F97316'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#3B82F6', '#8B5CF6', '#F97316'],
      });
    }, 250);
  };
  
  const handleShareResults = () => {
    const podiumEl = document.getElementById('game-podium');
    if (!podiumEl) return;
    
    toast.promise(
      (async () => {
        try {
          // Capture the podium as an image
          const canvas = await html2canvas(podiumEl, { 
            backgroundColor: null,
            scale: 2,
            logging: false
          });
          
          // Convert the canvas to a blob
          const blob = await new Promise<Blob>((resolve) => 
            canvas.toBlob((b) => resolve(b!), 'image/png', 0.95)
          );
          
          // Use the Web Share API if available
          if (navigator.share) {
            await navigator.share({
              title: 'Résultat de partie Dutch',
              text: `${winner.name} a gagné la partie avec ${winner.totalScore} points !`,
              files: [new File([blob], 'dutch-results.png', { type: 'image/png' })]
            });
            return "Résultat partagé !";
          } else {
            // Fallback for browsers without Web Share API
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dutch-results.png';
            a.click();
            URL.revokeObjectURL(url);
            return "Image téléchargée !";
          }
        } catch (error) {
          console.error('Erreur lors du partage:', error);
          throw new Error("Échec du partage");
        }
      })(),
      {
        loading: 'Préparation du partage...',
        success: (message) => message,
        error: 'Échec du partage. Veuillez réessayer.'
      }
    );
  };
  
  const handleDownloadResults = async () => {
    const podiumEl = document.getElementById('game-podium');
    if (!podiumEl) return;
    
    toast.promise(
      (async () => {
        try {
          const canvas = await html2canvas(podiumEl, { 
            backgroundColor: null,
            scale: 2,
            logging: false
          });
          
          const url = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = url;
          a.download = 'dutch-results.png';
          a.click();
          
          return "Image téléchargée !";
        } catch (error) {
          console.error('Erreur lors du téléchargement:', error);
          throw new Error("Échec du téléchargement");
        }
      })(),
      {
        loading: 'Préparation du téléchargement...',
        success: (message) => message,
        error: 'Échec du téléchargement. Veuillez réessayer.'
      }
    );
  };
  
  const getMedalInfo = (position: number) => {
    switch (position) {
      case 0:
        return { color: '#FFD700', icon: <Trophy className="h-6 w-6 text-yellow-500" />, label: '1er' };
      case 1:
        return { color: '#C0C0C0', icon: <Medal className="h-6 w-6 text-gray-400" />, label: '2ème' };
      case 2:
        return { color: '#CD7F32', icon: <Award className="h-6 w-6 text-amber-700" />, label: '3ème' };
      default:
        return { color: '#E5E7EB', icon: <MedalIcon className="h-5 w-5 text-gray-400" />, label: `${position + 1}ème` };
    }
  };
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="celebration" />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Partie terminée !
          </h1>
          <p className="text-gray-600 mt-2">
            {gameDuration ? `Durée: ${gameDuration}` : `${players[0].rounds.length} manches jouées`}
          </p>
        </motion.div>
        
        <div 
          id="game-podium" 
          className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Résultats</h2>
            <div className="flex gap-2">
              <Button size="icon-sm" variant="outline" onClick={handleShareResults} className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button size="icon-sm" variant="outline" onClick={handleDownloadResults} className="rounded-full">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 mb-8">
            {sortedPlayers.map((player, index) => {
              const { color, icon, label } = getMedalInfo(index);
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`p-4 rounded-xl flex items-center justify-between ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200' : 'bg-white/70 border border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center" 
                      style={{ backgroundColor: `${color}20` }}
                    >
                      {icon}
                    </div>
                    <div>
                      <span className="font-medium">{player.name}</span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {player.rounds && (
                          <>
                            <span>{player.rounds.length} manches</span>
                            <span>•</span>
                          </>
                        )}
                        {player.stats && (
                          <span>{player.stats.dutchCount} Dutch</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">{player.totalScore}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-purple-100 mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="text-sm text-purple-500 font-medium">Vainqueur</div>
                <div className="font-bold text-xl">{winner.name}</div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="max-w-md mx-auto mt-8 flex flex-col gap-3">
          <Button 
            onClick={onNewGame} 
            size="lg" 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full"
          >
            <PlayCircle className="mr-2 h-5 w-5" /> Nouvelle partie
          </Button>
          
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            size="lg" 
            className="w-full rounded-full"
          >
            <Home className="mr-2 h-5 w-5" /> Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GamePodium;
