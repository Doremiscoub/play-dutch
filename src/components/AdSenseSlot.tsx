
import React, { useEffect, useRef, useState } from 'react';

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
  const [isAdInjected, setIsAdInjected] = useState<boolean>(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);

  // Vérifier si le script AdSense est déjà chargé
  useEffect(() => {
    const adScript = document.querySelector('script[src*="adsbygoogle.js"]');
    
    if (adScript) {
      setIsScriptLoaded(true);
      return;
    }
    
    try {
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        console.info('Script AdSense chargé avec succès');
        setIsScriptLoaded(true);
      };
      
      script.onerror = (error) => {
        console.error('Erreur lors du chargement du script AdSense:', error);
      };
      
      document.head.appendChild(script);
    } catch (error) {
      console.error('Erreur lors de l\'initialisation d\'AdSense:', error);
    }
  }, [adClient]);

  // Injecter l'annonce une fois que le script est chargé
  useEffect(() => {
    if (!isScriptLoaded || isAdInjected || !adRef.current) {
      return;
    }

    try {
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.dataset.adClient = adClient;
      adElement.dataset.adSlot = adSlot;
      adElement.dataset.adFormat = adFormat;
      adElement.dataset.fullWidthResponsive = 'true';
      
      // Nettoyer le conteneur avant d'insérer la nouvelle annonce
      if (adRef.current.firstChild) {
        adRef.current.innerHTML = '';
      }
      
      adRef.current.appendChild(adElement);

      setTimeout(() => {
        try {
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setIsAdInjected(true);
            console.info('Annonce AdSense injectée avec succès');
          }
        } catch (error) {
          console.error('Erreur lors du push de l\'annonce:', error);
        }
      }, 100);
    } catch (error) {
      console.error('Erreur lors de l\'injection de l\'annonce AdSense:', error);
    }
  }, [isScriptLoaded, isAdInjected, adClient, adSlot, adFormat]);

  return (
    <div 
      ref={adRef}
      className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden p-2 w-[250px] mx-auto ${className}`}
      aria-label="Annonce"
    >
      {!isAdInjected && (
        <div className="text-gray-400 text-sm text-center animate-pulse p-4">
          Espace publicitaire
        </div>
      )}
    </div>
  );
};

export default AdSenseSlot;
