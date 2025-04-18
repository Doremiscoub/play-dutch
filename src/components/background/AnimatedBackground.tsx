
import React from 'react';
import BackgroundGrid from './BackgroundGrid';
import BackgroundDots from './BackgroundDots';
import WavesBackground from './WavesBackground';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden">
      <BackgroundGrid />
      <BackgroundDots />
      <WavesBackground />
    </div>
  );
};

export default AnimatedBackground;
