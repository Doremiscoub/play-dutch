
import React, { useState } from 'react';
import { toast } from 'sonner';
import GameSetupHeader from './GameSetupHeader';
import GameStatsCards from './GameStatsCards';
import PlayerCountControls from './PlayerCountControls';
import PlayerShuffleButton from './PlayerShuffleButton';
import PlayerList from './PlayerList';
import StartGameButton from './StartGameButton';

interface Player {
  name: string;
  emoji: string;
}

interface OptimizedPlayerSetupProps {
  onStartGame: (playerNames: string[]) => void;
}

// Emojis simplifiés pour les joueurs
const playerEmojis = ['😀', '😎', '🤓', '😜', '🥳', '😇', '🤗', '🙃', '🤖', '🌟'];

const OptimizedPlayerSetup: React.FC<OptimizedPlayerSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Alice', emoji: '😀' },
    { name: 'Bob', emoji: '😎' }
  ]);

  const addPlayer = () => {
    if (players.length >= 10) {
      toast.error('Maximum 10 joueurs');
      return;
    }

    const newPlayer: Player = {
      name: `Joueur ${players.length + 1}`,
      emoji: playerEmojis[players.length % playerEmojis.length]
    };

    setPlayers([...players, newPlayer]);
    toast.success('Joueur ajouté !');
  };

  const removePlayer = () => {
    if (players.length <= 2) {
      toast.error('Il faut au moins 2 joueurs');
      return;
    }

    const removedPlayer = players[players.length - 1];
    setPlayers(players.slice(0, -1));
    toast.info(`${removedPlayer.name} retiré`);
  };

  const updatePlayerName = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = name.slice(0, 15);
    setPlayers(updatedPlayers);
  };

  const randomizePlayerEmoji = (index: number) => {
    const currentEmoji = players[index].emoji;
    const availableEmojis = playerEmojis.filter(emoji => emoji !== currentEmoji);
    const randomEmoji = availableEmojis[Math.floor(Math.random() * availableEmojis.length)];
    
    const updatedPlayers = [...players];
    updatedPlayers[index].emoji = randomEmoji;
    setPlayers(updatedPlayers);
  };

  const shufflePlayers = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setPlayers(shuffled);
    toast.success('Ordre des joueurs mélangé !');
  };

  const handleStartGame = () => {
    const playerNames = players.map(p => p.name.trim() || `Joueur ${players.indexOf(p) + 1}`);
    onStartGame(playerNames);
  };

  // Calculs pour les statistiques
  const estimatedDuration = Math.round(15 + (players.length * 8));
  const difficulty = players.length <= 3 ? 'Facile' : players.length <= 6 ? 'Moyen' : 'Difficile';

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <GameSetupHeader 
        title="Configuration des joueurs"
        subtitle="Configurez votre partie en quelques clics"
      />

      <GameStatsCards 
        playerCount={players.length}
        estimatedDuration={estimatedDuration}
        difficulty={difficulty}
      />

      <PlayerCountControls 
        playerCount={players.length}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
      />

      <PlayerShuffleButton 
        onShuffle={shufflePlayers}
        playerCount={players.length}
      />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center text-gray-800">Joueurs de la partie</h3>
        <PlayerList
          players={players}
          onUpdatePlayerName={updatePlayerName}
          onRandomizePlayerEmoji={randomizePlayerEmoji}
        />
      </div>

      <StartGameButton onStartGame={handleStartGame} />
    </div>
  );
};

export default OptimizedPlayerSetup;
