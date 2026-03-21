export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  published: boolean;
  date: string;
  seoTitle?: string;
  metaDescription?: string;
  pillarPage?: string;
}

export interface BlogCategory {
  slug: string;
  label: string;
  description: string;
  href: string;
}

export const blogCategories: BlogCategory[] = [
  { slug: "tresorerie", label: "Trésorerie", description: "Maîtrisez vos flux de trésorerie et anticipez les tensions financières.", href: "/blog/tresorerie/" },
  { slug: "daf-externalise", label: "DAF externalisé", description: "Tout comprendre sur le rôle du directeur administratif et financier à temps partiel.", href: "/blog/daf-externalise/" },
  { slug: "controle-de-gestion", label: "Contrôle de gestion", description: "KPIs, budgets, analyse des écarts — pilotez votre entreprise avec méthode.", href: "/blog/controle-de-gestion/" },
  { slug: "fiscalite-belgique", label: "Fiscalité belge", description: "Optimisation fiscale, ISOC, dividendes, voiture de société — tout ce qu'un dirigeant belge doit savoir.", href: "/blog/fiscalite-belgique/" },
  { slug: "creation-societe", label: "Création d'entreprise", description: "SRL, plan financier, formalités — les clés pour créer votre société en Belgique.", href: "/blog/creation-societe/" },
];

export const blogArticles: BlogArticle[] = [
  // ── TRÉSORERIE (publiés) ──
  {
    slug: "tresorerie-vs-benefices",
    title: "Trésorerie vs bénéfices — pourquoi votre entreprise peut être rentable et à court de cash",
    excerpt: "Comprendre pourquoi une entreprise rentable peut manquer de cash. La distinction essentielle entre bénéfice et trésorerie expliquée avec des exemples concrets.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-11-15",
    seoTitle: "Trésorerie vs Bénéfices — Quelle Différence pour un Dirigeant de TPE ?",
    metaDescription: "Comprendre pourquoi une entreprise rentable peut manquer de cash. La distinction essentielle entre bénéfice et trésorerie expliquée avec des exemples concrets.",
    pillarPage: "/services/tresorerie/",
  },
  {
    slug: "investir-sans-fragiliser-tresorerie",
    title: "Investir sans mettre votre trésorerie en danger",
    excerpt: "Comment financer vos investissements sans asphyxier votre trésorerie — emprunt, leasing, fonds propres.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-10-28",
  },
  {
    slug: "gestion-stocks-tresorerie",
    title: "Gestion des stocks — libérez vos liquidités",
    excerpt: "Vos stocks immobilisent des liquidités. Apprenez à optimiser la rotation pour libérer du cash.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-10-10",
  },
  {
    slug: "tresorerie-face-concurrence",
    title: "SOS Trésorerie — garder le cap face à la concurrence",
    excerpt: "La concurrence met la pression sur vos marges. Comment protéger votre trésorerie dans un environnement compétitif.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-09-22",
  },
  {
    slug: "fidelisation-tresorerie",
    title: "Fidélisation — un pilier pour votre trésorerie",
    excerpt: "Un client fidèle paie plus vite, coûte moins cher à servir et stabilise vos flux de trésorerie.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-09-05",
  },
  {
    slug: "anticiper-flux-tresorerie",
    title: "L'anticipation — votre meilleure arme financière",
    excerpt: "Un prévisionnel de trésorerie vous donne 3 mois d'avance sur les problèmes. Voici comment le construire.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-08-18",
  },
  // ── DAF EXTERNALISÉ (à venir) ──
  {
    slug: "cest-quoi-un-daf-externalise",
    title: "C'est quoi un DAF externalisé — et en quoi c'est différent d'un expert-comptable ?",
    excerpt: "Le DAF externalisé ne remplace pas votre comptable — il complète votre équipe avec une vision stratégique.",
    category: "DAF externalisé",
    categorySlug: "daf-externalise",
    published: false,
    date: "2026-04-01",
  },
  {
    slug: "quand-faire-appel-daf-temps-partiel",
    title: "À quel moment faire appel à un DAF à temps partiel ?",
    excerpt: "Les signaux qui montrent que votre entreprise a besoin d'un regard financier stratégique.",
    category: "DAF externalisé",
    categorySlug: "daf-externalise",
    published: false,
    date: "2026-04-15",
  },
  {
    slug: "daf-externalise-vs-recrutement-interne",
    title: "DAF externalisé vs recrutement en interne — comparatif complet",
    excerpt: "Coût, flexibilité, expertise — quand choisir l'externalisation plutôt que l'embauche.",
    category: "DAF externalisé",
    categorySlug: "daf-externalise",
    published: false,
    date: "2026-05-01",
  },
  {
    slug: "5-decisions-daf-externalise",
    title: "Les 5 décisions où un DAF externalisé fait la différence",
    excerpt: "Investissement, pricing, financement, restructuration, cession — ces moments critiques où le DAF change la donne.",
    category: "DAF externalisé",
    categorySlug: "daf-externalise",
    published: false,
    date: "2026-05-15",
  },
  // ── CONTRÔLE DE GESTION (à venir) ──
  {
    slug: "controle-de-gestion-tpe",
    title: "C'est quoi le contrôle de gestion pour une TPE — et pourquoi ça change tout",
    excerpt: "Le contrôle de gestion n'est pas réservé aux grands groupes. Voici comment l'adapter à votre TPE.",
    category: "Contrôle de gestion",
    categorySlug: "controle-de-gestion",
    published: false,
    date: "2026-04-01",
  },
  {
    slug: "5-kpis-financiers-dirigeant-tpe",
    title: "Les 5 KPIs financiers que tout dirigeant de TPE doit surveiller",
    excerpt: "Marge brute, BFR, trésorerie nette, EBITDA, DSO — les indicateurs essentiels expliqués simplement.",
    category: "Contrôle de gestion",
    categorySlug: "controle-de-gestion",
    published: false,
    date: "2026-04-15",
  },
  {
    slug: "construire-budget-annuel-5-etapes",
    title: "Comment construire un budget annuel réaliste en 5 étapes",
    excerpt: "Un budget annuel n'est pas un exercice académique — c'est votre GPS financier.",
    category: "Contrôle de gestion",
    categorySlug: "controle-de-gestion",
    published: false,
    date: "2026-05-01",
  },
  {
    slug: "analyse-ecarts-resultats",
    title: "Analyse des écarts — comment lire et agir sur vos résultats",
    excerpt: "Budget vs réel : comment interpréter les écarts et prendre les bonnes décisions.",
    category: "Contrôle de gestion",
    categorySlug: "controle-de-gestion",
    published: false,
    date: "2026-05-15",
  },
  // ── FISCALITÉ BELGE (à venir) ──
  {
    slug: "vvprbis-dividendes-taux-reduit",
    title: "VVPRbis — comment distribuer des dividendes à taux réduit en Belgique",
    excerpt: "Le régime VVPRbis permet de distribuer des dividendes à 15 % au lieu de 30 %. Conditions et stratégie.",
    category: "Fiscalité belge",
    categorySlug: "fiscalite-belgique",
    published: false,
    date: "2026-04-01",
  },
  {
    slug: "reserve-de-liquidation-belgique",
    title: "Réserve de liquidation — le mécanisme fiscal que tout dirigeant belge devrait connaître",
    excerpt: "Constituez une réserve pour distribuer des dividendes à 5 % après 5 ans. Mode d'emploi.",
    category: "Fiscalité belge",
    categorySlug: "fiscalite-belgique",
    published: false,
    date: "2026-04-15",
  },
  {
    slug: "remuneration-dirigeant-salaire-dividendes",
    title: "Rémunération du dirigeant — salaire ou dividendes, quelle combinaison optimale ?",
    excerpt: "La répartition idéale entre salaire et dividendes dépend de votre situation. Analyse complète.",
    category: "Fiscalité belge",
    categorySlug: "fiscalite-belgique",
    published: false,
    date: "2026-05-01",
  },
  {
    slug: "voiture-societe-belgique-2026",
    title: "Voiture de société en Belgique — avantages, pièges et fiscalité en 2026",
    excerpt: "ATN, déductibilité, électrification — tout ce qui change pour les voitures de société en 2026.",
    category: "Fiscalité belge",
    categorySlug: "fiscalite-belgique",
    published: false,
    date: "2026-05-15",
  },
  {
    slug: "preparer-declaration-isoc",
    title: "Comment préparer sa déclaration ISOC sans mauvaise surprise",
    excerpt: "Charges déductibles, versements anticipés, délais — check-list pour votre déclaration ISOC.",
    category: "Fiscalité belge",
    categorySlug: "fiscalite-belgique",
    published: false,
    date: "2026-06-01",
  },
  // ── CRÉATION D'ENTREPRISE (à venir) ──
  {
    slug: "srl-ou-independant-personne-physique",
    title: "SRL ou indépendant en personne physique — comment choisir en Belgique",
    excerpt: "Fiscalité, responsabilité, cotisations sociales — les critères pour faire le bon choix.",
    category: "Création d'entreprise",
    categorySlug: "creation-societe",
    published: false,
    date: "2026-04-01",
  },
  {
    slug: "creer-srl-belgique-2026",
    title: "Les étapes pour créer une SRL en Belgique en 2026",
    excerpt: "De l'idée au numéro d'entreprise — toutes les étapes de la création d'une SRL.",
    category: "Création d'entreprise",
    categorySlug: "creation-societe",
    published: false,
    date: "2026-04-15",
  },
  {
    slug: "cout-creation-societe-belgique",
    title: "Combien coûte vraiment la création d'une société en Belgique",
    excerpt: "Notaire, plan financier, inscription BCE, TVA — le vrai budget à prévoir.",
    category: "Création d'entreprise",
    categorySlug: "creation-societe",
    published: false,
    date: "2026-05-01",
  },
  {
    slug: "plan-financier-obligatoire-belgique",
    title: "Plan financier obligatoire — ce que la loi exige et comment le construire",
    excerpt: "Le plan financier est obligatoire pour créer une SRL. Contenu, structure et bonnes pratiques.",
    category: "Création d'entreprise",
    categorySlug: "creation-societe",
    published: false,
    date: "2026-05-15",
  },
  {
    slug: "5-erreurs-creation-societe-belgique",
    title: "Les 5 erreurs à éviter lors de la création d'une société en Belgique",
    excerpt: "Sous-capitalisation, mauvais statut, oubli du plan financier — les pièges les plus fréquents.",
    category: "Création d'entreprise",
    categorySlug: "creation-societe",
    published: false,
    date: "2026-06-01",
  },
];

export function getArticlesByCategory(categorySlug: string) {
  return blogArticles.filter((a) => a.categorySlug === categorySlug);
}

export function getPublishedArticlesByCategory(categorySlug: string) {
  return blogArticles.filter((a) => a.categorySlug === categorySlug && a.published);
}

export function getArticleBySlug(categorySlug: string, articleSlug: string) {
  return blogArticles.find((a) => a.categorySlug === categorySlug && a.slug === articleSlug);
}
