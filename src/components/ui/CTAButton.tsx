
import React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'outline';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  variant = 'solid',
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 w-full max-w-md h-14 rounded-full font-medium transition-all duration-200 transform hover:-translate-y-0.5',
        variant === 'solid' 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
          : 'border-2 border-purple-200/40 text-purple-600 bg-white/5 hover:bg-white/10',
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default CTAButton;
