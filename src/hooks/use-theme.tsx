
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeId = 'blue' | 'green' | 'pink' | 'red' | 'purple' | string;

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
        // For built-in themes, return from themeConfig
        if (themeConfig[currentTheme]) {
          return themeConfig[currentTheme];
        }
        
        // For custom themes, check localStorage
        if (typeof window !== 'undefined') {
          try {
            const customThemes = JSON.parse(localStorage.getItem('dutch_custom_themes') || '[]');
            const customTheme = customThemes.find((theme: any) => theme.id === currentTheme);
            if (customTheme) {
              return {
                primary: customTheme.primary,
                secondary: customTheme.secondary,
                accent: customTheme.accent,
                name: customTheme.name
              };
            }
          } catch (error) {
            console.error('Error retrieving custom theme', error);
          }
        }
        
        // Fallback to default theme
        return themeConfig.blue;
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
