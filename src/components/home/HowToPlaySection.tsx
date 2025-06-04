
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractiveTimeline } from '@/components/home/InteractiveTimeline';

export const HowToPlaySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Comment jouer au Dutch ?
      </h2>
      
      <InteractiveTimeline />
      
      <div className="text-center mt-8">
        <Button 
          onClick={() => navigate('/rules')}
          variant="outline"
          size="lg"
          className="hover:scale-105 transition-transform"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Règles complètes
        </Button>
      </div>
    </motion.section>
  );
};
