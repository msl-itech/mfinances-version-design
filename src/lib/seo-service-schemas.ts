/**
 * JSON-LD — schémas Service (pages /services/*) et OfferCatalog (/tarifs/).
 * Service.provider référence l'entité #organization (AccountingService).
 * OfferCatalog : pas de `provider` (non valide sur ce type). Chaque Offer porte
 * `seller` (l'organisation) ET `itemOffered` (le Service concret vendu).
 * NB validation : Service et OfferCatalog ne sont PAS des "résultats enrichis"
 * Google → contrôle via le Schema Markup Validator (validator.schema.org),
 * pas via le Rich Results Test. Bénéfice = compréhension (Google + GEO).
 */

const ORG_REF = { "@id": "https://mfinances.be/#organization" };

const AREA_SERVED = [
  { "@type": "City", name: "Bruxelles" },
  { "@type": "City", name: "Uccle" },
  { "@type": "AdministrativeArea", name: "Région de Bruxelles-Capitale" },
];

export interface ServiceSchemaInput {
  name: string;
  serviceType: string;
  url: string;
  description: string;
}

export function createServiceSchema(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: input.url,
    provider: ORG_REF,
    areaServed: AREA_SERVED,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: input.url,
      servicePhone: { "@type": "ContactPoint", telephone: "+3228860550", contactType: "customer service" },
    },
  };
}

function offerService(serviceName: string) {
  return { "@type": "Service", name: serviceName, serviceType: "Expertise comptable", provider: ORG_REF };
}

function monthlyOffer(name: string, price: string, description: string, serviceName: string) {
  return {
    "@type": "Offer",
    name: `Forfait ${name}`,
    description,
    availability: "https://schema.org/InStock",
    seller: ORG_REF,
    itemOffered: offerService(serviceName),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
      unitCode: "MON",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
  };
}

function oneOffOffer(name: string, price: string, description: string, serviceName: string) {
  return {
    "@type": "Offer",
    name,
    description,
    availability: "https://schema.org/InStock",
    seller: ORG_REF,
    itemOffered: offerService(serviceName),
    priceSpecification: {
      "@type": "PriceSpecification",
      price,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
    },
  };
}

function hourlyOffer(name: string, price: string, description: string, serviceName: string) {
  return {
    "@type": "Offer",
    name,
    description,
    availability: "https://schema.org/InStock",
    seller: ORG_REF,
    itemOffered: offerService(serviceName),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
      unitCode: "HUR",
    },
  };
}

/** OfferCatalog pour /tarifs/ (doit refléter les forfaits affichés sur la page). */
export const tarifsOfferCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Forfaits d'expertise comptable — MFinances",
  url: "https://mfinances.be/tarifs/",
  itemListElement: [
    monthlyOffer("Basic", "275", "Comptabilité + conformité", "Comptabilité et conformité pour TPE"),
    monthlyOffer("Essentiel", "350", "Basic + conseil fiscal + situations intermédiaires", "Comptabilité et conseil fiscal pour TPE"),
    monthlyOffer("Premium", "450", "Essentiel + contrôle de gestion trimestriel", "Comptabilité et contrôle de gestion pour TPE"),
    monthlyOffer("Excellence", "650", "Premium + trésorerie prévisionnelle mensuelle incluse", "Pilotage financier : trésorerie prévisionnelle"),
    oneOffOffer("Création d'entreprise", "800", "Plan financier, forme juridique et accompagnement à l'acte", "Accompagnement à la création d'entreprise"),
    hourlyOffer("DAF à temps partiel (option, clients Excellence)", "150", "Direction financière externalisée facturée au temps réellement presté, réservée aux clients du forfait Excellence", "DAF externalisé à temps partiel"),
  ],
};
