
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Theme state
  theme: 'light' | 'dark' | 'default';
  setTheme: (theme: 'light' | 'dark' | 'default') => void;
  
  // Navigation state
  isNavigating: boolean;
  setNavigating: (isNavigating: boolean) => void;
  
  // Loading state
  globalLoading: boolean;
  loadingMessage: string;
  setGlobalLoading: (loading: boolean, message?: string) => void;
  
  // Error state
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
  
  // User preferences
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  
  // Tutorial state
  tutorialCompleted: boolean;
  setTutorialCompleted: (completed: boolean) => void;
}

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'default',
      setTheme: (theme) => set({ theme }),
      
      // Navigation
      isNavigating: false,
      setNavigating: (isNavigating) => set({ isNavigating }),
      
      // Loading
      globalLoading: false,
      loadingMessage: 'Chargement...',
      setGlobalLoading: (globalLoading, loadingMessage = 'Chargement...') => 
        set({ globalLoading, loadingMessage }),
      
      // Error
      globalError: null,
      setGlobalError: (globalError) => set({ globalError }),
      
      // User preferences
      soundEnabled: true,
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      animationsEnabled: true,
      setAnimationsEnabled: (animationsEnabled) => set({ animationsEnabled }),
      
      // Tutorial
      tutorialCompleted: false,
      setTutorialCompleted: (tutorialCompleted) => set({ tutorialCompleted }),
    }),
    {
      name: 'dutch-app-state',
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        animationsEnabled: state.animationsEnabled,
        tutorialCompleted: state.tutorialCompleted,
      }),
    }
  )
);
