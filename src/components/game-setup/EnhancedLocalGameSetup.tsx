
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import PlayerAddForm from './PlayerAddForm';
import PlayerList from './PlayerList';
import QuickAddButtons from './QuickAddButtons';
import GameEstimation from './GameEstimation';

interface EnhancedLocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

const EnhancedLocalGameSetup: React.FC<EnhancedLocalGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<string[]>(['Alice', 'Bob']);
  const [newPlayer, setNewPlayer] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎮');

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
      toast.error('Maximum 10 joueurs');
      return;
    }

    setPlayers([...players, newPlayer.trim()]);
    setNewPlayer('');
    toast.success(`${newPlayer.trim()} ajouté !`);
  };

  const handleRemovePlayer = (index: number) => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }
    
    const removedPlayer = players[index];
    setPlayers(players.filter((_, i) => i !== index));
    toast.info(`${removedPlayer} retiré`);
  };

  const handleShufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleQuickAdd = (name: string) => {
    if (players.includes(name)) return;
    if (players.length >= 10) return;
    
    setPlayers([...players, name]);
    toast.success(`${name} ajouté !`);
  };

  const quickNames = ['Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const availableQuickNames = quickNames.filter(name => !players.includes(name));
  const canStartGame = players.length >= 2;

  return (
    <Card className="border border-white/50 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10">
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">{selectedEmoji}</span>
          <div>
            <span>Partie rapide</span>
            <CardDescription className="mt-1">
              Configuration simple pour commencer immédiatement
            </CardDescription>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <PlayerAddForm
          newPlayer={newPlayer}
          setNewPlayer={setNewPlayer}
          selectedEmoji={selectedEmoji}
          setSelectedEmoji={setSelectedEmoji}
          onAddPlayer={handleAddPlayer}
          playersCount={players.length}
        />
        
        <QuickAddButtons
          availableNames={availableQuickNames}
          onQuickAdd={handleQuickAdd}
        />

        <PlayerList
          players={players}
          onRemovePlayer={handleRemovePlayer}
          onShufflePlayers={handleShufflePlayers}
        />
        
        <GameEstimation playersCount={players.length} />
      </CardContent>
      
      <CardFooter className="bg-gray-50/50 border-t border-white/40">
        <motion.div className="w-full" whileHover={{ scale: canStartGame ? 1.02 : 1 }}>
          <Button 
            onClick={() => onStartGame(players)}
            className="w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={!canStartGame}
            size="lg"
          >
            <Play className="h-4 w-4 mr-2" />
            {canStartGame ? 'Commencer la partie' : 'Ajoutez des joueurs pour continuer'}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default EnhancedLocalGameSetup;
