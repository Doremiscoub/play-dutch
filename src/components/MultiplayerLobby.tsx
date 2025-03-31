
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Clock, Users, Play, ArrowLeft, QrCode, MapPin, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { 
  getGameSession, 
  getGamePlayers, 
  shareGameInvitation, 
  generateGameLink
} from '@/utils/gameInvitation';
import { Alert, AlertDescription } from "@/components/ui/alert";
import MultiplayerStats from './MultiplayerStats';
import { useUser } from '@clerk/clerk-react';

interface MultiplayerLobbyProps {
  gameId: string;
  onStartGame: () => void;
  onLeaveGame: () => void;
  mode?: 'dashboard' | 'online';
}

const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({ 
  gameId,
  onStartGame,
  onLeaveGame,
  mode = 'dashboard'
}) => {
  const [players, setPlayers] = useState<{id: string; name: string; online: boolean}[]>([]);
  const [gameLink, setGameLink] = useState<string>("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [refreshingPlayers, setRefreshingPlayers] = useState<boolean>(false);
  const { user } = useUser();
  
  // Initial data fetch
  useEffect(() => {
    if (!gameId) return;
    
    const link = generateGameLink(gameId);
    setGameLink(link);
    
    const gameSession = getGameSession(gameId);
    if (gameSession && user) {
      // Check if current user is the host by comparing IDs
      setIsHost(gameSession.hostId === user.id);
    }
    
    refreshPlayerList();
    
    // Poll for player updates
    const interval = setInterval(refreshPlayerList, 5000);
    return () => clearInterval(interval);
  }, [gameId, user]);
  
  const refreshPlayerList = () => {
    if (!gameId) return;
    
    setRefreshingPlayers(true);
    const currentPlayers = getGamePlayers(gameId);
    setPlayers(currentPlayers);
    setTimeout(() => setRefreshingPlayers(false), 500);
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
    const gameSession = getGameSession(gameId);
    const hostName = gameSession?.hostName || "quelqu'un";
    
    const success = await shareGameInvitation(gameId, hostName);
    if (!success) {
      handleCopyLink();
    }
  };
  
  const startGameWithCountdown = () => {
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          onStartGame();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-dutch-blue flex items-center gap-2">
              {mode === 'dashboard' ? (
                <><MapPin className="h-5 w-5" /> Tableau de scores partagé</>
              ) : (
                <><Users className="h-5 w-5" /> Salle d'attente</>
              )}
            </CardTitle>
            <Badge variant="outline" className="bg-white/50 text-dutch-blue">
              Code: {gameId}
            </Badge>
          </div>
          <CardDescription className="text-gray-600">
            Partagez le code ou le lien avec vos amis pour qu'ils puissent vous rejoindre
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {mode === 'dashboard' && (
            <Alert className="mb-4 bg-dutch-purple/10 border-dutch-purple/20 text-dutch-purple">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Les joueurs doivent être physiquement présents pour jouer avec de vraies cartes. 
                Cette application sert uniquement à suivre les scores ensemble.
              </AlertDescription>
            </Alert>
          )}
        
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <Button 
              variant="outline" 
              className="bg-white/50 text-dutch-blue border-dutch-blue/20 hover:bg-white/80"
              onClick={handleCopyLink}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copier le lien
            </Button>
            
            <Button 
              variant="outline"
              className="bg-white/50 text-dutch-purple border-dutch-purple/20 hover:bg-white/80"
              onClick={handleShareInvitation}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            
            <Button 
              variant="outline"
              className="bg-white/50 text-dutch-orange border-dutch-orange/20 hover:bg-white/80"
              onClick={refreshPlayerList}
              disabled={refreshingPlayers}
            >
              <motion.div
                animate={{ rotate: refreshingPlayers ? 360 : 0 }}
                transition={{ duration: 1, repeat: refreshingPlayers ? Infinity : 0 }}
              >
                <Users className="w-4 h-4 mr-2" />
              </motion.div>
              Actualiser
            </Button>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
              <span>Joueurs ({players.length})</span>
              {isHost && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="bg-dutch-blue/10 text-dutch-blue text-xs">
                        Hôte
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vous êtes l'hôte de cette partie</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </h3>
            
            <div className="space-y-2 max-h-52 overflow-y-auto pr-2">
              <AnimatePresence>
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center justify-between bg-white/70 rounded-xl p-3 border border-white/50 shadow-sm"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback className="bg-dutch-blue/10 text-dutch-blue">
                          {player.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-800 flex items-center">
                          {player.name}
                          {player.id === getGameSession(gameId)?.hostId && (
                            <Badge className="ml-2 bg-dutch-blue/10 text-dutch-blue border-none text-xs py-0">
                              Hôte
                            </Badge>
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      {player.online ? (
                        <Badge className="bg-dutch-green/10 text-dutch-green border-none">
                          En ligne
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-500 border-none">
                          Hors ligne
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {players.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Aucun joueur connecté pour le moment
                </div>
              )}
            </div>
          </div>
          
          {players.length > 1 && <MultiplayerStats gameId={gameId} />}
        </CardContent>
        
        <CardFooter className="flex justify-between gap-2 pt-0">
          <Button 
            variant="outline"
            className="bg-white/50 text-gray-600 border-gray-300/50 hover:bg-white/80"
            onClick={onLeaveGame}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          
          <Button 
            className="bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 px-8"
            onClick={startGameWithCountdown}
            disabled={!!countdown || players.length < 1}
          >
            {countdown ? (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 animate-pulse" />
                Démarrage dans {countdown}...
              </div>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {mode === 'dashboard' ? 'Démarrer le tableau de scores' : 'Démarrer la partie'}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-gray-500">
        {players.length < 2 ? (
          <div className="animate-pulse">En attente d'autres joueurs...</div>
        ) : (
          <div>Prêt à jouer ! Cliquez sur "Démarrer" quand tout le monde est là.</div>
        )}
      </div>
    </div>
  );
};

export default MultiplayerLobby;
