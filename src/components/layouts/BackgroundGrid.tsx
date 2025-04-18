
import React from 'react';

const BackgroundGrid: React.FC<{ show?: boolean }> = ({ show = true }) => {
  if (!show) return null;

  return (
    <div 
      className="absolute inset-0 z-[-5]" 
      style={{ 
        backgroundImage: 'linear-gradient(to right, #DADADA1A 1px, transparent 1px), linear-gradient(to bottom, #DADADA1A 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        background: 'linear-gradient(to bottom, #F8F9FA, #FFFFFF)'
      }}
    />
  );
};

export default BackgroundGrid;
