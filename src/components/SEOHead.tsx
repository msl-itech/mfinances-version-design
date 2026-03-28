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
    </Helmet>
  );
}
