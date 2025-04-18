
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Users, Smartphone } from 'lucide-react';
import LocalGameSetup from './LocalGameSetup';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface LocalGameSetupContainerProps {
  onStartGame: (playerNames: string[]) => void;
}

const LocalGameSetupContainer: React.FC<LocalGameSetupContainerProps> = ({ onStartGame }) => {
  const [showLocalSetup, setShowLocalSetup] = useState(false);

  const handleLocalStart = (playerNames: string[]) => {
    onStartGame(playerNames);
    setShowLocalSetup(false);
  };

  return (
    <>
      <Card 
        className="rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={() => setShowLocalSetup(true)}
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
          <div className="bg-dutch-blue/5 rounded-xl p-4 text-sm text-gray-600">
            <p>Parfait pour jouer ensemble autour d'une table. Chaque joueur entre son score à son tour sur cet appareil.</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showLocalSetup} onOpenChange={setShowLocalSetup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configuration de la partie</DialogTitle>
            <DialogDescription>
              Configurer les joueurs pour une partie locale
            </DialogDescription>
          </DialogHeader>
          <LocalGameSetup onStartGame={handleLocalStart} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocalGameSetupContainer;
