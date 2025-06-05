
# DESIGN SYSTEM BLUEPRINT - DUTCH

*Projet : Dutch Game Score Tracker*
*Framework : React 18 + TypeScript + Tailwind + ShadCN*

## 🎨 ARCHITECTURE VISION

### Structure Cible
```
src/
├── design/
│   ├── tokens/
│   │   ├── colors.ts          # Palette unifiée
│   │   ├── typography.ts      # Échelles de texte
│   │   ├── spacing.ts         # Espacement système
│   │   ├── elevation.ts       # Ombres & z-index
│   │   └── index.ts          # Export centralisé
│   ├── components/
│   │   ├── atoms/            # Button, Input, Badge...
│   │   ├── molecules/        # Card, Form, Navigation...
│   │   └── layouts/          # PageShell, Grid, Stack...
│   └── theme/
│       ├── ThemeProvider.tsx # Provider React global
│       └── themeUtils.ts     # Utilitaires thème
```

## 🔧 TOKENS SYSTEM

### 1. Colors (design/tokens/colors.ts)
```typescript
export const COLORS = {
  // Brand Colors (Dutch Game)
  primary: {
    50: '#EFF6FF',   // Ultra light blue
    100: '#DBEAFE',  // Light blue
    500: '#0A84FF',  // Main blue (Dutch blue)
    600: '#0062CC',  // Dark blue
    900: '#002952',  // Darkest blue
  },
  secondary: {
    50: '#F3EEFF',   // Ultra light purple
    100: '#E9D5FF',  // Light purple
    500: '#8B5CF6',  // Main purple
    600: '#6D28D9',  // Dark purple
    900: '#3C1A78',  // Darkest purple
  },
  accent: {
    50: '#FFF4E6',   // Ultra light orange
    100: '#FFE4CC',  // Light orange
    500: '#FF9F0A',  // Main orange
    600: '#E67700',  // Dark orange
    900: '#B35A00',  // Darkest orange
  },
  // Semantic Colors
  success: { 50: '#F0FDF4', 500: '#30D158', 900: '#16A34A' },
  warning: { 50: '#FEFCE8', 500: '#FFD60A', 900: '#EAB308' },
  error: { 50: '#FEF2F2', 500: '#FF453A', 900: '#DC2626' },
  // Neutral Scale
  neutral: {
    0: '#FFFFFF',    // Pure white
    50: '#F9FAFB',   // Background
    100: '#F3F4F6',  // Light surface
    200: '#E5E7EB',  // Border light
    300: '#D1D5DB',  // Border
    400: '#9CA3AF',  // Text muted
    500: '#6B7280',  // Text secondary
    600: '#4B5563',  // Text primary
    700: '#374151',  // Text strong
    800: '#1F2937',  // Text strongest
    900: '#111827',  // Almost black
  }
}
```

### 2. Typography (design/tokens/typography.ts)
```typescript
export const TYPOGRAPHY = {
  fontFamily: {
    sans: ['SF Pro Text', 'SF Pro Display', 'system-ui', 'sans-serif'],
    mono: ['SF Mono', 'Menlo', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }
}
```

### 3. Spacing (design/tokens/spacing.ts)
```typescript
export const SPACING = {
  px: '1px',
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
}
```

### 4. Elevation (design/tokens/elevation.ts)
```typescript
export const ELEVATION = {
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    glass: '0 8px 32px rgba(31, 38, 135, 0.37)',
  },
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  }
}
```

## 🧩 COMPONENT ARCHITECTURE

### Atoms (design/components/atoms/)
```typescript
// Button variants
type ButtonVariant = 
  | 'primary'     // Dutch blue, white text
  | 'secondary'   // Purple, white text  
  | 'accent'      // Orange, white text
  | 'ghost'       // Transparent, colored text
  | 'outline'     // Border, colored text

// Button sizes
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

// Card variants
type CardVariant = 
  | 'default'     // White background, light border
  | 'elevated'    // White + shadow
  | 'glass'       // Glassmorphism effect
  | 'game'        // Dutch game specific styling

// Input variants
type InputVariant = 
  | 'outline'     // Border input
  | 'filled'      // Background filled
  | 'ghost'       // Minimal styling
```

### Molecules (design/components/molecules/)
- **PlayerCard** : Affichage joueur + score
- **ScoreInput** : Saisie score avec validation
- **GameHeader** : En-tête partie avec actions
- **NavigationMenu** : Menu principal application

### Layouts (design/components/layouts/)
- **PageShell** : Layout principal avec sidebar/topbar
- **GameLayout** : Layout spécifique jeu
- **ModalContainer** : Container modal avec backdrop
- **GridSystem** : Grille responsive

## 🎭 THEME PROVIDER

### Context Structure
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  colors: typeof COLORS;
  typography: typeof TYPOGRAPHY;
  spacing: typeof SPACING;
  elevation: typeof ELEVATION;
  setTheme: (theme: ThemeType) => void;
}
```

### Provider Implementation
- Context React centralisé
- Support multi-thèmes (clair/sombre)
- Persistence localStorage
- CSS variables dynamiques

## 📱 RESPONSIVE STRATEGY

### Breakpoints
```typescript
export const BREAKPOINTS = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
}
```

### Mobile-First Approach
- Composants optimisés touch
- Navigation adaptative
- Tailles de texte fluides
- Espacement responsive

## ⚡ PERFORMANCE TARGETS

### Bundle Size
- **Components** : < 50KB gzipped
- **Tokens** : < 5KB gzipped
- **Theme** : < 10KB gzipped

### Runtime
- **Theme switching** : < 16ms
- **Component render** : < 4ms
- **Token access** : < 1ms

## 🚀 MIGRATION PLAN

### Phase 1 : Foundation
1. Créer structure `design/tokens/`
2. Migrer couleurs existantes
3. Setup ThemeProvider basique

### Phase 2 : Components
1. Refactorer Button vers atoms/
2. Créer Card unifié
3. Migrer Input/Form components

### Phase 3 : Layouts
1. Créer PageShell
2. Migrer pages existantes
3. Optimiser navigation

### Phase 4 : Polish
1. Animations cohérentes
2. Accessibility audit
3. Performance optimization

---

*Blueprint prêt pour implémentation - Phase A commence*
