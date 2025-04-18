
import React from 'react';
import PlayerCountSelector from './PlayerCountSelector';
import PlayerNameInput from './PlayerNameInput';
import ActionButton from './ActionButton';
import SetupCard from './SetupCard';
import LocalGameSetupInfo from './LocalGameSetupInfo';

interface LocalGameSetupContainerProps {
  onStartGame: (playerNames: string[]) => void;
  isLoading?: boolean;
}

const LocalGameSetupContainer: React.FC<LocalGameSetupContainerProps> = ({
  onStartGame,
  isLoading = false
}) => {
  const [playerCount, setPlayerCount] = React.useState(4);
  const [playerNames, setPlayerNames] = React.useState<string[]>(
    Array(4).fill('').map((_, i) => `Joueur ${i + 1}`)
  );

  const handlePlayerCountChange = (increment: boolean) => {
    const newNum = increment 
      ? Math.min(playerCount + 1, 10) 
      : Math.max(playerCount - 1, 2);
    
    setPlayerCount(newNum);
    
    if (increment && playerCount < 10) {
      setPlayerNames([...playerNames, `Joueur ${playerCount + 1}`]);
    } else if (!increment && playerCount > 2) {
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = () => {
    onStartGame(playerNames);
  };

  return (
    <SetupCard title="Nouvelle partie locale">
      <LocalGameSetupInfo />
      
      <PlayerCountSelector 
        count={playerCount} 
        onChange={handlePlayerCountChange}
      />
      
      <div className="space-y-3 mt-6 mb-6">
        {playerNames.map((name, index) => (
          <PlayerNameInput
            key={`player-${index}`}
            name={name}
            onChange={handleNameChange}
            placeholder={`Joueur ${index + 1}`}
            index={index}
          />
        ))}
      </div>
      
      <ActionButton
        onClick={handleSubmit}
        disabled={playerNames.some(name => !name.trim()) || isLoading}
        label="Commencer la partie"
      />
    </SetupCard>
  );
};

export default LocalGameSetupContainer;
