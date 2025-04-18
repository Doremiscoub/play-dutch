
import React, { useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

const BackgroundDots: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const generateDots = () => {
      const dotsContainer = document.querySelector('.background-dots');
      if (!dotsContainer) return;
      
      dotsContainer.innerHTML = '';
      const colors = ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'];
      const numberOfDots = isMobile ? 12 : 20;
      
      for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('background-dot');
        
        const size = Math.random() * 6 + 2;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.backgroundColor = randomColor;
        
        dot.style.animationDelay = `${Math.random() * 5}s`;
        dot.style.animationDuration = `${Math.random() * 5 + 8}s`;
        
        dotsContainer.appendChild(dot);
      }
    };
    
    generateDots();
    window.addEventListener('resize', generateDots);
    return () => {
      window.removeEventListener('resize', generateDots);
    };
  }, [isMobile]);

  return <div className="background-dots" />;
};

export default BackgroundDots;
