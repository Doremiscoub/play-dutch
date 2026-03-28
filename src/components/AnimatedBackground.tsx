import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'game' | 'minimal';
}

/**
 * V2: Refined gradient background that provides depth for glass surfaces.
 * Uses layered gradients and subtle color shifts to create a living canvas.
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  if (variant === 'minimal') {
    return <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-white" />;
  }

  if (variant === 'game') {
    return (
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50/50" />
        {/* Subtle radial accents for depth */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-purple-100/30 to-transparent rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/60" />
      {/* Ambient color orbs — subtle, premium depth */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-radial from-blue-200/25 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-gradient-radial from-purple-200/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-gradient-radial from-orange-100/15 to-transparent rounded-full blur-3xl" />
    </div>
  );
};

export default AnimatedBackground;
