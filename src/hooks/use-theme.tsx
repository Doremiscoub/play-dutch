
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeId = 'blue' | 'green' | 'pink' | 'red' | 'purple';

interface ThemeState {
  currentTheme: ThemeId;
  setTheme: (themeId: ThemeId) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: 'blue',
      setTheme: (themeId: ThemeId) => {
        document.documentElement.setAttribute('data-theme', themeId);
        set({ currentTheme: themeId });
      },
    }),
    {
      name: 'dutch-theme',
    }
  )
);

// Initialise le thème au chargement
if (typeof window !== 'undefined') {
  const storedTheme = localStorage.getItem('dutch-theme');
  if (storedTheme) {
    try {
      const parsedState = JSON.parse(storedTheme);
      const themeId = parsedState.state?.currentTheme || 'blue';
      document.documentElement.setAttribute('data-theme', themeId);
    } catch (error) {
      console.error('Error parsing theme from localStorage', error);
      document.documentElement.setAttribute('data-theme', 'blue');
    }
  } else {
    document.documentElement.setAttribute('data-theme', 'blue');
  }
}
