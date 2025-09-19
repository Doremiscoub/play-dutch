/**
 * Paramètres avancés de l'application Dutch
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Palette, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun,
  Smartphone,
  Wifi,
  WifiOff,
  Database,
  Download,
  Upload,
  Trash2,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { useSupabaseAuth } from '@/context/SupabaseAuthContext';
import { useUnifiedGameState } from '@/hooks/game/useUnifiedGameState';
import { NotificationSystem } from '@/components/notifications/NotificationSystem';
import { PWAInstallBannerV2 } from '@/components/pwa/PWAInstallBannerV2';

interface AdvancedSettingsProps {
  className?: string;
}

interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  soundEnabled: boolean;
  soundVolume: number;
  animationsEnabled: boolean;
  tutorialCompleted: boolean;
  autoSave: boolean;
  syncEnabled: boolean;
  offlineMode: boolean;
  language: 'fr' | 'en';
  notifications: {
    gameUpdates: boolean;
    achievements: boolean;
    multiplayer: boolean;
  };
  gameplay: {
    confirmActions: boolean;
    showTips: boolean;
    autoCalculateScores: boolean;
    defaultScoreLimit: number;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
    performanceData: boolean;
  };
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'auto',
  soundEnabled: true,
  soundVolume: 70,
  animationsEnabled: true,
  tutorialCompleted: false,
  autoSave: true,
  syncEnabled: true,
  offlineMode: false,
  language: 'fr',
  notifications: {
    gameUpdates: true,
    achievements: true,
    multiplayer: true
  },
  gameplay: {
    confirmActions: true,
    showTips: true,
    autoCalculateScores: true,
    defaultScoreLimit: 100
  },
  privacy: {
    analytics: true,
    crashReports: true,
    performanceData: false
  }
};

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ className = '' }) => {
  const { isSignedIn, user } = useSupabaseAuth();
  const { syncStatus, migrateLocalToCloud, availableGames } = useUnifiedGameState();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isDirty, setIsDirty] = useState(false);
  const [storageInfo, setStorageInfo] = useState<{
    used: number;
    total: number;
    gamesCount: number;
  }>({ used: 0, total: 0, gamesCount: 0 });

  // Charger les paramètres au montage
  useEffect(() => {
    loadSettings();
    calculateStorageInfo();
  }, []);

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('dutch_app_settings');
      if (saved) {
        const parsedSettings = JSON.parse(saved);
        setSettings(Object.assign({}, DEFAULT_SETTINGS, parsedSettings));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Erreur lors du chargement des paramètres');
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('dutch_app_settings', JSON.stringify(settings));
      setIsDirty(false);
      toast.success('Paramètres sauvegardés');
      
      // Appliquer certains paramètres immédiatement
      applySettings();
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const applySettings = () => {
    // Appliquer le thème
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto - utiliser la préférence système
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }

    // Appliquer les animations
    document.documentElement.style.setProperty(
      '--animation-duration', 
      settings.animationsEnabled ? '0.3s' : '0s'
    );
  };

  const calculateStorageInfo = () => {
    try {
      let totalSize = 0;
      let gamesCount = 0;

      // Calculer la taille du localStorage
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length;
          if (key.startsWith('dutch_')) {
            if (key.includes('game') || key.includes('history')) {
              gamesCount++;
            }
          }
        }
      }

      // Estimation de la taille totale disponible (5MB généralement)
      const totalAvailable = 5 * 1024 * 1024; // 5MB en bytes

      setStorageInfo({
        used: totalSize,
        total: totalAvailable,
        gamesCount
      });
    } catch (error) {
      console.error('Error calculating storage:', error);
    }
  };

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const updateNestedSetting = <T extends keyof AppSettings>(
    section: T,
    key: keyof AppSettings[T],
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>),
        [key]: value
      }
    }));
    setIsDirty(true);
  };

  const resetToDefaults = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setSettings(DEFAULT_SETTINGS);
      setIsDirty(true);
      toast.info('Paramètres réinitialisés');
    }
  };

  const clearAllData = () => {
    if (confirm('⚠️ ATTENTION: Cette action supprimera TOUTES vos données locales (parties, historique, paramètres). Êtes-vous sûr ?')) {
      try {
        // Sauvegarder les clés à supprimer
        const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith('dutch_'));
        
        // Supprimer toutes les données Dutch
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Réinitialiser les paramètres
        setSettings(DEFAULT_SETTINGS);
        setIsDirty(false);
        
        calculateStorageInfo();
        toast.success('Toutes les données ont été supprimées');
      } catch (error) {
        console.error('Error clearing data:', error);
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const exportData = () => {
    try {
      const gameData = Object.keys(localStorage)
        .filter(key => key.startsWith('dutch_'))
        .reduce((obj, key) => {
          obj[key] = localStorage.getItem(key);
          return obj;
        }, {} as Record<string, string | null>);

      const dataStr = JSON.stringify(gameData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `dutch-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      toast.success('Données exportées avec succès');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Erreur lors de l\'export');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header avec actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Paramètres Avancés
            {isDirty && (
              <Badge variant="outline" className="text-orange-600">
                Non sauvegardés
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Personnalisez votre expérience Dutch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button onClick={saveSettings} disabled={!isDirty}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button onClick={resetToDefaults} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Apparence & Thèmes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Apparence
          </CardTitle>
          <CardDescription>
            Personnalisez l'apparence de votre application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Thème</Label>
            <Select
              value={settings.theme}
              onValueChange={(value: 'light' | 'dark' | 'auto') => updateSetting('theme', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    Clair
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    Sombre
                  </div>
                </SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="animations">Animations</Label>
            <Switch
              id="animations"
              checked={settings.animationsEnabled}
              onCheckedChange={(checked) => updateSetting('animationsEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
            Audio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound">Sons activés</Label>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
            />
          </div>

          {settings.soundEnabled && (
            <div className="space-y-2">
              <Label>Volume: {settings.soundVolume}%</Label>
              <Slider
                value={[settings.soundVolume]}
                onValueChange={([value]) => updateSetting('soundVolume', value)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Synchronisation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isSignedIn ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-gray-400" />
            )}
            Synchronisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>État de la sync</Label>
              <p className="text-sm text-gray-600">
                {isSignedIn ? `Connecté: ${syncStatus}` : 'Non connecté'}
              </p>
            </div>
            <Badge variant={isSignedIn ? "default" : "secondary"}>
              {isSignedIn ? 'Activée' : 'Désactivée'}
            </Badge>
          </div>

          {isSignedIn && (
            <>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoSync">Synchronisation automatique</Label>
                <Switch
                  id="autoSync"
                  checked={settings.syncEnabled}
                  onCheckedChange={(checked) => updateSetting('syncEnabled', checked)}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={migrateLocalToCloud} 
                  size="sm" 
                  variant="outline"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Migrer vers le cloud
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Stockage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Stockage Local
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Utilisé</span>
              <span>{formatBytes(storageInfo.used)} / {formatBytes(storageInfo.total)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(storageInfo.used / storageInfo.total) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{storageInfo.gamesCount}</div>
              <div className="text-sm text-gray-600">Parties sauvées</div>
            </div>
            <div>
              <div className="text-lg font-bold">{availableGames.length}</div>
              <div className="text-sm text-gray-600">Dans le cloud</div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-2">
            <Button onClick={exportData} size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button 
              onClick={clearAllData} 
              size="sm" 
              variant="destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Tout supprimer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gameplay */}
      <Card>
        <CardHeader>
          <CardTitle>Gameplay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="confirmActions">Confirmer les actions</Label>
            <Switch
              id="confirmActions"
              checked={settings.gameplay.confirmActions}
              onCheckedChange={(checked) => 
                updateNestedSetting('gameplay', 'confirmActions', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showTips">Afficher les conseils</Label>
            <Switch
              id="showTips"
              checked={settings.gameplay.showTips}
              onCheckedChange={(checked) => 
                updateNestedSetting('gameplay', 'showTips', checked)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Limite de score par défaut: {settings.gameplay.defaultScoreLimit}</Label>
            <Slider
              value={[settings.gameplay.defaultScoreLimit]}
              onValueChange={([value]) => 
                updateNestedSetting('gameplay', 'defaultScoreLimit', value)
              }
              min={50}
              max={200}
              step={10}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications Push */}
      <NotificationSystem className="mb-6" />

      {/* Application Mobile PWA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Application Mobile PWA
          </CardTitle>
          <CardDescription>
            Installez Dutch comme une vraie application native
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PWAInstallBannerV2 />
          <div className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
            <h4 className="font-medium text-blue-900 mb-2">Avantages de l'installation PWA :</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Accès rapide depuis l'écran d'accueil</li>
              <li>• Fonctionne même hors ligne</li>
              <li>• Interface native optimisée</li>
              <li>• Notifications push intégrées</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Notifications classiques */}
      <Card>
        <CardHeader>
          <CardTitle>Préférences de Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="gameUpdates">Mises à jour de partie</Label>
            <Switch
              id="gameUpdates"
              checked={settings.notifications.gameUpdates}
              onCheckedChange={(checked) => 
                updateNestedSetting('notifications', 'gameUpdates', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="achievements">Achievements</Label>
            <Switch
              id="achievements"
              checked={settings.notifications.achievements}
              onCheckedChange={(checked) => 
                updateNestedSetting('notifications', 'achievements', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="multiplayer">Multijoueur</Label>
            <Switch
              id="multiplayer"
              checked={settings.notifications.multiplayer}
              onCheckedChange={(checked) => 
                updateNestedSetting('notifications', 'multiplayer', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Confidentialité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Confidentialité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics">Analytics anonymes</Label>
              <p className="text-xs text-gray-600">Nous aide à améliorer l'app</p>
            </div>
            <Switch
              id="analytics"
              checked={settings.privacy.analytics}
              onCheckedChange={(checked) => 
                updateNestedSetting('privacy', 'analytics', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="crashReports">Rapports de crash</Label>
              <p className="text-xs text-gray-600">Aide à corriger les bugs</p>
            </div>
            <Switch
              id="crashReports"
              checked={settings.privacy.crashReports}
              onCheckedChange={(checked) => 
                updateNestedSetting('privacy', 'crashReports', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Avertissement en bas */}
      {isDirty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Modifications non sauvegardées</p>
                  <p className="text-xs text-gray-600">Pensez à sauvegarder vos paramètres</p>
                </div>
                <Button onClick={saveSettings} size="sm">
                  Sauvegarder
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};