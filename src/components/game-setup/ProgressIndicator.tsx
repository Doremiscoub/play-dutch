import React from 'react';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step === currentStep
                  ? 'bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white shadow-lg scale-110'
                  : step < currentStep
                  ? 'bg-trinity-blue-500 text-white'
                  : 'bg-white text-neutral-500 border border-neutral-300'
              }`}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div
                className={`w-12 h-1 mx-2 rounded-full transition-all ${
                  step < currentStep ? 'bg-trinity-blue-500' : 'bg-neutral-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-2">
        <span className="text-sm text-neutral-700 font-medium">
          Étape {currentStep} sur {totalSteps}
        </span>
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;