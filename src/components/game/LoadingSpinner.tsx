
import { motion } from "framer-motion";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-dutch-blue/20 border-t-dutch-blue rounded-full mx-auto mb-4 animate-spin"></div>
        <p className="text-gray-600">Chargement de la partie...</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
