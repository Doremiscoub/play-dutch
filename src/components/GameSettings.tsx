
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Settings, Volume, VolumeX, Trash2 } from 'lucide-react';
import {
  EnhancedDialog,
  EnhancedDialogContent,
  EnhancedDialogHeader,
  EnhancedDialogTitle,
  EnhancedDialogTrigger,
} from '@/components/ui/enhanced-dialog';
import { Label } from '@/components/ui/label';
import { EnhancedSwitch } from '@/components/ui/enhanced-switch';
import { Separator } from '@/components/ui/separator';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { STORAGE_KEYS, cleanupLegacyStorage } from '@/utils/storageKeys';
import { toast } from 'sonner';

const GameSettings: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useLocalStorage(STORAGE_KEYS.SOUND_ENABLED, true);
  const [adsEnabled, setAdsEnabled] = useLocalStorage(STORAGE_KEYS.ADS_ENABLED, true);

  const toggleSound = () => {
    setSoundEnabled((prev: boolean) => !prev);
    toast.success(soundEnabled ? 'Son désactivé' : 'Son activé');
  };

  const toggleAds = () => {
    setAdsEnabled((prev: boolean) => !prev);
    toast.success(adsEnabled ? 'Publicités désactivées' : 'Publicités activées');
  };

  const handleCleanupStorage = () => {
    try {
      cleanupLegacyStorage();
      toast.success('Cache nettoyé avec succès');
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error);
      toast.error('Erreur lors du nettoyage');
    }
  };

  return (
    <EnhancedDialog>
      <EnhancedDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="glass-button rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </EnhancedDialogTrigger>
      <EnhancedDialogContent className="sm:max-w-md">
        <EnhancedDialogHeader>
          <EnhancedDialogTitle>Paramètres du Jeu</EnhancedDialogTitle>
        </EnhancedDialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="sound" className="text-base font-medium">Son</Label>
              <span className="text-sm text-gray-600">Activer/désactiver les sons du jeu</span>
            </div>
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume className="h-4 w-4 text-gray-600" /> : <VolumeX className="h-4 w-4 text-gray-600" />}
              <EnhancedSwitch 
                id="sound" 
                checked={soundEnabled} 
                onCheckedChange={toggleSound}
              />
            </div>
          </div>

          <Separator className="bg-white/20" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="ads" className="text-base font-medium">Publicités</Label>
              <span className="text-sm text-gray-600">Activer/désactiver l'affichage des annonces</span>
            </div>
            <EnhancedSwitch 
              id="ads" 
              checked={adsEnabled} 
              onCheckedChange={toggleAds}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: adsEnabled ? 1 : 0, height: adsEnabled ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="glass-card p-4 mt-3">
              <p className="text-xs text-blue-700">
                Les annonces nous aident à maintenir l'application gratuite et à financer son développement.
                Merci de votre soutien !
              </p>
            </div>
          </motion.div>

          <Separator className="bg-white/20" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-base font-medium">Maintenance</Label>
              <span className="text-sm text-gray-600">Nettoyer le cache et les données temporaires</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCleanupStorage}
              className="glass-button flex items-center gap-2 border-white/30"
            >
              <Trash2 className="h-4 w-4" />
              Nettoyer
            </Button>
          </div>
        </div>
      </EnhancedDialogContent>
    </EnhancedDialog>
  );
};

export default GameSettings;
