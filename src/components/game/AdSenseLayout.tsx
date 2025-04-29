
import React, { ReactNode } from 'react';
import AdSenseSlot from '../AdSenseSlot';

interface AdSenseLayoutProps {
  children: ReactNode;
  isSignedIn: boolean;
  adsEnabled: boolean;
  isLoaded?: boolean;
}

const AdSenseLayout: React.FC<AdSenseLayoutProps> = ({ 
  children, 
  isSignedIn, 
  adsEnabled,
  isLoaded = true
}) => {
  // Si l'utilisateur est authentifié ou si les publicités sont désactivées,
  // retourner directement le contenu sans les publicités
  if (isSignedIn || !adsEnabled) {
    return <>{children}</>;
  }

  return (
    <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 w-full overflow-hidden">
      <aside className="hidden lg:block lg:flex lg:justify-end">
        {isLoaded && <AdSenseSlot 
          adClient="ca-pub-xxxxxxxxxxxxxxxx" 
          adSlot="xxxxxxxxxx" 
          position="left"
        />}
      </aside>
      
      <main className="mx-auto max-w-screen-lg w-full">
        {children}
      </main>
      
      <aside className="hidden lg:block lg:flex lg:justify-start">
        {isLoaded && <AdSenseSlot 
          adClient="ca-pub-xxxxxxxxxxxxxxxx" 
          adSlot="xxxxxxxxxx" 
          position="right"
        />}
      </aside>
    </div>
  );
};

export default AdSenseLayout;
