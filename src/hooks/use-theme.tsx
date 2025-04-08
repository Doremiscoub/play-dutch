
import React, { createContext, useState, useContext, useEffect } from 'react';
import { THEMES } from '@/config/theme';

// Type alias pour la compatibilité
export type ThemeType = 'default' | 'light' | 'dark';

// Export des constantes du thème pour faciliter l'accès
export const themeConfig = THEMES;

// Interface du contexte de thème
interface ThemeContextType {
  currentTheme: ThemeType;
}

// Création du contexte
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Type des props du fournisseur de thème
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Composant fournisseur de thème (simplifié)
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Thème fixé à 'default' comme demandé
  const [currentTheme] = useState<ThemeType>('default');

  // Appliquer le thème par défaut au chargement
  useEffect(() => {
    // Appliquer les couleurs CSS personnalisées au document
    const theme = THEMES[currentTheme] || THEMES.default;
    document.documentElement.style.setProperty('--dutch-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--dutch-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--dutch-accent', theme.colors.accent);
    document.documentElement.style.setProperty('--dutch-background', theme.colors.background);
    
    // Ajouter l'attribut data-theme au body
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
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
