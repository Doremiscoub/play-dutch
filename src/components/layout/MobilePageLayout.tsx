import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/use-mobile';

interface MobilePageLayoutProps {
  children: React.ReactNode;
  className?: string;
  hasHeader?: boolean;
  hasBottomNav?: boolean;
}

export const MobilePageLayout: React.FC<MobilePageLayoutProps> = ({
  children,
  className,
  hasHeader = true,
  hasBottomNav = false
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-background",
      "safe-area-left safe-area-right",
      className
    )}>
      <div className={cn(
        "flex-1 flex flex-col",
        hasHeader && "pt-0",
        hasBottomNav && "pb-20"
      )}>
        {children}
      </div>
    </div>
  );
};

interface MobileContentAreaProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const MobileContentArea: React.FC<MobileContentAreaProps> = ({
  children,
  className,
  noPadding = false
}) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={cn(
        "flex-1 overflow-y-auto",
        !noPadding && isMobile && "px-4 py-4",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};