import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';
import LocalGameSetup from './LocalGameSetup';
import LocalGameSetupInfo from './LocalGameSetupInfo';

interface LocalGameSetupContainerProps {
  onStartGame: (playerNames: string[]) => void;
}

const LocalGameSetupContainer: React.FC<LocalGameSetupContainerProps> = ({ onStartGame }) => {
  return (
    <div className="space-y-6">
      <Card 
        className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md"
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-dutch-blue flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Un seul téléphone
          </CardTitle>
          <CardDescription className="text-gray-600">
            Tous les joueurs partagent le même appareil pour suivre les scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LocalGameSetupInfo />
          <div className="bg-dutch-blue/5 rounded-xl p-4 text-sm text-gray-600">
            <p>Parfait pour jouer ensemble autour d'une table. Chaque joueur entre son score à son tour sur cet appareil.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border border-white/50 bg-white/90 backdrop-blur-md shadow-md">
        <CardContent className="pt-6">
          <LocalGameSetup onStartGame={onStartGame} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalGameSetupContainer;
