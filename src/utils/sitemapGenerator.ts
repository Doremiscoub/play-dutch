
export const generateSitemap = () => {
  const baseUrl = 'https://dutch-card-game.lovable.app';
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/rules', priority: '0.9', changefreq: 'weekly' },
    { url: '/game/setup', priority: '0.8', changefreq: 'monthly' },
    { url: '/history', priority: '0.7', changefreq: 'weekly' },
    { url: '/settings', priority: '0.6', changefreq: 'monthly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
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
