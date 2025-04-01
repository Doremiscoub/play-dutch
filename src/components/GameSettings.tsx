
import React from 'react';
import { Settings, Bell, VolumeX, Moon, Sun, Smartphone, Laptop, Home, Info, Trash2, Save, Database } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSound } from '@/hooks/use-sound';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface GameSettingsProps {
  onExport?: () => void;
  onImport?: () => void;
  gameActive?: boolean;
}

const GameSettings: React.FC<GameSettingsProps> = ({ 
  onExport,
  onImport,
  gameActive = false
}) => {
  const navigate = useNavigate();
  const { isSoundEnabled, setSoundEnabled } = useSound();
  const [offlineModeEnabled, setOfflineModeEnabled] = useLocalStorage('dutch_offline_mode', false);

  const handleClearData = () => {
    localStorage.clear();
    toast.success('Toutes les données ont été effacées. Retour à l\'accueil...');
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon-sm"
          className="shadow-md hover:shadow-lg rounded-full bg-white/70 hover:bg-white/90 backdrop-blur-sm"
          aria-label="Réglages du jeu"
        >
          <Settings className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl bg-white/80 backdrop-blur-md border border-white/30 shadow-xl">
        <DialogHeader>
          <DialogTitle>Paramètres</DialogTitle>
          <DialogDescription>
            Personnalisez votre expérience de jeu
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid grid-cols-2 mb-4 rounded-xl bg-white/50 backdrop-blur-md p-1 shadow-sm">
            <TabsTrigger 
              value="general" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
            >
              Général
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
            >
              Données
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl shadow-sm border border-white/30">
              <Label htmlFor="sound-toggle" className="font-medium flex items-center gap-2">
                {isSoundEnabled ? <Bell className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                Sons
              </Label>
              <Switch 
                id="sound-toggle" 
                checked={isSoundEnabled} 
                onCheckedChange={setSoundEnabled} 
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl shadow-sm border border-white/30">
              <Label htmlFor="offline-mode" className="font-medium flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mode hors-ligne
              </Label>
              <Switch 
                id="offline-mode" 
                checked={offlineModeEnabled} 
                onCheckedChange={setOfflineModeEnabled} 
              />
            </div>
            
            <div className="flex flex-col gap-2 mt-6">
              <Button 
                variant="dutch-glass" 
                className="justify-start rounded-xl"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 mr-2" aria-hidden="true" />
                Accueil
              </Button>
              
              <Button 
                variant="dutch-glass" 
                className="justify-start rounded-xl"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                Paramètres avancés
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <div className="flex flex-col gap-3">
              {onExport && (
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={onExport}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Exporter les données
                </Button>
              )}
              
              {onImport && (
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={onImport}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Importer des données
                </Button>
              )}
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="justify-start mt-4"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Effacer toutes les données
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-3xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut pas être annulée. Toutes vos parties et préférences seront définitivement effacées.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData}>
                      Confirmer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettings;
