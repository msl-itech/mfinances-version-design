import { Helmet } from "react-helmet-async";
import { toAbsoluteUrl } from "@/lib/absolute-url";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaJson?: object | object[];
  ogType?: "website" | "article";
}

const DEFAULT_OG_IMAGE = "https://mfinances.be/og-default.webp";

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
  schemaJson,
  ogType = "website",
}: SEOHeadProps) {
  const image = toAbsoluteUrl(ogImage || DEFAULT_OG_IMAGE);
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
    // defer={false} : balises écrites immédiatement, sans attendre requestAnimationFrame.
    // Indispensable au pré-rendu : dans un onglet de navigateur en arrière-plan,
    // requestAnimationFrame est suspendu et le <head> restait celui de l'accueil.
    <Helmet defer={false}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
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
