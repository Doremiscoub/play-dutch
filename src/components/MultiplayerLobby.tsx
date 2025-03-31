
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  User, 
  MessageCircle, 
  ChevronRight, 
  Copy, 
  QrCode, 
  Link as LinkIcon, 
  Share2, 
  Settings
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  getGameSession,
  getGamePlayers,
  updatePlayerActivity,
  updateGameSettings,
  generateGameLink,
  generateQRCodeData,
  shareGameInvitation,
  sendGameMessage
} from '@/utils/gameInvitation';

interface MultiplayerLobbyProps {
  gameId: string;
  onStartGame: () => void;
  onLeaveGame: () => void;
}

const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({ 
  gameId, 
  onStartGame, 
  onLeaveGame 
}) => {
  const { user } = useUser();
  const [gameSession, setGameSession] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('players');
  const [targetScore, setTargetScore] = useState(100);
  
  // Fetch game session and update player activity
  useEffect(() => {
    const fetchGameData = () => {
      if (!gameId || !user) return;
      
      // Mark player as active
      updatePlayerActivity(gameId, user.id);
      
      // Get updated game data
      const session = getGameSession(gameId);
      if (session) {
        setGameSession(session);
        setPlayers(session.players);
        setIsHost(session.hostId === user.id);
        
        // Update target score from settings
        if (session.settings?.targetScore) {
          setTargetScore(session.settings.targetScore);
        }
      }
    };
    
    // Initial fetch
    fetchGameData();
    
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchGameData, 3000);
    
    return () => clearInterval(intervalId);
  }, [gameId, user]);
  
  const handleSendMessage = () => {
    if (!message.trim() || !user) return;
    
    sendGameMessage(gameId, user.id, message);
    setMessage('');
  };
  
  const handleCopyGameCode = () => {
    navigator.clipboard.writeText(gameId);
    toast.success("Code copié dans le presse-papier");
  };
  
  const handleCopyGameLink = () => {
    const link = generateGameLink(gameId);
    navigator.clipboard.writeText(link);
    toast.success("Lien copié dans le presse-papier");
  };
  
  const handleShareInvitation = async () => {
    if (!user) return;
    
    const userName = user.fullName || user.username || 'Joueur';
    await shareGameInvitation(gameId, userName);
  };
  
  const handleUpdateSettings = () => {
    if (!isHost) return;
    
    updateGameSettings(gameId, {
      targetScore
    });
    
    toast.success("Paramètres mis à jour");
  };
  
  const handleTargetScoreChange = (value: string) => {
    setTargetScore(parseInt(value) || 100);
  };
  
  if (!gameSession) {
    return (
      <div className="p-8 text-center">
        <p>Chargement de la partie...</p>
      </div>
    );
  }

  return (
    <Card className="border border-white/50 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md shadow-md rounded-3xl max-w-xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
              Salle d'attente
            </CardTitle>
            <CardDescription className="text-gray-600">
              {players.length} joueur{players.length > 1 ? 's' : ''} dans la partie
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-dutch-blue/30 text-dutch-blue flex items-center gap-1 py-2">
              <span className="font-mono tracking-wider">{gameId}</span>
              <Button 
                size="icon-sm" 
                variant="ghost" 
                onClick={handleCopyGameCode}
                className="ml-1 h-5 w-5 rounded-full"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <Tabs defaultValue="players" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6 rounded-xl border border-white/40 bg-white/70 backdrop-blur-md p-1">
            <TabsTrigger 
              value="players" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-1 py-2 text-dutch-blue"
            >
              <Users className="w-4 h-4 mr-1" />
              Joueurs
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-1 py-2 text-dutch-purple"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center gap-1 py-2 text-dutch-orange"
              disabled={!isHost}
            >
              <Settings className="w-4 h-4 mr-1" />
              Options
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="players" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {players.map((player) => (
                <motion.div 
                  key={player.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center p-3 rounded-xl ${player.online 
                    ? 'bg-white/70 shadow-sm border border-white/50' 
                    : 'bg-white/30 border border-white/20'}`}
                >
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={player.avatar} />
                    <AvatarFallback className="bg-dutch-blue/10 text-dutch-blue">
                      {player.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800 flex items-center">
                      {player.name}
                      {player.id === gameSession.hostId && (
                        <Badge className="ml-2 bg-dutch-blue/10 text-dutch-blue border-none text-xs py-0">Hôte</Badge>
                      )}
                      {player.id === user?.id && (
                        <Badge className="ml-2 bg-dutch-purple/10 text-dutch-purple border-none text-xs py-0">Vous</Badge>
                      )}
                    </p>
                    <p className={`text-xs ${player.online ? 'text-green-600' : 'text-gray-400'}`}>
                      {player.online ? 'En ligne' : 'Hors ligne'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-dutch-blue/30 text-dutch-blue">
                    <Share2 className="w-4 h-4 mr-2" />
                    Inviter des amis
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-xl rounded-3xl sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                      Inviter des amis
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-dutch-blue/10 to-dutch-purple/10 shadow-inner mb-4 relative overflow-hidden">
                        <span className="text-3xl font-bold tracking-wider text-center text-dutch-blue">
                          {gameId}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        Partagez ce code avec vos amis
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl border border-white/50 shadow-sm">
                        <div className="flex items-center">
                          <LinkIcon className="w-4 h-4 text-dutch-blue mr-2" />
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {generateGameLink(gameId)}
                          </span>
                        </div>
                        <Button size="icon-sm" variant="ghost" onClick={handleCopyGameLink}>
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
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
          
          <TabsContent value="chat">
            <div className="h-60 overflow-y-auto bg-white/50 rounded-xl border border-white/30 p-3 mb-3">
              <div className="flex flex-col space-y-2">
                <div className="bg-dutch-blue/10 text-dutch-blue p-2 rounded-lg text-sm self-center">
                  Bienvenue dans le chat de la partie !
                </div>
                {/* Chat messages would appear here in a real implementation */}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="bg-white/50 border border-white/30"
              />
              <Button onClick={handleSendMessage}>
                Envoyer
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Score cible pour gagner</h3>
                <ToggleGroup type="single" value={targetScore.toString()} onValueChange={handleTargetScoreChange}>
                  <ToggleGroupItem value="50">50</ToggleGroupItem>
                  <ToggleGroupItem value="100">100</ToggleGroupItem>
                  <ToggleGroupItem value="200">200</ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <Button 
                onClick={handleUpdateSettings} 
                className="w-full bg-dutch-orange text-white hover:bg-dutch-orange/90"
              >
                Sauvegarder les options
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 pb-4">
        <Button 
          variant="outline" 
          onClick={onLeaveGame}
          className="border-red-300 text-red-500 hover:bg-red-50"
        >
          Quitter la partie
        </Button>
        
        {isHost && (
          <Button 
            onClick={onStartGame}
            className="bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90"
          >
            Démarrer la partie
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultiplayerLobby;
