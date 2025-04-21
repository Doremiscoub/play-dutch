
import React from 'react';

const AdSenseSlot = () => {
  return (
    <div 
      className="adsense-slot bg-white/80 backdrop-blur-sm rounded-lg p-2"
      dangerouslySetInnerHTML={{ __html: `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2046195502734056"
          crossorigin="anonymous"></script>
        <!-- Dutch - Tableau des scores (Droite) -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-2046195502734056"
             data-ad-slot="8421933386"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      ` }}
    />
  );
};

export default AdSenseSlot;
