/**
 * Particles animées pour le Professor Avatar
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Zap, Star, Flame, Award } from 'lucide-react';
import { useMobileAdaptation } from '@/hooks/useMobileAdaptation';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  icon: 'sparkle' | 'heart' | 'zap' | 'star' | 'flame' | 'award';
  color: string;
  size: number;
}

const particleIcons = { sparkle: Sparkles, heart: Heart, zap: Zap, star: Star, flame: Flame, award: Award };
const particleColors = ['text-dutch-blue', 'text-dutch-purple', 'text-dutch-orange', 'text-yellow-400', 'text-pink-400', 'text-green-400', 'text-red-400', 'text-cyan-400'];

export default function ProfessorAvatarParticles({ showParticles }: { showParticles: boolean }) {
  const { singleColumn } = useMobileAdaptation();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (showParticles) {
      const particleCount = singleColumn ? 6 : 12;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 120 - 10,
        y: Math.random() * 120 - 10,
        delay: Math.random() * 3,
        icon: Object.keys(particleIcons)[Math.floor(Math.random() * Object.keys(particleIcons).length)] as keyof typeof particleIcons,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        size: 3 + Math.random() * 2
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [showParticles, singleColumn]);

  if (!showParticles) return null;

  return (
    <AnimatePresence>
      {particles.map((particle) => {
        const IconComponent = particleIcons[particle.icon];
        
        return (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none z-10"
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            initial={{ opacity: 0, scale: 0, rotate: 0, x: 0, y: 0 }}
            animate={{ 
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0.8],
              y: [-20, -50, -80, -100],
              x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
              rotate: [0, 180, 360, 540]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: particle.delay, ease: "easeOut", times: [0, 0.2, 0.7, 1] }}
          >
            <IconComponent 
              className={`${particle.color} drop-shadow-lg`}
              style={{ width: `${particle.size * 4}px`, height: `${particle.size * 4}px`, filter: 'drop-shadow(0 0 4px currentColor)' }}
            />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
