
import React, { createContext, useState, useContext, useEffect } from 'react';

// Types de thèmes disponibles
export type ThemeType = 'default' | 'blue' | 'purple' | 'orange';
// Add ThemeId type alias to fix AdvancedThemeSelector
export type ThemeId = ThemeType;

// Configuration des thèmes
export const themeConfig = {
  default: {
    name: 'Default',
    primary: '#1EAEDB',
    secondary: '#8B5CF6',
    accent: '#F97316',
    background: '#F9FAFB',
  },
  blue: {
    name: 'Bleu',
    primary: '#3B82F6',
    secondary: '#60A5FA',
    accent: '#93C5FD',
    background: '#EFF6FF',
  },
  purple: {
    name: 'Violet',
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    accent: '#C4B5FD',
    background: '#F5F3FF',
  },
  orange: {
    name: 'Orange',
    primary: '#F97316',
    secondary: '#FB923C',
    accent: '#FDBA74',
    background: '#FFF7ED',
  },
};

// Interface du contexte de thème
interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeConfig: typeof themeConfig;
}

// Création du contexte
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Type des props du fournisseur de thème
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
}

// Composant fournisseur de thème
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'default' 
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    // Récupérer le thème depuis le localStorage s'il existe
    const savedTheme = localStorage.getItem('dutch_theme');
    return (savedTheme as ThemeType) || defaultTheme;
  });

  // Sauvegarder le thème dans le localStorage quand il change
  useEffect(() => {
    localStorage.setItem('dutch_theme', currentTheme);
    
    // Appliquer les couleurs CSS personnalisées au document
    const theme = themeConfig[currentTheme];
    document.documentElement.style.setProperty('--dutch-primary', theme.primary);
    document.documentElement.style.setProperty('--dutch-secondary', theme.secondary);
    document.documentElement.style.setProperty('--dutch-accent', theme.accent);
    document.documentElement.style.setProperty('--dutch-background', theme.background);
    
    // Ajouter l'attribut data-theme au body pour permettre le styling CSS basé sur le thème
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de thème
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  
  return context;
};

export default useTheme;
