
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Play, Copy, Users, Share2 } from 'lucide-react';
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
      toast.error('Vous devez être connecté pour inviter des amis');
      return;
    }

    // Create a new game session
    const newGameId = createGameSession(user.id);
    setGameId(newGameId);
    
    // Generate a shareable link
    const link = generateGameLink(newGameId);
    setGameLink(link);
    
    toast.success('Lien d\'invitation créé !');
  };

  const handleCopyLink = () => {
    if (gameLink) {
      navigator.clipboard.writeText(gameLink);
      toast.success('Lien copié dans le presse-papier !');
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
          toast.success('Invitation partagée !');
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

  return (
    <motion.div 
      className="w-full max-w-md mx-auto p-6 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements similaires à la page d'accueil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 -z-10" />
      
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
      
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent">Nouvelle Partie</h1>
      
      {/* Invitation section */}
      {isSignedIn && (
        <div className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-dutch-purple">Jouer avec des amis</h2>
          
          {!gameLink ? (
            <Button 
              onClick={handleCreateInvitation}
              variant="outline"
              className="w-full bg-white/80 border border-dutch-purple/30 text-dutch-purple hover:bg-dutch-purple/10"
            >
              <Users className="h-5 w-5 mr-2" /> Créer une invitation
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-white/60 rounded-md border border-dutch-blue/20 text-sm break-all">
                {gameLink}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="flex-1 bg-white/80 border border-dutch-blue/30 text-dutch-blue hover:bg-dutch-blue/10"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copier
                </Button>
                <Button
                  onClick={handleShareLink}
                  variant="outline"
                  className="flex-1 bg-white/80 border border-dutch-orange/30 text-dutch-orange hover:bg-dutch-orange/10"
                >
                  <Share2 className="h-4 w-4 mr-2" /> Partager
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Nombre de joueurs</h2>
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="secondary" 
            size="icon" 
            glassmorphism
            elevated
            onClick={() => handleNumPlayersChange(false)}
            disabled={numPlayers <= 2}
            className="border border-white/40 shadow-md"
          >
            <Minus className="h-6 w-6" />
          </Button>
          <span className="text-3xl font-bold text-dutch-blue w-10 text-center">{numPlayers}</span>
          <Button 
            variant="secondary" 
            size="icon"
            glassmorphism
            elevated
            onClick={() => handleNumPlayersChange(true)}
            disabled={numPlayers >= 10}
            className="border border-white/40 shadow-md"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <div className="dutch-card mb-8 backdrop-blur-md border border-white/40 bg-white/80 hover:shadow-lg transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-dutch-blue">Noms des joueurs</h2>
        <div className="space-y-3">
          {playerNames.map((name, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-bold shadow-md">
                {index + 1}
              </div>
              <Input
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder={`Joueur ${index + 1}`}
                className="dutch-input border border-white/40 shadow-sm"
                maxLength={20}
              />
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={handleStartGame}
        variant="gradient"
        size="2xl"
        glassmorphism
        elevated
        className="w-full shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-dutch-blue to-dutch-purple text-white"
      >
        <Play className="mr-2 h-5 w-5" /> Commencer la partie
      </Button>
      
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
    </motion.div>
  );
};

export default GameSetup;
