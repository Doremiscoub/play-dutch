
import React from 'react';
import { cn } from '@/lib/utils';

interface UnifiedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
  className?: string;
  children: React.ReactNode;
  overlay?: boolean;
}

export const UnifiedBackground: React.FC<UnifiedBackgroundProps> = ({
  variant = 'default',
  className,
  children,
  overlay = false
}) => {
  return (
    <div className={cn(
      "min-h-screen relative",
      className
    )}>
      {/* Overlay optionnel pour améliorer la lisibilité du contenu */}
      {overlay && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px] z-0" />
      )}
      
      {/* Contenu avec z-index élevé pour être au-dessus du fond */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Hook pour utiliser le fond unifié dans les composants
export const useUnifiedBackground = (variant: 'default' | 'subtle' | 'minimal' = 'default') => {
  return {
    variant,
    isAnimated: true,
    className: `unified-background-${variant}`,
  };
};
