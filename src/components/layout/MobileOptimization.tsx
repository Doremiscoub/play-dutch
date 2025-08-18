import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/use-mobile';

interface MobileNavigationTabsProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileNavigationTabs: React.FC<MobileNavigationTabsProps> = ({
  children,
  className
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-dutch-border/20 shadow-lg",
        className
      )}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="px-4 py-2 safe-area-bottom">
        {children}
      </div>
    </motion.div>
  );
};

interface MobileScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  hasBottomNav?: boolean;
}

export const MobileScrollContainer: React.FC<MobileScrollContainerProps> = ({
  children,
  className,
  hasBottomNav = false
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto",
        isMobile && hasBottomNav && "pb-20",
        className
      )}
    >
      {children}
    </div>
  );
};