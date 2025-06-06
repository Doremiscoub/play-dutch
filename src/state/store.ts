
import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface AppState {
  // Loading state
  loading: boolean;
  globalLoading: boolean;
  loadingMessage: string;
  setLoading: (v: boolean) => void;
  setGlobalLoading: (loading: boolean, message?: string) => void;
  
  // Error state
  error: string | null;
  globalError: string | null;
  setError: (e: string | null) => void;
  setGlobalError: (error: string | null) => void;
  
  // Theme state
  theme: 'light' | 'dark' | 'default';
  setTheme: (theme: 'light' | 'dark' | 'default') => void;
  
  // Navigation state
  isNavigating: boolean;
  setNavigating: (isNavigating: boolean) => void;
  
  // User preferences
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  
  // Tutorial state
  tutorialCompleted: boolean;
  setTutorialCompleted: (completed: boolean) => void;
  
  // General settings
  settings: Record<string, unknown>;
  updateSettings: (s: Partial<Record<string, unknown>>) => void;
}

export const appStore = create<AppState>()(
  persist(
    (set) => ({
      // Loading state (with aliases for compatibility)
      loading: false,
      globalLoading: false,
      loadingMessage: 'Chargement...',
      setLoading: (v) => set({ loading: v, globalLoading: v }),
      setGlobalLoading: (globalLoading, loadingMessage = 'Chargement...') => 
        set({ globalLoading, loading: globalLoading, loadingMessage }),
      
      // Error state (with aliases for compatibility)
      error: null,
      globalError: null,
      setError: (e) => set({ error: e, globalError: e }),
      setGlobalError: (globalError) => set({ globalError, error: globalError }),
      
      // Theme
      theme: 'default',
      setTheme: (theme) => set({ theme }),
      
      // Navigation
      isNavigating: false,
      setNavigating: (isNavigating) => set({ isNavigating }),
      
      // User preferences
      soundEnabled: true,
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      animationsEnabled: true,
      setAnimationsEnabled: (animationsEnabled) => set({ animationsEnabled }),
      
      // Tutorial
      tutorialCompleted: false,
      setTutorialCompleted: (tutorialCompleted) => set({ tutorialCompleted }),
      
      // General settings
      settings: {},
      updateSettings: (s) => set((st) => ({ settings: { ...st.settings, ...s } })),
    }),
    {
      name: 'dutch-app-state',
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        animationsEnabled: state.animationsEnabled,
        tutorialCompleted: state.tutorialCompleted,
        settings: state.settings,
      }),
    }
  )
);
