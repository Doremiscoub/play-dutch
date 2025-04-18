
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';
import { useImageLoader } from '@/hooks/useImageLoader';

// Chemin absolu vers l'image du professeur
const PROFESSOR_IMAGE = 'https://play-dutch.com/images/professor-cartouche.png';
// Fallback en cas d'erreur
const FALLBACK_IMAGE = '/images/professor-cartouche.png';

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  const { config: elevenLabsConfig, speakWithFallback, isLoading: isSpeaking } = useElevenLabs();
  const { isSoundEnabled } = useSound();
  const [imageSrc, setImageSrc] = useState<string>(PROFESSOR_IMAGE);
  const [imageError, setImageError] = useState<boolean>(false);
  const [loadAttempt, setLoadAttempt] = useState<number>(0);

  // Essayer de charger l'image avec différentes stratégies
  useEffect(() => {
    // Réinitialiser l'état d'erreur à chaque tentative
    setImageError(false);
    
    // Stratégie de chargement selon le nombre de tentatives
    if (loadAttempt === 0) {
      // Première tentative: URL absolue
      setImageSrc(PROFESSOR_IMAGE);
    } else if (loadAttempt === 1) {
      // Deuxième tentative: chemin relatif
      setImageSrc(FALLBACK_IMAGE);
    } else if (loadAttempt === 2) {
      // Troisième tentative: autre chemin relatif
      setImageSrc('./images/professor-cartouche.png');
    } else {
      // Abandon après 3 tentatives
      console.error("Impossible de charger l'image du Professeur Cartouche après plusieurs tentatives");
      setImageError(true);
    }
  }, [loadAttempt]);

  const handleImageError = () => {
    console.error(`Erreur de chargement de l'image: ${imageSrc}, tentative ${loadAttempt+1}`);
    
    // Essayer la stratégie suivante
    if (loadAttempt < 3) {
      setLoadAttempt(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };
  
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
      <motion.div 
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-dutch-purple bg-white shadow-lg flex items-center justify-center"
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
        {!imageError ? (
          <img 
            src={imageSrc}
            alt="Professeur Cartouche" 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            👴🏼
          </div>
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
