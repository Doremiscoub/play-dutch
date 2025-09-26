import React from 'react';
import { useAds } from '@/contexts/EnhancedAdContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const AdSenseDebugPanel: React.FC = () => {
  const { 
    isPremium, 
    isLoading, 
    shouldShowAds, 
    gdprConsent, 
    hasConsentedToAds,
    updateConsent 
  } = useAds();

  const [testMode, setTestMode] = React.useState(false);

  const forceShowAds = () => {
    setTestMode(true);
    // Force consent pour les tests
    updateConsent({ marketing: true, analytics: true, functional: true });
  };

  const resetConsent = () => {
    localStorage.removeItem('dutch-gdpr-consent');
    window.location.reload();
  };

  const checkAdSenseScript = () => {
    const script = document.querySelector('script[src*="adsbygoogle"]');
    return !!script;
  };

  const checkAdSenseLoaded = () => {
    return !!(window as any).adsbygoogle;
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-background/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">🎯 AdSense Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <Badge variant={isPremium ? "destructive" : "secondary"}>
            Premium: {isPremium ? "Oui" : "Non"}
          </Badge>
          <Badge variant={isLoading ? "outline" : "secondary"}>
            Loading: {isLoading ? "Oui" : "Non"}
          </Badge>
          <Badge variant={hasConsentedToAds ? "default" : "destructive"}>
            Consentement: {hasConsentedToAds ? "Oui" : "Non"}
          </Badge>
          <Badge variant={shouldShowAds ? "default" : "destructive"}>
            Ads: {shouldShowAds ? "Actif" : "Inactif"}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Script AdSense:</span>
            <Badge variant={checkAdSenseScript() ? "default" : "destructive"}>
              {checkAdSenseScript() ? "Chargé" : "Absent"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>AdSense API:</span>
            <Badge variant={checkAdSenseLoaded() ? "default" : "destructive"}>
              {checkAdSenseLoaded() ? "Prêt" : "Indispo"}
            </Badge>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span>Mode Test:</span>
          <Switch 
            checked={testMode} 
            onCheckedChange={setTestMode}
          />
        </div>

        <div className="space-y-2">
          <Button 
            size="sm" 
            onClick={forceShowAds}
            className="w-full"
          >
            Forcer Affichage
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={resetConsent}
            className="w-full"
          >
            Reset Consentement
          </Button>
        </div>

        {gdprConsent && (
          <div className="text-xs opacity-70">
            Consentement: {new Date(gdprConsent.timestamp).toLocaleString()}
          </div>
        )}

        <div className="text-xs opacity-70">
          Env: {import.meta.env.PROD ? "Production" : "Développement"}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdSenseDebugPanel;