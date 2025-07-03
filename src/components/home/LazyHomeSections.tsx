import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Lazy loading des sections lourdes pour améliorer les performances
const ProfessorCartoucheSection = lazy(() => import('@/components/home/ProfessorCartoucheSection'));
const HowItWorksSection = lazy(() => import('@/components/home/HowItWorksSection'));
const GameCompanionSection = lazy(() => import('@/components/home/GameCompanionSection'));
const RulesSection = lazy(() => import('@/components/home/RulesSection'));
const FooterSection = lazy(() => import('@/components/home/FooterSection'));

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="text-trinity-blue-500"
    >
      <Loader2 className="h-8 w-8" />
    </motion.div>
  </div>
);

interface LazyHomeSectionsProps {
  navigate: (path: string) => void;
}

const LazyHomeSections: React.FC<LazyHomeSectionsProps> = ({ navigate }) => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <ProfessorCartoucheSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <HowItWorksSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <GameCompanionSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <RulesSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FooterSection />
      </Suspense>
    </>
  );
};

export default LazyHomeSections;