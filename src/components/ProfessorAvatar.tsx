
import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { Button } from './ui/button';

interface ProfessorAvatarProps {
  message: string;
  onSpeakMessage?: () => void;
}

const ProfessorAvatar: React.FC<ProfessorAvatarProps> = ({ message, onSpeakMessage }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg border-2 border-dutch-purple flex items-center justify-center overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ 
            scale: [0.95, 1.02, 0.98, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Professeur Cartouche stylisé */}
          <img 
            src="/professor.png" 
            alt="Professeur Cartouche" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSJub25lIj4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0iI0YyRjVGRiIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSI0MCIgZmlsbD0iIzhCNUNGNiIvPgogIDxjaXJjbGUgY3g9Ijg1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iNjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTg1IDgwSDExNUMxMjUgODAgMTI1IDEwMCAxMDAgMTAwQzc1IDEwMCA3NSA4MCA4NSA4MFoiIGZpbGw9IndoaXRlIi8+CiAgPHBhdGggZD0iTTYwIDEyMEM2MCAxMjAgNzAgMTYwIDEwMCAxNjBDMTMwIDE2MCAxNDAgMTIwIDE0MCAxMjAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNjUgNDBDNjUgNDAgNzAgMzAgODUgMzBDMTAwIDMwIDEzMCAzMCAxMzAgNDUiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cGF0aCBkPSJNNzAgNDBDNzAgNDAgNjUgMjAgOTAgMjBDMTI1IDIwIDEzMCAzMCAxMzAgMzAiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8Y2lyY2xlIGN4PSIxMzAiIGN5PSI1MCIgcj0iOCIgZmlsbD0iI0Y5NzMxNiIvPgogIDxwYXRoIGQ9Ik04NSAxMDBDODUgMTAwIDkwIDExMCAxMDAgMTEwQzExMCAxMTAgMTE1IDEwMCAxMTUgMTAwIiBzdHJva2U9IiNGOTczMTYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTc1IDUwQzc1IDUwIDgwIDQwIDg1IDUwIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBhdGggZD0iTTEyNSA1MEMxMjUgNTAgMTIwIDQwIDExNSA1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik03NSAxNTBDNzUgMTUwIDEwMCAxNDAgMTI1IDE1MCIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
            }}
          />
        </motion.div>
        
        {/* Bulle d'animation pour donner vie à l'avatar */}
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
      
      {onSpeakMessage && (
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 hover:bg-white border border-dutch-purple/30 text-dutch-purple hover:text-dutch-purple/80 rounded-full w-8 h-8 p-0"
          onClick={onSpeakMessage}
          title="Écouter"
        >
          <Volume2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ProfessorAvatar;
