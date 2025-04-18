
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Dot {
  id: string;
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const COLORS = ['#A78BFA', '#FDBA74', '#6EE7B7', '#60A5FA'];

const BackgroundDots: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // Generate 40 random dots
    const newDots = Array.from({ length: 40 }, (_, i) => ({
      id: `dot-${i}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 6, // Size between 2-8px
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: 25 + Math.random() * 10, // 25-35 seconds per animation cycle
      delay: -Math.random() * 20, // Random starting point in the animation
    }));
    
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* CSS Fallback Animation */}
      <style>
        {`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.6;
          }
        }
        
        .animated-dot {
          position: absolute;
          border-radius: 50%;
          will-change: transform, opacity;
        }
        
        /* Fallback for when framer-motion is not available */
        .animated-dot:not(.framer-motion-enabled) {
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        `}
      </style>

      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="animated-dot framer-motion-enabled"
          style={{
            left: dot.x,
            top: dot.y,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            // Use CSS variables as string values
            '--duration': `${dot.duration}s`,
            '--delay': `${dot.delay}s`,
          } as React.CSSProperties}
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundDots;
