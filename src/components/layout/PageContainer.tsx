import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  /** Maximum width variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional classes */
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-screen-xl',
};

export default function PageContainer({
  children,
  size = 'lg',
  className
}: PageContainerProps) {
  return (
    <div className={cn(
      'container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8',
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  );
}
