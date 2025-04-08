
import React from 'react';
import { motion, Variants } from 'framer-motion';
import themeConfig from '@/config/theme';

/**
 * Variants d'animation réutilisables pour Framer Motion - Inspiré iOS 19 et VisionOS
 */
export const animationVariants = {
  // Fade in depuis le bas - style iOS 
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
  },
  
  // Fade in depuis la droite - style iOS
  fadeInRight: {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
  },
  
  // Scale in - style VisionOS
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1] // VisionOS springy cubic-bezier
      }
    },
  },
  
  // Staggered children animation - style iOS
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  
  // Pour les items dans un container avec stagger - style iOS
  staggerItem: {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
  },
  
  // Animation de pulse légère - style VisionOS
  softPulse: {
    hidden: { scale: 1 },
    visible: { 
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  },
  
  // Animation de flottement - style VisionOS
  float: {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  },
  
  // Animation pour le bouton principal - style iOS
  mainButton: {
    hidden: { scale: 1 },
    visible: { scale: 1 },
    hover: { 
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    tap: { 
      scale: 0.98,
      y: 1,
      transition: {
        duration: 0.1,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  },
  
  // Pour les transitions de pages - style iOS
  pageTransition: {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  },
  
  // Animation d'apparition - style VisionOS
  visionOsAppear: {
    hidden: { 
      opacity: 0,
      scale: 0.97,
      y: 5
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.98,
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  },
  
  // Animation de carte - style iOS
  cardAnimation: {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.97
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
      transition: {
        duration: 0.2,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    tap: {
      y: -2,
      scale: 0.99,
      transition: {
        duration: 0.1,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  },
  
  // Animation d'expansion - style VisionOS
  expand: {
    hidden: { 
      height: 0,
      opacity: 0
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1]
        },
        opacity: {
          duration: 0.3,
          ease: 'easeInOut'
        }
      }
    }
  }
};

/**
 * Animation de confetti pour les victoires et moments de célébration
 * @param duration Durée de l'animation en millisecondes
 */
export const playConfetti = (duration = 3000) => {
  if (typeof window !== 'undefined') {
    import('canvas-confetti').then(confetti => {
      const end = Date.now() + duration;
      
      (function frame() {
        confetti.default({
          particleCount: 3,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: [themeConfig.COLORS.blue.DEFAULT, themeConfig.COLORS.purple.DEFAULT, themeConfig.COLORS.orange.DEFAULT]
        });
        
        confetti.default({
          particleCount: 3,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: [themeConfig.COLORS.blue.light, themeConfig.COLORS.purple.light, themeConfig.COLORS.orange.light]
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }).catch(err => {
      console.error('Erreur lors du chargement de canvas-confetti:', err);
    });
  }
};

/**
 * Composant HOC qui ajoute des animations de base à n'importe quel élément - Style VisionOS
 */
interface AnimatedContainerProps {
  children: React.ReactNode;
  variant?: keyof typeof animationVariants | string;
  delay?: number;
  duration?: number;
  className?: string;
  [key: string]: any;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  variant = 'visionOsAppear', 
  delay = 0, 
  duration,
  className = '',
  ...props 
}) => {
  // Utiliser une assertion de type plus sûre pour variant
  const variantKey = variant as keyof typeof animationVariants;
  let selectedVariant: Variants = animationVariants[variantKey] || animationVariants.visionOsAppear;
  
  // Permettre d'ajuster la durée manuellement si nécessaire
  if (duration && 'visible' in selectedVariant && selectedVariant.visible && 
      typeof selectedVariant.visible === 'object' && 'transition' in selectedVariant.visible) {
    selectedVariant = {
      ...selectedVariant,
      visible: {
        ...(selectedVariant.visible as object),
        transition: {
          ...(selectedVariant.visible as any).transition,
          duration
        }
      }
    } as Variants;
  }
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default animationVariants;
