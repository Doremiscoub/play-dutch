
import { motion } from 'framer-motion';
import { UI_CONFIG } from '@/config/uiConfig';

/**
 * Variants d'animation réutilisables pour Framer Motion
 */
export const animationVariants = {
  // Fade in depuis le bas
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: UI_CONFIG.animations.easings.out
      }
    },
  },
  
  // Fade in depuis la droite
  fadeInRight: {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: UI_CONFIG.animations.easings.out
      }
    },
  },
  
  // Scale in
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: UI_CONFIG.animations.easings.out
      }
    },
  },
  
  // Staggered children animation
  staggerChildren: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  
  // Pour les items dans un container avec stagger
  staggerItem: {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
  },
  
  // Animation de pulse léger
  softPulse: {
    initial: { 
      scale: 1 
    },
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  },
  
  // Animation de flottement
  float: {
    initial: { 
      y: 0 
    },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  
  // Animation pour le bouton principal
  mainButton: {
    initial: { 
      scale: 1 
    },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  },
  
  // Pour les transitions de pages
  pageTransition: {
    initial: { 
      opacity: 0 
    },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: UI_CONFIG.animations.easings.inOut
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: UI_CONFIG.animations.easings.inOut
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
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#1EAEDB', '#8B5CF6', '#F97316']
        });
        
        confetti.default({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#1EAEDB', '#8B5CF6', '#F97316']
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
 * Composant HOC qui ajoute des animations de base à n'importe quel élément
 */
export const AnimatedContainer = ({ 
  children, 
  variant = 'fadeInUp', 
  delay = 0, 
  duration,
  className = '',
  ...props 
}) => {
  let selectedVariant = animationVariants[variant] || animationVariants.fadeInUp;
  
  // Permettre d'ajuster la durée manuellement si nécessaire
  if (duration) {
    selectedVariant = {
      ...selectedVariant,
      visible: {
        ...selectedVariant.visible,
        transition: {
          ...selectedVariant.visible.transition,
          duration
        }
      }
    };
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
