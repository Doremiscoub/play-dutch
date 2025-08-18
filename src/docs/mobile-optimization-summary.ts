export const MOBILE_OPTIMIZATION = {
  // Headers mobiles optimisés avec design moderne
  headers: {
    game: 'MobileGameHeader - Header spécialisé pour les parties avec badges info',
    page: 'MobilePageHeader - Header générique pour toutes les pages',
    home: 'MobileHomeHeader - Header spécialisé pour l\'accueil avec logo animé'
  },

  // Composants de layout mobile
  layout: {
    page: 'MobilePageLayout - Container principal avec safe areas',
    content: 'MobileContentArea - Zone de contenu avec scroll optimisé',
    navigation: 'MobileNavigationTabs - Tabs de navigation flottantes',
    scroll: 'MobileScrollContainer - Container de scroll avec padding intelligent'
  },

  // Hooks d'optimisation
  hooks: {
    optimization: 'useMobileOptimization - Détection des capacités mobiles',
    adaptation: 'useMobileAdaptation - Adaptation automatique des tailles',
    layout: 'useMobileLayout - Helpers pour layout responsive'
  },

  // Classes CSS ajoutées
  css: {
    safeAreas: 'Classes .safe-area-* pour support des encoches',
    performance: 'Classes .motion-reduce, .performance-mode pour optimisation',
    touch: 'Optimisations tactiles avec min-height 44px',
    ios: 'Support spécifique iOS avec safe-area-inset-*',
    android: 'Optimisations Android avec transform et backface-visibility'
  },

  // Architecture mise en place
  architecture: {
    autoDetection: 'Détection automatique mobile dans UnifiedHeader',
    conditionalRender: 'Rendu conditionnel des headers selon device et contexte',
    semanticTokens: 'Utilisation des tokens dutch-* pour cohérence',
    animations: 'Animations fluides avec Framer Motion',
    accessibility: 'Conformité WCAG avec aria-labels et transitions'
  }
} as const;