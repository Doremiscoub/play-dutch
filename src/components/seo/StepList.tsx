import React from 'react';

interface Step {
  name: string;
  text: string;
}

interface StepListProps {
  steps: Step[];
}

export function StepList({ steps }: StepListProps) {
  return (
    <div className="not-prose space-y-4 mb-10">
      {steps.map((step, i) => (
        <div key={step.name} className="flex gap-4 p-5 rounded-xl glass-surface">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
            {i + 1}
          </div>
          <div>
            <h3 className="font-bold mb-1">{step.name}</h3>
            <p className="text-muted-foreground text-sm">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
