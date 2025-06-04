
import { updateMetaTag, updateCanonicalLink, addPreconnectLink, addDNSPrefetchLink, addStructuredData } from './metaUtils';
import { generateStructuredData } from './structuredDataGenerator';
import { SEOProps } from './types';

export const applySEOConfiguration = ({
  title = 'Dutch Card Game - Application compagnon pour jeu de cartes',
  description = 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Parfait pour vos soirées entre amis. Interface moderne, hors-ligne, avec IA commentateur.',
  keywords = 'dutch, jeu de cartes, score, application, soirée, amis, cartes, jeu de société, digital',
  image = '/opengraph-dutch.png',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  author = 'Dutch Card Game Team',
  publishDate,
  modifiedDate,
  breadcrumbs,
  faqItems,
  gameInfo
}: SEOProps) => {
  // Title avec limite de caractères optimale
  const optimizedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  document.title = optimizedTitle;
  
  // Meta description optimisée
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  updateMetaTag('description', optimizedDescription);
  updateMetaTag('keywords', keywords);
  updateMetaTag('author', author);
  
  // Dates SEO
  if (publishDate) {
    updateMetaTag('article:published_time', publishDate, 'property');
  }
  if (modifiedDate) {
    updateMetaTag('article:modified_time', modifiedDate, 'property');
  }
  
  // Open Graph enrichi
  updateMetaTag('og:title', optimizedTitle, 'property');
  updateMetaTag('og:description', optimizedDescription, 'property');
  updateMetaTag('og:image', image, 'property');
  updateMetaTag('og:image:width', '1200', 'property');
  updateMetaTag('og:image:height', '630', 'property');
  updateMetaTag('og:image:alt', 'Dutch Card Game - Interface de jeu', 'property');
  updateMetaTag('og:url', url, 'property');
  updateMetaTag('og:type', type, 'property');
  updateMetaTag('og:site_name', 'Dutch Card Game', 'property');
  updateMetaTag('og:locale', 'fr_FR', 'property');
  
  // Twitter Cards enrichi
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', optimizedTitle, 'name');
  updateMetaTag('twitter:description', optimizedDescription, 'name');
  updateMetaTag('twitter:image', image, 'name');
  updateMetaTag('twitter:image:alt', 'Dutch Card Game - Interface de jeu', 'name');
  updateMetaTag('twitter:site', '@dutch_app', 'name');
  updateMetaTag('twitter:creator', '@dutch_app', 'name');
  
  // SEO technique avancé
  updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');
  updateMetaTag('googlebot', 'index, follow', 'name');
  updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes', 'name');
  updateMetaTag('theme-color', '#1EAEDB', 'name');
  updateMetaTag('application-name', 'Dutch Card Game', 'name');
  updateMetaTag('apple-mobile-web-app-title', 'Dutch', 'name');
  updateMetaTag('apple-mobile-web-app-capable', 'yes', 'name');
  updateMetaTag('apple-mobile-web-app-status-bar-style', 'default', 'name');
  updateMetaTag('format-detection', 'telephone=no', 'name');
  
  // Canonical URL
  updateCanonicalLink(url);
  
  // Preconnect et DNS prefetch pour performance
  addPreconnectLink('https://fonts.googleapis.com');
  addPreconnectLink('https://fonts.gstatic.com');
  addDNSPrefetchLink('https://www.google-analytics.com');
  
  // Données structurées JSON-LD enrichies
  addStructuredData(generateStructuredData({
    title: optimizedTitle,
    description: optimizedDescription,
    url,
    image,
    breadcrumbs,
    faqItems,
    gameInfo
  }));
};
