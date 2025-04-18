
import React from 'react';
import BackgroundGrid from './BackgroundGrid';
import WavesBackground from './WavesBackground';
import BackgroundDots from './BackgroundDots';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      <BackgroundGrid />
      <WavesBackground />
      <BackgroundDots />
    </div>
  );
};

export default AnimatedBackground;
