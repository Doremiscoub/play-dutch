import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import useIsMobile from '@/hooks/use-mobile';

interface MobileFloatingButtonProps {
  children: React.ReactNode;
  className?: string;
  bottom?: string;
  right?: string;
}

export const MobileFloatingButton: React.FC<MobileFloatingButtonProps> = ({
  children,
  className,
  bottom = "6",
  right = "6"
}) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className={cn(
        "fixed z-50",
        `bottom-${bottom} right-${right}`,
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17,
        delay: 0.2 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

interface MobileStickyFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileStickyFooter: React.FC<MobileStickyFooterProps> = ({
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
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-white/95 backdrop-blur-xl border-t border-dutch-border/20 shadow-lg",
        "safe-area-bottom",
        className
      )}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="px-4 py-3">
        {children}
      </div>
    </motion.div>
  );
};