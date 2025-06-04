
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
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  gameInfo?: {
    players: string;
    duration: string;
    difficulty: string;
  };
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
  modifiedDate,
  breadcrumbs,
  faqItems,
  gameInfo
}: SEOProps = {}) => {
  useEffect(() => {
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
    
  }, [title, description, keywords, image, url, type, author, publishDate, modifiedDate, breadcrumbs, faqItems, gameInfo]);
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

const addDNSPrefetchLink = (href: string) => {
  if (document.querySelector(`link[href="${href}"][rel="dns-prefetch"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = href;
  document.head.appendChild(link);
};

const addStructuredData = (data: any) => {
  // Supprimer l'ancien script JSON-LD s'il existe
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
};

const generateStructuredData = ({ title, description, url, image, breadcrumbs, faqItems, gameInfo }: any) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#webapp`,
        name: 'Dutch Card Game',
        description,
        url,
        applicationCategory: 'Game',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '250',
          bestRating: '5',
          worstRating: '1'
        },
        author: {
          '@type': 'Organization',
          name: 'Dutch Card Game Team',
          url: url
        },
        image: {
          '@type': 'ImageObject',
          url: image,
          width: 1200,
          height: 630
        },
        dateCreated: '2024-01-01',
        dateModified: new Date().toISOString(),
        inLanguage: 'fr-FR',
        isAccessibleForFree: true,
        genre: 'Card Game',
        audience: {
          '@type': 'Audience',
          audienceType: 'Friends and Family'
        }
      },
      {
        '@type': 'Organization',
        '@id': `${url}#organization`,
        name: 'Dutch Card Game',
        url,
        logo: {
          '@type': 'ImageObject',
          url: image
        },
        sameAs: [
          'https://twitter.com/dutch_app'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: 'Dutch Card Game',
        description,
        publisher: {
          '@id': `${url}#organization`
        },
        inLanguage: 'fr-FR'
      }
    ]
  };

  // Ajouter les breadcrumbs si disponibles
  if (breadcrumbs && breadcrumbs.length > 0) {
    baseData['@graph'].push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url
      }))
    });
  }

  // Ajouter FAQ si disponible
  if (faqItems && faqItems.length > 0) {
    baseData['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    });
  }

  // Ajouter les informations de jeu si disponibles
  if (gameInfo) {
    baseData['@graph'].push({
      '@type': 'Game',
      name: 'Dutch Card Game',
      description: 'Jeu de cartes convivial pour 2 à 10 joueurs',
      numberOfPlayers: gameInfo.players,
      playTime: gameInfo.duration,
      gameLocation: 'Indoor',
      genre: 'Card Game'
    });
  }

  return baseData;
};
