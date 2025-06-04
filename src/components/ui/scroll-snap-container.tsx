
import React from 'react';
import { cn } from '@/lib/utils';

interface ScrollSnapContainerProps {
  children: React.ReactNode;
  className?: string;
  snapType?: 'y-mandatory' | 'y-proximity' | 'x-mandatory' | 'x-proximity';
}

export const ScrollSnapContainer: React.FC<ScrollSnapContainerProps> = ({
  children,
  className,
  snapType = 'y-mandatory'
}) => {
  const getSnapClass = () => {
    switch (snapType) {
      case 'y-mandatory':
        return 'snap-y snap-mandatory';
      case 'y-proximity':
        return 'snap-y snap-proximity';
      case 'x-mandatory':
        return 'snap-x snap-mandatory';
      case 'x-proximity':
        return 'snap-x snap-proximity';
      default:
        return 'snap-y snap-mandatory';
    }
  };

  return (
    <div className={cn('overflow-auto', getSnapClass(), className)}>
      {children}
    </div>
  );
};

interface ScrollSnapSectionProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export const ScrollSnapSection: React.FC<ScrollSnapSectionProps> = ({
  children,
  className,
  align = 'start'
}) => {
  const getAlignClass = () => {
    switch (align) {
      case 'start':
        return 'snap-start';
      case 'center':
        return 'snap-center';
      case 'end':
        return 'snap-end';
      default:
        return 'snap-start';
    }
  };

  return (
    <div className={cn(getAlignClass(), className)}>
      {children}
    </div>
  );
};
