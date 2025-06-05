
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RulesTabs from '@/components/rules/RulesTabs';
import { PageTitle } from '@/components/ui/page-title';

const RulesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('introduction');

  const handleBack = () => {
    // Check if we have an active game
    const activeGame = localStorage.getItem('current_dutch_game');
    const playerSetup = localStorage.getItem('dutch_player_setup');
    
    if (activeGame || playerSetup) {
      // Return to active game
      navigate('/game');
    } else {
      // Return to home
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="bg-white/70 backdrop-blur-xl border border-white/50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <PageTitle variant="h1" withSparkles={true}>
            Règles du Dutch
          </PageTitle>
        </div>

        {/* Rules Content */}
        <RulesTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default RulesPage;
