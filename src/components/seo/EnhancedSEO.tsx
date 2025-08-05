import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  gameInfo?: {
    players: string;
    duration: string;
    difficulty: string;
  };
}

export const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  keywords,
  image = '/opengraph-dutch.png',
  type = 'website',
  breadcrumbs,
  faqItems,
  gameInfo
}) => {
  const location = useLocation();
  const currentUrl = `https://dutch-card-game.lovable.app${location.pathname}`;
  
  // Génération du schema FAQ si des items sont fournis
  const faqSchema = faqItems ? {
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  } : null;

  // Génération du schema Breadcrumbs
  const breadcrumbSchema = breadcrumbs ? {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  } : null;

  // Schema du jeu si des infos sont fournies
  const gameSchema = gameInfo ? {
    '@type': 'Game',
    name: 'Dutch Card Game',
    numberOfPlayers: gameInfo.players,
    typicalAgeRange: '8-99',
    estimatedPlayTime: gameInfo.duration,
    gameLocation: 'Indoor',
    complexity: gameInfo.difficulty
  } : null;

  const schemas = [faqSchema, breadcrumbSchema, gameSchema].filter(Boolean);

  return (
    <Helmet>
      {/* Core Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Structured Data */}
      {schemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': schemas
          })}
        </script>
      )}
      
      {/* Additional SEO Meta */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    </Helmet>
  );
};