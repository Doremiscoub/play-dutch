
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Enhanced3DFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export const Enhanced3DFeatureCard: React.FC<Enhanced3DFeatureCardProps> = ({
  icon,
  title,
  description,
  className,
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative group cursor-pointer",
        className
      )}
    >
      <motion.div
        className="relative h-full bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:bg-white/80"
        animate={prefersReducedMotion ? {} : {
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Gradient overlay for hover effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-dutch-blue/5 via-transparent to-dutch-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon with enhanced effects */}
        <motion.div
          className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-r from-dutch-blue to-dutch-purple flex items-center justify-center text-white shadow-lg"
          style={prefersReducedMotion ? {} : {
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
          animate={prefersReducedMotion ? {} : {
            rotateY: isHovered ? [0, 360] : 0,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {icon}
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-dutch-blue to-dutch-purple rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
        </motion.div>

        {/* Content */}
        <div
          style={prefersReducedMotion ? {} : {
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
          className="relative z-10 text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 group-hover:text-dutch-blue transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-dutch-blue via-dutch-purple to-dutch-orange bg-clip-border opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </motion.div>
    </motion.div>
  );
};
