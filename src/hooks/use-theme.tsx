
import React, { createContext, useState, useContext, useEffect } from 'react';
import themeConfig, { ThemeType, THEMES } from '@/config/theme';

// Type alias pour la compatibilité avec l'existant
export type { ThemeType };
export type ThemeId = ThemeType;

// Export des constantes du thème pour faciliter l'accès
export { THEMES as themeConfig };

// Interface du contexte de thème
interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeConfig: typeof THEMES;
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
    const theme = THEMES[currentTheme as keyof typeof THEMES] || THEMES.default;
    document.documentElement.style.setProperty('--dutch-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--dutch-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--dutch-accent', theme.colors.accent);
    document.documentElement.style.setProperty('--dutch-background', theme.colors.background);
    
    // Ajouter l'attribut data-theme au body pour permettre le styling CSS basé sur le thème
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeConfig: THEMES }}>
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
