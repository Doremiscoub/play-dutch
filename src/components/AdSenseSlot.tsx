
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface AdSenseSlotProps {
  adClient: string;
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
}

const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  adClient,
  adSlot,
  adFormat = 'auto',
  className = '',
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
        toast.error('Impossible de charger les annonces');
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

  return (
    <div 
      ref={adRef}
      className={`glass-medium p-4 rounded-2xl min-h-[280px] flex items-center justify-center ${className}`}
      aria-label="Annonce"
    >
      {!isAdInjected && (
        <div className="text-gray-400 text-sm text-center animate-pulse">
          Chargement de l'annonce...
        </div>
      )}
    </div>
  );
};

export default AdSenseSlot;
