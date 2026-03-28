import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaJson?: object | object[];
}

const DEFAULT_OG_IMAGE = "https://mfinances.be/og-default.png";

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
  schemaJson,
}: SEOHeadProps) {
  const image = ogImage || DEFAULT_OG_IMAGE;
  const schemas = schemaJson
    ? Array.isArray(schemaJson)
      ? schemaJson
      : [schemaJson]
    : [];

  // Merge all schemas into a single @graph to avoid duplicate structured data warnings
  const mergedSchema = schemas.length > 0
    ? schemas.length === 1
      ? schemas[0]
      : { "@context": "https://schema.org", "@graph": schemas.map(({ "@context": _, ...rest }) => rest) }
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="MFinances" />
      <meta property="og:locale" content="fr_BE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema — single block */}
      {mergedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(mergedSchema)}
        </script>
      )}
    </Helmet>
  );
}
