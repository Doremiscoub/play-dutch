
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useIsMobile from '@/hooks/use-mobile';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <motion.section 
      className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 border border-white/50 shadow-xl">
        <CardContent className={`${isMobile ? 'p-4' : 'p-8'}`}>
          <h2 className={`font-bold text-gray-800 ${isMobile ? 'text-2xl mb-2' : 'text-4xl mb-4'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Prêt pour votre première partie ?
          </h2>
          <p className={`text-gray-600 ${isMobile ? 'text-base mb-6' : 'text-xl mb-8'}`}>
            Rejoignez des milliers de joueurs qui ont déjà adopté Dutch Card Game
          </p>
          
          <div className={`flex gap-3 justify-center ${isMobile ? 'flex-col' : 'flex-col sm:flex-row gap-4'}`}>
            <Button 
              onClick={() => navigate('/setup')}
              size="lg"
              className={`bg-gradient-to-r from-dutch-blue to-dutch-purple hover:scale-105 transition-transform ${
                isMobile ? 'text-base px-6 py-3 min-h-[48px] touch-target' : 'text-lg px-8 py-4'
              }`}
            >
              <Users className={`mr-2 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              Commencer maintenant
            </Button>
            
            <Button 
              onClick={() => navigate('/history')}
              variant="outline"
              size="lg"
              className={`hover:scale-105 transition-transform ${
                isMobile ? 'text-base px-6 py-3 min-h-[48px] touch-target' : 'text-lg px-8 py-4'
              }`}
            >
              <Trophy className={`mr-2 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              Voir l'historique
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};
