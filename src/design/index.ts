/**
 * Design System Dutch - Export Centralisé
 */

// Tokens centralisés
export * from './tokens/centralized';

// Variants et factory
export * from './components/variants';

// Re-export des principaux éléments pour faciliter l'import
export { DESIGN_TOKENS, PRIMITIVE_COLORS, SEMANTIC_TOKENS, COMPONENT_TOKENS, GRADIENTS } from './tokens/centralized';
export { COMPONENT_VARIANTS, getComponentStyle, isDutchCompliant, getMigrationSuggestion } from './components/variants';

// Types principaux
export type { PrimitiveColors, SemanticTokens, ComponentTokens } from './tokens/centralized';