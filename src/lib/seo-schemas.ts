/**
 * JSON-LD Schema.org helpers for GEO/SEO
 */

export const accountingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "MFinances S.R.L.",
  "description": "Cabinet d'expertise comptable premium à Bruxelles, spécialisé dans le pilotage financier des TPE en croissance. Contrôle de gestion, DAF externalisé, trésorerie prévisionnelle.",
  "url": "https://mfinances.be",
  "telephone": "+3228860550",
  "email": "info@mfinances.be",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20 Rue de la Magnanerie",
    "addressLocality": "Uccle",
    "postalCode": "1180",
    "addressRegion": "Bruxelles",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.8020,
    "longitude": 4.3562
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "founder": {
    "@type": "Person",
    "name": "Mika Musungayi",
    "jobTitle": "Expert-comptable",
    "description": "Fondateur de MFinances, expert-comptable membre ITAA (n° 50.624.805), plus de 20 ans d'expérience auprès des TPE et PME à Bruxelles."
  },
  "priceRange": "350€ - 650€ HTVA/mois",
  "areaServed": {
    "@type": "City",
    "name": "Bruxelles"
  },
  "knowsAbout": [
    "Contrôle de gestion TPE",
    "DAF externalisé",
    "Trésorerie prévisionnelle",
    "Optimisation fiscale Belgique",
    "Comptabilité Odoo",
    "VVPRbis",
    "Réserve de liquidation"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/mfinances"
  ]
};

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function createFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
}

/**
 * Inject JSON-LD script into <head>. Returns the element for cleanup.
 */
export function injectJsonLd(data: object): HTMLScriptElement {
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
  return s;
}
