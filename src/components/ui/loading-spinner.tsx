
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className, 
  size = 'md',
  message = 'Chargement...'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8', className)}>
      <div 
        className={cn(
          'animate-spin rounded-full border-2 border-dutch-blue/20 border-t-dutch-blue',
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
