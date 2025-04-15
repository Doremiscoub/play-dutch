
import React from 'react';

const GradientAnimationStyles: React.FC = () => {
  return (
    <style>
      {`
        @keyframes gradient-x {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
        
        @keyframes gradient-radial {
          0% { background-size: 100% 100%; }
          50% { background-size: 120% 120%; }
          100% { background-size: 100% 100%; }
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 5px 0px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.6); }
          100% { box-shadow: 0 0 5px 0px rgba(139, 92, 246, 0.3); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #1EAEDB, #8B5CF6, #F97316, #1EAEDB);
          background-size: 300% 100%;
          animation: gradient-x 8s infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .pulse-card {
          animation: pulse-glow 3s infinite;
        }
        
        .float-element {
          animation: float 3s ease-in-out infinite;
        }
      `}
    </style>
  );
};

export default GradientAnimationStyles;
