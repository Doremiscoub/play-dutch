
import { useState, useCallback } from 'react';

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification';

interface HapticFeedbackOptions {
  pattern?: HapticPattern;
  duration?: number;
  intensity?: number;
}

export const useHapticFeedback = () => {
  const [isSupported, setIsSupported] = useState<boolean>(() => {
    // Vérifier le support du feedback haptique
    return !!(
      'vibrate' in navigator || 
      'hapticFeedback' in navigator ||
      // @ts-ignore - API non standard mais présente sur certains navigateurs
      window.DeviceMotionEvent?.requestPermission
    );
  });

  const triggerHaptic = useCallback((options: HapticFeedbackOptions = {}) => {
    const { pattern = 'light', duration = 50, intensity = 1 } = options;
    
    if (!isSupported) {
      console.log('Haptic feedback not supported on this device');
      return false;
    }

    try {
      // Patterns de vibration basés sur iOS/Android
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50],
        selection: [5],
        impact: [30, 10, 30],
        notification: [100, 50, 100, 50, 200]
      };

      const vibrationPattern = patterns[pattern] || patterns.light;
      
      // Utiliser l'API Vibration si disponible
      if ('vibrate' in navigator) {
        navigator.vibrate(vibrationPattern.map(v => v * intensity));
        return true;
      }
      
      // Fallback pour d'autres APIs
      // @ts-ignore
      if (window.DeviceMotionEvent?.requestPermission) {
        // @ts-ignore
        window.DeviceMotionEvent.requestPermission().then((response: string) => {
          if (response === 'granted') {
            navigator.vibrate?.(vibrationPattern);
          }
        });
        return true;
      }

      return false;
    } catch (error) {
      console.warn('Haptic feedback error:', error);
      return false;
    }
  }, [isSupported]);

  // Fonctions de convenance pour les patterns courants
  const lightTap = useCallback(() => triggerHaptic({ pattern: 'light' }), [triggerHaptic]);
  const mediumTap = useCallback(() => triggerHaptic({ pattern: 'medium' }), [triggerHaptic]);
  const heavyTap = useCallback(() => triggerHaptic({ pattern: 'heavy' }), [triggerHaptic]);
  const selectionChanged = useCallback(() => triggerHaptic({ pattern: 'selection' }), [triggerHaptic]);
  const impactOccurred = useCallback(() => triggerHaptic({ pattern: 'impact' }), [triggerHaptic]);
  const notificationOccurred = useCallback(() => triggerHaptic({ pattern: 'notification' }), [triggerHaptic]);

  return {
    isSupported,
    triggerHaptic,
    lightTap,
    mediumTap,
    heavyTap,
    selectionChanged,
    impactOccurred,
    notificationOccurred
  };
};
