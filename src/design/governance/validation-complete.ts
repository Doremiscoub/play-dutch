/**
 * Validation Complète Dutch Design System
 * Script de vérification pour atteindre 100% de centralisation
 */

// ========== PATTERNS HARDCODÉS À ÉLIMINER ==========
export const CRITICAL_PATTERNS = {
  // Couleurs HEX absolument interdites
  hexColors: /#[0-9A-Fa-f]{6}/g,
  
  // RGB/RGBA functions hardcodées
  rgbaFunctions: /rgba?\([^)]+\)/g,
  
  // Couleurs Tailwind hardcodées critiques
  hardcodedWhite: /bg-white\/\d+|text-white(?!\s*\})|border-white\/\d+/g,
  hardcodedBlack: /bg-black\/\d+|text-black(?!\s*\})|border-black\/\d+/g,
  
  // Gradients hardcodés
  hardcodedGradients: /from-white|to-white|from-black|to-black/g,
  
  // Classes Tailwind arbitraires
  arbitraryColors: /bg-\[#[0-9A-Fa-f]+\]|text-\[#[0-9A-Fa-f]+\]|border-\[#[0-9A-Fa-f]+\]/g,
} as const;

// ========== MAPPING MIGRATION AUTOMATIQUE ==========
export const AUTO_MIGRATION_MAP = {
  // Couleurs communes → Tokens
  '#FFFFFF': 'hsl(var(--background))',
  '#000000': 'hsl(var(--foreground))',
  '#8B5CF6': 'hsl(var(--dutch-purple))',
  '#1EAEDB': 'hsl(var(--dutch-blue))',
  '#F97316': 'hsl(var(--dutch-orange))',
  '#10B981': 'hsl(var(--success))',
  '#F59E0B': 'hsl(var(--warning))',
  '#EF4444': 'hsl(var(--error))',
  
  // Classes Tailwind → Tokens centralisés
  'bg-white/80': 'glass-light',
  'bg-white/70': 'glass-medium', 
  'bg-white/60': 'glass-heavy',
  'bg-white/50': 'glass-dark',
  'border-white/50': 'border-glass-border-light',
  'border-white/30': 'border-glass-border-medium',
  'text-white': 'text-background',
  
  // Gradients → Centralisés
  'from-white to-gray-50': 'gradient-surface',
  'from-blue-500 to-purple-500': 'gradient-trinity',
  'from-purple-400 to-blue-500': 'gradient-gaming',
} as const;

// ========== VALIDATION STRICTE ==========
export interface ComplianceReport {
  file: string;
  score: number;
  violations: ViolationReport[];
  suggestions: MigrationSuggestion[];
  status: 'compliant' | 'needs-migration' | 'critical';
}

export interface ViolationReport {
  type: 'color' | 'class' | 'style' | 'gradient';
  line: number;
  content: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  autoFixable: boolean;
}

export interface MigrationSuggestion {
  original: string;
  replacement: string;
  reason: string;
  confidence: number; // 0-100
}

// ========== SCANNER AUTOMATIQUE ==========
export const scanFileCompliance = (content: string, filePath: string): ComplianceReport => {
  const violations: ViolationReport[] = [];
  const suggestions: MigrationSuggestion[] = [];
  
  // Scan couleurs HEX
  const hexMatches = content.match(CRITICAL_PATTERNS.hexColors) || [];
  hexMatches.forEach(match => {
    violations.push({
      type: 'color',
      line: findLineNumber(content, match),
      content: match,
      severity: 'critical',
      autoFixable: AUTO_MIGRATION_MAP[match as keyof typeof AUTO_MIGRATION_MAP] !== undefined,
    });
    
    // Suggestion automatique si mapping existe
    const replacement = AUTO_MIGRATION_MAP[match as keyof typeof AUTO_MIGRATION_MAP];
    if (replacement) {
      suggestions.push({
        original: match,
        replacement,
        reason: 'Replace hardcoded color with design token',
        confidence: 95,
      });
    }
  });
  
  // Scan RGBA functions
  const rgbaMatches = content.match(CRITICAL_PATTERNS.rgbaFunctions) || [];
  rgbaMatches.forEach(match => {
    violations.push({
      type: 'color',
      line: findLineNumber(content, match),
      content: match,
      severity: 'high',
      autoFixable: false, // Nécessite analyse contextuelle
    });
  });
  
  // Scan classes Tailwind hardcodées
  Object.entries(AUTO_MIGRATION_MAP).forEach(([old, newToken]) => {
    if (old.startsWith('bg-') || old.startsWith('text-') || old.startsWith('border-')) {
      if (content.includes(old)) {
        violations.push({
          type: 'class',
          line: findLineNumber(content, old),
          content: old,
          severity: 'medium',
          autoFixable: true,
        });
        
        suggestions.push({
          original: old,
          replacement: newToken,
          reason: 'Use centralized utility class',
          confidence: 90,
        });
      }
    }
  });
  
  // Calcul du score
  const totalLines = content.split('\n').length;
  const violationWeight = violations.reduce((acc, v) => {
    const weights = { low: 1, medium: 2, high: 5, critical: 10 };
    return acc + weights[v.severity];
  }, 0);
  
  const score = Math.max(0, 100 - (violationWeight / totalLines) * 100);
  
  // Détermination du statut
  let status: ComplianceReport['status'] = 'compliant';
  if (score < 95) status = 'needs-migration';
  if (score < 70) status = 'critical';
  
  return {
    file: filePath,
    score: Math.round(score),
    violations,
    suggestions,
    status,
  };
};

const findLineNumber = (content: string, searchTerm: string): number => {
  const lines = content.split('\n');
  const lineIndex = lines.findIndex(line => line.includes(searchTerm));
  return lineIndex + 1;
};

// ========== AUTO-FIX FUNCTION ==========
export const autoFixFile = (content: string): string => {
  let fixedContent = content;
  
  // Application automatique des migrations
  Object.entries(AUTO_MIGRATION_MAP).forEach(([old, replacement]) => {
    const regex = new RegExp(escapeRegExp(old), 'g');
    fixedContent = fixedContent.replace(regex, replacement);
  });
  
  return fixedContent;
};

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// ========== UTILITAIRES DE REPORTING ==========
export const generateComplianceReport = (reports: ComplianceReport[]): string => {
  const totalFiles = reports.length;
  const compliantFiles = reports.filter(r => r.status === 'compliant').length;
  const needsMigration = reports.filter(r => r.status === 'needs-migration').length;
  const criticalFiles = reports.filter(r => r.status === 'critical').length;
  
  const averageScore = Math.round(
    reports.reduce((acc, r) => acc + r.score, 0) / totalFiles
  );
  
  return `
# 🎯 RAPPORT DE CONFORMITÉ DUTCH DESIGN SYSTEM

## 📊 **MÉTRIQUES GÉNÉRALES**
- **Score moyen** : ${averageScore}%
- **Fichiers conformes** : ${compliantFiles}/${totalFiles} (${Math.round(compliantFiles/totalFiles*100)}%)
- **Fichiers à migrer** : ${needsMigration}
- **Fichiers critiques** : ${criticalFiles}

## 🚨 **FICHIERS NÉCESSITANT UNE MIGRATION**
${reports
  .filter(r => r.status !== 'compliant')
  .map(r => `- **${r.file}** (Score: ${r.score}%) - ${r.violations.length} violations`)
  .join('\n')}

## 🔧 **MIGRATIONS AUTOMATIQUES DISPONIBLES**
${reports
  .flatMap(r => r.suggestions)
  .filter((s, i, arr) => arr.findIndex(s2 => s2.original === s.original) === i)
  .map(s => `- \`${s.original}\` → \`${s.replacement}\` (${s.confidence}% confiance)`)
  .join('\n')}

---
*Rapport généré automatiquement - Dutch Design System*
  `;
};

// ========== EXPORT POUR UTILISATION DÉVELOPPEMENT ==========
export const DutchValidation = {
  scanFile: scanFileCompliance,
  autoFix: autoFixFile,
  generateReport: generateComplianceReport,
  patterns: CRITICAL_PATTERNS,
  migrations: AUTO_MIGRATION_MAP,
} as const;