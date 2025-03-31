
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Share2, Copy, Users, RefreshCw, ChevronRight, Link as LinkIcon, QrCode, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  createGameSession,
  generateGameLink,
  joinGameSession,
  shareGameInvitation,
  getGamePlayers
} from "@/utils/gameInvitation";

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
  const [players, setPlayers] = useState<{id: string; name: string}[]>([]);
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [gameCreated, setGameCreated] = useState(false);
  const [showJoinSheet, setShowJoinSheet] = useState(false);
  const [refreshingPlayers, setRefreshingPlayers] = useState(false);

  const handleCreateGame = () => {
    setIsCreatingGame(true);
    
    try {
      // Create a new game session
      const newGameId = createGameSession(userId, userName);
      const link = generateGameLink(newGameId);
      
      setGameId(newGameId);
      setGameLink(link);
      setPlayers([{ id: userId, name: userName }]);
      setGameCreated(true);
      
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
  
  const handleJoinGame = () => {
    if (!joinCode || joinCode.length < 4) {
      toast.error("Code invalide", {
        description: "Veuillez entrer un code de partie valide",
        duration: 3000,
      });
      return;
    }
    
    setIsJoiningGame(true);
    
    try {
      const gameSession = joinGameSession(joinCode.toUpperCase(), userId, userName);
      
      if (gameSession) {
        setGameId(gameSession.id);
        setPlayers(gameSession.players);
        setGameCreated(true);
        setShowJoinSheet(false);
        
        // Redirect to the game
        onStartMultiplayerGame(gameSession.id);
        
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
  
  // Automatically refresh player list every 10 seconds
  useEffect(() => {
    if (gameId) {
      const intervalId = setInterval(() => {
        const currentPlayers = getGamePlayers(gameId);
        setPlayers(currentPlayers);
      }, 10000);
      
      return () => clearInterval(intervalId);
    }
  }, [gameId]);
  
  const startGame = () => {
    if (gameId) {
      onStartMultiplayerGame(gameId);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <motion.div 
          className="flex-1"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="h-full border border-white/50 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-dutch-blue flex items-center gap-2">
                Créer une partie
              </CardTitle>
              <CardDescription className="text-gray-600">
                Créez une nouvelle partie et invitez vos amis à vous rejoindre
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center justify-center h-16">
                <div className="w-12 h-12 rounded-full bg-dutch-blue/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-dutch-blue" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
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
              <Card className="h-full cursor-pointer border border-white/50 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-dutch-purple flex items-center gap-2">
                    Rejoindre une partie
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Rejoignez une partie existante avec un code d'invitation
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center justify-center h-16">
                    <div className="w-12 h-12 rounded-full bg-dutch-purple/10 flex items-center justify-center">
                      <LinkIcon className="w-6 h-6 text-dutch-purple" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
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
                    onClick={handleJoinGame} 
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
              <p className="text-sm text-gray-500 text-center">
                Demandez le code à la personne qui a créé la partie
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Game invitation dialog */}
      {gameCreated && (
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="mt-6 w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Inviter des joueurs à votre partie
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-xl rounded-3xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                Invitation à votre partie
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-dutch-blue/10 to-dutch-purple/10 shadow-inner mb-4 relative overflow-hidden">
                  <span className="text-3xl font-bold tracking-wider text-center text-dutch-blue">
                    {gameId}
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-center mb-2">
                  Partagez ce code avec vos amis
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl border border-white/50 shadow-sm">
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 text-dutch-blue mr-2" />
                    <span className="text-sm text-gray-600 truncate max-w-[200px]">
                      {gameLink}
                    </span>
                  </div>
                  <Button size="icon-sm" variant="ghost" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleShareInvitation}
                  className="w-full border border-dutch-blue/20 text-dutch-blue hover:bg-dutch-blue/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager l'invitation
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Joueurs connectés ({players.length})
                  </h3>
                  <Button 
                    size="icon-sm" 
                    variant="ghost" 
                    onClick={refreshPlayerList}
                    disabled={refreshingPlayers}
                  >
                    <RefreshCw className={`h-3 w-3 ${refreshingPlayers ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                <div className="border border-white/50 rounded-xl bg-white/50 backdrop-blur-sm p-2 max-h-32 overflow-y-auto shadow-inner">
                  {players.map((player) => (
                    <div 
                      key={player.id} 
                      className="flex items-center p-2 rounded-lg hover:bg-white/60 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dutch-blue/20 to-dutch-purple/20 flex items-center justify-center mr-2">
                        <Users className="w-4 h-4 text-dutch-blue" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {player.name}
                        {player.id === userId && " (vous)"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={startGame} 
                  className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90"
                >
                  Démarrer la partie
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  {players.length < 2 
                    ? "En attente d'autres joueurs..." 
                    : `${players.length} joueurs prêts`}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GameInvitation;
