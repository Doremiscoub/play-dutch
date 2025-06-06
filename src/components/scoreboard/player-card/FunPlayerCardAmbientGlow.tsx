
import React from 'react';
import { motion } from 'framer-motion';

const FunPlayerCardAmbientGlow: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 rounded-3xl pointer-events-none"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dutch-blue/10 via-transparent to-dutch-purple/10 rounded-3xl" />
    </motion.div>
  );
};

export default FunPlayerCardAmbientGlow;
