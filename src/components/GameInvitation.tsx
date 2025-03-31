
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Share2, Copy, Users, RefreshCw, ChevronRight, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  const [gameId, setGameId] = useState<string>("");
  const [gameLink, setGameLink] = useState<string>("");
  const [joinCode, setJoinCode] = useState<string>("");
  const [players, setPlayers] = useState<{id: string; name: string}[]>([]);
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [gameCreated, setGameCreated] = useState(false);
  const [showJoinSheet, setShowJoinSheet] = useState(false);

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
      
      toast({
        title: "Partie créée",
        description: `Votre partie a été créée avec le code ${newGameId}`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la partie",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsCreatingGame(false);
    }
  };
  
  const handleJoinGame = () => {
    if (!joinCode || joinCode.length < 4) {
      toast({
        title: "Code invalide",
        description: "Veuillez entrer un code de partie valide",
        variant: "destructive",
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
        
        toast({
          title: "Partie rejointe",
          description: `Vous avez rejoint la partie de ${gameSession.hostName}`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Partie introuvable",
          description: "Vérifiez le code et réessayez",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rejoindre la partie",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsJoiningGame(false);
    }
  };
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      toast({
        title: "Lien copié",
        description: "Le lien de la partie a été copié dans le presse-papier",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien",
        variant: "destructive",
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
      const currentPlayers = getGamePlayers(gameId);
      setPlayers(currentPlayers);
    }
  };
  
  const startGame = () => {
    if (gameId) {
      onStartMultiplayerGame(gameId);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Card className="flex-1 visionos-card hover-lift">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-dutch-blue">
              Créer une partie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Créez une nouvelle partie et invitez vos amis à vous rejoindre
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCreateGame} 
              disabled={isCreatingGame}
              className="w-full"
              variant="ios-blue"
              glassmorphism
              elevated
            >
              {isCreatingGame ? 
                "Création..." : 
                "Créer une partie multijoueur"
              }
            </Button>
          </CardFooter>
        </Card>

        <Sheet open={showJoinSheet} onOpenChange={setShowJoinSheet}>
          <SheetTrigger asChild>
            <Card className="flex-1 visionos-card hover-lift cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-dutch-purple">
                  Rejoindre une partie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Rejoignez une partie existante avec un code d'invitation
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant="secondary"
                  glassmorphism
                  elevated
                >
                  Rejoindre avec un code
                </Button>
              </CardFooter>
            </Card>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-3xl bg-white/90 backdrop-blur-md">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-dutch-purple">
                Rejoindre une partie
              </SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="joinCode">Code de la partie</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="joinCode" 
                    placeholder="Entrez le code (ex: ABC123)" 
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    className="text-center text-lg tracking-wider dutch-input"
                    maxLength={6}
                  />
                  <Button 
                    onClick={handleJoinGame} 
                    disabled={isJoiningGame || !joinCode}
                    className="visionos-button"
                    variant="ios-blue"
                  >
                    {isJoiningGame ? "..." : "Rejoindre"}
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
              className="mt-6 w-full"
              variant="ios-blue"
              glassmorphism
              elevated
            >
              <Share2 className="w-4 h-4 mr-2" />
              Inviter des joueurs à votre partie
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/90 backdrop-blur-md border border-white/30 shadow-xl rounded-3xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                Invitation à votre partie
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-white/70 shadow-inner mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-dutch-blue/10 to-dutch-purple/10" />
                  <span className="text-3xl font-bold tracking-wider text-center">
                    {gameId}
                  </span>
                </div>
                <p className="text-sm text-gray-600 text-center mb-2">
                  Partagez ce code avec vos amis
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl border border-white/20">
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
                  variant="ios-blue" 
                  onClick={handleShareInvitation}
                  className="w-full"
                  glassmorphism
                  elevated
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager l'invitation
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Joueurs connectés
                  </h3>
                  <Button size="icon-sm" variant="ghost" onClick={refreshPlayerList}>
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>
                <div className="border border-white/20 rounded-xl bg-white/50 p-2 max-h-32 overflow-y-auto">
                  {players.map((player) => (
                    <div 
                      key={player.id} 
                      className="flex items-center p-2 rounded-lg hover:bg-white/60"
                    >
                      <div className="w-8 h-8 rounded-full bg-dutch-blue/10 flex items-center justify-center mr-2">
                        <Users className="w-4 h-4 text-dutch-blue" />
                      </div>
                      <span className="text-sm font-medium">
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
                  className="w-full"
                  variant="ios-blue"
                  glassmorphism
                  elevated
                >
                  Démarrer la partie
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GameInvitation;
