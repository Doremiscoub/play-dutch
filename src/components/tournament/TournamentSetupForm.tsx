
import React from 'react';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import TournamentRoundsSelector from './TournamentRoundsSelector';

interface TournamentSetupFormProps {
  tournamentName: string;
  setTournamentName: (name: string) => void;
  rounds: number;
  setRounds: (rounds: number) => void;
}

const TournamentSetupForm: React.FC<TournamentSetupFormProps> = ({
  tournamentName,
  setTournamentName,
  rounds,
  setRounds
}) => {
  return (
    <div className="space-y-6">
      {/* Tournament Name */}
      <div className="space-y-2">
        <label htmlFor="tournament-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-dutch-purple" />
          Nom du tournoi
        </label>
        <Input
          id="tournament-name"
          value={tournamentName}
          onChange={(e) => setTournamentName(e.target.value)}
          placeholder="Grand Tournoi Dutch de l'été"
          className="bg-white/70 border-white/60 focus:border-dutch-orange transition-colors"
          maxLength={50}
        />
      </div>
      
      {/* Rounds Selector */}
      <TournamentRoundsSelector 
        rounds={rounds} 
        onRoundsChange={setRounds} 
      />
    </div>
  );
};

export default TournamentSetupForm;
