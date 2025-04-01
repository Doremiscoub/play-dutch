
import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

interface GameSounds {
  playCardSound: () => void;
  playWinSound: () => void;
  playUndoSound: () => void;
  playErrorSound: () => void;
  playScoreSound: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export function useSound(): GameSounds {
  const [isSoundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  const playSound = useCallback((soundPath: string) => {
    if (isSoundEnabled) {
      try {
        new Audio(soundPath).play().catch(err => console.error("Sound error:", err));
      } catch (error) {
        console.error("Failed to play sound:", error);
      }
    }
  }, [isSoundEnabled]);
  
  const playCardSound = useCallback(() => {
    playSound('/sounds/card-sound.mp3');
  }, [playSound]);
  
  const playWinSound = useCallback(() => {
    playSound('/sounds/win-sound.mp3');
  }, [playSound]);
  
  const playUndoSound = useCallback(() => {
    playSound('/sounds/undo-sound.mp3');
  }, [playSound]);
  
  const playErrorSound = useCallback(() => {
    playSound('/sounds/error-sound.mp3');
  }, [playSound]);
  
  const playScoreSound = useCallback(() => {
    playSound('/sounds/score-sound.mp3');
  }, [playSound]);
  
  const toggleSound = useCallback(() => {
    setSoundEnabled(!isSoundEnabled);
  }, [isSoundEnabled, setSoundEnabled]);
  
  return {
    playCardSound,
    playWinSound,
    playUndoSound,
    playErrorSound,
    playScoreSound,
    isSoundEnabled,
    toggleSound,
    setSoundEnabled
  };
}
