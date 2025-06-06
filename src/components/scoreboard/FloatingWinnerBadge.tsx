
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Sparkles } from 'lucide-react';

interface FloatingWinnerBadgeProps {
  isWinner: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}

const FloatingWinnerBadge: React.FC<FloatingWinnerBadgeProps> = ({ isWinner, cardRef }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });

  // Throttled update function for better performance
  const updatePosition = useCallback(() => {
    if (!isWinner || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Position élégante : coin supérieur droit avec offset décoratif
    setPosition({
      left: rect.left + scrollLeft + rect.width - 20,
      top: rect.top + scrollTop - 24
    });
  }, [isWinner, cardRef]);

  useEffect(() => {
    if (!isWinner || !cardRef.current) return;

    // Position initiale
    updatePosition();

    // Throttled event handlers pour optimiser les performances
    let timeoutId: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updatePosition, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('resize', throttledUpdate, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', throttledUpdate);
      window.removeEventListener('resize', throttledUpdate);
    };
  }, [isWinner, updatePosition]);

  if (!isWinner) return null;

  return (
    <motion.div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: position.left,
        top: position.top,
      }}
      initial={{ 
        opacity: 0, 
        scale: 0, 
        rotate: -180, 
        y: 20 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0, 
        y: 0 
      }}
      transition={{ 
        delay: 0.3, 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        opacity: { duration: 0.4 },
        scale: { duration: 0.6 },
        rotate: { duration: 0.8 }
      }}
    >
      {/* Container principal avec glow effect */}
      <motion.div
        className="relative"
        animate={{
          y: [0, -8, 0], // Animation de flottement vertical
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Halo lumineux en arrière-plan */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-amber-400/30 via-yellow-300/40 to-amber-400/30 rounded-full blur-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Pastille principale */}
        <motion.div
          className="relative bg-gradient-to-br from-amber-50/95 via-yellow-50/95 to-amber-100/95 backdrop-blur-md rounded-full p-3 shadow-xl border border-amber-300/40"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            scale: {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          {/* Couronne avec pulsation */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Crown className="h-8 w-8 text-amber-600 drop-shadow-sm" />
          </motion.div>

          {/* Particules scintillantes */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -left-1"
            animate={{
              scale: [1, 0.7, 1],
              rotate: [0, -180, -360],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Sparkles className="h-3 w-3 text-amber-400" />
          </motion.div>
        </motion.div>

        {/* Étoile en arrière-plan avec rotation */}
        <motion.div
          className="absolute -inset-2 flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: {
              duration: 20, 
              repeat: Infinity, 
              ease: "linear"
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Star className="h-12 w-12 text-amber-300/40" />
        </motion.div>

        {/* Rayons de lumière décoratifs */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, -360],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className="w-16 h-16 relative">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-gradient-to-t from-amber-400/60 to-transparent"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 8px',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  height: ['12px', '16px', '12px']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingWinnerBadge;
