
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import TournamentPlayersList from './TournamentPlayersList';

interface TournamentPlayerManagerProps {
  players: string[];
  setPlayers: (players: string[]) => void;
  newPlayer: string;
  setNewPlayer: (name: string) => void;
}

const TournamentPlayerManager: React.FC<TournamentPlayerManagerProps> = ({
  players,
  setPlayers,
  newPlayer,
  setNewPlayer
}) => {
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

  return (
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
  );
};

export default TournamentPlayerManager;
