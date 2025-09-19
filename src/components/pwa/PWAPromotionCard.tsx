import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Download, 
  Zap, 
  Wifi, 
  Bell, 
  Share, 
  Home,
  X,
  CheckCircle,
  ArrowDown,
  Plus
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from 'sonner';

interface PWAPromotionCardProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  className?: string;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAPromotionCard: React.FC<PWAPromotionCardProps> = ({
  onInstall,
  onDismiss,
  className
}) => {
  const [dismissed, setDismissed] = useLocalStorage('dutch_pwa_promo_dismissed', false);
  const [installed, setInstalled] = useLocalStorage('dutch_pwa_installed', false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Détecter iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Détecter si déjà en mode standalone
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                     (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Écouter l'installation
    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
      toast.success('Dutch installé avec succès ! 🎉');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [setInstalled]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          onInstall?.();
          toast.success('Installation en cours...');
        }
        
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Installation failed:', error);
        toast.error('Erreur lors de l\'installation');
      }
    } else if (isIOS) {
      // iOS - afficher les instructions
      setShowInstructions(true);
    } else {
      // Fallback - instructions générales
      setShowInstructions(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  // Ne pas afficher si déjà installé, dismissé ou en mode standalone
  if (dismissed || installed || isStandalone) {
    return null;
  }

  const features = [
    {
      icon: <Zap className="w-4 h-4 text-yellow-600" />,
      title: 'Super rapide',
      description: 'Chargement instantané, même hors ligne'
    },
    {
      icon: <Bell className="w-4 h-4 text-blue-600" />,
      title: 'Notifications',
      description: 'Rappels de parties et mises à jour'
    },
    {
      icon: <Wifi className="w-4 h-4 text-green-600" />,
      title: 'Mode offline',
      description: 'Jouez sans connexion internet'
    },
    {
      icon: <Home className="w-4 h-4 text-purple-600" />,
      title: 'Écran d\'accueil',
      description: 'Accès direct depuis votre téléphone'
    }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={className}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 border-blue-200 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    Installer Dutch
                    <Badge className="bg-blue-600 text-white">PWA</Badge>
                  </CardTitle>
                  <p className="text-sm text-blue-700 mt-1">
                    Transformez votre navigateur en app native !
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:bg-blue-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Fonctionnalités */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 p-2 bg-white/60 rounded-lg"
                >
                  <div className="mt-0.5">{feature.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Avantages */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Pourquoi installer ?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  Performance maximale
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  Aucun store requis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  Mises à jour automatiques
                </li>
              </ul>
            </div>

            {/* Bouton d'installation */}
            <Button
              onClick={handleInstall}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-12"
            >
              <Download className="w-5 h-5 mr-2" />
              {deferredPrompt ? 'Installer maintenant' : 
               isIOS ? 'Instructions iOS' : 
               'Comment installer'}
            </Button>
          </CardContent>

          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        </Card>
      </motion.div>

      {/* Modal d'instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowInstructions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5 text-blue-600" />
                      Comment installer
                    </CardTitle>
                    <Button
                      onClick={() => setShowInstructions(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {isIOS ? (
                    // Instructions iOS
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                          Sur iOS, suivez ces étapes simples :
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <p className="font-medium">Ouvrez le menu de partage</p>
                            <p className="text-sm text-muted-foreground">Tapez sur l'icône <Share className="w-4 h-4 inline mx-1" /> en bas de Safari</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <p className="font-medium">Ajouter à l'écran d'accueil</p>
                            <p className="text-sm text-muted-foreground">Sélectionnez "Sur l'écran d'accueil" <Plus className="w-4 h-4 inline mx-1" /></p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <p className="font-medium">Confirmer</p>
                            <p className="text-sm text-muted-foreground">Tapez "Ajouter" pour installer Dutch</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Instructions génériques
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-4">
                          Depuis votre navigateur mobile :
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <p className="font-medium">Menu du navigateur</p>
                            <p className="text-sm text-muted-foreground">Tapez sur les "⋮" ou menu</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <p className="font-medium">Installer l'application</p>
                            <p className="text-sm text-muted-foreground">Cherchez "Installer" ou "Ajouter à l'écran d'accueil"</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <p className="font-medium">Profiter !</p>
                            <p className="text-sm text-muted-foreground">Dutch apparaîtra sur votre écran d'accueil</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center pt-4 border-t">
                    <Button
                      onClick={() => {
                        setShowInstructions(false);
                        setDismissed(true);
                        toast.success('N\'hésitez pas à installer Dutch plus tard !');
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      J'ai compris !
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAPromotionCard;