import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Eye, MousePointer, DollarSign, Wifi, WifiOff, AlertCircle, RefreshCw } from 'lucide-react';
import { useAds } from '@/contexts/EnhancedAdContext';

interface AdMetrics {
  impressions: number;
  clicks: number;
  ctr: number; // Click-through rate
  revenue: number;
  fillRate: number;
  lastUpdated: Date;
  errors: number;
  blockedAds: number;
}

const AdPerformanceMonitor: React.FC = () => {
  const { shouldShowAds, hasConsentedToAds, adPerformance } = useAds();
  const [metrics, setMetrics] = useState<AdMetrics>({
    impressions: 0,
    clicks: 0,
    ctr: 0,
    revenue: 0,
    fillRate: 0,
    lastUpdated: new Date(),
    errors: 0,
    blockedAds: 0
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  // Détection basique de bloqueur de publicité
  useEffect(() => {
    const detectAdBlock = async () => {
      try {
        // Tenter de créer un élément publicitaire factice
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        testAd.style.position = 'absolute';
        testAd.style.left = '-9999px';
        document.body.appendChild(testAd);

        // Vérifier si l'élément est masqué
        setTimeout(() => {
          const isBlocked = testAd.offsetHeight === 0;
          setAdBlockDetected(isBlocked);
          document.body.removeChild(testAd);
        }, 100);
      } catch (error) {
        console.error('Ad block detection error:', error);
      }
    };

    detectAdBlock();
  }, []);

  // Monitoring des performances AdSense
  useEffect(() => {
    if (!shouldShowAds || !hasConsentedToAds) return;

    const monitorAds = () => {
      try {
        // Simuler des métriques (dans une vraie implémentation, utiliser Google AdSense API)
        const newMetrics: AdMetrics = {
          impressions: Math.floor(Math.random() * 100) + metrics.impressions,
          clicks: Math.floor(Math.random() * 5) + metrics.clicks,
          ctr: 0,
          revenue: Math.random() * 2.5,
          fillRate: 85 + Math.random() * 15, // 85-100%
          lastUpdated: new Date(),
          errors: metrics.errors + (Math.random() > 0.95 ? 1 : 0),
          blockedAds: adBlockDetected ? metrics.blockedAds + 1 : metrics.blockedAds
        };

        // Calculer CTR
        newMetrics.ctr = newMetrics.impressions > 0 
          ? (newMetrics.clicks / newMetrics.impressions) * 100 
          : 0;

        setMetrics(newMetrics);
        setIsMonitoring(true);
      } catch (error) {
        console.error('Ad monitoring error:', error);
      }
    };

    const interval = setInterval(monitorAds, 30000); // Mise à jour toutes les 30 secondes
    return () => clearInterval(interval);
  }, [shouldShowAds, hasConsentedToAds, metrics.impressions, metrics.clicks, metrics.errors, metrics.blockedAds, adBlockDetected]);

  const resetMetrics = () => {
    setMetrics({
      impressions: 0,
      clicks: 0,
      ctr: 0,
      revenue: 0,
      fillRate: 0,
      lastUpdated: new Date(),
      errors: 0,
      blockedAds: 0
    });
  };

  const getStatusColor = (fillRate: number) => {
    if (fillRate >= 90) return 'bg-green-500';
    if (fillRate >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 4
    }).format(amount);
  };

  if (!shouldShowAds) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WifiOff className="h-5 w-5 text-muted-foreground" />
            Monitoring AdSense - Inactif
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Le monitoring AdSense est inactif (utilisateur premium ou consentement non donné).
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* En-tête avec statut */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-500" />
              Monitoring AdSense en temps réel
              <Badge variant={isMonitoring ? "default" : "secondary"}>
                {isMonitoring ? "Actif" : "Initialisation"}
              </Badge>
            </div>
            <Button onClick={resetMetrics} size="sm" variant="outline">
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {adBlockDetected && (
            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg mb-4">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-orange-700 dark:text-orange-300">
                Bloqueur de publicité détecté - Impact sur les revenus possible
              </span>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {metrics.lastUpdated.toLocaleTimeString('fr-FR')}
          </p>
        </CardContent>
      </Card>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              Impressions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.impressions.toLocaleString('fr-FR')}</div>
            <div className="text-xs text-muted-foreground mt-1">Total affiché</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MousePointer className="h-4 w-4 text-purple-500" />
              Clics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.clicks.toLocaleString('fr-FR')}</div>
            <div className="text-xs text-muted-foreground mt-1">
              CTR: {metrics.ctr.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Revenus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.revenue)}</div>
            <div className="text-xs text-muted-foreforeground mt-1">Estimé</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-500" />
              Taux de remplissage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{metrics.fillRate.toFixed(1)}%</div>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(metrics.fillRate)}`} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Performance</div>
          </CardContent>
        </Card>
      </div>

      {/* Métriques détaillées */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Détails techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Erreurs détectées</div>
              <div className="text-xl font-semibold">{metrics.errors}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Ads bloquées</div>
              <div className="text-xl font-semibold text-orange-600">{metrics.blockedAds}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Consentement RGPD</div>
              <Badge variant={hasConsentedToAds ? "default" : "destructive"}>
                {hasConsentedToAds ? "Accordé" : "Refusé"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdPerformanceMonitor;