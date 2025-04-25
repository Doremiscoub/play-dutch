
import React from 'react';
import AdSenseSlot from '@/components/AdSenseSlot';

interface AdSenseLayoutProps {
  children: React.ReactNode;
  isSignedIn: boolean;
  adsEnabled: boolean;
  isLoaded: boolean;
}

const AdSenseLayout: React.FC<AdSenseLayoutProps> = ({
  children,
  isSignedIn,
  adsEnabled,
  isLoaded
}) => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2">
      <div className="grid lg:grid-cols-[280px_1fr_280px] gap-4">
        {/* Colonne de gauche (visible uniquement sur desktop pour utilisateurs non connectés) */}
        {!isSignedIn && adsEnabled && isLoaded && (
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AdSenseSlot
                adClient="ca-pub-XXXXXXXXXXXXXXXX"
                adSlot="XXXXXXXXXX"
                position="left"
                className="w-[250px] min-h-[600px] mx-auto"
              />
            </div>
          </div>
        )}
        
        {/* Contenu principal */}
        <div className="w-full mx-auto">
          {children}
        </div>
        
        {/* Colonne de droite avec AdSense */}
        {!isSignedIn && adsEnabled && isLoaded && (
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AdSenseSlot
                adClient="ca-pub-XXXXXXXXXXXXXXXX"
                adSlot="XXXXXXXXXX"
                position="right"
                className="w-[250px] min-h-[600px] mx-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSenseLayout;
