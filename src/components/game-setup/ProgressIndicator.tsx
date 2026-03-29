import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Joueurs', 'Noms', 'Résumé'];

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-center px-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-colors duration-200',
                  step === currentStep &&
                    'bg-gradient-to-br from-dutch-blue to-dutch-purple text-white ring-4 ring-blue-100/50 neon-blue',
                  step < currentStep &&
                    'bg-emerald-500 text-white',
                  step > currentStep &&
                    'glass-surface text-muted-foreground'
                )}
              >
                {step < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-xs sm:text-sm font-medium transition-colors duration-200',
                  step === currentStep && 'text-primary font-semibold',
                  step < currentStep && 'text-emerald-500',
                  step > currentStep && 'text-muted-foreground'
                )}
              >
                {STEP_LABELS[step - 1]}
              </span>
            </div>

            {/* Connector line */}
            {step < totalSteps && (
              <div
                className={cn(
                  'w-12 sm:w-20 h-0.5 mx-3 sm:mx-4 mb-6 transition-colors duration-200',
                  step < currentStep ? 'bg-emerald-400' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
