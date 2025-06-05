
import React, { ReactNode } from 'react';
import { UnifiedBackground } from '@/components/ui/unified-background';

interface PageShellProps {
  children: ReactNode;
  variant?: 'default' | 'minimal' | 'game';
  className?: string;
}

export default function PageShell({ 
  children, 
  variant = 'default',
  className = '' 
}: PageShellProps) {
  return (
    <div className={`min-h-screen relative ${className}`}>
      <UnifiedBackground variant={variant === 'minimal' ? 'minimal' : 'default'} />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
