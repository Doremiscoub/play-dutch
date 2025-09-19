import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, Download, AlertTriangle, CheckCircle, 
  Zap, FileText, Image, Code 
} from 'lucide-react';

interface BundleStats {
  totalSize: number;
  gzippedSize: number;
  chunkCount: number;
  assetCount: number;
  largestChunks: Array<{
    name: string;
    size: number;
    type: 'js' | 'css' | 'image' | 'other';
  }>;
  recommendations: string[];
}

export const BundleAnalyzer: React.FC = () => {
  const [stats, setStats] = useState<BundleStats | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulation des stats de bundle pour démonstration
  const simulatedStats: BundleStats = {
    totalSize: 1024 * 850, // 850KB
    gzippedSize: 1024 * 280, // 280KB
    chunkCount: 12,
    assetCount: 48,
    largestChunks: [
      { name: 'vendor.js', size: 1024 * 320, type: 'js' },
      { name: 'main.js', size: 1024 * 180, type: 'js' },
      { name: 'recharts.js', size: 1024 * 120, type: 'js' },
      { name: 'framer-motion.js', size: 1024 * 95, type: 'js' },
      { name: 'lucide-react.js', size: 1024 * 68, type: 'js' },
      { name: 'main.css', size: 1024 * 45, type: 'css' },
      { name: 'assets.css', size: 1024 * 22, type: 'css' }
    ],
    recommendations: [
      'Considérez le lazy loading pour Recharts (120KB)',
      'Optimisez les icônes Lucide en important seulement celles utilisées',
      'Activez la compression Brotli sur votre serveur',
      'Utilisez un CDN pour les assets statiques',
      'Implémentez le code splitting par routes'
    ]
  };

  const analyzeBundle = async () => {
    setIsAnalyzing(true);
    // Simulation d'analyse
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStats(simulatedStats);
    setIsAnalyzing(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getChunkIcon = (type: string) => {
    switch (type) {
      case 'js': return <Code className="h-4 w-4" />;
      case 'css': return <FileText className="h-4 w-4" />;
      case 'image': return <Image className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getPerformanceStatus = (size: number) => {
    if (size < 1024 * 500) return { status: 'excellent', color: 'green' };
    if (size < 1024 * 1000) return { status: 'good', color: 'blue' };
    if (size < 1024 * 2000) return { status: 'warning', color: 'orange' };
    return { status: 'critical', color: 'red' };
  };

  const performanceStatus = stats ? getPerformanceStatus(stats.totalSize) : null;

  return (
    <Card className="glass-morphism border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Analyseur de Bundle
        </CardTitle>
        <CardDescription>
          Analysez la taille et la composition de votre bundle JavaScript
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!stats ? (
          <div className="text-center py-8">
            <Button 
              onClick={analyzeBundle} 
              disabled={isAnalyzing}
              className="bg-primary hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Analyser le Bundle
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            {/* Vue d'ensemble */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 glass-card rounded-lg">
                <div className="text-lg font-bold">{formatSize(stats.totalSize)}</div>
                <div className="text-sm text-muted-foreground">Taille totale</div>
              </div>
              <div className="text-center p-3 glass-card rounded-lg">
                <div className="text-lg font-bold text-green-600">{formatSize(stats.gzippedSize)}</div>
                <div className="text-sm text-muted-foreground">Gzippé</div>
              </div>
              <div className="text-center p-3 glass-card rounded-lg">
                <div className="text-lg font-bold">{stats.chunkCount}</div>
                <div className="text-sm text-muted-foreground">Chunks</div>
              </div>
              <div className="text-center p-3 glass-card rounded-lg">
                <div className="text-lg font-bold">{stats.assetCount}</div>
                <div className="text-sm text-muted-foreground">Assets</div>
              </div>
            </div>

            {/* Statut de performance */}
            {performanceStatus && (
              <div className={`p-4 rounded-lg border-2 ${
                performanceStatus.color === 'green' ? 'bg-green-50 border-green-200' :
                performanceStatus.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                performanceStatus.color === 'orange' ? 'bg-orange-50 border-orange-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {performanceStatus.status === 'excellent' || performanceStatus.status === 'good' ? 
                    <CheckCircle className={`h-5 w-5 text-${performanceStatus.color}-600`} /> :
                    <AlertTriangle className={`h-5 w-5 text-${performanceStatus.color}-600`} />
                  }
                  <span className={`font-semibold text-${performanceStatus.color}-800`}>
                    Performance {performanceStatus.status === 'excellent' ? 'Excellente' : 
                               performanceStatus.status === 'good' ? 'Bonne' :
                               performanceStatus.status === 'warning' ? 'À surveiller' : 'Critique'}
                  </span>
                </div>
                <p className={`text-sm text-${performanceStatus.color}-700`}>
                  {performanceStatus.status === 'excellent' ? 'Votre bundle est très optimisé !' :
                   performanceStatus.status === 'good' ? 'Bon travail, quelques optimisations possibles.' :
                   performanceStatus.status === 'warning' ? 'Bundle un peu lourd, des optimisations sont recommandées.' :
                   'Bundle trop lourd, optimisations urgentes nécessaires.'}
                </p>
              </div>
            )}

            {/* Progression de compression */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Taux de compression</span>
                <span>{Math.round((1 - stats.gzippedSize / stats.totalSize) * 100)}%</span>
              </div>
              <Progress 
                value={(1 - stats.gzippedSize / stats.totalSize) * 100} 
                className="h-2"
              />
            </div>

            {/* Plus gros chunks */}
            <div>
              <h3 className="font-semibold mb-3">Plus gros chunks</h3>
              <div className="space-y-2">
                {stats.largestChunks.map((chunk, index) => (
                  <div key={chunk.name} className="flex items-center justify-between p-3 glass-card rounded-lg">
                    <div className="flex items-center gap-3">
                      {getChunkIcon(chunk.type)}
                      <span className="font-medium">{chunk.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {chunk.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatSize(chunk.size)}</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((chunk.size / stats.totalSize) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommandations */}
            <div>
              <h3 className="font-semibold mb-3">Recommandations d'optimisation</h3>
              <div className="space-y-2">
                {stats.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-200/30">
                    <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-800">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={analyzeBundle} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Re-analyser
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  // Simulation d'export du rapport
                  const report = JSON.stringify(stats, null, 2);
                  const blob = new Blob([report], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'bundle-analysis.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};