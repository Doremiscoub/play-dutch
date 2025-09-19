import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Eye, EyeOff, Keyboard, MousePointer, 
  Volume2, AlertTriangle, CheckCircle, 
  Zap, RefreshCw, Users
} from 'lucide-react';

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'notice';
  category: 'color' | 'keyboard' | 'screen-reader' | 'focus' | 'semantic';
  element: string;
  description: string;
  solution: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

interface AccessibilityReport {
  score: number;
  totalIssues: number;
  issues: AccessibilityIssue[];
  passedChecks: number;
  totalChecks: number;
}

export const AccessibilityChecker: React.FC = () => {
  const [report, setReport] = useState<AccessibilityReport | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Simulation d'un rapport d'accessibilité
  const simulatedReport: AccessibilityReport = {
    score: 85,
    totalIssues: 8,
    passedChecks: 34,
    totalChecks: 42,
    issues: [
      {
        type: 'error',
        category: 'color',
        element: 'Button.primary',
        description: 'Contraste insuffisant entre le texte et l\'arrière-plan',
        solution: 'Augmenter le contraste à au moins 4.5:1 pour le niveau AA',
        wcagLevel: 'AA'
      },
      {
        type: 'warning',
        category: 'keyboard',
        element: 'Modal.close',
        description: 'Bouton de fermeture non accessible au clavier',
        solution: 'Ajouter tabIndex={0} et gérer les événements onKeyDown',
        wcagLevel: 'A'
      },
      {
        type: 'error',
        category: 'screen-reader',
        element: 'img[decorative]',
        description: 'Image décorative sans attribut alt vide',
        solution: 'Ajouter alt="" pour les images décoratives',
        wcagLevel: 'A'
      },
      {
        type: 'warning',
        category: 'focus',
        element: 'Input.search',
        description: 'Indicateur de focus peu visible',
        solution: 'Améliorer le style de focus avec outline ou box-shadow',
        wcagLevel: 'AA'
      },
      {
        type: 'notice',
        category: 'semantic',
        element: 'div[clickable]',
        description: 'Élément cliquable non sémantique',
        solution: 'Utiliser <button> ou ajouter role="button"',
        wcagLevel: 'A'
      },
      {
        type: 'warning',
        category: 'screen-reader',
        element: 'Form.submit',
        description: 'Formulaire sans label associé',
        solution: 'Associer les labels aux inputs avec htmlFor/id',
        wcagLevel: 'A'
      },
      {
        type: 'error',
        category: 'color',
        element: 'Status.success',
        description: 'Information transmise uniquement par la couleur',
        solution: 'Ajouter un indicateur textuel ou une icône',
        wcagLevel: 'A'
      },
      {
        type: 'notice',
        category: 'keyboard',
        element: 'Dropdown.menu',
        description: 'Navigation au clavier dans le menu améliorable',
        solution: 'Implémenter la navigation avec les flèches',
        wcagLevel: 'AA'
      }
    ]
  };

  const runAccessibilityCheck = async () => {
    setIsChecking(true);
    // Simulation de vérification
    await new Promise(resolve => setTimeout(resolve, 1500));
    setReport(simulatedReport);
    setIsChecking(false);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'color': return <Eye className="h-4 w-4" />;
      case 'keyboard': return <Keyboard className="h-4 w-4" />;
      case 'screen-reader': return <Volume2 className="h-4 w-4" />;
      case 'focus': return <MousePointer className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredIssues = report?.issues.filter(issue => 
    selectedCategory === 'all' || issue.category === selectedCategory
  ) || [];

  const categories = ['all', 'color', 'keyboard', 'screen-reader', 'focus', 'semantic'];

  return (
    <Card className="glass-morphism border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Vérificateur d'Accessibilité
        </CardTitle>
        <CardDescription>
          Analysez la conformité WCAG de votre application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!report ? (
          <div className="text-center py-8">
            <Button 
              onClick={runAccessibilityCheck} 
              disabled={isChecking}
              className="bg-primary hover:bg-primary/90"
            >
              {isChecking ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Vérification en cours...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Vérifier l'Accessibilité
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            {/* Score global */}
            <div className="text-center space-y-4">
              <div className={`text-4xl font-bold ${getScoreColor(report.score)}`}>
                {report.score}/100
              </div>
              <div className="text-muted-foreground">Score d'accessibilité</div>
              <Progress value={report.score} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {report.passedChecks}/{report.totalChecks} vérifications réussies
              </div>
            </div>

            {/* Résumé */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 glass-card rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {report.issues.filter(i => i.type === 'error').length}
                </div>
                <div className="text-sm text-muted-foreground">Erreurs</div>
              </div>
              <div className="text-center p-3 glass-card rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {report.issues.filter(i => i.type === 'warning').length}
                </div>
                <div className="text-sm text-muted-foreground">Avertissements</div>
              </div>
              <div className="text-center p-3 glass-card rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {report.issues.filter(i => i.type === 'notice').length}
                </div>
                <div className="text-sm text-muted-foreground">Notices</div>
              </div>
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  {category !== 'all' && getCategoryIcon(category)}
                  {category === 'all' ? 'Tous' :
                   category === 'color' ? 'Couleur' :
                   category === 'keyboard' ? 'Clavier' :
                   category === 'screen-reader' ? 'Lecteur d\'écran' :
                   category === 'focus' ? 'Focus' : 'Sémantique'}
                </Button>
              ))}
            </div>

            {/* Liste des problèmes */}
            <div className="space-y-3">
              <h3 className="font-semibold">
                Problèmes détectés {selectedCategory !== 'all' && `(${filteredIssues.length})`}
              </h3>
              {filteredIssues.map((issue, index) => (
                <Alert key={index} className={`
                  ${issue.type === 'error' ? 'border-red-200 bg-red-50/50' :
                    issue.type === 'warning' ? 'border-orange-200 bg-orange-50/50' :
                    'border-blue-200 bg-blue-50/50'}
                `}>
                  <div className="flex items-start gap-3">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{issue.element}</span>
                        <Badge variant="outline" className="text-xs">
                          WCAG {issue.wcagLevel}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryIcon(issue.category)}
                          <span className="ml-1">
                            {issue.category === 'color' ? 'Couleur' :
                             issue.category === 'keyboard' ? 'Clavier' :
                             issue.category === 'screen-reader' ? 'Lecteur d\'écran' :
                             issue.category === 'focus' ? 'Focus' : 'Sémantique'}
                          </span>
                        </Badge>
                      </div>
                      <AlertDescription className="text-sm">
                        <strong>Problème:</strong> {issue.description}
                        <br />
                        <strong>Solution:</strong> {issue.solution}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={runAccessibilityCheck} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Re-vérifier
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Export du rapport
                  const reportData = JSON.stringify(report, null, 2);
                  const blob = new Blob([reportData], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'accessibility-report.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                Exporter le rapport
              </Button>
            </div>

            {/* Guide WCAG */}
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Niveaux WCAG:</strong> A (minimum), AA (standard), AAA (renforcé).
                Visez au minimum le niveau AA pour une accessibilité optimale.
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
    </Card>
  );
};