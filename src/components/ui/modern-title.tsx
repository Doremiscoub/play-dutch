
import React from 'react';
import { SparkleIcon } from './sparkle-icon';

interface ModernTitleProps {
  children: React.ReactNode;
  withSparkles?: boolean;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3';
}

export const ModernTitle = ({
  children,
  withSparkles = false,
  className = '',
  variant = 'h1'
}: ModernTitleProps) => {
  // Ajuster les tailles de texte en fonction de la variante
  const sizeClasses = {
    'h1': 'text-4xl sm:text-5xl',
    'h2': 'text-3xl sm:text-4xl',
    'h3': 'text-2xl sm:text-3xl'
  };

  // Ajuster la marge inférieure en fonction de la variante
  const marginClasses = {
    'h1': 'mb-6 mt-2',
    'h2': 'mb-4 mt-1',
    'h3': 'mb-3 mt-1'
  };

  // Ajuster le flou et l'intensité du gradient en fonction de la variante
  const glowClasses = {
    'h1': 'blur-xl',
    'h2': 'blur-lg',
    'h3': 'blur-md'
  };

  // Déterminer l'élément HTML à utiliser
  const Component = variant as keyof JSX.IntrinsicElements;

  return (
    <Component className={`relative font-bold ${sizeClasses[variant]} ${marginClasses[variant]} ${className}`}>
      <span className={`absolute -inset-1 block rounded-lg bg-gradient-to-br from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 ${glowClasses[variant]}`} />
      <span className="relative inline-flex bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] animate-shimmer">
        {children}
        {withSparkles && <SparkleIcon />}
      </span>
    </Component>
  );
};
