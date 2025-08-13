import React, { useEffect, useRef, useState, useCallback } from 'react';

interface AdSenseSlotProps {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  className?: string;
  position?: 'left' | 'right';
}

const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  adClient,
  adSlot,
  adFormat = 'auto',
  className = '',
  position
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdReady, setIsAdReady] = useState<boolean>(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const adElementRef = useRef<HTMLElement | null>(null);

  // Nettoyage sécurisé
  const cleanupAd = useCallback(() => {
    if (adElementRef.current && adRef.current && adRef.current.contains(adElementRef.current)) {
      try {
        adRef.current.removeChild(adElementRef.current);
      } catch (error) {
        console.warn('AdSense cleanup warning:', error);
      }
    }
    adElementRef.current = null;
    setIsAdReady(false);
  }, []);

  // Vérifier si le script AdSense est déjà chargé
  useEffect(() => {
    const adScript = document.querySelector('script[src*="adsbygoogle.js"]');
    
    if (adScript) {
      setIsScriptLoaded(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    
    script.onerror = (error) => {
      console.error('Erreur lors du chargement du script AdSense:', error);
    };
    
    document.head.appendChild(script);

    return () => {
      // Ne pas supprimer le script car d'autres composants peuvent l'utiliser
    };
  }, [adClient]);

  // Injecter l'annonce une fois que le script est chargé
  useEffect(() => {
    if (!isScriptLoaded || isAdReady || !adRef.current) {
      return;
    }

    // Nettoyage préventif
    cleanupAd();

    try {
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.dataset.adClient = adClient;
      adElement.dataset.adSlot = adSlot;
      adElement.dataset.adFormat = adFormat;
      adElement.dataset.fullWidthResponsive = 'true';
      
      // Vérifier que le conteneur existe toujours
      if (adRef.current) {
        adRef.current.appendChild(adElement);
        adElementRef.current = adElement;

        // Délai pour permettre à l'élément de s'attacher au DOM
        setTimeout(() => {
          try {
            if (window.adsbygoogle && adElementRef.current && adRef.current?.contains(adElementRef.current)) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              setIsAdReady(true);
            }
          } catch (error) {
            console.error('Erreur lors du push de l\'annonce:', error);
            cleanupAd();
          }
        }, 100);
      }
    } catch (error) {
      console.error('Erreur lors de l\'injection de l\'annonce AdSense:', error);
    }
  }, [isScriptLoaded, adClient, adSlot, adFormat, isAdReady, cleanupAd]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      cleanupAd();
    };
  }, [cleanupAd]);

  return (
    <div 
      ref={adRef}
      className={`card-glass-colored backdrop-blur-lg rounded-lg overflow-hidden p-2 w-[250px] mx-auto ${className}`}
      aria-label="Annonce"
    >
      {!isAdReady && (
        <div className="text-white/70 text-sm text-center animate-pulse p-4 font-semibold">
          Espace publicitaire
        </div>
      )}
    </div>
  );
};

export default AdSenseSlot;