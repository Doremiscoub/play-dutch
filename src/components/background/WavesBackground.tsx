
import React from 'react';

const WavesBackground: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[16vh] z-[-1] overflow-hidden pointer-events-none">
      {/* Styles for wave animations */}
      <style jsx>{`
        @keyframes waveMotion1 {
          0% { transform: translateX(0%); }
          50% { transform: translateX(-25%); }
          100% { transform: translateX(0%); }
        }
        
        @keyframes waveMotion2 {
          0% { transform: translateX(0%); }
          50% { transform: translateX(-15%); }
          100% { transform: translateX(0%); }
        }
        
        .wave-back {
          animation: waveMotion1 80s linear infinite;
          opacity: 0.8;
        }
        
        .wave-front {
          animation: waveMotion2 40s linear infinite;
          opacity: 0.85;
          animation-delay: -10s;
        }
      `}</style>

      {/* Background yellow wave */}
      <div className="absolute inset-0 wave-back" style={{ bottom: '-3vh' }}>
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ height: '14vh' }}
        >
          <path
            fill="#FDE68A"
            d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,213.3C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Foreground purple wave */}
      <div className="absolute inset-0 wave-front" style={{ bottom: '-2vh' }}>
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ height: '12vh' }}
        >
          <path
            fill="#E9D5FF"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,165.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default WavesBackground;
