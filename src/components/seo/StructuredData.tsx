
import React from 'react';

interface StructuredDataProps {
  type: 'WebApplication' | 'Game' | 'Article' | 'FAQ';
  data: any;
}

// Security: Sanitize and validate structured data
const sanitizeStructuredData = (data: any): any => {
  if (typeof data !== 'object' || data === null) {
    return {};
  }
  
  const sanitized: any = {};
  
  // Only allow safe properties and sanitize strings
  const allowedProps = ['name', 'description', 'url', 'applicationCategory', 'operatingSystem', 'offers', 'aggregateRating', 'author'];
  
  for (const [key, value] of Object.entries(data)) {
    if (allowedProps.includes(key)) {
      if (typeof value === 'string') {
        // Remove potentially dangerous characters
        sanitized[key] = value.replace(/<[^>]*>?/gm, '').substring(0, 500);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeStructuredData(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
};

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateSchema = () => {
    // Security: Sanitize input data
    const sanitizedData = sanitizeStructuredData(data);
    
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': type,
      ...sanitizedData
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

  // Security: Validate JSON before rendering
  const schemaData = generateSchema();
  let safeJsonString = '';
  
  try {
    safeJsonString = JSON.stringify(schemaData, null, 2);
    // Additional security: ensure no script tags or dangerous content
    if (safeJsonString.includes('<script') || safeJsonString.includes('javascript:')) {
      console.warn('Potentially dangerous content detected in structured data');
      return null;
    }
  } catch (error) {
    console.error('Error serializing structured data:', error);
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonString
      }}
    />
  );
};
