
import React from 'react';
import { cn } from '@/lib/utils';

interface UnifiedBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'minimal';
  className?: string;
}

export const UnifiedBackground: React.FC<UnifiedBackgroundProps> = ({
  children,
  variant = 'default',
  className
}) => {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'subtle':
        return 'bg-gradient-to-br from-gray-50/90 to-white/95';
      case 'minimal':
        return 'bg-gray-50/80';
      default:
        return 'bg-gradient-to-br from-gray-50/80 via-white/90 to-gray-100/80';
    }
  };

  return (
    <div className={cn(
      'min-h-screen relative',
      getBackgroundClasses(),
      className
    )}>
      {/* Game-inspired background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-4 h-4 bg-game-red rounded-full animate-float" />
        <div className="absolute top-20 right-20 w-6 h-6 bg-game-blue rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-game-green rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-game-yellow rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-game-purple rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-game-orange rounded-full animate-float" style={{ animationDelay: '5s' }} />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
