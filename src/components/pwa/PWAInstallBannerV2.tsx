import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export const PWAInstallBannerV2: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detect if already installed
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show banner for iOS users
    if (iOS && !isStandalone) {
      const hasSeenIOSPrompt = localStorage.getItem('dutch-ios-pwa-prompt-seen');
      if (!hasSeenIOSPrompt) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstallPrompt(null);
        setShowBanner(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    if (isIOS) {
      localStorage.setItem('dutch-ios-pwa-prompt-seen', 'true');
    }
  };

  if (isStandalone || (!installPrompt && !isIOS) || !showBanner) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <Card className="glass-morphism border border-primary/30 shadow-2xl">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  Installer Dutch sur votre appareil
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {isIOS 
                    ? "Ajoutez Dutch à votre écran d'accueil pour une expérience native optimale."
                    : "Profitez de Dutch directement depuis votre écran d'accueil, même hors ligne !"
                  }
                </p>
                
                {isIOS ? (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>1. Appuyez sur <span className="font-mono">⎙</span> en bas de Safari</p>
                    <p>2. Sélectionnez "Sur l'écran d'accueil"</p>
                    <p>3. Appuyez sur "Ajouter"</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleInstall}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Installer
                    </Button>
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};