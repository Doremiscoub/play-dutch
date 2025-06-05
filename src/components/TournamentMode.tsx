
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, Plus, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import TournamentRoundsSelector from './tournament/TournamentRoundsSelector';
import TournamentPlayersList from './tournament/TournamentPlayersList';
import TournamentPreview from './tournament/TournamentPreview';

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

  const handleAddPlayer = () => {
    if (!newPlayer.trim()) {
      toast.error('Entrez un nom de joueur');
      return;
    }

    if (newPlayer.trim().length < 2) {
      toast.error('Le nom doit contenir au moins 2 caractères');
      return;
    }

    if (players.includes(newPlayer.trim())) {
      toast.error('Ce joueur existe déjà');
      return;
    }

    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs par tournoi');
      return;
    }

    setPlayers([...players, newPlayer.trim()]);
    setNewPlayer('');
    toast.success(`${newPlayer.trim()} ajouté au tournoi !`);
  };

  const handleRemovePlayer = (index: number) => {
    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer} retiré du tournoi`);
  };

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
            
            {/* Add Player */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newPlayer}
                  onChange={(e) => setNewPlayer(e.target.value)}
                  placeholder="Nom du joueur"
                  className="bg-white/70 border-white/60 focus:border-dutch-blue transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                  maxLength={20}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={handleAddPlayer}
                    className="bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-md"
                    disabled={players.length >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              
              {/* Players List */}
              <TournamentPlayersList 
                players={players} 
                onRemovePlayer={handleRemovePlayer} 
              />
            </div>
            
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-xl p-4 border border-white/40"
            >
              <div className="flex items-start gap-3">
                <Trophy className="h-5 w-5 text-dutch-orange mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-sm text-gray-800">Mode tournoi avancé</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Créez un tournoi complet avec suivi des performances, classements détaillés et génération automatique de certificats. Parfait pour vos soirées jeux entre amis !
                  </p>
                </div>
              </div>
            </motion.div>
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
      
      {/* Tournament Configuration Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
                onClick={() => setShowDialog(false)}
                className="bg-white/70"
              >
                Annuler
              </Button>
              {step === 'setup' ? (
                <Button 
                  onClick={handleNextToPreview}
                  className="bg-dutch-blue text-white hover:bg-dutch-blue/90"
                >
                  Aperçu
                </Button>
              ) : (
                <Button 
                  onClick={handleStartTournament}
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
    </>
  );
};

export default TournamentMode;
