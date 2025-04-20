
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { isRunningAsPWA } from '@/utils/pwaUtils';

let deferredPrompt: any = null;

const PWAInstallPrompt = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Ne pas montrer le bouton si déjà en PWA
    if (isRunningAsPWA()) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installée avec succès');
      setShowInstallButton(false);
    }
    
    deferredPrompt = null;
  };

  if (!showInstallButton) return null;

  return (
    <Button
      onClick={handleInstallClick}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-dutch-blue text-white shadow-lg rounded-full"
    >
      <Download className="w-4 h-4" />
      Installer Dutch
    </Button>
  );
};

export default PWAInstallPrompt;
