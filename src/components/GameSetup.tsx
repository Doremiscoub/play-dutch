
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Globe } from 'lucide-react';
import UnifiedGameSetup from './game-setup/UnifiedGameSetup';
import MultiplayerGameSetup from './MultiplayerGameSetup';
import ComingSoonBanner from './game-setup/ComingSoonBanner';

interface GameSetupProps {
  onStartGame: (playerNames: string[], isMultiplayer?: boolean) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Grille subtile en arrière-plan */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="container mx-auto px-4 py-8 space-y-8 relative z-10">
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
            <UnifiedGameSetup onStartGame={onStartGame} />
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
    </div>
  );
};

export default GameSetup;
