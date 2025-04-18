
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';

// Utilisons toutes les sources d'images possibles comme fallback
const FALLBACK_IMAGES = [
  '/images/professor-cartouche.png',                                 // Chemin standard dans /public
  '/public/images/professor-cartouche.png',                          // Chemin alternatif
  '/lovable-uploads/fb92f04b-fff7-4371-8b77-4aa21a3d4e6b.png',      // Chemin uploadé précédent
  '/professor.png',                                                  // Image SVG de fallback
];

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  const { config: elevenLabsConfig, speakWithFallback, isLoading: isSpeaking } = useElevenLabs();
  const { isSoundEnabled } = useSound();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const handleSpeak = async () => {
    if (isSoundEnabled) {
      if (onSpeakMessage) {
        onSpeakMessage();
      } else {
        await speakWithFallback(message);
      }
    }
  };

  const handleImageError = () => {
    console.error(`Erreur lors du chargement de l'image: ${FALLBACK_IMAGES[currentImageIndex]}`);
    
    // Essayer l'image suivante dans notre liste de fallback
    if (currentImageIndex < FALLBACK_IMAGES.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    } else {
      // Si toutes les images ont échoué, marquer l'erreur définitive
      setImageError(true);
      console.error("Toutes les tentatives de chargement d'image ont échoué");
    }
  };

  const handleImageLoaded = () => {
    console.info(`L'image s'est chargée avec succès: ${FALLBACK_IMAGES[currentImageIndex]}`);
    setImageLoaded(true);
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div 
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-dutch-purple bg-white shadow-lg"
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
        {imageError ? (
          // Afficher un placeholder SVG si toutes les images ont échoué
          <div className="w-full h-full flex items-center justify-center bg-dutch-purple/10 text-dutch-purple">
            <AlertCircle className="w-8 h-8" />
          </div>
        ) : (
          <motion.img 
            key={currentImageIndex} // Important pour forcer le rechargement quand on change de source
            src={FALLBACK_IMAGES[currentImageIndex]}
            alt="Professeur Cartouche"
            className="w-full h-full object-cover"
            onLoad={handleImageLoaded}
            onError={handleImageError}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              backgroundColor: "#FFFFFF" // Ajouter un fond blanc pour éviter la transparence
            }}
          />
        )}
      </motion.div>
      
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
