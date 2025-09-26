import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAds } from '@/contexts/EnhancedAdContext';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

const AdSenseForceTest: React.FC = () => {
  const { updateConsent, gdprConsent, shouldShowAds, hasConsentedToAds } = useAds();

  const forceEnableAds = () => {
    console.log('🔧 FORCE ACTIVATION AdSense');
    updateConsent({
      analytics: true,
      marketing: true,
      functional: true
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const clearAllData = () => {
    console.log('🗑️ RESET COMPLET AdSense');
    localStorage.removeItem('dutch-gdpr-consent');
    // Clear any other ad-related storage
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.includes('ad') || key.includes('gdpr') || key.includes('consent')
    );
    keysToRemove.forEach(key => localStorage.removeItem(key));
    window.location.reload();
  };

  const testAdSenseScript = () => {
    const script = document.querySelector('script[src*="adsbygoogle"]');
    const apiAvailable = !!(window as any).adsbygoogle;
    
    console.log('🧪 Test AdSense:', {
      scriptPresent: !!script,
      apiAvailable,
      scriptSrc: script?.getAttribute('src'),
      windowAds: (window as any).adsbygoogle
    });
  };

  return (
    <Card className="border-2 border-yellow-200 bg-yellow-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <AlertTriangle className="h-5 w-5" />
          AdSense Force Test Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>GDPR Consent:</span>
            {gdprConsent ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span>Should Show Ads:</span>
            {shouldShowAds ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={forceEnableAds}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            🚀 Force Enable Ads
          </Button>
          
          <Button 
            onClick={clearAllData}
            variant="destructive"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset All
          </Button>
          
          <Button 
            onClick={testAdSenseScript}
            variant="outline"
            size="sm"
          >
            🧪 Test Script
          </Button>
        </div>

        <div className="text-xs text-muted-foreground border-t pt-2">
          <p><strong>Instructions:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Cliquez sur "Force Enable Ads" pour activer</li>
            <li>La page va se recharger automatiquement</li>
            <li>Les annonces devraient apparaître</li>
            <li>Utilisez "Reset All" pour recommencer les tests</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdSenseForceTest;