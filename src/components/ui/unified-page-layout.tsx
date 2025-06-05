
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ArrowLeft } from 'lucide-react';

interface UnifiedPageLayoutProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  backgroundVariant?: 'minimal' | 'subtle' | 'default';
  children: React.ReactNode;
  className?: string;
}

export const UnifiedPageLayout: React.FC<UnifiedPageLayoutProps> = ({
  title,
  showBackButton,
  onBack,
  backgroundVariant = 'default',
  children,
  className
}) => {
  const backgroundClasses = {
    minimal: 'bg-gray-50',
    subtle: 'bg-gradient-to-br from-gray-50 to-white',
    default: 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
  };

  return (
    <div className={cn('min-h-screen', backgroundClasses[backgroundVariant])}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn('container mx-auto px-4 py-8', className)}>
        {children}
      </main>
    </div>
  );
};
