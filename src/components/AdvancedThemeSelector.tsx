
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Paintbrush, Check, X, Palette, Save, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme, ThemeType, themeConfig } from '@/hooks/use-theme';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { HexColorPicker } from 'react-colorful';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface CustomTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  isCustom: boolean;
}

const AdvancedThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState<'select' | 'customize'>('select');
  const [customThemes, setCustomThemes] = useLocalStorage<CustomTheme[]>('dutch_custom_themes', []);
  
  const [editingTheme, setEditingTheme] = useState<CustomTheme | null>(null);
  const [themeName, setThemeName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#1EAEDB');
  const [secondaryColor, setSecondaryColor] = useState('#8B5CF6');
  const [accentColor, setAccentColor] = useState('#F97316');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [editingColorType, setEditingColorType] = useState<'primary' | 'secondary' | 'accent' | 'background'>('primary');
  
  const themes = [
    ...Object.entries(themeConfig).map(([id, theme]) => ({
      id: id as ThemeType,
      name: theme.name,
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      accent: theme.colors.accent,
      background: '#FFFFFF',
      isCustom: false
    })),
    ...customThemes
  ];

  const startCreatingTheme = () => {
    setThemeName('New Theme');
    setPrimaryColor('#1EAEDB');
    setSecondaryColor('#8B5CF6');
    setAccentColor('#F97316');
    setBackgroundColor('#FFFFFF');
    setEditingTheme({
      id: `custom-${Date.now()}`,
      name: 'New Theme',
      primary: '#1EAEDB',
      secondary: '#8B5CF6',
      accent: '#F97316',
      background: '#FFFFFF',
      isCustom: true
    });
  };
  
  const startEditingTheme = (theme: CustomTheme) => {
    setThemeName(theme.name);
    setPrimaryColor(theme.primary);
    setSecondaryColor(theme.secondary);
    setAccentColor(theme.accent);
    setBackgroundColor(theme.background);
    setEditingTheme(theme);
  };
  
  const cancelEditing = () => {
    setEditingTheme(null);
  };
  
  const saveTheme = () => {
    if (!themeName.trim()) {
      toast.error('Veuillez donner un nom à votre thème');
      return;
    }
    
    const updatedTheme: CustomTheme = {
      id: editingTheme?.id || `custom-${Date.now()}`,
      name: themeName.trim(),
      primary: primaryColor,
      secondary: secondaryColor,
      accent: accentColor,
      background: backgroundColor,
      isCustom: true
    };
    
    if (editingTheme) {
      setCustomThemes(prev => 
        prev.map(t => t.id === updatedTheme.id ? updatedTheme : t)
      );
      
      if (currentTheme === updatedTheme.id) {
        setTheme(updatedTheme.id as ThemeType);
      }
    } else {
      setCustomThemes(prev => [...prev, updatedTheme]);
    }
    
    setEditingTheme(null);
    toast.success(`Thème "${themeName}" enregistré`);
  };
  
  const deleteTheme = (themeId: string) => {
    setCustomThemes(prev => prev.filter(t => t.id !== themeId));
    
    if (currentTheme === themeId) {
      setTheme('blue');
    }
    
    toast.success('Thème supprimé');
  };
  
  const getCurrentColor = () => {
    switch (editingColorType) {
      case 'primary':
        return primaryColor;
      case 'secondary':
        return secondaryColor;
      case 'accent':
        return accentColor;
      case 'background':
        return backgroundColor;
    }
  };
  
  const setCurrentColor = (color: string) => {
    switch (editingColorType) {
      case 'primary':
        setPrimaryColor(color);
        break;
      case 'secondary':
        setSecondaryColor(color);
        break;
      case 'accent':
        setAccentColor(color);
        break;
      case 'background':
        setBackgroundColor(color);
        break;
    }
  };
  
  const randomizeColors = () => {
    setPrimaryColor('#' + Math.floor(Math.random()*16777215).toString(16));
    setSecondaryColor('#' + Math.floor(Math.random()*16777215).toString(16));
    setAccentColor('#' + Math.floor(Math.random()*16777215).toString(16));
    
    toast.success('Couleurs aléatoires générées');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon-sm" 
          className="shadow-md hover:shadow-lg bg-white/60 backdrop-blur-sm"
        >
          <div className="relative">
            <Paintbrush className="h-4 w-4" />
            <div 
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: themeConfig[currentTheme]?.primary || primaryColor }}
            ></div>
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-3xl bg-white/90 backdrop-blur-md border border-white/40 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl">Personnaliser l'apparence</DialogTitle>
          <DialogDescription>
            Choisissez un thème prédéfini ou créez votre propre palette de couleurs
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          defaultValue="select" 
          value={currentTab} 
          onValueChange={(value) => setCurrentTab(value as 'select' | 'customize')}
          className="w-full"
        >
          <div className="px-6">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="select" className="flex-1">
                Thèmes
              </TabsTrigger>
              <TabsTrigger value="customize" className="flex-1">
                Personnaliser
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="select" className="mt-0">
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-1 gap-4 p-6">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    className={cn(
                      "relative flex items-center w-full p-4 rounded-xl transition-all cursor-pointer hover:shadow-md",
                      currentTheme === theme.id ? "ring-2 ring-primary shadow-md" : "bg-white/60 border border-white/30"
                    )}
                    onClick={() => setTheme(theme.id as ThemeId)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: theme.primary }} />
                        <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: theme.secondary }} />
                        <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: theme.accent }} />
                      </div>
                      <span className="font-medium">{theme.name}</span>
                      {theme.isCustom && (
                        <span className="text-xs bg-dutch-blue/10 text-dutch-blue px-2 py-1 rounded-full">
                          Personnalisé
                        </span>
                      )}
                    </div>
                    
                    {currentTheme === theme.id ? (
                      <div className="rounded-full bg-primary w-6 h-6 flex items-center justify-center text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    ) : theme.isCustom ? (
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon-sm"
                          className="h-7 w-7 rounded-full text-gray-500 hover:text-dutch-blue hover:bg-dutch-blue/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditingTheme(theme as CustomTheme);
                          }}
                        >
                          <Palette className="h-3.5 w-3.5" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon-sm"
                              className="h-7 w-7 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-3xl bg-white/90 backdrop-blur-md">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Supprimer ce thème ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. Le thème "{theme.name}" sera définitivement supprimé.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => deleteTheme(theme.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ) : null}
                  </button>
                ))}
                
                <Button
                  variant="outline"
                  className="border-dashed border-2 p-4 rounded-xl w-full bg-white/40 hover:bg-white/70"
                  onClick={startCreatingTheme}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Créer un nouveau thème
                </Button>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="customize" className="mt-0">
            {editingTheme ? (
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme-name">Nom du thème</Label>
                  <Input 
                    id="theme-name" 
                    value={themeName} 
                    onChange={(e) => setThemeName(e.target.value)}
                    placeholder="Mon thème personnalisé"
                    className="bg-white/70"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <Button
                    variant="outline"
                    className={cn(
                      "flex flex-col items-center p-2 h-auto border-2",
                      editingColorType === 'primary' ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => setEditingColorType('primary')}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-1" 
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <span className="text-xs">Principal</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className={cn(
                      "flex flex-col items-center p-2 h-auto border-2",
                      editingColorType === 'secondary' ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => setEditingColorType('secondary')}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-1" 
                      style={{ backgroundColor: secondaryColor }}
                    ></div>
                    <span className="text-xs">Secondaire</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className={cn(
                      "flex flex-col items-center p-2 h-auto border-2",
                      editingColorType === 'accent' ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => setEditingColorType('accent')}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-1" 
                      style={{ backgroundColor: accentColor }}
                    ></div>
                    <span className="text-xs">Accent</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className={cn(
                      "flex flex-col items-center p-2 h-auto border-2",
                      editingColorType === 'background' ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => setEditingColorType('background')}
                  >
                    <div 
                      className="w-8 h-8 rounded-full mb-1 border" 
                      style={{ backgroundColor: backgroundColor }}
                    ></div>
                    <span className="text-xs">Fond</span>
                  </Button>
                </div>
                
                <div className="rounded-xl border overflow-hidden p-4 bg-white/70">
                  <HexColorPicker
                    color={getCurrentColor()}
                    onChange={setCurrentColor}
                    className="w-full"
                  />
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Label htmlFor="color-hex" className="shrink-0">Code couleur:</Label>
                    <Input
                      id="color-hex"
                      value={getCurrentColor()}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                
                <div className="rounded-xl border overflow-hidden p-4 bg-white/70">
                  <h3 className="text-sm font-medium mb-3">Aperçu</h3>
                  <div 
                    className="rounded-xl p-4 border shadow-md" 
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <span style={{ color: primaryColor }} className="font-medium">Texte principal</span>
                    </div>
                    <div 
                      className="text-sm mb-2" 
                      style={{ color: secondaryColor }}
                    >
                      Texte secondaire avec plus d'informations
                    </div>
                    <Button 
                      className="mt-2 text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Bouton
                    </Button>
                    <div
                      className="mt-2 p-2 rounded-lg text-white text-sm"
                      style={{ backgroundColor: accentColor }}
                    >
                      Élément d'accent
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={randomizeColors}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Aléatoire
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={cancelEditing}>
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                    <Button onClick={saveTheme}>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 h-[300px]">
                <Palette className="h-16 w-16 text-dutch-blue/20 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun thème en édition</h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Sélectionnez un thème existant à modifier ou créez-en un nouveau
                </p>
                <Button onClick={startCreatingTheme}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un thème
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedThemeSelector;
