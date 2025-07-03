import React from 'react';
import TournamentResults from '@/components/tournament/TournamentResults';
import UnifiedHeader from '@/components/layout/UnifiedHeader';

interface TournamentResultsViewProps {
  currentTournament: any;
  onBackToSetup: () => void;
  onNavigateHome: () => void;
}

const TournamentResultsView: React.FC<TournamentResultsViewProps> = ({
  currentTournament,
  onBackToSetup,
  onNavigateHome
}) => {
  return (
    <div className="min-h-screen">
      <UnifiedHeader 
        title="Résultats du tournoi"
        showBackButton
        onBack={onNavigateHome}
        showSettings={true}
      />
      <div className="p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <TournamentResults
            tournament={currentTournament}
            onNewTournament={onBackToSetup}
            onBackToHome={onNavigateHome}
          />
        </div>
      </div>
    </div>
  );
};

export default TournamentResultsView;