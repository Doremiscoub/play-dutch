
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PageLayout from '@/components/PageLayout';

const NotFound: React.FC = () => {
  return (
    <PageLayout
      title="Page non trouvée"
      subtitle="La page que vous recherchez n'existe pas ou a été déplacée."
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 p-10 shadow-md mb-8 text-center">
            <div className="text-9xl font-bold mb-4 bg-gradient-to-r from-dutch-blue to-dutch-purple bg-clip-text text-transparent">
              404
            </div>
            <p className="text-gray-600 mb-8">
              Désolé, nous ne trouvons pas cette page. Vous pourriez vouloir retourner à l'accueil.
            </p>
            <Link to="/">
              <Button 
                variant="dutch-blue" 
                size="lg" 
                elevated 
                animated 
                className="rounded-xl"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
