
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import GameInvitation from './GameInvitation';
import { joinGameSession, getGameSession } from '@/utils/gameInvitation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Users, User } from 'lucide-react';

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
      <Tabs 
        defaultValue="local" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6 glassmorphism">
          <TabsTrigger value="local" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Solo/Local</span>
          </TabsTrigger>
          <TabsTrigger value="multiplayer" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Multijoueur</span>
          </TabsTrigger>
        </TabsList>
      
        <TabsContent value="local">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 visionos-card">
              {/* Ici, on garde le contenu original de GameSetup */}
              <p className="text-sm text-gray-600 mb-4">
                Configurez une partie locale où les joueurs partagent le même appareil
              </p>
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
              <GameInvitation 
                userId={user?.id || ''}
                userName={userName}
                onStartMultiplayerGame={onStartMultiplayerGame}
              />
            ) : (
              <Card className="p-6 visionos-card">
                <div className="text-center">
                  <p className="text-lg font-medium text-dutch-purple mb-4">
                    Connectez-vous pour jouer en multijoueur
                  </p>
                  <p className="text-sm text-gray-600">
                    Le mode multijoueur nécessite une connexion pour inviter vos amis
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiplayerGameSetup;
