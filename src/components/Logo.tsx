
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

/**
 * Composant Logo pour l'application Dutch
 * Affiche le logo stylisé de l'application avec un sparkle orange
 */
const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  // Déterminer la taille du logo en fonction du prop size
  const sizeClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
  }[size];

  // Déterminer la taille du sparkle en fonction de la taille du logo
  const sparkleSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-xl',
  }[size];

  // Déterminer l'offset vertical du sparkle
  const sparkleOffset = {
    sm: '-top-1',
    md: '-top-1',
    lg: '-top-1.5',
    xl: '-top-2',
    '2xl': '-top-2.5',
  }[size];

  return (
    <div className={cn('font-bold relative inline-flex items-center', sizeClass, className)}>
      <span className="bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
        Dutch
      </span>
      <span className={cn('relative ml-1.5', sparkleSize, sparkleOffset)}>
        <span className="text-dutch-orange">✨</span>
      </span>
    </div>
  );
};

export default Logo;
