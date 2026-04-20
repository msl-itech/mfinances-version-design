/**
 * JSON-LD Schema.org helpers for GEO/SEO
 */

export const personMikaSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mika Musungayi",
  "jobTitle": "Expert-comptable",
  "description": "Fondateur de MFinances, expert-comptable membre ITAA, plus de 20 ans d'expérience auprès des TPE et PME à Bruxelles.",
  "worksFor": {
    "@type": "Organization",
    "name": "MFinances S.R.L.",
    "url": "https://mfinances.be"
  },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "professional certification",
    "name": "Expert-comptable ITAA",
    "identifier": "50.624.805",
    "recognizedBy": {
      "@type": "Organization",
      "name": "Institut des Conseillers fiscaux et des Experts-comptables (ITAA)",
      "url": "https://www.itaa.be"
    }
  },
  "url": "https://mfinances.be/a-propos/",
  "sameAs": [
    "https://www.linkedin.com/company/mfinances"
  ]
};

export const accountingServiceSchema = {
  "@context": "https://schema.org",
  "@type": ["AccountingService", "ProfessionalService"],
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
    "url": "https://mfinances.be/a-propos/",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "professional certification",
      "name": "Expert-comptable ITAA",
      "identifier": "50.624.805"
    }
  },
  "priceRange": "350€ - 650€ HTVA/mois",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "16",
    "reviewCount": "16"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Mari Carmen Rejas Martin" },
      "reviewBody": "Sans hésitation, je ne peux que recommander MFinances, tant pour son professionnalisme, son accueil, sa réactivité lors d'un doute, son humanité etc."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Audrey Pepka épouse Mbog" },
      "reviewBody": "Tellement satisfaite du service accordé par MFinances ! Je recommande vivement."
    },
    {
      "@type": "Review",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "author": { "@type": "Person", "name": "Luc Jeazet" },
      "reviewBody": "MFINANCES MERCI !! Avec Mika et sa merveilleuse équipe, mon entreprise a pris un vrai tournant."
    }
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Bruxelles"
    },
    {
      "@type": "Country",
      "name": "Belgique"
    }
  ],
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

