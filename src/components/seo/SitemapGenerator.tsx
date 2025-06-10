
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Globe } from 'lucide-react';
import { generateSitemap, downloadSitemap, generateRobotsTxt } from '@/utils/sitemapGenerator';
import { toast } from 'sonner';

const SitemapGenerator: React.FC = () => {
  const handleGenerateSitemap = () => {
    try {
      downloadSitemap();
      toast.success('Sitemap téléchargé avec succès !');
    } catch (error) {
      toast.error('Erreur lors de la génération du sitemap');
      console.error('Sitemap generation error:', error);
    }
  };

  const handleCopySitemap = () => {
    try {
      const sitemap = generateSitemap();
      navigator.clipboard.writeText(sitemap);
      toast.success('Sitemap copié dans le presse-papiers !');
    } catch (error) {
      toast.error('Erreur lors de la copie du sitemap');
      console.error('Sitemap copy error:', error);
    }
  };

  const handleCopyRobotsTxt = () => {
    try {
      const robotsTxt = generateRobotsTxt();
      navigator.clipboard.writeText(robotsTxt);
      toast.success('Robots.txt copié dans le presse-papiers !');
    } catch (error) {
      toast.error('Erreur lors de la copie du robots.txt');
      console.error('Robots.txt copy error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-dutch-blue" />
        <h3 className="text-lg font-semibold">Génération SEO</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={handleGenerateSitemap}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Télécharger sitemap.xml
        </Button>

        <Button
          onClick={handleCopySitemap}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          Copier sitemap.xml
        </Button>

        <Button
          onClick={handleCopyRobotsTxt}
          variant="outline"
          className="flex items-center gap-2 sm:col-span-2"
        >
          <Globe className="h-4 w-4" />
          Copier robots.txt
        </Button>
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-2">URLs incluses dans le sitemap :</p>
        <ul className="space-y-1 text-xs">
          <li>• Page d'accueil (/)</li>
          <li>• Règles du jeu (/rules)</li>
          <li>• Guide stratégique (/strategy)</li>
          <li>• FAQ (/faq)</li>
          <li>• Configuration de partie (/setup)</li>
          <li>• À propos (/about)</li>
          <li>• Historique (/history)</li>
          <li>• Paramètres (/settings)</li>
          <li>• Politique de confidentialité (/privacy)</li>
          <li>• Conditions d'utilisation (/terms)</li>
        </ul>
      </div>
    </div>
  );
};

export default SitemapGenerator;
