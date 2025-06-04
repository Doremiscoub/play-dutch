
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishDate?: string;
  modifiedDate?: string;
}

export const useSEO = ({
  title = 'Dutch Card Game - Application compagnon pour jeu de cartes',
  description = 'Application web gratuite pour suivre les scores du jeu de cartes Dutch. Parfait pour vos soirées entre amis. Interface moderne, hors-ligne, avec IA commentateur.',
  keywords = 'dutch, jeu de cartes, score, application, soirée, amis, cartes, jeu de société, digital',
  image = '/opengraph-dutch.png',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  author = 'Dutch Card Game Team',
  publishDate,
  modifiedDate
}: SEOProps = {}) => {
  useEffect(() => {
    // Title
    document.title = title;
    
    // Meta description et keywords
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    
    // Dates SEO
    if (publishDate) {
      updateMetaTag('article:published_time', publishDate, 'property');
    }
    if (modifiedDate) {
      updateMetaTag('article:modified_time', modifiedDate, 'property');
    }
    
    // Open Graph
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'Dutch Card Game', 'property');
    updateMetaTag('og:locale', 'fr_FR', 'property');
    
    // Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', image, 'name');
    updateMetaTag('twitter:site', '@dutch_app', 'name');
    
    // Additional SEO
    updateMetaTag('robots', 'index, follow', 'name');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no', 'name');
    updateMetaTag('theme-color', '#1EAEDB', 'name');
    updateMetaTag('application-name', 'Dutch Card Game', 'name');
    
    // Canonical URL
    updateCanonicalLink(url);
    
    // Preconnect to important domains
    addPreconnectLink('https://fonts.googleapis.com');
    addPreconnectLink('https://fonts.gstatic.com');
    
  }, [title, description, keywords, image, url, type, author, publishDate, modifiedDate]);
};

const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
  if (!content) return;
  
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const updateCanonicalLink = (url: string) => {
  if (!url) return;
  
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

const addPreconnectLink = (href: string) => {
  if (document.querySelector(`link[href="${href}"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  document.head.appendChild(link);
};
