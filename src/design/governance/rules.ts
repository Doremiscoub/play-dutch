/**
 * Dutch Design System - Gouvernance & Guidelines
 * Rules et validation pour maintenir la cohérence
 */

import { DESIGN_TOKENS } from '../tokens/centralized';

// ========== RÈGLES DE VALIDATION ==========
export const DESIGN_RULES = {
  // Couleurs interdites (hardcodées)
  FORBIDDEN_COLORS: [
    /#[0-9A-Fa-f]{6}/g,        // HEX colors
    /rgba?\([^)]+\)/g,         // RGB/RGBA
    /hsl\([^)]+\)/g,           // HSL direct (sauf variables)
  ],
  
  // Classes Tailwind interdites
  FORBIDDEN_CLASSES: [
    /bg-\[#[0-9A-Fa-f]+\]/g,   // Arbitrary background colors
    /text-\[#[0-9A-Fa-f]+\]/g, // Arbitrary text colors
    /border-\[#[0-9A-Fa-f]+\]/g, // Arbitrary border colors
    /shadow-\[.*\]/g,          // Arbitrary shadows
  ],
  
  // Patterns approuvés
  APPROVED_PATTERNS: [
    /btn-glass/,               // Boutons glassmorphisme
    /card-glass/,              // Cartes glassmorphisme
    /text-trinity/,            // Texte gradient Trinity
    /shadow-trinity/,          // Ombres Trinity
    /trinity-\w+-\d+/,         // Couleurs Trinity
    /glass-\w+/,              // Variables glassmorphisme
    /hsl\(var\(--\w+\)\)/,    // Variables CSS
  ],
} as const;

// ========== VALIDATION FUNCTIONS ==========
export const validateComponentCode = (code: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for forbidden colors
  DESIGN_RULES.FORBIDDEN_COLORS.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) {
      errors.push(`Forbidden color found: ${matches.join(', ')}. Use design tokens instead.`);
    }
  });
  
  // Check for forbidden classes
  DESIGN_RULES.FORBIDDEN_CLASSES.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) {
      errors.push(`Forbidden arbitrary class found: ${matches.join(', ')}. Use component variants instead.`);
    }
  });
  
  // Check if using approved patterns
  const hasApprovedPatterns = DESIGN_RULES.APPROVED_PATTERNS.some(pattern => pattern.test(code));
  if (!hasApprovedPatterns && (code.includes('className') || code.includes('style'))) {
    warnings.push('No Dutch design system patterns detected. Consider using design tokens.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: calculateComplianceScore(code),
  };
};

const calculateComplianceScore = (code: string): number => {
  let score = 100;
  
  // Déduction pour couleurs hardcodées
  const hardcodedColors = code.match(/#[0-9A-Fa-f]{6}|rgba?\([^)]+\)/g) || [];
  score -= hardcodedColors.length * 10;
  
  // Bonus pour patterns approuvés
  const approvedUsage = DESIGN_RULES.APPROVED_PATTERNS.filter(pattern => pattern.test(code)).length;
  score += approvedUsage * 5;
  
  return Math.max(0, Math.min(100, score));
};

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

// ========== MIGRATION HELPERS ==========
export const MIGRATION_MAP = {
  // Anciens styles vers nouveaux tokens
  colors: {
    '#8B5CF6': 'trinity-purple-400',
    '#0A84FF': 'trinity-blue-500', 
    '#FF9F0A': 'trinity-orange-500',
    '#30D158': 'success',
    'rgba(255, 255, 255, 0.8)': 'glass-light',
    'rgba(255, 255, 255, 0.7)': 'glass-medium',
  },
  
  classes: {
    'bg-white/80': 'card-glass',
    'bg-white/70': 'btn-glass',
    'border-white/50': 'border-glass-border-light',
    'shadow-lg': 'shadow-glass',
    'from-dutch-blue via-dutch-purple to-dutch-orange': 'btn-glass-trinity',
    'bg-gradient-to-r from-dutch-blue to-dutch-purple': 'text-trinity',
  },
  
  components: {
    'Button + hardcoded styles': 'Use Button variant="trinity|glass|gaming"',
    'Card + hardcoded background': 'Use Card className="card-glass"',
    'Badge + hardcoded colors': 'Use Badge variant from component tokens',
  },
} as const;

export const getMigrationSuggestions = (code: string): MigrationSuggestion[] => {
  const suggestions: MigrationSuggestion[] = [];
  
  // Suggestions pour couleurs
  Object.entries(MIGRATION_MAP.colors).forEach(([old, newToken]) => {
    if (code.includes(old)) {
      suggestions.push({
        type: 'color',
        old,
        new: newToken,
        description: `Replace hardcoded color with design token`,
        urgency: 'high',
      });
    }
  });
  
  // Suggestions pour classes
  Object.entries(MIGRATION_MAP.classes).forEach(([old, newClass]) => {
    if (code.includes(old)) {
      suggestions.push({
        type: 'class',
        old,
        new: newClass,
        description: `Use centralized utility class`,
        urgency: 'medium',
      });
    }
  });
  
  return suggestions;
};

export interface MigrationSuggestion {
  type: 'color' | 'class' | 'component';
  old: string;
  new: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

// ========== GUIDELINES D'UTILISATION ==========
export const USAGE_GUIDELINES = {
  // Couleurs - Toujours utiliser les tokens
  colors: {
    DO: [
      'Use DESIGN_TOKENS.primitive.dutch.blue[500]',
      'Use CSS variables: hsl(var(--dutch-blue))',
      'Use utility classes: text-trinity-blue-500',
    ],
    DONT: [
      'Never use HEX colors: #8B5CF6',
      'Never use RGB: rgba(139, 92, 246, 0.5)',
      'Never use arbitrary Tailwind: bg-[#8B5CF6]',
    ],
  },
  
  // Composants - Utiliser les variants
  components: {
    DO: [
      '<Button variant="trinity">Primary Action</Button>',
      '<Card className="card-glass">Content</Card>',
      '<Badge variant="legendary">Epic</Badge>',
    ],
    DONT: [
      '<Button style={{background: "#8B5CF6"}}>Action</Button>',
      '<div className="bg-white/80">Content</div>',
      '<span className="bg-orange-200">Badge</span>',
    ],
  },
  
  // Architecture - Respecter la hiérarchie
  architecture: {
    DO: [
      'Import from src/design for all design needs',
      'Use validation functions in development',
      'Follow the 3-level token hierarchy',
    ],
    DONT: [
      'Create local color variables',
      'Mix old and new systems',
      'Skip the design system for "quick fixes"',
    ],
  },
} as const;

// ========== AUDIT FUNCTIONS ==========
export const auditComponentCompliance = (filePath: string, content: string) => {
  const validation = validateComponentCode(content);
  const migrations = getMigrationSuggestions(content);
  
  return {
    file: filePath,
    compliance: validation,
    migrations,
    recommendation: getRecommendation(validation.score),
  };
};

const getRecommendation = (score: number): string => {
  if (score >= 90) return 'Excellent compliance! 🎉';
  if (score >= 70) return 'Good compliance, minor improvements needed 👍';
  if (score >= 50) return 'Moderate compliance, refactoring recommended ⚠️';
  return 'Poor compliance, urgent refactoring required 🚨';
};

// ========== DEVELOPMENT TOOLS ==========
export const createDevelopmentHelpers = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Helper global pour debugging
    (window as any).DutchDesignSystem = {
      tokens: DESIGN_TOKENS,
      validate: validateComponentCode,
      migrate: getMigrationSuggestions,
      guidelines: USAGE_GUIDELINES,
    };
  }
};

export type { ValidationResult as RulesValidationResult, MigrationSuggestion as RulesMigrationSuggestion };