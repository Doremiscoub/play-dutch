
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CommentStyle } from './types';

interface CommentBubbleProps {
  displayedText: string;
  isTyping: boolean;
  style: CommentStyle;
}

export default function CommentBubble({ displayedText, isTyping, style }: CommentBubbleProps) {
  return (
    <motion.div 
      className="flex-1 relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {/* Organic Speech Bubble Pointer */}
      <div className="absolute -left-6 top-8 w-0 h-0">
        <div className="border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[24px] border-r-white/90" />
        <div className="absolute -top-[18px] -right-[22px] border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[20px] border-r-white/60" />
      </div>
      
      {/* Modern Glass Speech Bubble */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 relative overflow-hidden">
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite] skew-x-12" />
        
        {/* Header with Icon */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {style.icon}
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Professeur Cartouche
          </span>
          <MessageCircle className="w-4 h-4 text-gray-400" />
        </motion.div>
        
        {/* Animated Text Content */}
        <motion.div
          className="min-h-[4rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg font-medium leading-relaxed text-gray-800 mb-4">
            {displayedText}
            {isTyping && (
              <motion.span
                className="inline-block w-0.5 h-5 bg-ios-purple ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>
        
        {/* Footer with Enhanced Signature */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-gray-200/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-ios-blue to-ios-purple rounded-full" />
            <span className="font-bold text-ios-purple tracking-wider">
              Prof. Cartouche
            </span>
          </div>
          
          {/* Enhanced Typing Indicator */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-ios-blue to-ios-purple rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1], 
                  opacity: [0.4, 1, 0.4] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
