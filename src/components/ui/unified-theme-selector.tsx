
import React from 'react';
import { Button } from '@/components/ui/button-unified';
import { useUnifiedTheme } from './unified-theme-provider';
import { THEMES } from '@/config/theme/themes';
import { Palette, Sun, Moon } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UnifiedThemeSelector: React.FC = () => {
  const { theme, setTheme, isDark, toggleTheme } = useUnifiedTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="glass"
          size="icon"
          className="bg-white/70 backdrop-blur-xl border border-white/50"
        >
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(THEMES).map(([key, themeConfig]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key as any)}
            className="flex items-center gap-3"
          >
            <div
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: themeConfig.colors.primary }}
            />
            <span className="flex-1">{themeConfig.name}</span>
            {theme === key && (
              <div className="w-2 h-2 bg-dutch-blue rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={toggleTheme} className="flex items-center gap-3">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          Basculer {isDark ? 'clair' : 'sombre'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
