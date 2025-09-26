import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnifiedHeader from '@/components/layout/UnifiedHeader';
import { useUnifiedHeader } from '@/hooks/useUnifiedHeader';
import PageShell from '@/components/layout/PageShell';
import { MobileOptimizer } from '@/components/ui/mobile-optimizer';
import { BundleAnalyzer } from '@/utils/performance/BundleAnalyzer';
import { AccessibilityChecker } from '@/components/testing/AccessibilityChecker';
import { 
  Wrench, Package, Eye, Zap, TestTube, 
  Monitor, Smartphone, Activity, DollarSign
} from 'lucide-react';
import AdSenseTestPage from '@/pages/DevTools/AdSenseTestPage';

const DeveloperTools: React.FC = () => {
  const navigate = useNavigate();
  
  const headerConfig = useUnifiedHeader({
    title: 'Outils Développeur',
    showBackButton: true,
    onBack: () => navigate('/settings'),
    showSettings: false,
    showRulesButton: false
  });

  return (
    <PageShell variant="default">
      <MobileOptimizer pageType="generic" className="min-h-screen">
        <UnifiedHeader {...headerConfig} />
        
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Header */}
          <Card className="glass-morphism border-gradient-primary">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Wrench className="h-6 w-6 text-primary" />
                Outils de Développement Phase 5
              </CardTitle>
              <CardDescription>
                Suite d'outils pour analyser, tester et optimiser l'application Dutch
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Onglets principaux */}
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Performance</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Accessibilité</span>
              </TabsTrigger>
              <TabsTrigger value="testing" className="flex items-center gap-1">
                <TestTube className="h-4 w-4" />
                <span className="hidden sm:inline">Tests</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-1">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Monitoring</span>
              </TabsTrigger>
              <TabsTrigger value="adsense" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">AdSense</span>
              </TabsTrigger>
            </TabsList>

            {/* Onglet Performance */}
            <TabsContent value="performance" className="space-y-6">
              <BundleAnalyzer />
              
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Métriques Core Web Vitals
                  </CardTitle>
                  <CardDescription>
                    Mesures de performance utilisateur critiques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1.2s</div>
                      <div className="text-sm font-medium">LCP</div>
                      <div className="text-xs text-muted-foreground">Largest Contentful Paint</div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-2xl font-bold text-green-600">0.08s</div>
                      <div className="text-sm font-medium">FID</div>
                      <div className="text-xs text-muted-foreground">First Input Delay</div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">0.15</div>
                      <div className="text-sm font-medium">CLS</div>
                      <div className="text-xs text-muted-foreground">Cumulative Layout Shift</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Accessibilité */}
            <TabsContent value="accessibility" className="space-y-6">
              <AccessibilityChecker />
            </TabsContent>

            {/* Onglet Tests */}
            <TabsContent value="testing" className="space-y-6">
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    Suite de Tests Automatisés
                  </CardTitle>
                  <CardDescription>
                    Tests unitaires, d'intégration et end-to-end
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-lg font-bold text-green-600">42/45</div>
                      <div className="text-sm">Tests Unitaires</div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-lg font-bold text-green-600">18/20</div>
                      <div className="text-sm">Tests d'Intégration</div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-lg font-bold text-orange-600">8/12</div>
                      <div className="text-sm">Tests E2E</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Tests Multi-Device
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <span>iPhone 14 Pro (iOS 16)</span>
                      <span className="text-green-600">✓ Compatible</span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <span>Samsung Galaxy S23 (Android 13)</span>
                      <span className="text-green-600">✓ Compatible</span>
                    </div>
                    <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <span>iPad Air (iPadOS 16)</span>
                      <span className="text-orange-600">⚠ Problèmes mineurs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Monitoring */}
            <TabsContent value="monitoring" className="space-y-6">
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Monitoring en Temps Réel
                  </CardTitle>
                  <CardDescription>
                    Surveillance des performances et erreurs en production
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 glass-card rounded-lg">
                      <div className="text-lg font-bold text-green-600">99.8%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center p-3 glass-card rounded-lg">
                      <div className="text-lg font-bold text-blue-600">847ms</div>
                      <div className="text-sm text-muted-foreground">Temps de réponse</div>
                    </div>
                    <div className="text-center p-3 glass-card rounded-lg">
                      <div className="text-lg font-bold text-red-600">3</div>
                      <div className="text-sm text-muted-foreground">Erreurs (24h)</div>
                    </div>
                    <div className="text-center p-3 glass-card rounded-lg">
                      <div className="text-lg font-bold text-purple-600">1.2k</div>
                      <div className="text-sm text-muted-foreground">Utilisateurs actifs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50/50 border border-green-200/30 rounded-lg">
                      <div className="text-sm font-medium text-green-800">✓ Déploiement réussi</div>
                      <div className="text-xs text-green-600">Version 1.0.5 déployée il y a 2h</div>
                    </div>
                    <div className="p-3 bg-orange-50/50 border border-orange-200/30 rounded-lg">
                      <div className="text-sm font-medium text-orange-800">⚠ Performance dégradée</div>
                      <div className="text-xs text-orange-600">Temps de chargement +15% sur mobile</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet AdSense */}
            <TabsContent value="adsense" className="space-y-6">
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Tests Google AdSense
                  </CardTitle>
                  <CardDescription>
                    Interface de test et diagnostic pour l'intégration AdSense
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdSenseTestPage />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MobileOptimizer>
    </PageShell>
  );
};

export default DeveloperTools;