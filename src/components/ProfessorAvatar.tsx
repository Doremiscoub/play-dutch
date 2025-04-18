
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// On utilise l'image SVG directement depuis la chaîne data URI
// Cette approche garantit l'affichage même si les chemins de fichiers posent problème
const FALLBACK_SVG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSJub25lIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iI0YyRjVGRiIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSI0MCIgZmlsbD0iIzhCNUNGNiIvPgogIDxjaXJjbGUgY3g9Ijg1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTg1IDgwSDExNUMxMjUgODAgMTI1IDEwMCAxMDAgMTAwQzc1IDEwMCA3NSA4MCA4NSA4MFoiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTYwIDEyMEM2MCAxMjAgNzAgMTYwIDEwMCAxNjBDMTMwIDE2MCAxNDAgMTIwIDE0MCAxMjAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNjUgNDBDNjUgNDAgNzAgMzAgODUgMzBDMTAwIDMwIDEzMCAzMCAxMzAgNDUiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNzAgNDBDNzAgNDAgNjUgMjAgOTAgMjBDMTI1IDIwIDEzMCAzMCAxMzAgMzAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSI1MCIgcj0iOCIgZmlsbD0iI0Y5NzMxNiIvPgogIDxwYXRoIGQ9Ik04NSAxMDBDODUgMTAwIDkwIDExMCAxMDAgMTEwQzExMCAxMTAgMTE1IDEwMCAxMTUgMTAwIiBzdHJva2U9IiNGOTczMTYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTc1IDUwQzc1IDUwIDgwIDQwIDg1IDUwIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTEyNSA1MEMxMjUgNTAgMTIwIDQwIDExNSA1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik03NSAxNTBDNzUgMTUwIDEwMCAxNDAgMTI1IDE1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K`;

// Essayons différentes approches pour accéder à l'image téléchargée
const POSSIBLE_IMAGE_PATHS = [
  // Chemins directs vers l'image téléchargée par l'utilisateur
  '/lovable-uploads/4cc61ce9-4985-48a5-9867-60bb7457e484.png',
  '/4cc61ce9-4985-48a5-9867-60bb7457e484.png',
  
  // Chemins standards pour l'image
  '/images/professor-cartouche.png',
  'professor-cartouche.png',
  'images/professor-cartouche.png',
  
  // Autres chemins possibles
  '/public/images/professor-cartouche.png',
  '/assets/images/professor-cartouche.png',
];

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  const { config: elevenLabsConfig, speakWithFallback, isLoading: isSpeaking } = useElevenLabs();
  const { isSoundEnabled } = useSound();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [allImagesFailed, setAllImagesFailed] = useState<boolean>(false);
  
  // Utiliser l'image en data URI si toutes les autres tentatives échouent
  useEffect(() => {
    // Si nous avons déjà essayé tous les chemins d'images possibles
    if (currentImageIndex >= POSSIBLE_IMAGE_PATHS.length && !imageLoaded) {
      console.info("Utilisation de l'image SVG en fallback");
      setAllImagesFailed(true);
    }
  }, [currentImageIndex, imageLoaded]);
  
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
    console.warn(`Échec du chargement de l'image: ${POSSIBLE_IMAGE_PATHS[currentImageIndex]}`);
    
    // Essayer l'image suivante dans notre liste
    if (currentImageIndex < POSSIBLE_IMAGE_PATHS.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    } else {
      // Si toutes les images échouent, utiliser l'image SVG intégrée
      console.info("Passage à l'image SVG intégrée");
      setAllImagesFailed(true);
    }
  };

  const handleImageLoaded = () => {
    console.info(`L'image s'est chargée avec succès: ${POSSIBLE_IMAGE_PATHS[currentImageIndex]}`);
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
        {!allImagesFailed ? (
          // Tentative de chargement de l'image depuis les chemins de fichiers
          <motion.img 
            key={currentImageIndex}
            src={POSSIBLE_IMAGE_PATHS[currentImageIndex]}
            alt="Professeur Cartouche"
            className="w-full h-full object-cover bg-white"
            onLoad={handleImageLoaded}
            onError={handleImageError}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          // Fallback ultime: utiliser Avatar de ShadCN avec l'image SVG intégrée
          <Avatar className="w-full h-full border-0">
            <AvatarImage src={FALLBACK_SVG} alt="Professeur Cartouche" className="bg-white" />
            <AvatarFallback className="bg-dutch-purple/20 text-dutch-purple">
              <AlertCircle className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
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
