
export const generateSitemap = () => {
  const baseUrl = 'https://dutch-card-game.lovable.app';
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString() },
    { url: '/rules', priority: '0.9', changefreq: 'weekly', lastmod: new Date().toISOString() },
    { url: '/strategy', priority: '0.8', changefreq: 'weekly', lastmod: new Date().toISOString() },
    { url: '/faq', priority: '0.8', changefreq: 'weekly', lastmod: new Date().toISOString() },
    { url: '/game/setup', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString() },
    { url: '/about', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString() },
    { url: '/history', priority: '0.6', changefreq: 'weekly', lastmod: new Date().toISOString() },
    { url: '/settings', priority: '0.5', changefreq: 'monthly', lastmod: new Date().toISOString() },
    { url: '/privacy', priority: '0.4', changefreq: 'yearly', lastmod: new Date().toISOString() },
    { url: '/terms', priority: '0.4', changefreq: 'yearly', lastmod: new Date().toISOString() }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod.split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  a.click();
  URL.revokeObjectURL(url);
};

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Allow: /rules
Allow: /strategy
Allow: /faq
Allow: /about
Allow: /privacy
Allow: /terms

# Pages importantes pour le SEO
Allow: /game/setup

# Désindexer les pages dynamiques sensibles
Disallow: /game?*
Disallow: /settings
Disallow: /history
Disallow: /sign-in
Disallow: /sign-up

# Sitemaps
Sitemap: https://dutch-card-game.lovable.app/sitemap.xml

# Crawl-delay pour éviter la surcharge
Crawl-delay: 1

# Moteurs de recherche spécifiques
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /`;
};
