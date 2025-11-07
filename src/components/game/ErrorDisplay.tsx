
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProfessorAvatar } from '@/features/ai-commentator';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-dutch-blue/10 to-dutch-purple/10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-red-200"
      >
        <div className="flex items-center mb-4">
          <ProfessorAvatar size="md" animate={true} />
          <div className="ml-3">
            <h2 className="text-xl font-semibold text-red-600">Échec du chargement</h2>
            <p className="text-sm text-gray-500">Le Professeur Cartouche a rencontré un problème</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-5 p-3 bg-red-50 rounded-lg border border-red-100">{error}</p>
        
        <div className="flex gap-3 justify-center">
          <Button 
            onClick={() => navigate('/setup')}
            className="px-4 py-2 bg-dutch-blue text-white rounded-lg hover:bg-dutch-blue/90 transition-colors"
          >
            Configurer une partie
          </Button>
          <Button 
            onClick={onRetry}
            variant="outline"
            className="px-4 py-2 rounded-lg transition-colors"
          >
            Réessayer
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorDisplay;
