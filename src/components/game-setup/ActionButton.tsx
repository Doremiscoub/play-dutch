
import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Play, Sparkles, Zap, Star, Crown } from 'lucide-react';

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <motion.div 
      whileHover={{ scale: disabled ? 1 : 1.08 }}
      whileTap={{ scale: disabled ? 1 : 0.92 }}
      className="w-full max-w-md relative group"
    >
      {/* Anneaux de lueur multiples avec rotations */}
      <motion.div
        className="absolute -inset-12 bg-gradient-to-r from-trinity-blue-200/40 via-trinity-purple-200/40 to-trinity-orange-200/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100"
        animate={disabled ? {} : { 
          rotate: 360,
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <motion.div
        className="absolute -inset-8 bg-gradient-to-r from-trinity-orange-200/30 via-trinity-purple-200/30 to-trinity-blue-200/30 rounded-full blur-xl opacity-0 group-hover:opacity-100"
        animate={disabled ? {} : { 
          rotate: -360,
          scale: [1.1, 0.9, 1.1]
        }}
        transition={{ 
          rotate: { duration: 6, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
      />
      
      {/* Particules orbitales */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-glass-light rounded-full"
            animate={disabled ? {} : {
              rotate: 360,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.2 },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
            }}
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: `${60 + Math.random() * 40}px 0px`,
              marginLeft: '-6px',
              marginTop: '-6px'
            }}
          />
        ))}
      </div>
      
      {/* Étoiles décoratives */}
      {!disabled && (
        <>
          <motion.div
            className="absolute -top-8 -left-8 z-10"
            animate={{
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Star className="h-6 w-6 text-yellow-400" />
          </motion.div>
          
          <motion.div
            className="absolute -top-4 -right-12 z-10"
            animate={{
              rotate: -360,
              scale: [1.2, 0.8, 1.2],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          >
            <Crown className="h-5 w-5 text-yellow-300" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-6 -left-6 z-10"
            animate={{
              rotate: 360,
              scale: [0.9, 1.3, 0.9],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </motion.div>
        </>
      )}
      
      <EnhancedButton
        onClick={onClick}
        disabled={disabled}
        variant="legendary"
        size="xl"
        effect="glow"
        rarity="legendary"
        withSparkles={!disabled}
        withIcon
        icon={
          <motion.div
            animate={disabled ? {} : { 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Play className="h-7 w-7 relative z-10" />
            {!disabled && (
              <>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-7 w-7 text-yellow-300 opacity-60" />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.4, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <Star className="h-7 w-7 text-white opacity-40" />
                </motion.div>
              </>
            )}
          </motion.div>
        }
        className="w-full font-bold uppercase tracking-wider relative z-10 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden text-lg py-6"
      >
        <motion.span
          className="flex items-center justify-center gap-4 relative z-10"
        >
          {label}
          {!disabled && (
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          )}
        </motion.span>

        {/* Vagues multiples */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
          animate={disabled ? {} : {
            x: ['-120%', '120%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 3
          }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent skew-x-12"
          animate={disabled ? {} : {
            x: ['120%', '-120%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 4,
            delay: 2
          }}
        />

        {/* Effet de pulsation sur les bords */}
        <motion.div
          className="absolute inset-0 border-4 border-white/30 rounded-full"
          animate={disabled ? {} : {
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </EnhancedButton>
    </motion.div>
  );
};

export default ActionButton;
