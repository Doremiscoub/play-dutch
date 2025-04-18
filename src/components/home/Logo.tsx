
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent mb-2">
        Dutch
      </h1>
      <p className="text-gray-600">Votre compagnon de jeu</p>
    </motion.div>
  );
};

export default Logo;
