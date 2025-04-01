
import React from 'react';
import { motion } from 'framer-motion';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  size?: LogoSize;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Map size to actual dimension
  const dimensions = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const textSize = dimensions[size];

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`font-bold ${textSize} bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent`}>
        Dutch
        <span className="ml-1 text-sm">✨</span>
      </div>
    </motion.div>
  );
};

export default Logo;
