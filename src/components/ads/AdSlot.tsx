import React from 'react';
import { useAds } from '@/contexts/AdContext';

interface AdSlotProps {
  placement: 'sidebar' | 'banner';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '' }) => {
  const { shouldShowAds, isMobile } = useAds();

  // Configuration simple sans manipulation DOM
  const adConfig = {
    sidebar: {
      show: shouldShowAds && !isMobile,
      dimensions: 'w-[250px] h-[600px]',
      content: 'Espace publicitaire vertical'
    },
    banner: {
      show: shouldShowAds && isMobile,
      dimensions: 'w-full h-[250px]',
      content: 'Espace publicitaire horizontal'
    }
  };

  const config = adConfig[placement];

  if (!config.show) {
    return null;
  }

  return (
    <div className={`
      ${config.dimensions} 
      bg-gradient-to-br from-slate-100 to-slate-200 
      dark:from-slate-800 dark:to-slate-900
      rounded-lg border border-slate-300 dark:border-slate-700
      flex flex-col items-center justify-center
      text-slate-500 dark:text-slate-400
      ${className}
    `}>
      <div className="text-center space-y-2">
        <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded mx-auto opacity-50" />
        <p className="text-xs font-medium opacity-70">{config.content}</p>
        <p className="text-xs opacity-50">AdSense</p>
      </div>
    </div>
  );
};

export default AdSlot;