
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';
import LocalGameSetup from './LocalGameSetup';
import LocalGameSetupInfo from './LocalGameSetupInfo';
import { SETUP_UI } from '@/config/setup-ui';
import { cn } from '@/lib/utils';

interface LocalGameSetupContainerProps {
  onStartGame: (playerNames: string[]) => void;
}

const LocalGameSetupContainer: React.FC<LocalGameSetupContainerProps> = ({ onStartGame }) => {
  return (
    <div className="space-y-6">
      <Card className={SETUP_UI.card.base}>
        <CardHeader className="pb-2">
          <CardTitle className={SETUP_UI.card.title}>
            <Smartphone className="h-5 w-5" />
            Un seul téléphone
          </CardTitle>
          <CardDescription className={SETUP_UI.card.description}>
            Tous les joueurs partagent le même appareil pour suivre les scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LocalGameSetupInfo />
          <div className={SETUP_UI.card.info}>
            <p>Parfait pour jouer ensemble autour d'une table. Chaque joueur entre son score à son tour sur cet appareil.</p>
          </div>
        </CardContent>
      </Card>

      <Card className={cn(SETUP_UI.card.base, "pt-6")}>
        <CardContent>
          <LocalGameSetup onStartGame={onStartGame} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalGameSetupContainer;
