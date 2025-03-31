
import React from 'react';
import { Settings, Bell, VolumeX, Moon, Sun, Smartphone, Laptop, Home, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '@/hooks/use-theme';

interface GameSettingsProps {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ 
  soundEnabled, 
  setSoundEnabled 
}) => {
  const navigate = useNavigate();
  const { currentTheme, setTheme } = useTheme();

  const handleClearData = () => {
    if (window.confirm('Êtes-vous sûr de vouloir effacer toutes les données ? Cette action est irréversible.')) {
      localStorage.clear();
      toast.success('Toutes les données ont été effacées. Retour à l\'accueil...');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="bg-white/80 backdrop-blur border-white/30 shadow-md hover:shadow-lg"
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
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="about">À propos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-toggle" className="font-medium flex items-center gap-2">
                {soundEnabled ? <Bell className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                Sons
              </Label>
              <Switch 
                id="sound-toggle" 
                checked={soundEnabled} 
                onCheckedChange={setSoundEnabled} 
              />
            </div>
            
            <div className="flex flex-col gap-2 mt-6">
              <Button 
                variant="outline" 
                className="justify-start rounded-xl bg-white hover:bg-gray-50"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 mr-2" aria-hidden="true" />
                Accueil
              </Button>
              
              <Button 
                variant="destructive" 
                className="justify-start rounded-xl mt-4"
                onClick={handleClearData}
              >
                Effacer toutes les données
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <div className="mb-4">
              <Label className="font-medium mb-3 block">Thème de couleur</Label>
              <ThemeSelector />
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-1">
                <Info className="h-4 w-4" />
                Dutch Blitz Scoreboard
              </h3>
              <p className="text-sm text-gray-600">
                Version 1.0.0
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Une application pour suivre les scores de vos parties de Dutch Blitz.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettings;
