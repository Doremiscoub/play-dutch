
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';

// Utilisation de l'image statique
const PROFESSOR_IMAGE = '/images/professor-cartouche.png';

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  const { config: elevenLabsConfig, speakWithFallback, isLoading: isSpeaking } = useElevenLabs();
  const { isSoundEnabled } = useSound();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Fonction pour gérer le chargement réussi de l'image
  const handleImageLoaded = () => {
    console.info("L'image du professeur s'est chargée avec succès");
    setImageLoaded(true);
    setImageError(false);
  };
  
  // Fonction pour gérer l'erreur de chargement de l'image
  const handleImageError = () => {
    console.error("Erreur lors du chargement de l'image du professeur");
    setImageError(true);
  };
  
  // Fonction pour gérer la parole
  const handleSpeak = async () => {
    if (isSoundEnabled) {
      if (onSpeakMessage) {
        onSpeakMessage();
      } else {
        await speakWithFallback(message);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg border-2 border-dutch-purple flex items-center justify-center overflow-hidden"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
        >
          <motion.img 
            src={PROFESSOR_IMAGE}
            alt="Professeur Cartouche"
            className="w-full h-full object-contain"
            onLoad={handleImageLoaded}
            onError={handleImageError}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center text-dutch-purple">
              <span className="text-2xl">🧪</span>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="absolute -top-1 -right-1 bg-dutch-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          !
        </motion.div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="bg-white/80 hover:bg-white border border-dutch-purple/30 text-dutch-purple hover:text-dutch-purple/80 rounded-full w-8 h-8 p-0"
        onClick={handleSpeak}
        disabled={isSpeaking}
        title={elevenLabsConfig.enabled ? "Écouter (Eleven Labs)" : "Écouter"}
      >
        <Volume2 className="w-4 h-4" />
        {isSpeaking && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-dutch-orange rounded-full animate-ping" />
        )}
      </Button>
    </div>
  );
};

export default ProfessorAvatar;
