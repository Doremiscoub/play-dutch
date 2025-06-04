
export interface SEOProps {
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

export interface StructuredDataProps {
  title: string;
  description: string;
  url: string;
  image: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  gameInfo?: {
    players: string;
    duration: string;
    difficulty: string;
  };
}
