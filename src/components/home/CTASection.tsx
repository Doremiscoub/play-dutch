
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 border border-white/50 shadow-xl">
        <CardContent className="p-8">
          <h2 className="text-4xl font-bold mb-4 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Prêt pour votre première partie ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers de joueurs qui ont déjà adopté Dutch Card Game
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/setup')}
              size="lg"
              className="bg-gradient-to-r from-dutch-blue to-dutch-purple hover:scale-105 transition-transform text-lg px-8 py-4"
            >
              <Users className="mr-2 h-5 w-5" />
              Commencer maintenant
            </Button>
            
            <Button 
              onClick={() => navigate('/history')}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 hover:scale-105 transition-transform"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Voir l'historique
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};
