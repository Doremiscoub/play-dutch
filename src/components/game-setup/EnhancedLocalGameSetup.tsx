
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import PlayerAddForm from './PlayerAddForm';
import QuickAddButtons from './QuickAddButtons';
import GameEstimation from './GameEstimation';

interface Player {
  name: string;
  emoji: string;
}

interface EnhancedLocalGameSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

// Emojis pour les joueurs
const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

const EnhancedLocalGameSetup: React.FC<EnhancedLocalGameSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '😀' },
    { name: 'Bob', emoji: '😎' }
  ]);
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

    if (players.some(p => p.name === newPlayer.trim())) {
      toast.error('Ce joueur existe déjà');
      return;
    }

    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    const newPlayerObj: Player = {
      name: newPlayer.trim(),
      emoji: selectedEmoji
    };

    setPlayers([...players, newPlayerObj]);
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
    toast.info(`${removedPlayer.name} retiré`);
  };

  const handleShufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleQuickAdd = (name: string) => {
    if (players.some(p => p.name === name)) return;
    if (players.length >= 10) return;
    
    const newPlayerObj: Player = {
      name,
      emoji: playerEmojis[players.length % playerEmojis.length]
    };
    
    setPlayers([...players, newPlayerObj]);
    toast.success(`${name} ajouté !`);
  };

  const quickNames = ['Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const availableQuickNames = quickNames.filter(name => !players.some(p => p.name === name));
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

        {/* Simple player list display */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Joueurs ({players.length})</h3>
          <div className="space-y-2">
            {players.map((player, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white/40">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{player.emoji}</span>
                  <span className="font-medium">{player.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePlayer(index)}
                  disabled={players.length <= 2}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
          {players.length > 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleShufflePlayers}
              className="w-full"
            >
              🔀 Mélanger l'ordre
            </Button>
          )}
        </div>
        
        <GameEstimation playersCount={players.length} />
      </CardContent>
      
      <CardFooter className="bg-gray-50/50 border-t border-white/40">
        <motion.div className="w-full" whileHover={{ scale: canStartGame ? 1.02 : 1 }}>
          <Button 
            onClick={() => onStartGame(players.map(p => p.name))}
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
