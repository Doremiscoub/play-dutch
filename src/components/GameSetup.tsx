
import React from 'react';
import { Card } from './ui/card';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader';
import LocalGameSetupContainer from './game-setup/LocalGameSetupContainer';
import { ModernTitle } from './ui/modern-title';

const GameSetup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-8">
      <div className="container max-w-4xl mx-auto">
        <PageHeader
          title={<ModernTitle>Nouvelle Partie</ModernTitle>}
          onBack={() => navigate('/')}
        />
        <Card className="p-6">
          <LocalGameSetupContainer />
        </Card>
      </div>
    </div>
  );
};

export default GameSetup;
