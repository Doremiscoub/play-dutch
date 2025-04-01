
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Composant Logo pour l'application Dutch
 * Affiche le logo stylisé de l'application
 */
const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  // Déterminer la taille du logo en fonction du prop size
  const sizeClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  return (
    <div className={cn('font-bold', sizeClass, className)}>
      <span className="bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
        Dutch
      </span>
      <span className="ml-1 text-xs">✨</span>
    </div>
  );
};

export default Logo;
