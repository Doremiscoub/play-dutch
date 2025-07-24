
import React, { ReactNode } from 'react';
import { UnifiedBackground } from '@/components/ui/unified-background';
import GlobalFooter from './GlobalFooter';

interface PageShellProps {
  children: ReactNode;
  variant?: 'default' | 'minimal' | 'game';
  className?: string;
  showFooter?: boolean;
}

export default function PageShell({ 
  children, 
  variant = 'default',
  className = '',
  showFooter = true
}: PageShellProps) {
  return (
    <div className={`min-h-screen relative flex flex-col ${className}`}>
      <UnifiedBackground variant={variant === 'minimal' ? 'minimal' : 'default'}>
        <div className="flex-1">
          {children}
        </div>
        {showFooter && (
          <GlobalFooter 
            variant={variant === 'game' ? 'minimal' : 'default'} 
            className="mt-auto"
          />
        )}
      </UnifiedBackground>
    </div>
  );
}
