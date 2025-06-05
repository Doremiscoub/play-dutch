
/**
 * Configuration des thèmes
 */
import { COLORS } from './colors';

export type ThemeType = 'default' | 'light' | 'dark';

export const THEMES = {
  default: {
    id: 'default',
    name: 'Dutch',
    colors: {
      primary: COLORS.blue.DEFAULT,
      secondary: COLORS.purple.DEFAULT,
      accent: COLORS.orange.DEFAULT,
      background: COLORS.gray[50],
    },
  },
  light: {
    id: 'light',
    name: 'Clair',
    colors: {
      primary: '#0A84FF',
      secondary: '#5856D6',
      accent: '#FF9F0A',
      background: '#F2F2F7',
    },
  },
  dark: {
    id: 'dark',
    name: 'Sombre',
    colors: {
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      accent: '#FF9F0A',
      background: '#1C1C1E',
    },
  },
};
