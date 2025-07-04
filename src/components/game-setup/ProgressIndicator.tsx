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
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            {/* Cercle d'étape */}
            <motion.div
              className={`relative w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                step === currentStep
                  ? 'bg-gradient-to-br from-trinity-blue-600 via-trinity-purple-600 to-trinity-orange-600 text-white shadow-xl scale-110 border-2 border-white'
                  : step < currentStep
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-2 border-green-400'
                  : 'bg-neutral-100 text-neutral-500 border-2 border-neutral-300 shadow-sm'
              }`}
              animate={{
                scale: step === currentStep ? 1.1 : 1,
                boxShadow: step === currentStep 
                  ? '0 8px 25px rgba(59, 130, 246, 0.4), 0 15px 35px rgba(147, 51, 234, 0.25)' 
                  : step < currentStep
                  ? '0 4px 15px rgba(34, 197, 94, 0.3)'
                  : '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Effet de brillance pour l'étape actuelle */}
              {step === currentStep && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              )}
              
              {/* Icône de validation pour les étapes terminées */}
              {step < currentStep ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
                  className="text-xl"
                >
                  ✓
                </motion.div>
              ) : (
                <span className="relative z-10">{step}</span>
              )}
            </motion.div>

            {/* Ligne de connexion */}
            {step < totalSteps && (
              <motion.div
                className={`w-16 h-1 mx-3 rounded-full transition-all duration-500 ${
                  step < currentStep 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-md' 
                    : 'bg-neutral-200'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: step < currentStep ? 1 : 0.3,
                  opacity: step < currentStep ? 1 : 0.5
                }}
                transition={{ duration: 0.6, delay: step < currentStep ? 0.2 : 0 }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Labels des étapes */}
      <div className="flex items-center justify-center gap-1 mt-4">
        {['Joueurs', 'Noms', 'Résumé'].map((label, index) => (
          <div key={label} className="flex items-center">
            <motion.span
              className={`text-sm font-medium transition-all duration-300 ${
                index + 1 === currentStep
                  ? 'text-trinity-blue-700 font-bold'
                  : index + 1 < currentStep
                  ? 'text-green-600 font-semibold'
                  : 'text-neutral-400'
              }`}
              animate={{
                scale: index + 1 === currentStep ? 1.05 : 1
              }}
            >
              {label}
            </motion.span>
            {index < 2 && <div className="w-16 mx-3" />}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;