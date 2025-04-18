
import React from 'react';
import PlayerCountSelector from './PlayerCountSelector';
import PlayerNameInput from './PlayerNameInput';
import ActionButton from './ActionButton';
import { SetupCard } from './SetupCard';
import LocalGameSetupInfo from './LocalGameSetupInfo';

interface LocalGameSetupContainerProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  playerNames: string[];
  onNameChange: (index: number, name: string) => void;
  onStartGame: () => void;
  isLoading?: boolean;
}

const LocalGameSetupContainer: React.FC<LocalGameSetupContainerProps> = ({
  playerCount,
  onPlayerCountChange,
  playerNames,
  onNameChange,
  onStartGame,
  isLoading = false
}) => {
  return (
    <SetupCard title="Nouvelle partie locale">
      <LocalGameSetupInfo />
      
      <PlayerCountSelector 
        playerCount={playerCount} 
        onChange={onPlayerCountChange}
      />
      
      <div className="space-y-3 mt-6 mb-6">
        {Array.from({ length: playerCount }).map((_, index) => (
          <PlayerNameInput
            key={`player-${index}`}
            value={playerNames[index] || ''}
            onChange={(name) => onNameChange(index, name)}
            placeholder={`Joueur ${index + 1}`}
            index={index}
          />
        ))}
      </div>
      
      <ActionButton
        onClick={onStartGame}
        disabled={playerNames.some(name => !name.trim()) || isLoading}
        isLoading={isLoading}
      >
        Commencer la partie
      </ActionButton>
    </SetupCard>
  );
};

export default LocalGameSetupContainer;
