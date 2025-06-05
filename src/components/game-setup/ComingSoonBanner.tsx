
import React from 'react';
import { motion } from 'framer-motion';

interface ComingSoonBannerProps {
  title?: string;
  description?: string;
}

const ComingSoonBanner: React.FC<ComingSoonBannerProps> = ({ 
  title = "À venir", 
  description = "Mode multijoueur, connexion multi-appareils, et plus encore !" 
}) => {
  return (
    <motion.div
      className="mb-8 relative z-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      <div className="bg-white/80 backdrop-blur-md border border-dutch-purple/20 rounded-xl p-3 shadow-md">
        <p className="text-sm text-center text-dutch-purple/90">
          <span className="font-semibold">{title} :</span> {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ComingSoonBanner;
