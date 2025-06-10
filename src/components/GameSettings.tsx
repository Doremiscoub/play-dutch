import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Volume2, 
  Smartphone, 
  Download, 
  Trash2, 
  RefreshCcw,
  Globe,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { useAppState } from '@/hooks/useAppState';
import { STORAGE_KEYS } from '@/utils/storageKeys';

const GameSettings: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { clearGameHistory } = useAppState();
  const [soundEnabled, setSoundEnabled] = useState(localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) === 'true' || false);

  const handleClearHistory = () => {
    clearGameHistory();
    toast.success('Historique effacé avec succès !');
  };

  const handleResetSettings = () => {
    localStorage.removeItem(STORAGE_KEYS.THEME);
    localStorage.removeItem(STORAGE_KEYS.SOUND_ENABLED);
    setTheme('system');
    setSoundEnabled(false);
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, 'false');
    toast.success('Paramètres réinitialisés !');
  };

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, newValue.toString());
    toast.success(`Son ${newValue ? 'activé' : 'désactivé'} !`);
  };

  return (
    <div className="space-y-6">
      {/* Apparence */}
      <Card className="vision-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-dutch-blue" />
            Apparence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme-switcher">Mode sombre</Label>
            <Switch
              id="theme-switcher"
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audio */}
      <Card className="vision-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-dutch-blue" />
            Audio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-toggle">Effets sonores</Label>
            <Switch
              id="sound-toggle"
              checked={soundEnabled}
              onCheckedChange={toggleSound}
            />
          </div>
        </CardContent>
      </Card>

      {/* Données */}
      <Card className="vision-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-dutch-blue" />
            Données
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleClearHistory}
            variant="destructive"
            className="w-full justify-start"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Effacer l'historique
          </Button>
        </CardContent>
      </Card>

      {/* Utilitaires */}
      <Card className="vision-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-dutch-blue" />
            Utilitaires
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleResetSettings}
            variant="secondary"
            className="w-full justify-start"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Réinitialiser les paramètres
          </Button>
        </CardContent>
      </Card>

      {/* SEO & Outils */}
      <Card className="vision-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-dutch-blue" />
            SEO & Outils
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => navigate('/sitemap')}
            variant="outline"
            className="w-full justify-start"
          >
            <Globe className="h-4 w-4 mr-2" />
            Générer sitemap & robots.txt
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSettings;
