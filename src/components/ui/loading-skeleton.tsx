
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  variant?: 'default' | 'hero' | 'card';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  lines = 3,
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'space-y-6';
      case 'card':
        return 'space-y-3 p-6';
      default:
        return 'space-y-2';
    }
  };

  return (
    <div className={cn('animate-pulse', getVariantClasses(), className)}>
      {variant === 'hero' && (
        <>
          <div className="h-16 bg-gray-200 rounded-3xl w-3/4 mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded-2xl w-1/2 mx-auto"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-12 bg-gray-200 rounded-full w-32"></div>
            <div className="h-12 bg-gray-200 rounded-full w-24"></div>
          </div>
        </>
      )}
      
      {variant === 'card' && (
        <>
          <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </>
      )}
      
      {variant === 'default' && (
        Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 bg-gray-200 rounded',
              i === lines - 1 ? 'w-3/4' : 'w-full'
            )}
          />
        ))
      )}
    </div>
  );
};
