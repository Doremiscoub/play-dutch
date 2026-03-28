import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal';
}

/**
 * V2: Clean, static background with subtle gradient.
 * Replaces the heavy canvas animation with a lightweight CSS solution.
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  if (variant === 'minimal') {
    return <div className="fixed inset-0 bg-white" />;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
  );
};

export default AnimatedBackground;
