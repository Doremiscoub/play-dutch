
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-red-200"
      >
        <h2 className="text-xl font-semibold text-red-600 mb-3">Échec du chargement</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => navigate('/game/setup')}
            className="px-4 py-2 bg-dutch-blue text-white rounded-lg hover:bg-dutch-blue/90 transition-colors"
          >
            Configurer une partie
          </button>
          <button 
            onClick={onRetry}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorDisplay;
