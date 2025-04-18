
import React from 'react';

const Wave = ({
  color,
  opacity,
  duration,
  offset,
  height,
}: { color: string; opacity: number; duration: number; offset: string; height: string }) => (
  <svg
    className="absolute bottom-0 w-[300%] will-change-transform"
    style={{ 
      animation: `waveMove ${duration}s linear infinite`, 
      transform: `translateX(${offset})`,
      height: height 
    }}
    viewBox="0 0 1440 200" 
    preserveAspectRatio="none"
  >
    <path
      d="M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 L1440,30 L0,30 Z"
      fill={color}
      fillOpacity={opacity}
    />
  </svg>
);

const WavesBackground: React.FC = () => {
  return (
    <div className="pointer-events-none select-none -z-10 absolute bottom-0 w-full">
      {/* Vague orange très pâle */}
      <Wave color="#FDE68A" opacity={0.8} duration={60} offset="0%" height="14vh" />
      {/* Vague violette avec hauteur ajustée et offset */}
      <Wave color="#E9D5FF" opacity={0.85} duration={120} offset="-15%" height="12vh" />
    </div>
  );
};

export default WavesBackground;
