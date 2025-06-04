
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
      {/* Double flèche animée */}
      <div className="flex items-center space-x-[-8px]">
        <motion.div
          animate={{ 
            x: [0, 4, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ChevronRight className="w-6 h-6 text-ios-purple" />
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, 4, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            delay: 0.3,
            ease: "easeInOut" 
          }}
        >
          <ChevronRight className="w-6 h-6 text-ios-blue" />
        </motion.div>
      </div>
    </motion.div>
  );
}
