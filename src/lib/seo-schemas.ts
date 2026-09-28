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
    "identifier": "10.923.614",
    "recognizedBy": {
      "@type": "Organization",
      "name": "Institut des Conseillers fiscaux et des Experts-comptables (ITAA)",
      "url": "https://www.itaa.be"
    }
  },
  "url": "https://mfinances.be/a-propos/",
  // sameAs du fondateur = ses profils PERSONNELS.
  "sameAs": [
    "https://www.linkedin.com/in/mika-musungayi-4b0b9798"
  ]
};

export const accountingServiceSchema = {
  "@context": "https://schema.org",
  "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
  "@id": "https://mfinances.be/#organization",
  "name": "MFinances S.R.L.",
  "description": "Cabinet d'expertise comptable premium à Bruxelles, spécialisé dans le pilotage financier des TPE en croissance. Contrôle de gestion, DAF externalisé, trésorerie prévisionnelle.",
  "url": "https://mfinances.be",
  // n° ITAA du CABINET (personne morale reconnue ITAA)
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "ITAA",
    "value": "50.624.805"
  },
  "hasMap": "https://www.google.com/maps/place/MFinances+%7C+Expert-Comptable/@50.7977112,4.3255262,17z/data=!3m1!4b1!4m6!3m5!1s0x47c3c5d9d41dc777:0x4287de38397fa316!8m2!3d50.7977112!4d4.3255262!16s%2Fg%2F11m__cnb4_",
  "telephone": "+3228860550",
  "email": "info@mfinances.be",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue de la Magnanerie 20",
    "addressLocality": "Uccle",
    "postalCode": "1180",
    "addressRegion": "Région de Bruxelles-Capitale",
    "addressCountry": "BE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.7977112,
    "longitude": 4.3255262
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
      "identifier": "10.923.614"
    }
  },
  "priceRange": "À partir de 275 € HTVA/mois",
  // Avis/notes volontairement retirés du JSON-LD : sur un LocalBusiness/Organization,
  // les avis "self-serving" ne donnent pas d'étoiles (politique Google 2019) et agréger
  // des avis d'autres plateformes dans son propre balisage est déconseillé. Les avis
  // restent affichés sur la page (conversion) et sur la fiche Google.
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Région de Bruxelles-Capitale" },
    { "@type": "City", "name": "Bruxelles" },
    { "@type": "City", "name": "Anderlecht" },
    { "@type": "City", "name": "Auderghem" },
    { "@type": "City", "name": "Berchem-Sainte-Agathe" },
    { "@type": "City", "name": "Etterbeek" },
    { "@type": "City", "name": "Evere" },
    { "@type": "City", "name": "Forest" },
    { "@type": "City", "name": "Ganshoren" },
    { "@type": "City", "name": "Ixelles" },
    { "@type": "City", "name": "Jette" },
    { "@type": "City", "name": "Koekelberg" },
    { "@type": "City", "name": "Molenbeek-Saint-Jean" },
    { "@type": "City", "name": "Saint-Gilles" },
    { "@type": "City", "name": "Saint-Josse-ten-Noode" },
    { "@type": "City", "name": "Schaerbeek" },
    { "@type": "City", "name": "Uccle" },
    { "@type": "City", "name": "Watermael-Boitsfort" },
    { "@type": "City", "name": "Woluwe-Saint-Lambert" },
    { "@type": "City", "name": "Woluwe-Saint-Pierre" },
    { "@type": "Country", "name": "Belgique" }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 50.7977112,
      "longitude": 4.3255262
    },
    "geoRadius": "15000"
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
  // sameAs = profils officiels PUBLICS à URL STABLE (liens ITAA exclus : ils exigent
  // une recherche et ne s'ouvrent pas à froid → l'ITAA reste porté par hasCredential).
  "sameAs": [
    "https://www.linkedin.com/company/mfinancessrl",
    "https://www.google.com/maps/place/MFinances+%7C+Expert-Comptable/@50.7977112,4.3255262,17z/data=!3m1!4b1!4m6!3m5!1s0x47c3c5d9d41dc777:0x4287de38397fa316!8m2!3d50.7977112!4d4.3255262!16s%2Fg%2F11m__cnb4_",
    "https://www.instagram.com/mfinances_expertcomptable/",
    "https://www.facebook.com/people/Mfinances/61575798073143/"
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

export const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://mfinances.be/a-propos/#webpage",
  "url": "https://mfinances.be/a-propos/",
  "name": "À propos de MFINANCES",
  "inLanguage": "fr-BE",
  "about": { "@id": "https://mfinances.be/#organization" },
  "mainEntity": { "@id": "https://mfinances.be/a-propos/#mika-musungayi" },
};

export const organisationPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mfinances.be/notre-organisation/#webpage",
  "url": "https://mfinances.be/notre-organisation/",
  "name": "Notre organisation | MFINANCES",
  "inLanguage": "fr-BE",
  "about": { "@id": "https://mfinances.be/#organization" },
  "mentions": [
    {
      "@type": "Organization",
      "name": "MSL ANALYTICA",
      "description": "Société liée à MFINANCES intervenant dans le soutien administratif, le traitement documentaire et les processus Odoo Finances.",
    },
    {
      "@type": "Organization",
      "name": "MSL-iTECH",
      "description": "Société liée à MFINANCES spécialisée dans l'intégration, l'automatisation et le développement sous Odoo.",
    },
  ],
};

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

