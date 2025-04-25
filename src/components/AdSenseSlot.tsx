
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

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
    
    // Charger le script AdSense s'il n'est pas déjà présent
    try {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.adClient = adClient;
      
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
      adElement.style.width = '100%';
      adElement.style.height = '100%';
      adElement.dataset.adClient = adClient;
      adElement.dataset.adSlot = adSlot;
      adElement.dataset.adFormat = adFormat;
      adElement.dataset.fullWidthResponsive = 'true';
      
      // Nettoyer le conteneur avant d'insérer la nouvelle annonce
      if (adRef.current.firstChild) {
        adRef.current.innerHTML = '';
      }

      adRef.current.appendChild(adElement);

      // Délai court pour s'assurer que le DOM est à jour
      setTimeout(() => {
        try {
          if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
            window.adsbygoogle.push({});
            setIsAdInjected(true);
            console.info('Annonce AdSense injectée avec succès');
          } else {
            console.warn('Objet adsbygoogle non disponible ou non initialisé');
          }
        } catch (error) {
          console.error('Erreur lors du push de l\'annonce:', error);
        }
      }, 100);
    } catch (error) {
      console.error('Erreur lors de l\'injection de l\'annonce AdSense:', error);
    }
  }, [isScriptLoaded, isAdInjected, adClient, adSlot, adFormat]);

  // Classes adaptées pour le positionnement des publicités
  const baseClass = "glass-medium flex items-center justify-center overflow-hidden rounded-xl";

  return (
    <div 
      ref={adRef}
      className={`${baseClass} ${className}`}
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
