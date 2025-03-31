
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Share2, Copy, Users, RefreshCw, ChevronRight, Link as LinkIcon, QrCode, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  createGameSession,
  generateGameLink,
  joinGameSession,
  shareGameInvitation,
  getGamePlayers,
  getPublicGames
} from '@/utils/gameInvitation';
import MultiplayerLobby from './MultiplayerLobby';

interface GameInvitationProps {
  userId: string;
  userName: string;
  onStartMultiplayerGame: (gameId: string) => void;
}

const GameInvitation: React.FC<GameInvitationProps> = ({ 
  userId, 
  userName, 
  onStartMultiplayerGame 
}) => {
  const [gameId, setGameId] = useState<string>("");
  const [gameLink, setGameLink] = useState<string>("");
  const [joinCode, setJoinCode] = useState<string>("");
  const [players, setPlayers] = useState<{id: string; name: string; online: boolean}[]>([]);
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [gameCreated, setGameCreated] = useState(false);
  const [showJoinSheet, setShowJoinSheet] = useState(false);
  const [refreshingPlayers, setRefreshingPlayers] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [publicGames, setPublicGames] = useState<{id: string; hostName: string; playerCount: number}[]>([]);
  const [showLobby, setShowLobby] = useState(false);
  
  // Fetch public games
  useEffect(() => {
    if (!gameCreated) {
      const games = getPublicGames();
      setPublicGames(games);
    }
  }, [gameCreated]);

  const handleCreateGame = () => {
    setIsCreatingGame(true);
    
    try {
      // Create a new game session
      const newGameId = createGameSession(userId, userName, isPublic);
      const link = generateGameLink(newGameId);
      
      setGameId(newGameId);
      setGameLink(link);
      setPlayers([{ id: userId, name: userName, online: true }]);
      setGameCreated(true);
      setShowLobby(true);
      
      toast.success(`Partie créée avec le code ${newGameId}`, {
        description: "Partagez ce code avec vos amis pour qu'ils puissent vous rejoindre",
        duration: 5000,
      });
    } catch (error) {
      toast.error("Impossible de créer la partie", {
        description: "Une erreur est survenue, veuillez réessayer",
        duration: 3000,
      });
    } finally {
      setIsCreatingGame(false);
    }
  };
  
  const handleJoinGame = (code: string = joinCode) => {
    if (!code || code.length < 4) {
      toast.error("Code invalide", {
        description: "Veuillez entrer un code de partie valide",
        duration: 3000,
      });
      return;
    }
    
    setIsJoiningGame(true);
    
    try {
      const gameSession = joinGameSession(code.toUpperCase(), userId, userName);
      
      if (gameSession) {
        setGameId(gameSession.id);
        setPlayers(gameSession.players);
        setGameCreated(true);
        setShowJoinSheet(false);
        setShowLobby(true);
        
        toast.success(`Partie rejointe!`, {
          description: `Vous avez rejoint la partie de ${gameSession.hostName}`,
          duration: 3000,
        });
      } else {
        toast.error("Partie introuvable", {
          description: "Vérifiez le code et réessayez",
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Impossible de rejoindre la partie", {
        description: "Une erreur est survenue, veuillez réessayer",
        duration: 3000,
      });
    } finally {
      setIsJoiningGame(false);
    }
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      toast.success("Lien copié!", {
        description: "Le lien a été copié dans le presse-papier",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Impossible de copier le lien", {
        description: "Veuillez copier le lien manuellement",
        duration: 3000,
      });
    }
  };
  
  const handleShareInvitation = async () => {
    const success = await shareGameInvitation(gameId, userName);
    if (!success) {
      handleCopyLink();
    }
  };
  
  const refreshPlayerList = () => {
    if (gameId) {
      setRefreshingPlayers(true);
      const currentPlayers = getGamePlayers(gameId);
      setPlayers(currentPlayers);
      setTimeout(() => setRefreshingPlayers(false), 500);
    }
  };
  
  const handleLeaveGame = () => {
    setGameCreated(false);
    setGameId("");
    setShowLobby(false);
  };
  
  const startGame = () => {
    if (gameId) {
      onStartMultiplayerGame(gameId);
    }
  };

  if (showLobby) {
    return (
      <MultiplayerLobby 
        gameId={gameId}
        onStartGame={startGame}
        onLeaveGame={handleLeaveGame}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 md:h-[400px]">
        <motion.div 
          className="flex-1"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="h-full border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-dutch-blue flex items-center gap-2">
                <Users className="w-5 h-5" />
                Créer une partie
              </CardTitle>
              <CardDescription className="text-gray-600">
                Créez une nouvelle partie et invitez vos amis à vous rejoindre
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center space-y-6">
              <div className="flex items-center justify-center h-16">
                <div className="w-16 h-16 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-dutch-blue" />
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Switch
                  id="public-game"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public-game" className="text-sm text-gray-700">
                  Partie publique (visible par tous)
                </Label>
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <Button 
                onClick={handleCreateGame} 
                disabled={isCreatingGame}
                className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90"
              >
                {isCreatingGame ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Création...
                  </>
                ) : (
                  "Créer une partie multijoueur"
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <Sheet open={showJoinSheet} onOpenChange={setShowJoinSheet}>
          <SheetTrigger asChild>
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full cursor-pointer border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-dutch-purple flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" />
                    Rejoindre une partie
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Rejoignez une partie existante avec un code d'invitation
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center h-16">
                    <div className="w-16 h-16 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                      <LinkIcon className="w-8 h-8 text-dutch-purple" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-dutch-purple to-dutch-pink text-white hover:opacity-90"
                  >
                    Rejoindre avec un code
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl bg-white/95 backdrop-blur-lg border-t border-white/50">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-dutch-purple">
                Rejoindre une partie
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="joinCode" className="text-gray-700">Code de la partie</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="joinCode" 
                    placeholder="Entrez le code (ex: ABC123)" 
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    className="text-center text-lg tracking-wider bg-white/50 border border-white/50 backdrop-blur-md font-medium"
                    maxLength={6}
                  />
                  <Button 
                    onClick={() => handleJoinGame()}
                    disabled={isJoiningGame || !joinCode}
                    className="bg-dutch-purple text-white hover:bg-dutch-purple/90"
                  >
                    {isJoiningGame ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Rejoindre"
                    )}
                  </Button>
                </div>
              </div>
              
              {publicGames.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Parties publiques disponibles</h3>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    <AnimatePresence>
                      {publicGames.map(game => (
                        <motion.div
                          key={game.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="bg-white/70 rounded-xl p-3 border border-white/50 shadow-sm flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-gray-800">Partie de {game.hostName}</p>
                            <p className="text-xs text-gray-500">{game.playerCount} joueur{game.playerCount > 1 ? 's' : ''} • Code: {game.id}</p>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => handleJoinGame(game.id)}
                            className="bg-dutch-purple text-white hover:bg-dutch-purple/90"
                          >
                            Rejoindre
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500 text-center">
                Demandez le code à la personne qui a créé la partie
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default GameInvitation;
