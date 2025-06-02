
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

  // Composant wrapper avec gestion d'erreur pour AdSense
  const SafeAdSenseSlot = ({ position, ...props }: { position: 'left' | 'right' } & any) => {
    try {
      return (
        <AdSenseSlot 
          adClient="ca-pub-xxxxxxxxxxxxxxxx" 
          adSlot="xxxxxxxxxx" 
          position={position}
          className="w-60 h-60"
          {...props}
        />
      );
    } catch (error) {
      console.error(`Erreur AdSense ${position}:`, error);
      return (
        <div className="w-60 h-60 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          Espace publicitaire
        </div>
      );
    }
  };

  return (
    <div className="grid lg:grid-cols-[250px_1fr_250px] gap-4 w-full overflow-hidden">
      <aside className="hidden lg:flex lg:justify-end lg:items-start lg:pt-8">
        {isLoaded && <SafeAdSenseSlot position="left" />}
      </aside>
      
      <main className="mx-auto max-w-screen-lg w-full min-h-screen">
        {children}
      </main>
      
      <aside className="hidden lg:flex lg:justify-start lg:items-start lg:pt-8">
        {isLoaded && <SafeAdSenseSlot position="right" />}
      </aside>
    </div>
  );
};

export default AdSenseLayout;
