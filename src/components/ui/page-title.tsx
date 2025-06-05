
import React from 'react';
import { cn } from '@/lib/utils';
import { ModernTitle } from './modern-title';

interface PageTitleProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  withSparkles?: boolean;
  withIcon?: boolean;
  className?: string;
  centered?: boolean;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  variant = 'h1',
  withSparkles = true,
  withIcon = false,
  className,
  centered = true
}) => {
  return (
    <div className={cn(
      "mb-6 sm:mb-8",
      centered && "text-center",
      className
    )}>
      <ModernTitle
        variant={variant}
        withSparkles={withSparkles}
        withIcon={withIcon}
        className="font-bold"
      >
        {children}
      </ModernTitle>
    </div>
  );
};
