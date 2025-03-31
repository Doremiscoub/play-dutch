
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, Plus, Users, Calendar, Clock, Medal, Award, Flag, Play, Trash } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface TournamentModeProps {
  onStartTournament: (tournamentName: string, players: string[], rounds: number) => void;
}

const TournamentMode: React.FC<TournamentModeProps> = ({ onStartTournament }) => {
  const [tournamentName, setTournamentName] = useState('Tournoi Dutch');
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [rounds, setRounds] = useState(3);
  const [showDialog, setShowDialog] = useState(false);

  const handleAddPlayer = () => {
    if (!newPlayer.trim()) {
      toast.error('Entrez un nom de joueur');
      return;
    }

    if (players.includes(newPlayer.trim())) {
      toast.error('Ce joueur existe déjà');
      return;
    }

    setPlayers([...players, newPlayer.trim()]);
    setNewPlayer('');
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleStartTournament = () => {
    if (players.length < 2) {
      toast.error('Il faut au moins 2 joueurs pour commencer');
      return;
    }

    if (!tournamentName.trim()) {
      toast.error('Donnez un nom au tournoi');
      return;
    }

    onStartTournament(tournamentName, players, rounds);
    setShowDialog(false);
  };

  return (
    <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-dutch-orange" />
          Mode Tournoi
        </CardTitle>
        <CardDescription>
          Organisez un tournoi complet avec plusieurs manches et classements
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-dutch-blue" />
            Planifiez un tournoi
          </h3>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="tournament-name" className="text-sm font-medium text-gray-700 block mb-1">
                  Nom du tournoi
                </label>
                <Input
                  id="tournament-name"
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  placeholder="Grand Tournoi Dutch"
                  className="bg-white/70"
                />
              </div>
              
              <div>
                <label htmlFor="rounds" className="text-sm font-medium text-gray-700 block mb-1">
                  Nombre de manches
                </label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon-sm"
                    onClick={() => setRounds(Math.max(1, rounds - 1))}
                    className="h-8 w-8"
                  >-</Button>
                  <span className="flex-1 text-center font-medium">{rounds}</span>
                  <Button 
                    variant="outline" 
                    size="icon-sm"
                    onClick={() => setRounds(rounds + 1)}
                    className="h-8 w-8"
                  >+</Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  value={newPlayer}
                  onChange={(e) => setNewPlayer(e.target.value)}
                  placeholder="Nom du joueur"
                  className="bg-white/70"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                />
                <Button 
                  variant="outline" 
                  onClick={handleAddPlayer}
                  className="bg-dutch-blue/10 text-dutch-blue border-dutch-blue/30"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Participants ({players.length})
                </h4>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <AnimatePresence>
                    {players.map((player, index) => (
                      <motion.div
                        key={player}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex items-center justify-between bg-white/70 rounded-xl p-2 border border-white/50"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-dutch-blue/10 text-dutch-blue text-xs">
                              {player.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{player}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          onClick={() => handleRemovePlayer(index)}
                          className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {players.length === 0 && (
                    <div className="text-center py-2 text-gray-500 text-sm">
                      Ajoutez des joueurs au tournoi
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-dutch-blue/10 rounded-xl p-3 text-sm text-dutch-blue flex items-start gap-2">
          <Trophy className="h-4 w-4 mt-0.5" />
          <div>
            <p className="font-medium mb-1">Mode tournoi</p>
            <p>Créez un tournoi complet avec plusieurs manches, des classements et des récompenses. Les statistiques de chaque joueur seront suivies à travers toutes les manches.</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={() => setShowDialog(true)}
          className="w-full bg-gradient-to-r from-dutch-orange to-dutch-pink text-white shadow-md hover:opacity-90"
          disabled={players.length < 2}
        >
          <Trophy className="h-4 w-4 mr-2" />
          Organiser un tournoi
        </Button>
      </CardFooter>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md rounded-3xl bg-white/90 backdrop-blur-md border border-white/40">
          <DialogHeader>
            <DialogTitle>Configurer le tournoi</DialogTitle>
            <DialogDescription>Vérifiez les détails de votre tournoi avant de commencer</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/40">
              <h3 className="font-medium mb-1 text-gray-700 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-dutch-orange" />
                {tournamentName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-3 w-3" />{rounds} manches
                <Users className="h-3 w-3 ml-2" />{players.length} joueurs
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Liste des participants</h4>
              <div className="flex flex-wrap gap-2">
                {players.map((player, index) => (
                  <Badge key={player} variant="outline" className="bg-white/70">
                    {player}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="bg-dutch-blue/10 rounded-xl p-3 text-sm text-dutch-blue">
              <p>Le tournoi se déroulera en {rounds} manches. Chaque manche sera une partie complète, et les points seront cumulés pour déterminer le vainqueur final.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Annuler</Button>
            <Button 
              onClick={handleStartTournament}
              className="bg-gradient-to-r from-dutch-orange to-dutch-pink text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              Lancer le tournoi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TournamentMode;
