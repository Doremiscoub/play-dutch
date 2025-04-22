
import React, { useEffect, useRef } from 'react';

const ADSENSE_CLIENT = 'ca-pub-2046195502734056';
const ADSENSE_SLOT = '8421933386';

const AdSenseSlot: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Injecte le script AdSense une seule fois par page
    if (!document.querySelector('script[data-adsbygoogle]')) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('data-adsbygoogle', 'true');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
      script.crossOrigin = 'anonymous';
      document.body.appendChild(script);
    }
    // Exécute l'insert du bloc
    // @ts-expect-error: adsbygoogle injected by AdSense
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

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

