
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Play, Copy, Users, Share2, Sparkles, Wand } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'sonner';
import { createGameSession, generateGameLink } from '@/utils/gameInvitation';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface GameSetupProps {
  onStartGame: (players: string[]) => void;
  onJoinGame?: (gameId: string) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, onJoinGame }) => {
  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(4).fill('').map((_, i) => `Joueur ${i + 1}`));
  const [gameLink, setGameLink] = useState<string | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  // Check if we're joining a game
  useEffect(() => {
    const joinCode = searchParams.get('join');
    if (joinCode && onJoinGame) {
      // We're joining someone else's game
      onJoinGame(joinCode);
    }
  }, [searchParams, onJoinGame]);

  const handleNumPlayersChange = (increment: boolean) => {
    const newNum = increment 
      ? Math.min(numPlayers + 1, 10) 
      : Math.max(numPlayers - 1, 2);
    
    setNumPlayers(newNum);
    
    // Adjust player names array
    if (increment && numPlayers < 10) {
      setPlayerNames([...playerNames, `Joueur ${numPlayers + 1}`]);
    } else if (!increment && numPlayers > 2) {
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleCreateInvitation = () => {
    if (!isSignedIn || !user) {
      toast.error('Vous devez être connecté pour inviter des amis', {
        className: "dutch-toast",
        style: { borderRadius: "14px", background: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(255, 255, 255, 0.5)", backdropFilter: "blur(8px)" }
      });
      return;
    }

    // Create a new game session with the user's name (needed second argument)
    const userName = user.fullName || user.username || 'Joueur';
    const newGameId = createGameSession(user.id, userName);
    setGameId(newGameId);
    
    // Generate a shareable link
    const link = generateGameLink(newGameId);
    setGameLink(link);
    
    toast.success('Lien d\'invitation créé !', {
      className: "dutch-toast",
      style: { borderRadius: "14px", background: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(255, 255, 255, 0.5)", backdropFilter: "blur(8px)" },
      icon: <Sparkles className="w-5 h-5 text-dutch-purple" />
    });
  };

  const handleCopyLink = () => {
    if (gameLink) {
      navigator.clipboard.writeText(gameLink);
      toast.success('Lien copié dans le presse-papier !', {
        className: "dutch-toast",
        style: { borderRadius: "14px", background: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(255, 255, 255, 0.5)", backdropFilter: "blur(8px)" }
      });
    }
  };

  const handleShareLink = async () => {
    if (gameLink) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Rejoignez ma partie de Dutch',
            text: 'Cliquez sur ce lien pour rejoindre ma partie de Dutch',
            url: gameLink,
          });
          toast.success('Invitation partagée !', {
            className: "dutch-toast",
            style: { borderRadius: "14px", background: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(255, 255, 255, 0.5)", backdropFilter: "blur(8px)" }
          });
        } catch (error) {
          console.error('Error sharing:', error);
          // Fallback to copy
          handleCopyLink();
        }
      } else {
        // Fallback to copy
        handleCopyLink();
      }
    }
  };

  const handleStartGame = () => {
    // Validate player names (ensure no empty names)
    const validPlayerNames = playerNames.map(name => name.trim() === '' ? `Joueur ${playerNames.indexOf(name) + 1}` : name);
    onStartGame(validPlayerNames);
  };

  const transitionProps = {
    type: "spring",
    stiffness: 260,
    damping: 20
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-6 relative z-10 pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements similaires à la page d'accueil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 backdrop-blur-sm -z-10 rounded-3xl" />
      
      <motion.div
        className="absolute top-10 left-[10%] w-40 h-40 rounded-full bg-dutch-blue/10 blur-3xl -z-5"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-[5%] w-48 h-48 rounded-full bg-dutch-orange/10 blur-3xl -z-5"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dutch-purple/20 to-transparent -z-5"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <motion.h1 
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transitionProps}
      >
        Nouvelle Partie
      </motion.h1>
      
      {/* Invitation section */}
      {isSignedIn && (
        <motion.div 
          className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...transitionProps, delay: 0.1 }}
          whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
        >
          <h2 className="text-xl font-semibold mb-4 text-dutch-purple">Jouer avec des amis</h2>
          
          {!gameLink ? (
            <Button 
              onClick={handleCreateInvitation}
              variant="pill-glass"
              size="pill"
              elevated
              animated
              className="w-full bg-white/80 border border-dutch-purple/30 text-dutch-purple hover:bg-dutch-purple/10"
            >
              <Users className="h-5 w-5 mr-2" /> Créer une invitation
            </Button>
          ) : (
            <div className="space-y-3">
              <motion.div 
                className="p-3 bg-white/60 rounded-md border border-dutch-blue/20 text-sm break-all relative overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue/5 via-dutch-purple/5 to-dutch-blue/5 animate-gradient-x"></div>
                {gameLink}
              </motion.div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyLink}
                  variant="pill-glass"
                  size="pill"
                  elevated
                  animated
                  className="flex-1 bg-white/80 border border-dutch-blue/30 text-dutch-blue hover:bg-dutch-blue/10"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copier
                </Button>
                <Button
                  onClick={handleShareLink}
                  variant="pill-glass"
                  size="pill"
                  elevated
                  animated
                  className="flex-1 bg-white/80 border border-dutch-orange/30 text-dutch-orange hover:bg-dutch-orange/10"
                >
                  <Share2 className="h-4 w-4 mr-2" /> Partager
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      <motion.div 
        className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...transitionProps, delay: 0.2 }}
        whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      >
        <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Nombre de joueurs</h2>
        <div className="flex items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="dutch-glass" 
              size="icon" 
              glassmorphism
              elevated
              onClick={() => handleNumPlayersChange(false)}
              disabled={numPlayers <= 2}
              className="border border-white/40 shadow-md"
            >
              <Minus className="h-6 w-6" />
            </Button>
          </motion.div>
          <motion.span 
            className="text-3xl font-bold text-dutch-blue w-10 text-center"
            key={numPlayers}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {numPlayers}
          </motion.span>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="dutch-glass" 
              size="icon"
              glassmorphism
              elevated
              onClick={() => handleNumPlayersChange(true)}
              disabled={numPlayers >= 10}
              className="border border-white/40 shadow-md"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...transitionProps, delay: 0.3 }}
        whileHover={{ y: -3, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      >
        <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Noms des joueurs</h2>
        <div className="space-y-3">
          {playerNames.map((name, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-bold shadow-md">
                {index + 1}
              </div>
              <div className="relative flex-grow">
                <motion.div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-lg blur opacity-30"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Input
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Joueur ${index + 1}`}
                  className="dutch-input border border-white/40 shadow-sm relative z-10 backdrop-blur-sm"
                  maxLength={20}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Floating elements similaires à la page d'accueil */}
      <motion.div
        className="absolute bottom-[30%] left-12 w-4 h-4 rounded-full bg-dutch-blue/30 -z-5"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[25%] right-14 w-3 h-3 rounded-full bg-dutch-orange/40 -z-5"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[40%] left-20 w-2 h-2 rounded-full bg-dutch-purple/40 -z-5"
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Bouton Commencer flottant */}
      <motion.div
        className="fixed left-0 right-0 bottom-8 flex justify-center z-50 px-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-md"
        >
          <Button 
            onClick={handleStartGame}
            variant="floating"
            size="game-action"
            glassmorphism
            elevated
            animated
            className="w-full shadow-lg transition-all relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md bg-gradient-to-r from-dutch-blue/90 via-dutch-purple/90 to-dutch-blue/90"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-blue bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <span className="absolute inset-0 flex items-center justify-center gap-2 text-lg font-medium">
              <Play className="h-5 w-5" /> Commencer la partie
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameSetup;
