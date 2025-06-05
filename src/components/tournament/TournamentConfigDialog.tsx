
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TournamentPreview from './TournamentPreview';

interface TournamentConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: 'setup' | 'preview';
  setStep: (step: 'setup' | 'preview') => void;
  tournamentName: string;
  players: string[];
  rounds: number;
  onNextToPreview: () => void;
  onStartTournament: () => void;
}

const TournamentConfigDialog: React.FC<TournamentConfigDialogProps> = ({
  open,
  onOpenChange,
  step,
  setStep,
  tournamentName,
  players,
  rounds,
  onNextToPreview,
  onStartTournament
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-dutch-orange" />
            {step === 'setup' ? 'Configuration du tournoi' : 'Aperçu du tournoi'}
          </DialogTitle>
          <DialogDescription>
            {step === 'setup' 
              ? 'Vérifiez les détails avant de commencer' 
              : 'Tout est prêt pour lancer votre tournoi !'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <AnimatePresence mode="wait">
            {step === 'setup' ? (
              <motion.div
                key="setup"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="bg-white/80 rounded-xl p-4 border border-white/60">
                  <h3 className="font-medium mb-2 text-gray-800">Résumé</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tournoi :</span>
                      <span className="font-medium">{tournamentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Participants :</span>
                      <span className="font-medium">{players.length} joueurs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Manches :</span>
                      <span className="font-medium">{rounds}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <TournamentPreview
                  tournamentName={tournamentName}
                  players={players}
                  rounds={rounds}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <DialogFooter>
          <div className="flex gap-2 w-full">
            {step === 'preview' && (
              <Button 
                variant="outline" 
                onClick={() => setStep('setup')}
                className="bg-white/70"
              >
                Retour
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="bg-white/70"
            >
              Annuler
            </Button>
            {step === 'setup' ? (
              <Button 
                onClick={onNextToPreview}
                className="bg-dutch-blue text-white hover:bg-dutch-blue/90"
              >
                Aperçu
              </Button>
            ) : (
              <Button 
                onClick={onStartTournament}
                className="bg-gradient-to-r from-dutch-orange to-dutch-pink text-white flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                Lancer le tournoi
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentConfigDialog;
