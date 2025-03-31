
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Paintbrush, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme, ThemeId, themeConfig } from '@/hooks/use-theme';

// Convert theme config to array for rendering
const themes = Object.entries(themeConfig).map(([id, theme]) => ({
  id: id as ThemeId,
  name: theme.name,
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent
}));

const ThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon-sm" 
          glassmorphism
          elevated
          className="shadow-md hover:shadow-lg"
        >
          <div className="relative">
            <Paintbrush className="h-4 w-4" />
            <div 
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: themeConfig[currentTheme].primary }}
            ></div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl">
        <DialogHeader>
          <DialogTitle>Thèmes de couleur</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={cn(
                "relative flex items-center w-full p-4 rounded-xl transition-all cursor-pointer hover:shadow-md",
                currentTheme === theme.id ? "ring-2 ring-primary shadow-md" : "bg-white/60 border border-white/30"
              )}
              onClick={() => setTheme(theme.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: theme.primary }} />
                  <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: theme.secondary }} />
                  <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: theme.accent }} />
                </div>
                <span className="font-medium">{theme.name}</span>
              </div>
              {currentTheme === theme.id && (
                <div className="absolute right-4 rounded-full bg-primary w-6 h-6 flex items-center justify-center text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeSelector;
