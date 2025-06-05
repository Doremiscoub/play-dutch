
import React from 'react';
import { motion } from 'framer-motion';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Play, Sparkles, Zap } from 'lucide-react';

interface ActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, disabled = false }) => {
  return (
    <motion.div 
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="w-full max-w-sm relative group"
    >
      {/* Effet de lueur en arrière-plan amélioré */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-dutch-blue/30 via-dutch-purple/30 to-dutch-orange/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100"
        animate={disabled ? {} : { 
          opacity: [0, 0.7, 0],
          scale: [0.8, 1.1, 0.8]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            animate={disabled ? {} : {
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
      </div>
      
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
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Play className="h-6 w-6 relative z-10" />
            {!disabled && (
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-6 w-6 text-yellow-300 opacity-50" />
              </motion.div>
            )}
          </motion.div>
        }
        className="w-full font-bold uppercase tracking-wide relative z-10 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
      >
        <motion.span
          className="flex items-center justify-center gap-3 relative z-10"
        >
          {label}
          {!disabled && (
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
          )}
        </motion.span>

        {/* Effet de vague */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          animate={disabled ? {} : {
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />
      </EnhancedButton>
    </motion.div>
  );
};

export default ActionButton;
