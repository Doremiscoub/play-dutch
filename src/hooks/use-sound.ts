
import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

interface GameSounds {
  playCardSound: () => void;
  playWinSound: () => void;
  playUndoSound: () => void;
  playErrorSound: () => void;
  playScoreSound: () => void;
  playAchievementSound: () => void;
  playButtonSound: () => void;
  playSound: (soundType: string) => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
}

export function useSound(): GameSounds {
  const [isSoundEnabled, setSoundEnabled] = useLocalStorage('dutch_sound_enabled', true);
  
  const playSound = useCallback((soundType: string) => {
    if (isSoundEnabled) {
      try {
        let soundPath = '';
        switch (soundType) {
          case 'buttonClick':
            soundPath = '/sounds/button-click.mp3';
            break;
          case 'undo':
            soundPath = '/sounds/undo-sound.mp3';
            break;
          case 'gameEnd':
            soundPath = '/sounds/game-end.mp3';
            break;
          case 'achievement':
            soundPath = '/sounds/achievement.mp3';
            break;
          case 'card':
            soundPath = '/sounds/card-sound.mp3';
            break;
          case 'win':
            soundPath = '/sounds/win-sound.mp3';
            break;
          case 'error':
            soundPath = '/sounds/error-sound.mp3';
            break;
          case 'score':
            soundPath = '/sounds/score-sound.mp3';
            break;
          default:
            soundPath = `/sounds/${soundType}.mp3`;
        }
        new Audio(soundPath).play().catch(err => console.error("Sound error:", err));
      } catch (error) {
        console.error("Failed to play sound:", error);
      }
    }
  }, [isSoundEnabled]);
  
  const playCardSound = useCallback(() => {
    playSound('card');
  }, [playSound]);
  
  const playWinSound = useCallback(() => {
    playSound('win');
  }, [playSound]);
  
  const playUndoSound = useCallback(() => {
    playSound('undo');
  }, [playSound]);
  
  const playErrorSound = useCallback(() => {
    playSound('error');
  }, [playSound]);
  
  const playScoreSound = useCallback(() => {
    playSound('score');
  }, [playSound]);

  const playAchievementSound = useCallback(() => {
    playSound('achievement');
  }, [playSound]);

  const playButtonSound = useCallback(() => {
    playSound('buttonClick');
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
    playAchievementSound,
    playButtonSound,
    playSound,
    isSoundEnabled,
    toggleSound,
    setSoundEnabled
  };
}
