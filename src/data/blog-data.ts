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
    title: "Investir dans votre entreprise sans vider votre trésorerie — le guide pratique",
    excerpt: "Autofinancement, emprunt ou leasing ? Comment choisir le bon mode de financement pour préserver votre trésorerie. Guide pratique MFinances, Bruxelles.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-10-28",
    seoTitle: "Investir sans Fragiliser sa Trésorerie — Guide Pratique pour Dirigeants TPE",
    metaDescription: "Autofinancement, emprunt ou leasing ? Comment choisir le bon mode de financement pour préserver votre trésorerie. Guide pratique MFinances, Bruxelles.",
    pillarPage: "/services/tresorerie/",
  },
  {
    slug: "gestion-stocks-tresorerie",
    title: "Votre stock immobilise du cash — voici comment le libérer",
    excerpt: "Comment une mauvaise gestion des stocks immobilise des milliers d'euros de liquidités. Stratégies concrètes pour optimiser votre stock et libérer du cash.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-10-10",
    seoTitle: "Gestion des Stocks et Trésorerie — Libérez vos Liquidités Immobilisées",
    metaDescription: "Comment une mauvaise gestion des stocks immobilise des milliers d'euros de liquidités. Stratégies concrètes pour optimiser votre stock et libérer du cash.",
    pillarPage: "/services/tresorerie/",
  },
  {
    slug: "tresorerie-face-concurrence",
    title: "Un concurrent vous attaque sur les prix — comment protéger votre trésorerie sans vous brader",
    excerpt: "Un concurrent agressif attaque vos prix. Comment protéger votre trésorerie sans entrer dans une guerre des prix perdante ? Stratégies concrètes pour TPE.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-09-22",
    seoTitle: "Concurrence et Trésorerie — Comment Résister sans Brader vos Marges",
    metaDescription: "Un concurrent agressif attaque vos prix. Comment protéger votre trésorerie sans entrer dans une guerre des prix perdante ? Stratégies concrètes pour TPE.",
    pillarPage: "/services/tresorerie/",
  },
  {
    slug: "fidelisation-tresorerie",
    title: "Fidéliser vos clients — l'impact direct sur votre trésorerie que personne ne calcule",
    excerpt: "Un client fidèle coûte 5 fois moins cher qu'un nouveau client. Comment la fidélisation améliore directement votre trésorerie et stabilise vos flux financiers.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-09-05",
    seoTitle: "Fidélisation Client et Trésorerie — Le Lien que Personne ne Vous Explique",
    metaDescription: "Un client fidèle coûte 5 fois moins cher qu'un nouveau client. Comment la fidélisation améliore directement votre trésorerie et stabilise vos flux financiers.",
    pillarPage: "/services/tresorerie/",
  },
  {
    slug: "anticiper-flux-tresorerie",
    title: "Comment anticiper vos flux de trésorerie — et arrêter de subir vos finances",
    excerpt: "Tableau de trésorerie prévisionnel, scénarios financiers, outils Odoo — comment anticiper vos besoins financiers avant que les problèmes n'arrivent. MFinances, Bruxelles.",
    category: "Trésorerie",
    categorySlug: "tresorerie",
    published: true,
    date: "2025-08-18",
    seoTitle: "Comment Anticiper ses Flux de Trésorerie — Guide Pratique TPE Belgique",
    metaDescription: "Tableau de trésorerie prévisionnel, scénarios financiers, outils Odoo — comment anticiper vos besoins financiers avant que les problèmes n'arrivent. MFinances, Bruxelles.",
    pillarPage: "/services/tresorerie/",
  },
  // ── DAF EXTERNALISÉ (à venir) ──
  {
    slug: "daf-externalise-definition",
    title: "C'est quoi un DAF externalisé — définition et rôle pour une TPE",
    excerpt: "DAF externalisé : définition, rôle, différence avec l'expert-comptable. Pourquoi les TPE en croissance en ont besoin et comment ça fonctionne concrètement.",
    category: "DAF externalisé",
    categorySlug: "daf-externalise",
    published: true,
    date: "2026-03-20",
    seoTitle: "C'est quoi un DAF Externalisé — Définition et Rôle pour une TPE",
    metaDescription: "DAF externalisé : définition, rôle, différence avec l'expert-comptable. Pourquoi les TPE en croissance en ont besoin et comment ça fonctionne concrètement.",
    pillarPage: "/services/daf-externalise/",
  },
  {
    slug: "quand-faire-appel-daf",
    title: "Quand faire appel à un DAF externalisé ? Les 6 signaux qui ne trompent pas",
    excerpt: "6 signaux concrets qui indiquent qu'une TPE a besoin d'un DAF à temps partiel. Guide pratique pour dirigeants en croissance. MFinances, Bruxelles.",
    category: "DAF externalisé",
    categorySlug: "daf-externalise",
    published: true,
    date: "2026-03-15",
    seoTitle: "Quand Faire Appel à un DAF Externalisé ? Les 6 Signaux qui ne Trompent Pas",
    metaDescription: "6 signaux concrets qui indiquent qu'une TPE a besoin d'un DAF à temps partiel. Guide pratique pour dirigeants en croissance. MFinances, Bruxelles.",
    pillarPage: "/services/daf-externalise/",
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
