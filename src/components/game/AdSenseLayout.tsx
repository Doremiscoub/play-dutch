
import React, { ReactNode } from 'react';
import SecureAdSenseWrapper from './SecureAdSenseWrapper';

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
    <div className="grid lg:grid-cols-[250px_1fr_250px] gap-4 w-full overflow-hidden">
      <aside className="hidden lg:flex lg:justify-end lg:items-start lg:pt-8">
        {isLoaded && (
          <SecureAdSenseWrapper 
            adClient="ca-pub-xxxxxxxxxxxxxxxx" 
            adSlot="xxxxxxxxxx" 
            position="left"
          />
        )}
      </aside>
      
      <main className="mx-auto max-w-screen-lg w-full min-h-screen">
        {children}
      </main>
      
      <aside className="hidden lg:flex lg:justify-start lg:items-start lg:pt-8">
        {isLoaded && (
          <SecureAdSenseWrapper 
            adClient="ca-pub-xxxxxxxxxxxxxxxx" 
            adSlot="xxxxxxxxxx" 
            position="right"
          />
        )}
      </aside>
    </div>
  );
};

export default AdSenseLayout;
