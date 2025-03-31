
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const ThemeSelector = () => {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'blue', color: '#1EAEDB', name: 'Bleu' },
    { id: 'green', color: '#10B981', name: 'Vert' },
    { id: 'pink', color: '#D946EF', name: 'Rose' },
    { id: 'purple', color: '#8B5CF6', name: 'Violet' },
    { id: 'red', color: '#EF4444', name: 'Rouge' },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 hover:bg-white/90 backdrop-blur-sm border border-white/30 shadow-sm relative overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 rounded-full opacity-30"
            animate={{ 
              background: themes.map(theme => theme.color)
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              repeatType: "reverse"
            }}
            style={{ 
              backgroundSize: '400% 400%',
              backgroundImage: `linear-gradient(45deg, ${themes.map(t => t.color).join(', ')})` 
            }}
          />
          <Paintbrush className="h-5 w-5 text-dutch-blue z-10" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl border border-white/30 bg-white/80 backdrop-blur-md shadow-lg p-1">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            className={cn(
              "flex items-center gap-2 rounded-lg px-2 py-1.5 cursor-pointer hover:bg-white focus:bg-white",
              currentTheme === theme.id && "bg-white shadow-sm"
            )}
            onClick={() => setTheme(theme.id)}
          >
            <div 
              className="h-5 w-5 rounded-full"
              style={{ backgroundColor: theme.color }}
            />
            <span className={cn(
              "font-medium",
              currentTheme === theme.id ? "text-dutch-blue" : "text-gray-700"
            )}>
              {theme.name}
            </span>
            {currentTheme === theme.id && (
              <motion.div 
                className="ml-auto w-2 h-2 rounded-full bg-dutch-blue" 
                layoutId="active-theme-indicator"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
