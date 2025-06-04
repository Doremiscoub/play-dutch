
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { cn } from '@/lib/utils';

interface UnifiedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
  className?: string;
  children: React.ReactNode;
}

export const UnifiedBackground: React.FC<UnifiedBackgroundProps> = ({
  variant = 'default',
  className,
  children
}) => {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-b from-white to-gray-50 relative",
      className
    )}>
      <div className="absolute inset-0">
        <AnimatedBackground variant={variant} />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
