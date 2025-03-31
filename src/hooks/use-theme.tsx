
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeId = 'blue' | 'green' | 'pink' | 'red' | 'purple';

// Theme configuration with consistent color palettes
export const themeConfig = {
  blue: {
    primary: '#1EAEDB',
    secondary: '#F97316',
    accent: '#8B5CF6',
    name: 'Bleu Classique'
  },
  green: {
    primary: '#10B981',
    secondary: '#FBBF24',
    accent: '#3B82F6',
    name: 'Vert Émeraude'
  },
  pink: {
    primary: '#D946EF',
    secondary: '#F97316',
    accent: '#6366F1',
    name: 'Rose Vif'
  },
  red: {
    primary: '#EF4444',
    secondary: '#F59E0B',
    accent: '#8B5CF6',
    name: 'Rouge Passion'
  },
  purple: {
    primary: '#8B5CF6',
    secondary: '#10B981',
    accent: '#F97316',
    name: 'Violet Royal'
  }
};

interface ThemeState {
  currentTheme: ThemeId;
  setTheme: (themeId: ThemeId) => void;
  getThemeColors: () => typeof themeConfig.blue;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: 'blue',
      setTheme: (themeId: ThemeId) => {
        document.documentElement.setAttribute('data-theme', themeId);
        set({ currentTheme: themeId });
      },
      getThemeColors: () => {
        const { currentTheme } = get();
        return themeConfig[currentTheme];
      }
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
