
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import TournamentSetupForm from './tournament/TournamentSetupForm';
import TournamentPlayerManager from './tournament/TournamentPlayerManager';
import TournamentInfoCard from './tournament/TournamentInfoCard';
import TournamentConfigDialog from './tournament/TournamentConfigDialog';

interface TournamentModeProps {
  onStartTournament: (tournamentName: string, players: string[], rounds: number) => void;
}

const TournamentMode: React.FC<TournamentModeProps> = ({ onStartTournament }) => {
  const [tournamentName, setTournamentName] = useState('Grand Tournoi Dutch');
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [rounds, setRounds] = useState(3);
  const [showDialog, setShowDialog] = useState(false);
  const [step, setStep] = useState<'setup' | 'preview'>('setup');

  const handleNextToPreview = () => {
    if (players.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour commencer');
      return;
    }

    if (!tournamentName.trim()) {
      toast.error('Donnez un nom au tournoi');
      return;
    }

    setStep('preview');
  };

  const handleStartTournament = () => {
    onStartTournament(tournamentName.trim(), players, rounds);
    setShowDialog(false);
    toast.success(`🏆 Tournoi "${tournamentName}" lancé !`);
  };

  const canProceed = players.length >= 2 && tournamentName.trim().length >= 3;

  return (
    <>
      <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-dutch-orange/10 to-dutch-pink/10">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-dutch-orange" />
            Mode Tournoi
          </CardTitle>
          <CardDescription>
            Organisez un tournoi complet avec plusieurs manches et classements
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <TournamentSetupForm
              tournamentName={tournamentName}
              setTournamentName={setTournamentName}
              rounds={rounds}
              setRounds={setRounds}
            />
            
            <TournamentPlayerManager
              players={players}
              setPlayers={setPlayers}
              newPlayer={newPlayer}
              setNewPlayer={setNewPlayer}
            />
            
            <TournamentInfoCard />
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50/50 border-t border-white/40">
          <motion.div className="w-full" whileHover={{ scale: canProceed ? 1.02 : 1 }}>
            <Button 
              onClick={() => setShowDialog(true)}
              className="w-full bg-gradient-to-r from-dutch-orange to-dutch-pink text-white shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!canProceed}
              size="lg"
            >
              <Trophy className="h-4 w-4 mr-2" />
              {canProceed ? 'Organiser le tournoi' : 'Ajoutez des joueurs pour continuer'}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
      
      <TournamentConfigDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        step={step}
        setStep={setStep}
        tournamentName={tournamentName}
        players={players}
        rounds={rounds}
        onNextToPreview={handleNextToPreview}
        onStartTournament={handleStartTournament}
      />
    </>
  );
};

export default TournamentMode;
