
import { StructuredDataProps } from './types';

export const generateStructuredData = ({ title, description, url, image, breadcrumbs, faqItems, gameInfo }: StructuredDataProps) => {
  const baseData: any = {
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
      itemListElement: breadcrumbs.map((breadcrumb: any, index: number) => ({
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
      mainEntity: faqItems.map((item: any) => ({
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
