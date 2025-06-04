
import React from 'react';
import { motion } from 'framer-motion';

const SocialProofPills: React.FC = () => {
  const pills = [
    { icon: "⚡", text: "Instant", color: "from-yellow-400 to-orange-500" },
    { icon: "🎯", text: "Précis", color: "from-blue-400 to-purple-500" },
    { icon: "🚀", text: "Moderne", color: "from-purple-400 to-pink-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="flex justify-center mt-8 gap-4 flex-wrap"
    >
      {pills.map((pill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 + index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className={`px-4 py-2 rounded-full bg-gradient-to-r ${pill.color} text-white text-sm font-semibold shadow-lg backdrop-blur-xl border border-white/20`}
        >
          {pill.icon} {pill.text}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialProofPills;
