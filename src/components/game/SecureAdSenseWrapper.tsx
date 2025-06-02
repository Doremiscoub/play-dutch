
import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface SecureAdSenseWrapperProps {
  adClient: string;
  adSlot: string;
  position?: 'left' | 'right';
  className?: string;
}

const SecureAdSenseWrapper: React.FC<SecureAdSenseWrapperProps> = ({
  adClient,
  adSlot,
  position,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.info('🚀 AdSense: Initialisation du composant');
    
    const loadAdSense = async () => {
      try {
        // Vérifier si le script est déjà chargé
        if (!window.adsbygoogle) {
          console.info('🚀 AdSense: Chargement du script');
          const script = document.createElement('script');
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
          script.async = true;
          script.crossOrigin = 'anonymous';
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        setIsLoaded(true);
        console.info('🚀 AdSense: Script chargé avec succès');
      } catch (error) {
        console.error('🚀 AdSense: Erreur de chargement:', error);
        setHasError(true);
      }
    };

    if (!isInitialized) {
      setIsInitialized(true);
      loadAdSense();
    }
  }, [adClient, isInitialized]);

  useEffect(() => {
    if (isLoaded && containerRef.current && !hasError) {
      try {
        console.info('🚀 AdSense: Injection de l\'annonce');
        
        // Nettoyer le contenu existant de manière sûre
        const container = containerRef.current;
        if (container) {
          container.innerHTML = '';
          
          // Créer l'élément d'annonce
          const adElement = document.createElement('ins');
          adElement.className = 'adsbygoogle';
          adElement.style.display = 'block';
          adElement.setAttribute('data-ad-client', adClient);
          adElement.setAttribute('data-ad-slot', adSlot);
          adElement.setAttribute('data-ad-format', 'auto');
          adElement.setAttribute('data-full-width-responsive', 'true');
          
          container.appendChild(adElement);
          
          // Push l'annonce avec un délai de sécurité
          setTimeout(() => {
            try {
              if (window.adsbygoogle && containerRef.current?.contains(adElement)) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                console.info('🚀 AdSense: Annonce poussée avec succès');
              }
            } catch (pushError) {
              console.error('🚀 AdSense: Erreur lors du push:', pushError);
              setHasError(true);
            }
          }, 200);
        }
      } catch (error) {
        console.error('🚀 AdSense: Erreur d\'injection:', error);
        setHasError(true);
      }
    }
  }, [isLoaded, adClient, adSlot, hasError]);

  // Cleanup lors du démontage
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = '';
        } catch (error) {
          console.warn('🚀 AdSense: Erreur lors du nettoyage:', error);
        }
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm w-[250px] h-60 ${className}`}>
        Espace publicitaire
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden p-2 w-[250px] mx-auto ${className}`}
      aria-label="Annonce"
    >
      {!isLoaded && (
        <div className="text-gray-400 text-sm text-center animate-pulse p-4 h-60 flex items-center justify-center">
          Chargement...
        </div>
      )}
    </div>
  );
};

const SecureAdSenseWrapperWithErrorBoundary: React.FC<SecureAdSenseWrapperProps> = (props) => {
  const AdSenseFallback = () => (
    <div className="w-60 h-60 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
      Espace publicitaire
    </div>
  );

  return (
    <ErrorBoundary FallbackComponent={AdSenseFallback}>
      <SecureAdSenseWrapper {...props} />
    </ErrorBoundary>
  );
};

export default SecureAdSenseWrapperWithErrorBoundary;
