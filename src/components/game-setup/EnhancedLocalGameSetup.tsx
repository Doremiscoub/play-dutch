
import React, { useState } from 'react';
import { toast } from 'sonner';
import PlayerAddForm from './PlayerAddForm';
import QuickAddButtons from './QuickAddButtons';
import GameEstimation from './GameEstimation';
import PlayerManagement from './PlayerManagement';
import GameSetupCard from './GameSetupCard';
import GameSetupFooter from './GameSetupFooter';

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
    <GameSetupCard selectedEmoji={selectedEmoji}>
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

      <PlayerManagement 
        players={players}
        setPlayers={setPlayers}
      />
      
      <GameEstimation playersCount={players.length} />
      
      <GameSetupFooter 
        onStartGame={onStartGame}
        playerNames={players.map(p => p.name)}
        canStartGame={canStartGame}
      />
    </GameSetupCard>
  );
};

export default EnhancedLocalGameSetup;
