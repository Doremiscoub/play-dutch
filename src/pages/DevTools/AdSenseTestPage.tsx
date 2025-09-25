import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedAdSlot from '@/components/ads/EnhancedAdSlot';
import AdPerformanceMonitor from '@/components/ads/AdPerformanceMonitor';
import GDPRConsentBanner from '@/components/ads/GDPRConsentBanner';
import { useAds } from '@/contexts/EnhancedAdContext';
import { Settings, TestTube, Monitor, Shield, AlertTriangle } from 'lucide-react';

const AdSenseTestPage: React.FC = () => {
  const { shouldShowAds, hasConsentedToAds, isPremium, updateConsent } = useAds();
  const [showGdprBanner, setShowGdprBanner] = useState(false);
  
  const resetConsent = () => {
    localStorage.removeItem('dutch-gdpr-consent');
    setShowGdprBanner(true);
    window.location.reload();
  };

  const simulatePremium = () => {
    // Dans une vraie implémentation, ceci modifierait l'état de l'abonnement
    console.log('🔥 Simulation mode premium (non implémenté dans ce test)');
  };

  const testAdSlots = [
    { placement: 'homepage-inline', label: 'Homepage Inline', priority: 'high' },
    { placement: 'game-sidebar-left', label: 'Game Sidebar Left', priority: 'medium' },
    { placement: 'game-sidebar-right', label: 'Game Sidebar Right', priority: 'medium' },
    { placement: 'game-banner-mobile', label: 'Mobile Banner', priority: 'low' },
    { placement: 'stats-rectangle', label: 'Stats Rectangle', priority: 'low' }
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <TestTube className="h-8 w-8 text-primary" />
          AdSense - Page de Tests
        </h1>
        <p className="text-muted-foreground">
          Interface de développement pour tester l'intégration Google AdSense
        </p>
      </div>

      {/* Statut général */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            État du Système AdSense
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Publicités</div>
              <Badge variant={shouldShowAds ? "default" : "secondary"} className="mt-1">
                {shouldShowAds ? "Activées" : "Désactivées"}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Consentement RGPD</div>
              <Badge variant={hasConsentedToAds ? "default" : "destructive"} className="mt-1">
                {hasConsentedToAds ? "Accordé" : "Non accordé"}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Abonnement</div>
              <Badge variant={isPremium ? "destructive" : "default"} className="mt-1">
                {isPremium ? "Premium" : "Gratuit"}
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            <Button onClick={resetConsent} variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-1" />
              Reset Consentement
            </Button>
            <Button onClick={simulatePremium} variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Simuler Premium
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="slots" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="slots">Slots Publicitaires</TabsTrigger>
          <TabsTrigger value="performance">Performances</TabsTrigger>
          <TabsTrigger value="gdpr">RGPD</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
        </TabsList>

        <TabsContent value="slots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test des Emplacements Publicitaires</CardTitle>
            </CardHeader>
            <CardContent>
              {!shouldShowAds && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mb-6 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <span className="text-sm">
                    Les publicités sont désactivées. {!hasConsentedToAds ? "Accordez le consentement RGPD" : "Vérifiez votre statut premium"}.
                  </span>
                </div>
              )}
              
              <div className="grid gap-6">
                {testAdSlots.map(({ placement, label, priority }) => (
                  <div key={placement} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">{label}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">{priority}</Badge>
                        <Badge variant="secondary">{placement}</Badge>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <EnhancedAdSlot 
                        placement={placement as any}
                        priority={priority as any}
                        className="border-dashed border-2 border-gray-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <AdPerformanceMonitor />
        </TabsContent>

        <TabsContent value="gdpr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test du Consentement RGPD</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Testez la bannière de consentement et les différentes options de cookies.
                </p>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => updateConsent({ marketing: true, analytics: true })}
                    size="sm"
                  >
                    Accepter Tout
                  </Button>
                  <Button 
                    onClick={() => updateConsent({ marketing: false, analytics: false })}
                    size="sm" 
                    variant="outline"
                  >
                    Refuser Marketing
                  </Button>
                  <Button 
                    onClick={resetConsent}
                    size="sm" 
                    variant="destructive"
                  >
                    Reset Complet
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h5 className="font-medium mb-2">État du consentement:</h5>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(
                      JSON.parse(localStorage.getItem('dutch-gdpr-consent') || 'null'),
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {showGdprBanner && <GDPRConsentBanner />}
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostics et Débogage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h5 className="font-medium mb-2">Variables d'environnement AdSense:</h5>
                  <div className="space-y-1 text-sm font-mono bg-gray-50 dark:bg-gray-900 p-3 rounded">
                    <div>VITE_ADSENSE_CLIENT_ID: {import.meta.env.VITE_ADSENSE_CLIENT_ID || "Non défini"}</div>
                    <div>VITE_ADSENSE_SLOT_HOMEPAGE: {import.meta.env.VITE_ADSENSE_SLOT_HOMEPAGE || "Non défini"}</div>
                    <div>VITE_ADSENSE_SLOT_GAME_LEFT: {import.meta.env.VITE_ADSENSE_SLOT_GAME_LEFT || "Non défini"}</div>
                    <div>VITE_ADSENSE_SLOT_GAME_RIGHT: {import.meta.env.VITE_ADSENSE_SLOT_GAME_RIGHT || "Non défini"}</div>
                    <div>VITE_ADSENSE_SLOT_GAME_MOBILE: {import.meta.env.VITE_ADSENSE_SLOT_GAME_MOBILE || "Non défini"}</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Script AdSense:</h5>
                  <div className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded">
                    Status: {typeof (window as any).adsbygoogle !== 'undefined' ? "Chargé" : "Non chargé"}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Détection Ad Blocker:</h5>
                  <div className="text-sm">
                    <Badge variant="outline">
                      Test en cours...
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdSenseTestPage;