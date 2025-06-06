
import { useCallback } from 'react';

interface HapticFeedback {
  impact: (style?: 'light' | 'medium' | 'heavy') => void;
  notification: (type?: 'success' | 'warning' | 'error') => void;
  selection: () => void;
  isSupported: boolean;
}

export function useHapticFeedback(): HapticFeedback {
  const isSupported = 'vibrate' in navigator;

  const impact = useCallback((style: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!isSupported) return;
    
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30]
    };
    
    navigator.vibrate(patterns[style]);
  }, [isSupported]);

  const notification = useCallback((type: 'success' | 'warning' | 'error' = 'success') => {
    if (!isSupported) return;
    
    const patterns = {
      success: [100, 50, 100],
      warning: [200, 100, 200],
      error: [300, 100, 300, 100, 300]
    };
    
    navigator.vibrate(patterns[type]);
  }, [isSupported]);

  const selection = useCallback(() => {
    if (!isSupported) return;
    navigator.vibrate([5]);
  }, [isSupported]);

  return {
    impact,
    notification,
    selection,
    isSupported
  };
}
