
export const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
  if (!content) return;
  
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

export const updateCanonicalLink = (url: string) => {
  if (!url) return;
  
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

export const addPreconnectLink = (href: string) => {
  if (document.querySelector(`link[href="${href}"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  document.head.appendChild(link);
};

export const addDNSPrefetchLink = (href: string) => {
  if (document.querySelector(`link[href="${href}"][rel="dns-prefetch"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = href;
  document.head.appendChild(link);
};

export const addStructuredData = (data: any) => {
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
