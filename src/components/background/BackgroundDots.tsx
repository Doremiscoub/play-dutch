
import React, { useEffect, useRef } from 'react';

const NUM_DOTS = 40;
const MIN_SIZE = 2;
const MAX_SIZE = 8;
const MIN_OPACITY = 0.3;
const MAX_OPACITY = 0.6;

export default function BackgroundDots() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing dots
    container.innerHTML = '';

    // Create new dots
    for (let i = 0; i < NUM_DOTS; i++) {
      const dot = document.createElement('div');
      
      // Random properties
      const size = MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE);
      const opacity = MIN_OPACITY + Math.random() * (MAX_OPACITY - MIN_OPACITY);
      const duration = 25 + Math.random() * 10;
      
      // Position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Styles
      dot.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${['#E9D5FF', '#FDE68A', '#BAE6FD'][Math.floor(Math.random() * 3)]};
        border-radius: 50%;
        opacity: ${opacity};
        animation: float ${duration}s ease-in-out infinite;
        will-change: transform;
      `;
      
      container.appendChild(dot);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
