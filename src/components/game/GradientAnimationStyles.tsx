
import React from 'react';

const GradientAnimationStyles: React.FC = () => {
  return (
    <style>
      {`
        @keyframes gradient-x {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}
    </style>
  );
};

export default GradientAnimationStyles;
