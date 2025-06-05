
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Globe } from 'lucide-react';
import OptimizedGameSetup from './game-setup/OptimizedGameSetup';
import MultiplayerGameSetup from './MultiplayerGameSetup';
import ComingSoonBanner from './game-setup/ComingSoonBanner';

interface GameSetupProps {
  onStartGame: (playerNames: string[], isMultiplayer?: boolean) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Tabs defaultValue="local" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-white/50">
          <TabsTrigger 
            value="local" 
            className="flex items-center gap-2 data-[state=active]:bg-dutch-blue/10 data-[state=active]:text-dutch-blue"
          >
            <Users className="h-4 w-4" />
            Partie locale
          </TabsTrigger>
          <TabsTrigger 
            value="multiplayer" 
            className="flex items-center gap-2 data-[state=active]:bg-dutch-purple/10 data-[state=active]:text-dutch-purple"
          >
            <Globe className="h-4 w-4" />
            Multijoueur
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="local" className="mt-8">
          <OptimizedGameSetup onStartGame={onStartGame} />
        </TabsContent>
        
        <TabsContent value="multiplayer" className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/50">
            <CardHeader>
              <CardTitle className="text-center">Mode Multijoueur</CardTitle>
            </CardHeader>
            <CardContent>
              <ComingSoonBanner 
                title="Fonctionnalité en développement"
                description="Le mode multijoueur sera bientôt disponible. Restez connectés !"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameSetup;
