
import React, { useEffect, useRef } from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { composedClasses } from '@/config/uiConfig';

interface AdBannerProps {
  format?: 'horizontal' | 'vertical' | 'square';
  position?: 'top' | 'bottom' | 'inline';
  className?: string;
}

/**
 * Composant pour l'affichage de publicités AdSense
 * Utilise les formats standards de Google AdSense
 */
const AdBanner: React.FC<AdBannerProps> = ({ 
  format = 'horizontal', 
  position = 'bottom',
  className = '' 
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  // Définir les dimensions en fonction du format
  const getAdDimensions = () => {
    switch (format) {
      case 'horizontal':
        return { width: '728px', height: '90px' };
      case 'vertical':
        return { width: '300px', height: '600px' };
      case 'square':
        return { width: '300px', height: '250px' };
      default:
        return { width: '320px', height: '100px' };
    }
  };
  
  // Obtenir l'ID client AdSense depuis les variables d'environnement (à configurer)
  const adClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxxxxxxxx';
  
  // Initialiser AdSense
  useEffect(() => {
    const initAd = () => {
      // Ne charge pas AdSense en développement
      if (process.env.NODE_ENV === 'development') {
        return;
      }
      
      // Vérifier si AdSense est déjà chargé
      if ((window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
          console.error('AdSense error:', e);
        }
      } else {
        // Charger le script AdSense si non présent
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        script.onload = () => {
          try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          } catch (e) {
            console.error('AdSense error:', e);
          }
        };
      }
    };
    
    initAd();
  }, [adClientId]);
  
  // Appliquer différentes classes selon la position
  const getPositionClass = () => {
    switch (position) {
      case 'top':
        return 'sticky top-0 z-10 w-full';
      case 'bottom':
        return 'sticky bottom-0 z-10 w-full';
      case 'inline':
      default:
        return 'my-4 mx-auto';
    }
  };
  
  // Si en développement, afficher un placeholder
  if (process.env.NODE_ENV === 'development') {
    const { width, height } = getAdDimensions();
    
    return (
      <div 
        className={`${getPositionClass()} ${className} relative overflow-hidden flex items-center justify-center`}
        style={{ width, height, maxWidth: '100%' }}
      >
        <div className={`${composedClasses.card} w-full h-full flex items-center justify-center relative`}>
          <div className="text-center text-gray-500 text-sm px-4">
            <p className="text-dutch-blue font-medium">Espace Publicitaire</p>
            <p className="text-xs mt-1">Format: {format}</p>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="mt-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-white/90 backdrop-blur-md border border-white/40">
                  <p className="text-xs max-w-48">
                    Cet emplacement affichera une publicité en production. Les publicités nous aident à maintenir l'application gratuite.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-xl pointer-events-none"></div>
        </div>
      </div>
    );
  }
  
  // En production, afficher l'annonce AdSense réelle
  const { width, height } = getAdDimensions();
  
  return (
    <div 
      className={`${getPositionClass()} ${className} relative overflow-hidden ad-container`}
      style={{ width, height, maxWidth: '100%' }}
      ref={adRef}
    >
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client={adClientId}
        data-ad-slot="12345678"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdBanner;
