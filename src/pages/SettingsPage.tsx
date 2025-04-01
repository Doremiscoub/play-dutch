
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, BellRing, Volume2, VolumeX, Palette, Shield, Database, 
  HelpCircle, Info, Trash2, ArrowLeft, CloudOff, Download, Upload
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import ColorThemeSelector from '@/components/ColorThemeSelector';
import AnimatedBackground from '@/components/AnimatedBackground';
import { composedClasses } from '@/config/uiConfig';
import useGameStore from '@/store/useGameStore';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { games, resetGame } = useGameStore();
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return window.localStorage.getItem('dutch_sound_enabled') !== 'false';
  });
  const [offlineMode, setOfflineMode] = useState<boolean>(() => {
    return window.localStorage.getItem('dutch_offline_mode') === 'true';
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [exportData, setExportData] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem('dutch_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    window.localStorage.setItem('dutch_offline_mode', String(offlineMode));
  }, [offlineMode]);

  const handleClearData = () => {
    // Clear all game data
    resetGame();
    localStorage.removeItem('dutch-game-storage');
    localStorage.removeItem('current_dutch_game');
    localStorage.removeItem('dutch_tournament');
    setShowDeleteConfirmation(false);
    
    toast.success('Toutes les données de jeu ont été effacées.', {
      duration: 3000,
    });
  };

  const handleExportData = () => {
    try {
      const gameData = {
        games,
        settings: {
          soundEnabled,
          offlineMode,
          theme: localStorage.getItem('dutch_theme') || 'default',
        },
        tournaments: JSON.parse(localStorage.getItem('dutch_tournament') || '{}'),
      };
      
      const dataStr = JSON.stringify(gameData, null, 2);
      setExportData(dataStr);
      
      // Create and trigger download
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      const exportFileDefaultName = `dutch_data_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Données exportées avec succès !');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur lors de l\'exportation des données');
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        // Validate minimal data structure
        if (!parsedData.games || !Array.isArray(parsedData.games)) {
          throw new Error('Format de données invalide');
        }
        
        // Store imported data
        localStorage.setItem('dutch-game-storage', JSON.stringify({ state: { games: parsedData.games } }));
        
        // Import settings if available
        if (parsedData.settings) {
          if (parsedData.settings.soundEnabled !== undefined) {
            localStorage.setItem('dutch_sound_enabled', String(parsedData.settings.soundEnabled));
            setSoundEnabled(parsedData.settings.soundEnabled);
          }
          
          if (parsedData.settings.offlineMode !== undefined) {
            localStorage.setItem('dutch_offline_mode', String(parsedData.settings.offlineMode));
            setOfflineMode(parsedData.settings.offlineMode);
          }
          
          if (parsedData.settings.theme) {
            localStorage.setItem('dutch_theme', parsedData.settings.theme);
          }
        }
        
        // Import tournaments if available
        if (parsedData.tournaments) {
          localStorage.setItem('dutch_tournament', JSON.stringify(parsedData.tournaments));
        }
        
        toast.success('Données importées avec succès ! Actualisation de l\'application...');
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        console.error('Import error:', error);
        toast.error('Erreur lors de l\'importation : format de fichier invalide');
      }
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
    >
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground variant="default" />
      </div>
      
      <div className="container max-w-2xl mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-4 rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className={composedClasses.title}>Paramètres</h1>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-3 mb-4 rounded-xl bg-white/70 backdrop-blur-md p-1 shadow-sm">
            <TabsTrigger 
              value="general" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
            >
              Général
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
            >
              Apparence
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5"
            >
              Données
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`${composedClasses.card} p-4 space-y-4`}
            >
              <h2 className="text-lg font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                Son et notifications
              </h2>
              
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="sound-toggle" className="font-medium flex items-center gap-2">
                  {soundEnabled ? <Volume2 className="h-4 w-4 text-dutch-blue" /> : <VolumeX className="h-4 w-4 text-gray-500" />}
                  Sons du jeu
                </Label>
                <Switch 
                  id="sound-toggle" 
                  checked={soundEnabled} 
                  onCheckedChange={setSoundEnabled}
                  className="data-[state=checked]:bg-dutch-blue"
                />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="offline-toggle" className="font-medium flex items-center gap-2">
                  {offlineMode ? <CloudOff className="h-4 w-4 text-dutch-orange" /> : <BellRing className="h-4 w-4 text-dutch-blue" />}
                  Mode hors-ligne
                </Label>
                <Switch 
                  id="offline-toggle" 
                  checked={offlineMode} 
                  onCheckedChange={setOfflineMode} 
                  className="data-[state=checked]:bg-dutch-orange"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${composedClasses.card} p-4 space-y-4`}
            >
              <h2 className="text-lg font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
                Navigation
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="dutch-glass" 
                  className="justify-start rounded-xl"
                  onClick={() => navigate('/')}
                >
                  <Home className="h-4 w-4 mr-2 text-dutch-blue" />
                  Accueil
                </Button>
                
                <Button 
                  variant="dutch-glass" 
                  className="justify-start rounded-xl"
                  onClick={() => navigate('/rules')}
                >
                  <HelpCircle className="h-4 w-4 mr-2 text-dutch-purple" />
                  Règles du jeu
                </Button>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`${composedClasses.card} p-4 space-y-4`}
            >
              <h2 className="text-lg font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Thème de couleur
              </h2>
              <ColorThemeSelector />
            </motion.div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`${composedClasses.card} p-4 space-y-4`}
            >
              <h2 className="text-lg font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <Database className="h-4 w-4" />
                Gestion des données
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="dutch-glass" 
                  className="justify-start rounded-xl"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4 mr-2 text-dutch-blue" />
                  Exporter
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="dutch-glass" 
                    className="justify-start rounded-xl w-full"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2 text-dutch-purple" />
                    Importer
                  </Button>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </div>
              </div>
              
              <Dialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
                <DialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start rounded-xl mt-4"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Effacer toutes les données
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-red-600">Attention !</DialogTitle>
                    <DialogDescription className="text-gray-700">
                      Cette action effacera définitivement toutes vos données de jeu, y compris l'historique des parties et les tournois. Cette action est irréversible.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex gap-3 sm:justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirmation(false)}
                      className="flex-1 sm:flex-initial"
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleClearData}
                      className="flex-1 sm:flex-initial"
                    >
                      Confirmer la suppression
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
            
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${composedClasses.card} p-4 space-y-4`}
            >
              <h2 className="text-lg font-semibold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent flex items-center gap-2">
                <Info className="h-4 w-4" />
                À propos
              </h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex justify-between">
                  <span>Version</span>
                  <span className="font-medium">1.0.0</span>
                </p>
                <p className="flex justify-between">
                  <span>Mode</span>
                  <span className="font-medium">{offlineMode ? 'Hors-ligne' : 'Standard'}</span>
                </p>
                <p className="flex justify-between">
                  <span>Parties jouées</span>
                  <span className="font-medium">{games.length}</span>
                </p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
