
import React from 'react';

interface WaveProps {
  color: string;
  opacity: number;
  duration: number;
  offset: string;
  height: string;
}

const Wave: React.FC<WaveProps> = ({ color, opacity, duration, offset, height }) => (
  <svg
    className={`absolute bottom-0 w-[300%] will-change-transform pointer-events-none`}
    style={{ 
      height,
      animation: `waveMove ${duration}s linear infinite`,
      transform: `translateX(${offset})`
    }}
    viewBox="0 0 1440 200"
    preserveAspectRatio="none"
  >
    <path
      fill={color}
      fillOpacity={opacity}
      d="M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160 L1440,0 L0,0 Z"
    />
  </svg>
);

export default function WavesBackground() {
  return (
    <div className="pointer-events-none select-none">
      <Wave
        color="#FDE68A"
        opacity={0.8}
        duration={60}
        offset="0%"
        height="14vh"
      />
      <Wave
        color="#E9D5FF"
        opacity={0.85}
        duration={120}
        offset="-15%"
        height="12vh"
      />
    </div>
  );
}
