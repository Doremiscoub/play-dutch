
import React, { useEffect, useRef, useState } from 'react';

const ADSENSE_CLIENT = 'ca-pub-2046195502734056';
const ADSENSE_SLOT = '8421933386';

const AdSenseSlot: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdInjected, setIsAdInjected] = useState<boolean>(false);

  useEffect(() => {
    try {
      // Vérifie si le script AdSense est déjà chargé
      const isScriptAlreadyInjected = document.querySelector('script[data-adsbygoogle]');
      
      if (!isScriptAlreadyInjected) {
        console.info('Injection du script AdSense');
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('data-adsbygoogle', 'true');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
      }
      
      // Vérifie si l'ad a déjà été injectée dans ce composant
      if (!isAdInjected) {
        // Utilise un timeout pour s'assurer que le script est chargé
        setTimeout(() => {
          try {
            if (window.adsbygoogle && adRef.current) {
              console.info('Insertion de la publicité AdSense');
              // @ts-expect-error: adsbygoogle injected by AdSense
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              setIsAdInjected(true);
            }
          } catch (adError) {
            console.error('Erreur lors de l\'insertion AdSense:', adError);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation AdSense:', error);
    }
    
    return () => {
      // Nettoyage si nécessaire
    };
  }, [isAdInjected]);

  // Styles exacts demandés en Tailwind
  return (
    <aside
      className="ads-slot bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden p-4 shadow w-60"
      aria-label="Publicité ScoreBoard droite"
    >
      {/* Dutch – ScoreBoard Right Ad */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef as any}
      />
    </aside>
  );
};

export default AdSenseSlot;
