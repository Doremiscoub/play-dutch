
import React from 'react';
import { motion } from 'framer-motion';

interface CommentPointerProps {
  className?: string;
}

const CommentPointer: React.FC<CommentPointerProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Double Arrow Pointer with Enhanced Glow */}
      <motion.div
        className="relative"
        animate={{
          x: [0, 8, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glowing Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-dutch-blue/40 to-dutch-purple/40 rounded-full blur-xl"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Primary Arrow */}
        <motion.div
          className="relative w-8 h-8 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-lg shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 5 }}
        >
          <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
        </motion.div>
        
        {/* Secondary Arrow with Delay */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-r from-dutch-purple to-dutch-orange rounded-lg shadow-xl flex items-center justify-center opacity-60"
          animate={{
            x: [0, 12, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommentPointer;
