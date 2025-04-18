import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';

// Ensure these paths are correct and images exist
const PROFESSOR_IMAGE_URL = '/lovable-uploads/1dc0ac6d-dc08-4029-a06a-eec0c5a6ce7f.png';
const FALLBACK_IMAGE_URL = '/lovable-uploads/a2234ca1-7b29-4c32-8167-2ff6be271875.png';
const NEWLY_UPLOADED_IMAGE = '/lovable-uploads/37b79686-1328-46bb-aee6-44d0e904fc20.png';

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const { config: elevenLabsConfig, speakWithFallback, isLoading: isSpeaking } = useElevenLabs();
  const { isSoundEnabled } = useSound();
  
  // Function to handle multiple fallback images
  const getImageSource = () => {
    if (imageError) {
      return FALLBACK_IMAGE_URL;
    }
    return [PROFESSOR_IMAGE_URL, NEWLY_UPLOADED_IMAGE].find(url => url) || FALLBACK_IMAGE_URL;
  };
  
  // Speak function remains the same
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
          whileHover={{ scale: 1.1 }}
        >
          <img 
            src={getImageSource()}
            alt="Professeur Cartouche"
            className="w-full h-full object-contain"
            onError={() => {
              console.warn("Image principale du Professeur non chargée, utilisation du fallback");
              setImageError(true);
            }}
            loading="eager"
          />
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
