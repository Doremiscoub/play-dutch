
import React from 'react';
import BackgroundGrid from './BackgroundGrid';
import WavesBackground from './WavesBackground';
import BackgroundDots from './BackgroundDots';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <BackgroundGrid />
      <WavesBackground />
      <BackgroundDots />
    </div>
  );
}
