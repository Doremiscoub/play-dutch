
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Settings, Volume, VolumeX, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-medium sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Paramètres du Jeu</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="sound" className="text-base">Son</Label>
              <span className="text-sm text-gray-500">Activer/désactiver les sons du jeu</span>
            </div>
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <Switch 
                id="sound" 
                checked={soundEnabled} 
                onCheckedChange={toggleSound}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="ads" className="text-base">Publicités</Label>
              <span className="text-sm text-gray-500">Activer/désactiver l'affichage des annonces</span>
            </div>
            <Switch 
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
            <div className="rounded-lg bg-blue-50 p-3 mt-2">
              <p className="text-xs text-blue-600">
                Les annonces nous aident à maintenir l'application gratuite et à financer son développement.
                Merci de votre soutien !
              </p>
            </div>
          </motion.div>

          <Separator />

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label className="text-base">Maintenance</Label>
              <span className="text-sm text-gray-500">Nettoyer le cache et les données temporaires</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCleanupStorage}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Nettoyer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettings;
