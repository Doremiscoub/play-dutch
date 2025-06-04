
import React from 'react';

interface StructuredDataProps {
  type: 'WebApplication' | 'Game' | 'Article' | 'FAQ';
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    };

    if (type === 'WebApplication') {
      return {
        ...baseSchema,
        name: 'Dutch Card Game',
        description: 'Application web gratuite pour suivre les scores du jeu de cartes Dutch',
        url: 'https://dutch-card-game.lovable.app',
        applicationCategory: 'Game',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '156'
        },
        author: {
          '@type': 'Organization',
          name: 'Dutch Card Game Team'
        }
      };
    }

    return baseSchema;
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema(), null, 2)
      }}
    />
  );
};
