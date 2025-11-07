/**
 * Bulle de commentaire pour l'AI Commentator
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface CommentBubbleProps {
  displayedText: string;
  isTyping: boolean;
}

export default function CommentBubble({ displayedText, isTyping }: CommentBubbleProps) {
  return (
    <motion.div 
      className="flex-1 relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60 relative overflow-hidden">
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite] skew-x-12" />
        
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <MessageCircle className="w-5 h-5 text-trinity-blue-500" />
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Professeur Cartouche
          </span>
        </motion.div>
        
        {/* Text Content */}
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
                className="inline-block w-2 h-5 bg-trinity-purple-500 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          className="flex items-center justify-between pt-4 border-t border-gray-200/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 rounded-full" />
            <span className="font-bold text-trinity-purple-500 tracking-wider">
              Prof. Cartouche
            </span>
          </div>
          
          {/* Typing Indicator */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
