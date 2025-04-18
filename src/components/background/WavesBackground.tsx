
import React from 'react';

const YellowWave = () => (
  <svg
    className="absolute bottom-[10vh] w-[200%] h-[16vh] animate-waveYellow"
    viewBox="0 0 1440 200" 
    preserveAspectRatio="none"
  >
    <path 
      fill="#FDE68A" 
      fillOpacity="0.8"
      d="M0,96L60,101.3C120,107,240,117,360,117.3C480,117,600,107,720,122.7C840,139,960,181,1080,197.3C1200,213,1320,203,1380,197.3L1440,192V0H0Z" 
    />
  </svg>
);

const PurpleWave = () => (
  <svg
    className="absolute bottom-0 w-[200%] h-[14vh] animate-wavePurple"
    viewBox="0 0 1440 200" 
    preserveAspectRatio="none"
  >
    <path 
      fill="#E9D5FF" 
      fillOpacity="0.85"
      d="M0,160L60,154.7C120,149,240,139,360,128C480,117,600,107,720,112C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192V0H0Z" 
    />
  </svg>
);

const WavesBackground: React.FC = () => {
  return (
    <div className="pointer-events-none select-none">
      <YellowWave />
      <PurpleWave />
    </div>
  );
};

export default WavesBackground;
