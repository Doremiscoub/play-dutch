
import React from 'react';
import BackgroundGrid from './BackgroundGrid';
import BackgroundDots from './BackgroundDots';
import WavesBackground from './WavesBackground';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      <BackgroundGrid />
      <BackgroundDots />
      <WavesBackground />
    </>
  );
};

export default AnimatedBackground;
