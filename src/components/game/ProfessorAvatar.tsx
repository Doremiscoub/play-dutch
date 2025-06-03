
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sparkles, Heart, Zap } from 'lucide-react';

const SOURCE = '/lovable-uploads/f78df6b3-591c-497c-b2d2-516b2fb7b5a4.png';
const FALLBACK = '/professor.png';

interface ProfessorAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  animate?: boolean;
  mood?: 'happy' | 'excited' | 'thinking' | 'surprised' | 'neutral';
  showParticles?: boolean;
}

export default function ProfessorAvatar({ 
  className = '', 
  size = 'xl',
  animate = true,
  mood = 'neutral',
  showParticles = true
}: ProfessorAvatarProps) {
  const [errored, setErrored] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const handleError = () => {
    console.log("❌ Image principale non chargée, utilisation du fallback");
    setErrored(true);
  };

  // Generate floating particles
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

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
    xxl: 'w-48 h-48'
  };

  const moodAnimations = {
    happy: { rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] },
    excited: { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] },
    thinking: { rotate: [0, 1, -1, 0], scale: [1, 1.01, 1] },
    surprised: { rotate: [0, 3, -3, 0], scale: [1, 1.08, 1] },
    neutral: { rotate: [0, 1, -1, 0], scale: [1, 1.02, 1] }
  };

  const moodColors = {
    happy: 'from-green-400 via-emerald-500 to-green-600',
    excited: 'from-orange-400 via-red-500 to-pink-600',
    thinking: 'from-blue-400 via-indigo-500 to-purple-600',
    surprised: 'from-yellow-400 via-orange-500 to-red-600',
    neutral: 'from-dutch-blue via-dutch-purple to-dutch-orange'
  };

  return (
    <motion.div 
      className={cn(
        'relative group cursor-pointer',
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating Particles */}
      <AnimatePresence>
        {showParticles && particles.map((particle) => (
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

      {/* Outer Glow Ring */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r opacity-30 blur-lg",
          moodColors[mood]
        )}
        animate={animate ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Avatar Container - Simplifié */}
      <motion.div 
        className={cn(
          "relative rounded-full p-2 shadow-2xl",
          `bg-gradient-to-r ${moodColors[mood]}`,
          isHovered && "scale-110",
          "transition-all duration-500",
          sizeClasses[size]
        )}
        animate={animate ? moodAnimations[mood] : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -10, 10, 0],
          transition: { duration: 0.6 }
        }}
      >
        {/* Inner Circle - Structure simplifiée */}
        <div className="h-full w-full bg-white rounded-full p-1 shadow-inner relative overflow-hidden">
          {/* Avatar Image */}
          <motion.div 
            className="h-full w-full relative flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-gray-50 to-white"
            animate={isHovered ? { 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.02, 1]
            } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {!errored ? (
              <motion.img
                src={SOURCE}
                alt="Professeur Cartouche"
                onError={handleError}
                className={cn(
                  "h-full w-full object-cover scale-110",
                  isHovered && "scale-125"
                )}
                style={{ 
                  filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)'
                }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <motion.div 
                className={cn(
                  "text-6xl",
                  isHovered && "scale-110"
                )}
                animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                👴🏼
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Ripple Effect on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.3, opacity: 0 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Ambient Light Effect */}
      <div className="absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r rounded-full blur-2xl opacity-20",
          moodColors[mood]
        )} />
      </div>
    </motion.div>
  );
}
