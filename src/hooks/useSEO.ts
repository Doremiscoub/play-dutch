
import { useEffect } from 'react';
import { applySEOConfiguration } from './seo/seoEffects';
import { SEOProps } from './seo/types';

export const useSEO = (props: SEOProps = {}) => {
  useEffect(() => {
    applySEOConfiguration(props);
  }, [
    props.title,
    props.description,
    props.keywords,
    props.image,
    props.url,
    props.type,
    props.author,
    props.publishDate,
    props.modifiedDate,
    props.breadcrumbs,
    props.faqItems,
    props.gameInfo
  ]);
};

// Re-export types for convenience
export type { SEOProps } from './seo/types';
