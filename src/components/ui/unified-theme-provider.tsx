
import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES, ThemeType } from '@/config/theme/themes';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
  toggleTheme: () => void;
  systemPreference: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface UnifiedThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  storageKey?: string;
}

export const UnifiedThemeProvider: React.FC<UnifiedThemeProviderProps> = ({
  children,
  defaultTheme = 'default',
  storageKey = 'dutch-theme'
}) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Détecter la préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Charger le thème depuis le localStorage
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as ThemeType;
      if (storedTheme && Object.keys(THEMES).includes(storedTheme)) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.warn('Erreur lors du chargement du thème:', error);
    }
    setMounted(true);
  }, [storageKey]);

  // Appliquer le thème
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const selectedTheme = THEMES[theme];

    // Supprimer les anciennes classes de thème
    Object.keys(THEMES).forEach(themeName => {
      root.classList.remove(`theme-${themeName}`);
    });

    // Ajouter la nouvelle classe de thème
    root.classList.add(`theme-${theme}`);

    // Appliquer les variables CSS personnalisées
    Object.entries(selectedTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    // Sauvegarder dans localStorage
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Erreur lors de la sauvegarde du thème:', error);
    }
  }, [theme, mounted, storageKey]);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    isDark,
    toggleTheme,
    systemPreference
  };

  // Éviter le flash de contenu non-stylé
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useUnifiedTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useUnifiedTheme must be used within a UnifiedThemeProvider');
  }
  return context;
};

// Composant de sélecteur de thème
export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useUnifiedTheme();

  return (
    <div className="flex gap-2">
      {Object.entries(THEMES).map(([key, themeConfig]) => (
        <button
          key={key}
          onClick={() => setTheme(key as ThemeType)}
          className={`
            w-8 h-8 rounded-full border-2 transition-all duration-200
            ${theme === key ? 'border-white shadow-lg scale-110' : 'border-white/30 hover:scale-105'}
          `}
          style={{ backgroundColor: themeConfig.colors.primary }}
          aria-label={`Sélectionner le thème ${themeConfig.name}`}
          title={themeConfig.name}
        />
      ))}
    </div>
  );
};
