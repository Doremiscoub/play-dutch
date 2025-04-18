
import React, { useState, useEffect } from 'react';

const NUM_DOTS = 40;
const COLORS = ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'];

interface Dot {
  id: string;
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  opacity: number;
}

const BackgroundDots: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const newDots = Array.from({ length: NUM_DOTS }, (_, i) => ({
      id: `dot-${i}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: 25 + Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.3
    }));
    
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(-10px); }
            50% { transform: translateY(10px); }
          }
          
          .animated-dot {
            position: absolute;
            border-radius: 50%;
            will-change: transform;
          }
        `}
      </style>

      {dots.map((dot) => (
        <div
          key={dot.id}
          className="animated-dot"
          style={{
            left: dot.x,
            top: dot.y,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            animation: `float ${dot.duration}s ease-in-out infinite`,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundDots;
