
import React from 'react';
import { motion } from 'framer-motion';
import { UnifiedBackground } from './unified-background';
import PageHeader from '@/components/PageHeader';
import { ModernTitle } from './modern-title';
import { cn } from '@/lib/utils';

interface UnifiedPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4';
  withSparkles?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  showSettings?: boolean;
  onSettings?: () => void;
  backgroundVariant?: 'default' | 'subtle' | 'minimal';
  withAnimation?: boolean;
  containerClassName?: string;
  className?: string;
}

export const UnifiedPageLayout: React.FC<UnifiedPageLayoutProps> = ({
  children,
  title,
  titleVariant = 'h1',
  withSparkles = true,
  showBackButton,
  onBack,
  showSettings,
  onSettings,
  backgroundVariant = 'default',
  withAnimation = true,
  containerClassName,
  className
}) => {
  const content = (
    <UnifiedBackground variant={backgroundVariant} className={className}>
      <div className={cn("container max-w-6xl mx-auto px-4 py-8", containerClassName)}>
        {title && (
          <PageHeader
            title={
              <ModernTitle 
                variant={titleVariant} 
                withSparkles={withSparkles}
              >
                {title}
              </ModernTitle>
            }
            onBack={onBack}
            showSettings={showSettings}
            onSettings={onSettings}
          />
        )}
        {children}
      </div>
    </UnifiedBackground>
  );

  if (!withAnimation) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
};
