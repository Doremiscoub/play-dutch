
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../AnimatedBackground';

const NoPlayersAlert: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full relative">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      <div className="flex justify-center items-center min-h-screen flex-col p-6">
        <Alert variant="default" className="mb-6 max-w-md">
          <AlertTitle>Configuration de partie requise</AlertTitle>
          <AlertDescription>
            Veuillez configurer une nouvelle partie pour commencer à jouer.
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate('/game/setup')} 
          className="mt-4 bg-dutch-blue text-white"
        >
          Configurer une partie
        </Button>
      </div>
    </div>
  );
};

export default NoPlayersAlert;
