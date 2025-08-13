import useIsMobile, { useMediaQuery } from '@/hooks/use-mobile';

export interface MobileAdaptationConfig {
  textSize: 'xs' | 'sm' | 'base' | 'lg';
  shortLabels: boolean;
  singleColumn: boolean;
  stackElements: boolean;
  reducedAnimations: boolean;
}

export function useMobileAdaptation(): MobileAdaptationConfig {
  const isMobile = useIsMobile();
  const isSmallMobile = useMediaQuery('(max-width: 480px)');
  
  return {
    textSize: isSmallMobile ? 'sm' : isMobile ? 'base' : 'lg',
    shortLabels: isMobile,
    singleColumn: isMobile,
    stackElements: isMobile,
    reducedAnimations: isMobile
  };
}

export function useMobileTextSize(baseSize: string): string {
  const isMobile = useIsMobile();
  const isSmallMobile = useMediaQuery('(max-width: 480px)');
  
  const sizeMap: Record<string, string> = {
    'text-xs': isSmallMobile ? 'text-sm' : isMobile ? 'text-sm' : 'text-xs',
    'text-sm': isSmallMobile ? 'text-base' : isMobile ? 'text-base' : 'text-sm',
    'text-base': isSmallMobile ? 'text-lg' : isMobile ? 'text-lg' : 'text-base',
  };
  
  return sizeMap[baseSize] || baseSize;
}

export function useMobileLayout() {
  const { singleColumn, stackElements } = useMobileAdaptation();
  
  const getGridClasses = (defaultColumns: string = 'grid-cols-3') => {
    if (singleColumn) return 'grid-cols-1 stats-mobile-single';
    return defaultColumns;
  };
  
  const getStackClasses = () => {
    if (stackElements) return 'mobile-stack flex-col';
    return 'flex-row';
  };
  
  return {
    getGridClasses,
    getStackClasses,
    singleColumn,
    stackElements
  };
}