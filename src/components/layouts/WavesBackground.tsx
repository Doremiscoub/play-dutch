
import React from 'react';

const WavesBackground: React.FC = () => (
  <>
    <style>{`
      @keyframes waveAnimation1 {
        0% { transform: translateX(0) scale(1.02); }
        50% { transform: translateX(-15%) scale(1); }
        100% { transform: translateX(0) scale(1.02); }
      }
      
      @keyframes waveAnimation2 {
        0% { transform: translateX(0) scale(1); }
        50% { transform: translateX(15%) scale(1.05); }
        100% { transform: translateX(0) scale(1); }
      }
      
      @keyframes waveAnimation3 {
        0% { transform: translateX(0) scale(1.03); }
        50% { transform: translateX(-10%) scale(1); }
        100% { transform: translateX(0) scale(1.03); }
      }
    `}</style>
    <div className="wave-bottom-1" />
    <div className="wave-bottom-2" />
    <div className="wave-bottom-3" />
  </>
);

export default WavesBackground;
