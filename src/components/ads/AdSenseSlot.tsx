
import React, { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  className?: string;
}

const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Typescript ne connaît pas window.adsbygoogle
      const pushAd = () => {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      };

      // Ne pousser la pub que si le composant est monté
      if (adRef.current) {
        pushAd();
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la publicité:', error);
    }
  }, []);

  const adCode = `
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-2046195502734056"
         data-ad-slot="${adSlot}"
         data-ad-format="${adFormat}"
         data-full-width-responsive="${fullWidthResponsive}"></ins>
  `;

  return (
    <div
      ref={adRef}
      className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden ${className}`}
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  );
};

export default AdSenseSlot;

