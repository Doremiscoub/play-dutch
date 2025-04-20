
import React from 'react';

const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="w-full h-full bg-gradient-to-b from-white to-[#F8F9FA]">
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(218, 218, 218, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(218, 218, 218, 0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px' 
        }} />
      </div>
    </div>
  );
};

export default BackgroundGrid;
