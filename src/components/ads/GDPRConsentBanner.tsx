import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAds } from '@/contexts/EnhancedAdContext';
import { Cookie, Shield, Settings } from 'lucide-react';

const GDPRConsentBanner: React.FC = () => {
  const { gdprConsent, updateConsent } = useAds();
  const [showDetails, setShowDetails] = useState(false);
  const [tempConsent, setTempConsent] = useState({
    analytics: false,
    marketing: false,
    functional: true
  });

  // Debug log pour voir si la bannière devrait s'afficher
  React.useEffect(() => {
    console.log('🍪 GDPR Banner Check:', {
      gdprConsent,
      shouldShowBanner: !gdprConsent,
      storedConsent: localStorage.getItem('dutch-gdpr-consent')
    });
  }, [gdprConsent]);

  // Don't show if consent already given
  if (gdprConsent) {
    console.log('🍪 GDPR Banner masquée - consentement déjà donné:', gdprConsent);
    return null;
  }

  const handleAcceptAll = () => {
    console.log('✅ GDPR - Accepter tout');
    updateConsent({
      analytics: true,
      marketing: true,
      functional: true
    });
  };

  const handleRejectAll = () => {
    console.log('❌ GDPR - Refuser tout');
    updateConsent({
      analytics: false,
      marketing: false,
      functional: true
    });
  };

  const handleCustomSave = () => {
    updateConsent(tempConsent);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4"
      >
        <Card className="mx-auto max-w-4xl border-2 border-primary/20 shadow-2xl backdrop-blur-md bg-background/95">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Cookie className="h-8 w-8 text-primary" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Respect de votre vie privée
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dutch Card Game utilise des cookies pour améliorer votre expérience. 
                    Certains cookies sont nécessaires au fonctionnement, d'autres nous aident à comprendre l'utilisation de l'app ou à afficher des publicités personnalisées.
                  </p>
                </div>

                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="space-y-4 border-t pt-4"
                  >
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Cookies fonctionnels</h4>
                          <p className="text-xs text-muted-foreground">Nécessaires au fonctionnement de l'application</p>
                        </div>
                        <Switch checked disabled />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Cookies analytiques</h4>
                          <p className="text-xs text-muted-foreground">Nous aident à améliorer l'application</p>
                        </div>
                        <Switch 
                          checked={tempConsent.analytics}
                          onCheckedChange={(checked) => 
                            setTempConsent(prev => ({ ...prev, analytics: checked }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Cookies marketing</h4>
                          <p className="text-xs text-muted-foreground">Permettent l'affichage de publicités</p>
                        </div>
                        <Switch 
                          checked={tempConsent.marketing}
                          onCheckedChange={(checked) => 
                            setTempConsent(prev => ({ ...prev, marketing: checked }))
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-wrap gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    {showDetails ? 'Masquer' : 'Personnaliser'}
                  </Button>
                  
                  {showDetails ? (
                    <Button onClick={handleCustomSave} size="sm">
                      Enregistrer mes choix
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" onClick={handleRejectAll} size="sm">
                        Refuser tout
                      </Button>
                      <Button onClick={handleAcceptAll} size="sm">
                        Accepter tout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default GDPRConsentBanner;