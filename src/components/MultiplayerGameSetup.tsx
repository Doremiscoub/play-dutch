
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import GameInvitation from './GameInvitation';
import { joinGameSession, getGameSession } from '@/utils/gameInvitation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, User, Gamepad2, Globe, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocalGameSetup from './LocalGameSetup';

interface MultiplayerGameSetupProps {
  onStartLocalGame: (playerNames: string[]) => void;
  onStartMultiplayerGame: (gameId: string) => void;
}

const MultiplayerGameSetup: React.FC<MultiplayerGameSetupProps> = ({ 
  onStartLocalGame,
  onStartMultiplayerGame
}) => {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("local");
  
  // Check for join code in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const joinCode = params.get('join');
    
    if (joinCode && isSignedIn && user) {
      // Try to join the game
      const gameSession = joinGameSession(
        joinCode.toUpperCase(), 
        user.id, 
        user.fullName || user.username || 'Joueur'
      );
      
      if (gameSession) {
        // Clear the URL parameter
        navigate('/game', { replace: true });
        
        // Join the game
        onStartMultiplayerGame(joinCode);
        
        toast.success(`Vous avez rejoint la partie de ${gameSession.hostName}`);
      } else {
        toast.error("Cette partie n'existe plus ou le code est invalide");
      }
    }
  }, [location, navigate, isSignedIn, user, onStartMultiplayerGame]);
  
  const handleLocalStart = (playerNames: string[]) => {
    onStartLocalGame(playerNames);
  };
  
  const userName = user?.fullName || user?.username || 'Joueur';

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div 
        className="w-full max-w-xl mx-auto p-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-dutch-background/80 to-white/80 -z-10 rounded-3xl" />
        
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
      
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-pink bg-clip-text text-transparent">
          Nouvelle Partie
        </h1>

        <Tabs 
          defaultValue="local" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-6 rounded-full border border-white/40 bg-white/70 backdrop-blur-md p-1 shadow-sm w-full max-w-full overflow-hidden">
            <TabsTrigger 
              value="local" 
              className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center justify-center space-x-1 py-2.5 text-dutch-blue data-[state=active]:text-dutch-blue data-[state=inactive]:text-dutch-blue/70 px-2 truncate"
            >
              <User className="w-4 h-4 flex-shrink-0 mr-1" />
              <span className="truncate">Solo/Local</span>
            </TabsTrigger>
            <TabsTrigger 
              value="multiplayer" 
              className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md flex items-center justify-center space-x-1 py-2.5 text-dutch-purple data-[state=active]:text-dutch-purple data-[state=inactive]:text-dutch-purple/70 px-2 truncate"
            >
              <Users className="w-4 h-4 flex-shrink-0 mr-1" />
              <span className="truncate">Multijoueur</span>
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="local">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-dutch-blue flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5" />
                    Partie Locale
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Configurez une partie locale où les joueurs partagent le même appareil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LocalGameSetup onStartGame={handleLocalStart} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        
          <TabsContent value="multiplayer">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {isSignedIn ? (
                <Card className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-dutch-purple flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Partie Multijoueur
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Créez une partie en ligne pour jouer avec vos amis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GameInvitation 
                      userId={user?.id || ''}
                      userName={userName}
                      onStartMultiplayerGame={onStartMultiplayerGame}
                    />
                  </CardContent>
                </Card>
              ) : (
                <Card className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold text-dutch-purple flex items-center gap-2">
                      <LogIn className="h-5 w-5 text-dutch-purple" />
                      Connectez-vous pour jouer en multijoueur
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Le mode multijoueur nécessite une connexion pour inviter vos amis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto rounded-full bg-dutch-purple/10 flex items-center justify-center mb-4">
                        <Users className="h-10 w-10 text-dutch-purple/70" />
                      </div>
                      <p className="text-gray-600 mb-4">
                        Le mode multijoueur nécessite une connexion pour inviter vos amis et gérer vos parties.
                      </p>
                      <Button className="bg-dutch-purple text-white hover:bg-dutch-purple/90">
                        Se connecter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MultiplayerGameSetup;
