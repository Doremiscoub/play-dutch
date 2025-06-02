
import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';

interface AdSenseSkyscraperProps {
  adClient: string;
  adSlot: string;
  position: 'left' | 'right';
  format?: '160x600' | '120x600';
  className?: string;
}

const AdSenseSkyscraper: React.FC<AdSenseSkyscraperProps> = ({
  adClient,
  adSlot,
  position,
  format = '160x600',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const width = format === '160x600' ? 160 : 120;
  const height = 600;

  useEffect(() => {
    const loadAdSense = async () => {
      try {
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
        console.error('AdSense loading error:', error);
        setHasError(true);
      }
    };

    loadAdSense();
  }, [adClient]);

  useEffect(() => {
    if (isLoaded && containerRef.current && !hasError) {
      try {
        const container = containerRef.current;
        container.innerHTML = '';
        
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.setAttribute('data-ad-client', adClient);
        adElement.setAttribute('data-ad-slot', adSlot);
        adElement.setAttribute('data-ad-format', 'auto');
        adElement.setAttribute('data-full-width-responsive', 'false');
        adElement.style.width = `${width}px`;
        adElement.style.height = `${height}px`;
        
        container.appendChild(adElement);
        
        setTimeout(() => {
          try {
            if (window.adsbygoogle && containerRef.current?.contains(adElement)) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
          } catch (pushError) {
            console.error('AdSense push error:', pushError);
            setHasError(true);
          }
        }, 200);
      } catch (error) {
        console.error('AdSense injection error:', error);
        setHasError(true);
      }
    }
  }, [isLoaded, adClient, adSlot, hasError, width, height]);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="text-center">
          <div className="text-xs">Espace</div>
          <div className="text-xs">publicitaire</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden sticky top-4 ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      aria-label="Annonce"
    >
      {!isLoaded && (
        <div className="h-full flex items-center justify-center text-gray-400 text-sm animate-pulse">
          <div className="text-center">
            <div className="text-xs">Chargement...</div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdSenseSkyscraperWithErrorBoundary: React.FC<AdSenseSkyscraperProps> = (props) => {
  const AdSenseFallback = () => (
    <div 
      className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm"
      style={{ width: `${props.format === '160x600' ? 160 : 120}px`, height: '600px' }}
    >
      <div className="text-center">
        <div className="text-xs">Espace</div>
        <div className="text-xs">publicitaire</div>
      </div>
    </div>
  );

  return (
    <ErrorBoundary FallbackComponent={AdSenseFallback}>
      <AdSenseSkyscraper {...props} />
    </ErrorBoundary>
  );
};

export default AdSenseSkyscraperWithErrorBoundary;
