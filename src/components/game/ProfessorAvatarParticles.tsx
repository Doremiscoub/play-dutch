
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Zap } from 'lucide-react';

interface ProfessorAvatarParticlesProps {
  showParticles: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export default function ProfessorAvatarParticles({ showParticles }: ProfessorAvatarParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (showParticles) {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setParticles(newParticles);
    }
  }, [showParticles]);

  if (!showParticles) return null;

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [-20, -40, -60],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut"
          }}
        >
          {particle.id % 3 === 0 && <Sparkles className="w-3 h-3 text-yellow-400" />}
          {particle.id % 3 === 1 && <Heart className="w-2 h-2 text-pink-400" />}
          {particle.id % 3 === 2 && <Zap className="w-2.5 h-2.5 text-blue-400" />}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
