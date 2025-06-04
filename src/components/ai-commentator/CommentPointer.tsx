
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CommentPointerProps {
  className?: string;
}

export default function CommentPointer({ className = '' }: CommentPointerProps) {
  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      {/* Double flèche avec espacement corrigé */}
      <div className="flex items-center space-x-1">
        <motion.div
          animate={{ 
            x: [0, 3, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ChevronRight className="w-5 h-5 text-ios-purple" />
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, 3, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: 0.3,
            ease: "easeInOut" 
          }}
        >
          <ChevronRight className="w-5 h-5 text-ios-blue" />
        </motion.div>
      </div>
    </motion.div>
  );
}
