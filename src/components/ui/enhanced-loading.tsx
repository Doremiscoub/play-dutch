
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface EnhancedLoadingProps {
  variant?: 'default' | 'minimal' | 'full-page';
  message?: string;
  progress?: number;
}

const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  variant = 'default',
  message = 'Chargement...',
  progress
}) => {
  const prefersReducedMotion = useReducedMotion();

  const spinnerVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: prefersReducedMotion ? 0 : 1,
        repeat: prefersReducedMotion ? 0 : Infinity,
        ease: 'linear'
      }
    }
  };

  const sparkleVariants = {
    float: {
      y: [-10, 10],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: prefersReducedMotion ? 0 : 2,
        repeat: prefersReducedMotion ? 0 : Infinity,
        ease: 'easeInOut'
      }
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4">
        <motion.div
          variants={spinnerVariants}
          animate="spin"
          className="text-dutch-blue"
        >
          <Loader2 className="h-6 w-6" />
        </motion.div>
      </div>
    );
  }

  if (variant === 'full-page') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          <div className="relative">
            <motion.div
              variants={spinnerVariants}
              animate="spin"
              className="text-dutch-blue"
            >
              <Loader2 className="h-12 w-12 mx-auto" />
            </motion.div>
            <motion.div
              variants={sparkleVariants}
              animate="float"
              className="absolute -top-2 -right-2 text-dutch-orange"
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{message}</h3>
            {progress !== undefined && (
              <div className="w-64 mx-auto">
                <div className="bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-dutch-blue to-dutch-purple h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{progress}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <motion.div
          variants={spinnerVariants}
          animate="spin"
          className="text-dutch-blue mx-auto"
        >
          <Loader2 className="h-8 w-8" />
        </motion.div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default EnhancedLoading;
