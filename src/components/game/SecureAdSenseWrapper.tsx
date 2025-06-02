
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAdSense = async () => {
      try {
        // Check if script is already loaded
        if (!window.adsbygoogle) {
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
      } catch (error) {
        console.error('Failed to load AdSense:', error);
        setHasError(true);
      }
    };

    loadAdSense();
  }, [adClient]);

  useEffect(() => {
    if (isLoaded && containerRef.current && !hasError) {
      try {
        // Use dangerouslySetInnerHTML instead of direct DOM manipulation
        const adHTML = `
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="${adClient}"
               data-ad-slot="${adSlot}"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        `;
        
        containerRef.current.innerHTML = adHTML;
        
        // Push ad after a safe delay
        setTimeout(() => {
          try {
            if (window.adsbygoogle) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
          } catch (pushError) {
            console.error('AdSense push error:', pushError);
            setHasError(true);
          }
        }, 100);
      } catch (error) {
        console.error('AdSense setup error:', error);
        setHasError(true);
      }
    }
  }, [isLoaded, adClient, adSlot, hasError]);

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
