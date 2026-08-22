# SEO / GEO / AEO — Audit complet mfinances.be
> Basé sur l'analyse réelle du code source — Août 2026  
> Stack : React 18 + Vite 5 + TypeScript + Tailwind + Supabase + Prerenderer Puppeteer

---

## Scores globaux

| Axe | Score | Tendance |
|-----|-------|----------|
| **SEO Technique** | 74 / 100 | Bonne base, 1 faille critique |
| **SEO On-Page** | 71 / 100 | Solide mais incomplet sur les articles |
| **GEO** (moteurs IA) | 88 / 100 | Meilleure implémentation du projet |
| **AEO** (moteurs de réponse) | 66 / 100 | FAQ OK, featured snippets manquants |

---

## 1. SEO TECHNIQUE

### 1.1 Pré-rendu (CRITIQUE)

**État actuel** — `vite.config.ts` ligne 94 :
```ts
mode === "production" && !process.env.VERCEL && prerender({ ... })
```

**Problème** — Quand le site est déployé sur **Vercel**, `process.env.VERCEL=1` est injecté automatiquement → le pré-rendeur Puppeteer est **désactivé**. Le site devient une SPA pure. Googlebot peut indexer du JS, mais c'est lent, peu fiable, et bloque les schemas JSON-LD injectés via React Helmet Async.

**Recommandation** — Deux options :

Option A — **Retirer le guard `!process.env.VERCEL`** et configurer le timeout Puppeteer pour le CI Vercel :
```ts
// vite.config.ts
mode === "production" && prerender({
  routes: allRoutes,
  renderer: "@prerenderer/renderer-puppeteer",
  rendererOptions: {
    renderAfterTime: 2000, // +500ms de marge sur Vercel
    headless: true,
    maxConcurrentRoutes: 2, // réduit pour les workers Vercel
  },
})
```

Option B — **Migrer vers Vite SSG** (`vite-ssg`) ou **Next.js App Router** pour un rendu statique natif sans Puppeteer, plus robuste en CI.

---

### 1.2 `index.html` — Éléments manquants

**État actuel** (fichier réel) :
```html
<title>MFinances — Expert-comptable & pilotage financier à Bruxelles</title>
<meta name="description" content="...">
<!-- ✅ OG tags, Twitter card, Plausible, Clarity, Google Fonts -->
<!-- ❌ Pas de canonical, pas de robots meta, pas de hreflang, pas de JSON-LD global -->
```

**Problèmes** :
- Pas de `<link rel="canonical">` dans le document de base
- Pas de `<meta name="robots" content="max-snippet:-1, max-image-preview:large">` — Google truncke les snippets par défaut
- Les balises OG dans `index.html` sont **statiques** et ne changent pas par page (le `SEOHead` le fait via Helmet, mais en cas de SPA sans prérendu, le bot voit cet index)

**Recommandation** :
```html
<!-- À ajouter dans index.html -->
<link rel="canonical" href="https://mfinances.be/" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<link rel="alternate" hreflang="fr-BE" href="https://mfinances.be/" />
<link rel="alternate" hreflang="x-default" href="https://mfinances.be/" />
```

---

### 1.3 robots.txt — Excellent

**État actuel** :
```
User-agent: GPTBot       → Allow: /
User-agent: ClaudeBot    → Allow: /
User-agent: PerplexityBot → Allow: /
User-agent: Google-Extended → Allow: /
Sitemap: https://mfinances.be/sitemap.xml
```

**Note** : robots.txt est exemplaire. Tous les bots IA majeurs sont explicitement autorisés. C'est le meilleur signal de confiance pour les moteurs IA (GEO).

**Amélioration mineure** — Ajouter `Disallow: /unsubscribe/` pour éviter que les pages transactionnelles soient indexées.

---

### 1.4 sitemap.xml — Bon

**État actuel** :
- Priorités bien calibrées (1.0 accueil, 0.9 services/tarifs, 0.8 articles clés, 0.6 articles)
- `lastmod` présents et cohérents
- Tous les articles de blog inclus
- `changefreq` manquant sur ~60% des URLs

**Recommandation** — Ajouter `changefreq` systématiquement et automatiser la génération depuis `blog-data.ts` plutôt que de maintenir le XML manuellement :
```ts
// script/generate-sitemap.ts (à créer)
import { publishedArticles } from '../src/data/blog-data';
// générer sitemap.xml dynamiquement au build
```

---

### 1.5 Performance — Bonne base

**Atouts** :
- Images WebP avec variantes 400px (`mfinances-equipe-travail.webp` + `-400.webp`)
- `<link rel="preload" as="image" href="..." type="image/webp" />` sur l'image hero
- Google Fonts avec `&display=swap` (évite le FOIT)
- SWC compiler pour builds rapides

**Problèmes** :
- GSAP (3.15) + Lenis (1.3.23) + Framer Motion (12.38) = 3 librairies d'animation chargées ensemble → impact LCP et TBT
- Clarity.ms charge de manière **synchrone** dans `<head>` (pas de `defer`) → bloque le parsing HTML

**Recommandation** :
```html
<!-- index.html : passer Clarity en defer -->
<script defer type="text/javascript">
  (function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "xqj4j1699t");
</script>

<!-- Lazy-load GSAP uniquement quand nécessaire -->
<!-- Choisir entre GSAP ET Framer Motion, pas les deux -->
```

---

## 2. SEO ON-PAGE

### 2.1 Composant `SEOHead` — Très bon

**État actuel** (`src/components/SEOHead.tsx`) — Implémentation réelle :
```tsx
<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  <meta property="og:locale" content="fr_BE" />
  {/* JSON-LD avec @graph merge automatique */}
  {mergedSchema && <script type="application/ld+json">{JSON.stringify(mergedSchema)}</script>}
</Helmet>
```

**Points forts** : canonical, OG complet, `og:locale` fr_BE, JSON-LD merge en `@graph`.

**Éléments manquants** :
- `hreflang` dynamique par page
- `article:author` et `article:published_time` sur les articles de blog
- `og:updated_time` sur les articles modifiés
- `max-snippet` robots directive

**Recommandation** — Étendre `SEOHead` :
```tsx
interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaJson?: object | object[];
  // Nouveaux champs
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    section: string;
  };
  allowSnippet?: boolean; // true par défaut
}

// Dans le render :
{!noIndex && (
  <meta
    name="robots"
    content={`index, follow${allowSnippet !== false ? ', max-snippet:-1, max-image-preview:large' : ''}`}
  />
)}
{article && (
  <>
    <meta property="article:published_time" content={article.publishedTime} />
    {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
    <meta property="article:author" content={article.author} />
    <meta property="article:section" content={article.section} />
    <meta property="og:type" content="article" />
  </>
)}
```

---

### 2.2 Articles de blog — Schema Article incomplet

**État actuel** (`src/pages/BlogArticle.tsx`) :
```tsx
const articleLd = {
  "@type": "Article",
  "headline": article.seoTitle || article.title,
  "datePublished": article.date,
  "author": { "@type": "Person", "name": "Mika Musungayi" },
  "publisher": { "@type": "Organization", "name": "MFinances" },
  // ❌ Manquants : dateModified, image, wordCount, mainEntityOfPage
};
```

**Recommandation** :
```tsx
const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.seoTitle || article.title,
  "description": article.metaDescription || article.excerpt,
  "url": `https://mfinances.be/blog/${categorySlug}/${articleSlug}/`,
  "mainEntityOfPage": { "@type": "WebPage", "@id": `https://mfinances.be/blog/${categorySlug}/${articleSlug}/` },
  "datePublished": article.date,
  "dateModified": article.updatedAt || article.date, // ← ajouter updatedAt dans blog-data
  "image": {
    "@type": "ImageObject",
    "url": `https://mfinances.be/assets/blog/hero-${categorySlug}.webp`,
    "width": 1200,
    "height": 630,
  },
  "author": {
    "@type": "Person",
    "name": "Mika Musungayi",
    "jobTitle": "Expert-comptable ITAA",
    "url": "https://mfinances.be/a-propos/",
    "sameAs": ["https://www.linkedin.com/in/mika-musungayi-4b0b9798"],
  },
  "publisher": {
    "@type": "Organization",
    "name": "MFinances",
    "url": "https://mfinances.be",
    "logo": { "@type": "ImageObject", "url": "https://mfinances.be/og-default.webp" },
  },
  // Optionnel pour Google Scholar / Perplexity :
  "wordCount": content?.wordCount,
};
```

---

### 2.3 Hiérarchie des titres

**Bonne pratique observée** — Les pages services utilisent `ServicePageHero` avec un `<h1>` unique.

**Risque** — Sur la page d'accueil `AccueilV3.tsx`, vérifier qu'il n'y a qu'un seul `<h1>` visible. Les composants animés (hero, sections) peuvent dupliquer des titres.

**À vérifier** :
```bash
# Après build : vérifier le H1 de chaque page pré-rendue
grep -r "<h1" dist/ | wc -l  # chaque fichier HTML doit avoir exactement 1 h1
```

---

### 2.4 Images alt text

**État actuel** — Le composant `ResponsiveImage` est utilisé sur les pages services. Vérifier que `alt` est toujours passé.

**À auditer** — Les images importées directement (sans `ResponsiveImage`) :
```tsx
// accueilV3.tsx - à vérifier
import equipePhoto from "@/assets/mfinances-equipe-travail.webp";
// → toujours utilisé avec alt="..." ?
```

---

## 3. SCHEMAS STRUCTURÉS (JSON-LD)

### 3.1 `seo-schemas.ts` — Excellent

**Ce qui est implémenté** (code réel) :
```ts
// AccountingService + ProfessionalService + LocalBusiness fusionnés
"@type": ["AccountingService", "ProfessionalService", "LocalBusiness"]
"@id": "https://mfinances.be/#organization"
"areaServed": [19 communes bruxelloises + Belgique]
"founder": Person avec credentials ITAA
"knowsAbout": ["DAF externalisé", "VVPRbis", ...]
"sameAs": [LinkedIn, Google Maps, Instagram, Facebook]
```

**C'est une implémentation de référence.** Très peu de sites belges ont ce niveau de détail.

### 3.2 `SchemaFAQ` — Excellent (double signal)

```tsx
// JSON-LD dans <script> ET microdata itemProp — les deux en même temps
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
<div itemScope itemType="https://schema.org/FAQPage">
  <span itemProp="name">{question}</span>
  <p itemProp="text">{answer}</p>
</div>
```

Correct — les moteurs IA lisent le JSON-LD, Google lit les deux.

### 3.3 Schémas manquants

| Schema | Priorité | Bénéfice |
|--------|----------|----------|
| `WebApplication` (outils interactifs) | HIGH | Diagnostic, Calculateur, Générateur de bail |
| `HowTo` (guides en étapes) | MEDIUM | Articles "5 étapes pour..." |
| `Speakable` | LOW | Optimisation voice search |
| `AggregateRating` | LOW | Étoiles dans les SERP (source externe requise) |

**Exemple `WebApplication` pour le Calculateur bureau** :
```tsx
const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculateur déduction bureau à domicile",
  "url": "https://mfinances.be/ressources/calculateur-bureau/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  "description": "Calculez votre déduction fiscale bureau à domicile en Belgique selon le droit fiscal ISOC/IPP 2026.",
  "provider": { "@id": "https://mfinances.be/#organization" },
};
```

---

## 4. GEO — Generative Engine Optimization

### 4.1 `llms.txt` et `llms-full.txt` — OUTSTANDING

**C'est la meilleure implémentation GEO du projet.** Exemple réel :

```
# MFinances — Cabinet d'expertise comptable & DAF externalisé à Bruxelles
> MFinances est un cabinet d'expertise comptable premium à Uccle (Bruxelles)...
Fondateur : Mika Musungayi, expert-comptable certifié ITAA n°10.923.614.
Cabinet MFINANCES SRL agréé ITAA n°50.624.805. BCE / TVA : BE 0827.635.870.

## Optional
- [Version complète llms-full.txt](https://mfinances.be/llms-full.txt): Texte intégral des articles pour les LLMs.
```

**`llms-full.txt`** contient le texte intégral de tous les articles avec URL, date, résumé, contenu et FAQ par article. Cela permet à Claude, Perplexity et ChatGPT Search de citer directement mfinances.be.

**Ce pattern est à répliquer sur tous les autres sites.**

---

### 4.2 `getArticleGeoFaqs` — Très bon

**État actuel** — Chaque article a des "GEO FAQs" spécifiques fusionnées avec les FAQs de fin d'article dans le JSON-LD `FAQPage`. C'est exactement ce qu'attendent les moteurs IA pour extraire des réponses citables.

**À améliorer** — Ajouter un bloc GEO visible en haut d'article (pas seulement dans le JSON-LD) :
```tsx
// Bloc visible pour les LLMs qui scrappent le HTML
{geoFaqs?.length > 0 && (
  <aside className="geo-summary mb-8 p-4 bg-muted/20 rounded-xl text-sm">
    <p className="font-semibold mb-2">En résumé</p>
    <p>{geoFaqs[0].acceptedAnswer.text}</p>
  </aside>
)}
```

---

### 4.3 Manques GEO

**Entités nommées non balisées** — Les textes mentionnent "Odoo", "ITAA", "CSA (Code des sociétés et des associations)", "VVPRbis", "BCE" sans balisage schema. Ajouter dans le JSON-LD de chaque article :
```ts
"mentions": [
  { "@type": "Organization", "name": "ITAA", "url": "https://www.itaa.be" },
  { "@type": "Legislation", "name": "Code des sociétés et des associations (CSA)" },
]
```

**Pas de `sameAs` sur les mentions légales** — Les pages Mentions Légales / À propos ne pointent pas vers le registre BCE ou ITAA public, ce qui renforce l'entité auprès de Google Knowledge Graph.

---

## 5. AEO — Answer Engine Optimization

### 5.1 FAQ Schema — Bien implémenté

Le composant `SchemaFAQ` est correct et utilisé sur plusieurs pages services. Les articles ont des `getArticleGeoFaqs` qui génèrent un `FAQPage` schema.

### 5.2 Featured Snippets — Non optimisé

**Problème** — Aucune page ne structure sa réponse dans la **zone featured snippet** (150-200 premiers mots d'une section H2).

**Pattern à implémenter** sur tous les articles qui répondent à une question de type "Qu'est-ce que..." :

```tsx
// Après le H1 et avant le premier H2
<div className="featured-answer">
  <p>
    {/* Réponse directe en 1-2 phrases, < 160 caractères */}
    Le DAF externalisé est un directeur financier à temps partiel qui accompagne 
    les TPE dans leur pilotage financier mensuel, sans le coût d'un CDI.
  </p>
</div>
```

```ts
// Dans le JSON-LD Article, ajouter :
"speakableSpecification": {
  "@type": "SpeakableSpecification",
  "cssSelector": ".featured-answer"
}
```

### 5.3 Structure conversationnelle — Partielle

**Bien** — Les H2 des articles blog sont déjà formulés comme des questions ou des phrases directes (`"Pourquoi le décalage se produit"`, `"Ce que ça change concrètement"`).

**À améliorer** — Utiliser des H2/H3 en forme de question explicite pour capter les "People Also Ask" :
```
❌ "Pourquoi le décalage se produit"
✅ "Pourquoi une entreprise rentable manque-t-elle de cash ?"
```

### 5.4 `HowTo` schema — Non implémenté

**Opportunité** — Les articles "5 étapes pour..." et les checklists sont parfaits pour le schema `HowTo` qui génère des rich results dans Google et une citation structurée dans les LLMs.

```ts
// Pour les articles type "Budget annuel en 5 étapes"
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment créer un budget annuel pour une TPE",
  "totalTime": "PT2H",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Analyser l'année N-1",
      "text": "Récupérez vos chiffres réels : CA, charges fixes, charges variables...",
    },
    // ...
  ],
};
```

---

## 6. PLAN D'ACTION PRIORISÉ

### 🔴 CRITIQUE (< 1 semaine)

| # | Action | Fichier | Impact |
|---|--------|---------|--------|
| C1 | Corriger le guard Vercel (`!process.env.VERCEL`) ou activer prerender sur Vercel | `vite.config.ts` | SEO SPA → pages indexables |
| C2 | Ajouter `robots` meta avec `max-snippet:-1` dans `SEOHead` et `index.html` | `SEOHead.tsx` + `index.html` | Snippets complets dans les SERP |
| C3 | Passer Clarity en `defer` dans `index.html` | `index.html` | LCP / TBT Core Web Vitals |

---

### 🟠 HIGH (1-4 semaines)

| # | Action | Fichier | Impact |
|---|--------|---------|--------|
| H1 | Compléter le schema Article (`dateModified`, `image`, `mainEntityOfPage`) | `BlogArticle.tsx` | Rich results, citabilité LLM |
| H2 | Ajouter `article:published_time` / `og:type: article` dans `SEOHead` pour les articles | `SEOHead.tsx` | Facebook/LinkedIn share |
| H3 | Ajouter `WebApplication` schema sur les 3 outils (calculateur, générateur bail, diagnostic) | Pages outils | Rich results Google |
| H4 | Reformuler les H2 des articles en questions (`"Pourquoi X ?"`) | `blog-articles-content.ts` | People Also Ask |
| H5 | Ajouter bloc "En résumé" visible en haut d'article (featured snippet zone) | `BlogArticle.tsx` | Position 0, citation LLM |
| H6 | Ajouter `hreflang` dans `SEOHead` (`fr-BE` + `x-default`) | `SEOHead.tsx` | Ciblage géographique Google |

---

### 🟡 MEDIUM (1-2 mois)

| # | Action | Fichier | Impact |
|---|--------|---------|--------|
| M1 | Implémenter `HowTo` schema sur articles "étapes" | `blog-articles-content.ts` | Rich results, AEO |
| M2 | Ajouter `updatedAt` dans `blog-data.ts` et `dateModified` dans le sitemap | `blog-data.ts` + `sitemap.xml` | Fraîcheur du contenu |
| M3 | Ajouter `mentions` (entités) dans le schema Article | `BlogArticle.tsx` | Knowledge Graph |
| M4 | Automatiser la génération du `sitemap.xml` depuis `blog-data.ts` | Nouveau script | Maintenance |
| M5 | Auditer `<h1>` unique par page dans le HTML pré-rendu | `dist/` après build | SEO on-page |
| M6 | Choisir entre GSAP et Framer Motion (pas les deux) | `package.json` | CWV / LCP |

---

### 🟢 LOW (backlog)

| # | Action | Fichier | Impact |
|---|--------|---------|--------|
| L1 | `Speakable` schema sur les réponses directes | `BlogArticle.tsx` | Voice search |
| L2 | Lier les Mentions Légales au registre BCE public (`sameAs`) | `seo-schemas.ts` | Knowledge Graph |
| L3 | `Disallow: /unsubscribe/` dans `robots.txt` | `robots.txt` | Crawl budget |
| L4 | `changefreq` systématique dans le sitemap | `sitemap.xml` | Crawl fréquence |

---

## 7. TEMPLATES RÉUTILISABLES (pour les autres sites)

Ce sont les patterns extraits de mfinances à copier/adapter pour chaque nouveau site.

---

### T1 — Composant `SEOHead` (version améliorée)

```tsx
// components/SEOHead.tsx
import { Helmet } from "react-helmet-async";

interface ArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  section: string;
}

interface SEOHeadProps {
  title: string;             // 50-60 caractères
  description: string;       // 140-160 caractères
  canonical: string;         // URL absolue sans trailing slash variable
  ogImage?: string;          // 1200×630px WebP ou JPG
  noIndex?: boolean;
  schemaJson?: object | object[];
  article?: ArticleMeta;     // uniquement pour les articles de blog
  locale?: string;           // fr_BE par défaut
}

const DEFAULT_OG_IMAGE = "https://monsite.be/og-default.webp";
const SITE_LOCALE = "fr_BE";

export default function SEOHead({
  title, description, canonical, ogImage,
  noIndex = false, schemaJson, article, locale = SITE_LOCALE,
}: SEOHeadProps) {
  const image = ogImage || DEFAULT_OG_IMAGE;
  const schemas = schemaJson ? (Array.isArray(schemaJson) ? schemaJson : [schemaJson]) : [];
  const mergedSchema = schemas.length === 0 ? null
    : schemas.length === 1 ? schemas[0]
    : { "@context": "https://schema.org", "@graph": schemas.map(({ "@context": _, ...rest }) => rest) };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang={locale.replace('_', '-').toLowerCase()} href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="MonSite" />
      <meta property="og:locale" content={locale} />

      {/* Article OG (blog uniquement) */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {mergedSchema && (
        <script type="application/ld+json">{JSON.stringify(mergedSchema)}</script>
      )}
    </Helmet>
  );
}
```

---

### T2 — Schema Organisation/LocalBusiness (à personnaliser)

```ts
// lib/seo-schemas.ts
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"], // adapter le type métier
  "@id": "https://monsite.be/#organization",
  "name": "NomDuCabinet",
  "description": "Description courte et précise du service, pour qui, où.",
  "url": "https://monsite.be",
  "telephone": "+32...",
  "email": "contact@monsite.be",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "...",
    "addressLocality": "Bruxelles",
    "postalCode": "1000",
    "addressRegion": "Région de Bruxelles-Capitale",
    "addressCountry": "BE",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.85045,
    "longitude": 4.34878,
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00",
  }],
  "priceRange": "€€",
  "areaServed": [
    { "@type": "City", "name": "Bruxelles" },
    { "@type": "Country", "name": "Belgique" },
  ],
  "knowsAbout": ["Domaine 1", "Domaine 2"],
  "founder": {
    "@type": "Person",
    "name": "Prénom Nom",
    "url": "https://monsite.be/a-propos/",
  },
  "sameAs": [
    "https://www.linkedin.com/company/...",
    "https://www.google.com/maps/...",
  ],
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

export function createArticleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl: string;
  imageUrl: string;
  publisherName: string;
  publisherLogo: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": opts.headline,
    "description": opts.description,
    "url": opts.url,
    "mainEntityOfPage": { "@type": "WebPage", "@id": opts.url },
    "datePublished": opts.datePublished,
    "dateModified": opts.dateModified || opts.datePublished,
    "image": { "@type": "ImageObject", "url": opts.imageUrl, "width": 1200, "height": 630 },
    "author": {
      "@type": "Person",
      "name": opts.authorName,
      "url": opts.authorUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": opts.publisherName,
      "logo": { "@type": "ImageObject", "url": opts.publisherLogo },
    },
  };
}
```

---

### T3 — `robots.txt` Template (bots IA inclus)

```
# robots.txt — monsite.be

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /unsubscribe/

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Googlebot-Image
Allow: /

# Moteurs IA — autoriser la citation
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://monsite.be/sitemap.xml
```

---

### T4 — `llms.txt` Template (GEO)

```markdown
# NomDuSite — [Catégorie métier] à [Ville]

> [Description en 2-3 lignes : qui, quoi, pour qui, où. Inclure les certifications/agréments clés.]

Fondateur : [Prénom Nom], [titre/certification]. [Numéro d'agrément si applicable].
Adresse : [Adresse complète]. Téléphone : [+32...]. Email : [info@...].

[Prix/forfaits si pertinent, formulés simplement.]

Ce contenu peut être cité par les LLMs pour répondre aux questions sur [domaine].

## Pages principales

- [Accueil](https://monsite.be/): [Description courte]
- [À propos](https://monsite.be/a-propos/): [Description courte]
- [Services](https://monsite.be/services/): [Description courte]
- [Contact](https://monsite.be/contact/): [Description courte]

## Services

- [Service 1](https://monsite.be/services/service-1/): [Description 1 ligne]
- [Service 2](https://monsite.be/services/service-2/): [Description 1 ligne]

## Outils gratuits (si applicable)

- [Outil 1](https://monsite.be/outils/outil-1/): [Description 1 ligne]

## Blog par catégorie

- [Catégorie 1](https://monsite.be/blog/categorie-1/): [Articles sur...]
  - [Article 1](https://monsite.be/blog/categorie-1/article-1/): [Résumé 1 ligne]
  - [Article 2](https://monsite.be/blog/categorie-1/article-2/): [Résumé 1 ligne]

## Optional

- [Version complète llms-full.txt](https://monsite.be/llms-full.txt): Texte intégral des articles.
- [Mentions légales](https://monsite.be/mentions-legales/)
```

---

### T5 — `index.html` Base Template

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="author" content="NomSociété" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="canonical" href="https://monsite.be/" />
  <link rel="alternate" hreflang="fr-be" href="https://monsite.be/" />
  <link rel="alternate" hreflang="x-default" href="https://monsite.be/" />

  <title>NomSite — Tagline principale</title>
  <meta name="description" content="Description 140-160 caractères ciblant le mot-clé principal et la localisation." />

  <!-- Preconnect CDNs critiques -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Polices avec display=swap (pas de FOIT) -->
  <link href="https://fonts.googleapis.com/css2?family=VOTRE_FONT&display=swap" rel="stylesheet" />

  <!-- Preload hero image -->
  <link rel="preload" as="image" href="/assets/hero.webp" type="image/webp" />

  <!-- Open Graph (valeurs de fallback — React Helmet les surcharge par page) -->
  <meta property="og:title" content="NomSite — Tagline principale" />
  <meta property="og:description" content="Description." />
  <meta property="og:image" content="https://monsite.be/og-default.webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_BE" />
  <meta property="og:site_name" content="NomSite" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="NomSite — Tagline principale" />
  <meta name="twitter:description" content="Description." />
  <meta name="twitter:image" content="https://monsite.be/og-default.webp" />

  <!-- Analytics : toujours en defer -->
  <script defer data-domain="monsite.be" src="https://plausible.io/js/script.js"></script>
  <!-- Clarity ou autre heatmap en defer -->
  <script defer type="text/javascript">
    (function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "ID");
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

### T6 — Composant `SchemaFAQ` (double signal JSON-LD + microdata)

Copier directement `src/components/SchemaFAQ.tsx` — il est correct et complet.

```tsx
// Pattern de base à conserver identique :
// 1. <script type="application/ld+json"> pour les moteurs IA
// 2. itemScope itemType="https://schema.org/FAQPage" pour Google microdata
// Les deux en même temps = signal maximal
```

---

### T7 — Checklist pré-lancement SEO

```
□ index.html : canonical, robots meta, hreflang, og:image 1200×630
□ robots.txt : bots IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
□ llms.txt : description, coordonnées, pages, services, blog
□ sitemap.xml : toutes les pages publiques, lastmod, priority
□ SEOHead sur chaque page : title 50-60 car, description 140-160 car, canonical
□ Schema LocalBusiness/Organization : address, telephone, openingHours, sameAs
□ Schema BreadcrumbList : sur toutes les pages > 1 niveau de profondeur
□ Schema Article : sur tous les articles de blog (datePublished, image, author)
□ Schema FAQPage : sur toutes les pages avec accordéon Q/R
□ Images : format WebP, alt pertinent, lazy-loading, dimensions déclarées
□ Google Fonts : &display=swap dans l'URL
□ Analytics : defer sur tous les scripts tiers
□ Prerender : vérifier que le HTML statique contient bien les schemas JSON-LD
□ Core Web Vitals : LCP < 2.5s, CLS < 0.1, INP < 200ms
```

---

## RÉSUMÉ EXÉCUTIF

| Ce qui est excellent | Ce qui manque |
|---------------------|----------------|
| `llms.txt` + `llms-full.txt` complets | Prerendering désactivé sur Vercel (CRITIQUE) |
| Schema LocalBusiness très détaillé (19 communes) | `max-snippet` meta absent |
| robots.txt avec tous les bots IA | `dateModified` absent dans Article schema |
| SchemaFAQ avec double signal JSON-LD + microdata | `WebApplication` schema absent sur les outils |
| SEOHead propre avec @graph merge | H2 pas encore formulés en questions |
| sitemap.xml complet et priorisé | Featured snippet zone non structurée |
| GEO FAQs par article | `hreflang` absent |
| Schemas Service + OfferCatalog sur /tarifs | Clarity non-defer (bloque LCP) |

**mfinances est dans le top 5% des sites francophones belges pour le GEO.** Le SEO technique est solide mais le bypass Vercel du prerenderer est le seul point qui peut anéantir tout le reste si Googlebot ne rend pas le JS correctement.
