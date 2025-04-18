
import React, { useEffect, useRef } from 'react';

const COLORS = ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'];

const BackgroundDots: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Créer les points une seule fois au montage
    const dotCount = window.innerWidth < 640 ? 12 : 20;
    
    const dots = Array.from({ length: dotCount }, () => {
      const dot = document.createElement('div');
      const size = 2 + Math.random() * 6;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      dot.className = 'absolute rounded-full animate-float';
      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.3 + Math.random() * 0.4};
        animation-delay: ${-Math.random() * 20}s;
        animation-duration: ${20 + Math.random() * 10}s;
        will-change: transform, opacity;
      `;
      
      return dot;
    });

    dots.forEach(dot => container.appendChild(dot));

    return () => {
      dots.forEach(dot => dot.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
    />
  );
};

export default BackgroundDots;
