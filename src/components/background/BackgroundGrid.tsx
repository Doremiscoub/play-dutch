
import React from 'react';

const BackgroundGrid: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 z-[-2]" 
      style={{ 
        background: 'linear-gradient(to bottom, #FFFFFF, #F8F9FA)',
        backgroundImage: 'linear-gradient(to right, #DADADA1A 1px, transparent 1px), linear-gradient(to bottom, #DADADA1A 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    />
  );
};

export default BackgroundGrid;
