
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { useElevenLabs } from '@/hooks/use-eleven-labs';
import { useSound } from '@/hooks/use-sound';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// Nouvelle image fournie par l'utilisateur
const PROFESSOR_IMAGE = '/lovable-uploads/746b6454-ed46-44ef-8556-fe77d6c5d5ba.png';

// SVG en fallback (en cas d'échec ultime)
const FALLBACK_SVG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSJub25lIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iI0YyRjVGRiIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSI0MCIgZmlsbD0iIzhCNUNGNiIvPgogIDxjaXJjbGUgY3g9Ijg1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTg1IDgwSDExNUMxMjUgODAgMTI1IDEwMCAxMDAgMTAwQzc1IDEwMCA3NSA4MCA4NSA4MFoiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTYwIDEyMEM2MCAxMjAgNzAgMTYwIDEwMCAxNjBDMTMwIDE2MCAxNDAgMTIwIDE0MCAxMjAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNjUgNDBDNjUgNDAgNzAgMzAgODUgMzBDMTAwIDMwIDEzMCAzMCAxMzAgNDUiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNzAgNDBDNzAgNDAgNjUgMjAgOTAgMjBDMTI1IDIwIDEzMCAzMCAxMzAgMzAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSI1MCIgcj0iOCIgZmlsbD0iI0Y5NzMxNiIvPgogIDxwYXRoIGQ9Ik04NSAxMDBDODUgMTAwIDkwIDExMCAxMDAgMTEwQzExMCAxMTAgMTE1IDEwMCAxMTUgMTAwIiBzdHJva2U9IiNGOTczMTYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTc1IDUwQzc1IDUwIDgwIDQwIDg1IDUwIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTEyNSA1MEMxMjUgNTAgMTIwIDQwIDExNSA1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik03NSAxNTBDNzUgMTUwIDEwMCAxNDAgMTI1IDE1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K`;

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  const { config: elevenLabsConfig, speakWithFallback, isLoading: isSpeaking } = useElevenLabs();
  const { isSoundEnabled } = useSound();
  
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
        <Avatar className="w-full h-full border-0">
          <AvatarImage 
            src={PROFESSOR_IMAGE}
            alt="Professeur Cartouche"
            className="bg-white object-cover"
            onError={(e) => {
              console.error("L'image principale n'a pas pu être chargée, utilisation du fallback");
              e.currentTarget.src = FALLBACK_SVG;
            }}
          />
          <AvatarFallback className="bg-dutch-purple/20 text-dutch-purple">
            PC
          </AvatarFallback>
        </Avatar>
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
