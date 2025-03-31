
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  const intensity = variant === 'subtle' ? 0.7 : 1;
  
  return (
    <>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/60 to-gray-200/60 z-0" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-[0.03] z-0" />
      
      {/* Animated background elements */}
      <motion.div
        className={`absolute top-20 left-[15%] w-56 h-56 rounded-full bg-dutch-blue/${Math.round(10 * intensity)} blur-3xl z-0`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4 * intensity, 0.6 * intensity, 0.4 * intensity],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className={`absolute bottom-24 right-[10%] w-64 h-64 rounded-full bg-dutch-orange/${Math.round(10 * intensity)} blur-3xl z-0`}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3 * intensity, 0.5 * intensity, 0.3 * intensity],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className={`absolute -top-10 right-[20%] w-48 h-48 rounded-full bg-dutch-purple/${Math.round(10 * intensity)} blur-3xl z-0`}
        animate={{ 
          scale: [1, 1.4, 1],
          opacity: [0.2 * intensity, 0.4 * intensity, 0.2 * intensity],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Decorative elements */}
      {variant === 'default' && (
        <>
          <motion.div 
            className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dutch-blue/20 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dutch-purple/20 to-transparent"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          />
        </>
      )}
      
      {/* Floating elements */}
      <motion.div
        className="absolute bottom-[30%] left-12 w-4 h-4 rounded-full bg-dutch-blue/30 z-0"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[25%] right-14 w-3 h-3 rounded-full bg-dutch-orange/40 z-0"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute top-[40%] left-20 w-2 h-2 rounded-full bg-dutch-purple/40 z-0"
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div
        className="absolute top-[60%] right-28 w-3 h-3 rounded-full bg-dutch-pink/30 z-0"
        animate={{ 
          y: [0, -12, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute bottom-[20%] left-32 w-2 h-2 rounded-full bg-dutch-green/40 z-0"
        animate={{ 
          y: [0, -9, 0],
          x: [0, -4, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </>
  );
};

export default AnimatedBackground;
