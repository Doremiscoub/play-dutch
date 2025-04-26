
import React from 'react';
import { SparkleIcon } from './sparkle-icon';

interface ModernTitleProps {
  children: React.ReactNode;
  withSparkles?: boolean;
  className?: string;
}

export const ModernTitle = ({
  children,
  withSparkles = false,
  className = ''
}: ModernTitleProps) => {
  return (
    <h1 className={`relative text-4xl sm:text-5xl font-bold mb-2 ${className}`}>
      <span className="absolute -inset-1 block rounded-lg bg-gradient-to-br from-dutch-blue/20 via-dutch-purple/20 to-dutch-orange/20 blur-xl" />
      <span className="relative inline-flex bg-gradient-to-br from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] animate-shimmer">
        {children}
        {withSparkles && <SparkleIcon />}
      </span>
    </h1>
  );
};
