
// Déclarations de types pour Google AdSense
interface Window {
  adsbygoogle?: any[];
}

interface AdSenseSlotProps {
  adClient: string;
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
  position?: 'left' | 'right';
}
