
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const usePlayerNames = (initialCount: number = 4) => {
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(initialCount).fill('').map((_, i) => `Joueur ${i + 1}`)
  );

  const handleNameChange = useCallback((index: number, name: string) => {
    setPlayerNames(prev => {
      const newNames = [...prev];
      newNames[index] = name;
      return newNames;
    });
  }, []);

  const updatePlayerCount = useCallback((newCount: number) => {
    setPlayerNames(prev => {
      if (newCount > prev.length) {
        return [...prev, ...Array(newCount - prev.length)
          .fill('')
          .map((_, i) => `Joueur ${prev.length + i + 1}`)];
      }
      return prev.slice(0, newCount);
    });
  }, []);

  const validateNames = useCallback(() => {
    const trimmedNames = playerNames.map(name => name.trim());
    const hasDuplicates = new Set(trimmedNames.filter(Boolean)).size !== 
      trimmedNames.filter(Boolean).length;

    if (hasDuplicates) {
      toast.error('Les noms des joueurs doivent être uniques');
      return false;
    }

    return true;
  }, [playerNames]);

  return {
    playerNames,
    handleNameChange,
    updatePlayerCount,
    validateNames
  };
};
