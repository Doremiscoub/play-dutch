
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GameButton } from '@/components/ui/game-button';
import { GameCard } from '@/components/ui/game-card';
import { GameHeader } from '@/components/ui/game-typography';
import { UnifiedPageLayout } from '@/components/ui/unified-page-layout';
import RulesTabs from '@/components/rules/RulesTabs';

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
    <UnifiedPageLayout
      backgroundVariant="default"
      withAnimation={true}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <GameButton
            variant="ghost"
            size="icon"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </GameButton>
          
          <GameHeader gameColor="gameGradient" effect="shadow">
            RÈGLES DU DUTCH
          </GameHeader>
        </div>

        {/* Rules Content */}
        <GameCard variant="glass" className="p-8">
          <RulesTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </GameCard>
      </div>
    </UnifiedPageLayout>
  );
};

export default RulesPage;
