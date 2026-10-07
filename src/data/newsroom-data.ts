import financeConnectee530 from "@/assets/newsroom/DSC08530.webp";
import avatarMika from "@/assets/avatar-mika-96.webp";

export interface NewsroomArticle {
  slug: string;
  title: string; // balise title (<60)
  description: string; // meta (<160)
  h1: string;
  kicker: string;
  category: "Interventions" | "Réglementation & PEPPOL" | "Tribunes & Analyses" | "Événements & Tables Rondes" | "Communiqués";
  tags: string[];
  companies: string[];
  readingTime: string;
  eventDate: string; // ISO
  displayDate: string;
  featured?: boolean;
  coverImage: string;
  coverImageAlt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  location?: string;
  validated: boolean;
  lead: string;
  intro?: string[];
  summary: string[];
  keyQuote?: {
    text: string;
    author: string;
    role: string;
  };
  sections: {
    id: string;
    h2: string;
    paragraphs: string[];
    sectionQuote?: string;
    callout?: string;
  }[];
  definitions: { term: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const newsroomArticles: NewsroomArticle[] = [
  {
    slug: "mika-musungayi-finance-connectee-odoo",
    title: "Mika Musungayi : Odoo et pilotage financier à Marrakech",
    description:
      "À Finance Connectée 2026, Mika Musungayi (MFINANCES) explique comment faire de la comptabilité et d'Odoo un vrai outil de pilotage financier pour les PME.",
    h1: "À Marrakech, Mika Musungayi partage sa vision d'une finance au service du pilotage des entreprises",
    kicker: "Intervention Internationale · Finance Connectée 2026 · Marrakech",
    category: "Interventions",
    tags: ["Pilotage financier", "Odoo Finance", "Facturation électronique", "PME", "Gouvernance"],
    companies: ["MFINANCES", "MSL-iTECH"],
    readingTime: "5 min",
    eventDate: "2026-09-07",
    displayDate: "7 septembre 2026",
    featured: true,
    coverImage: financeConnectee530,
    coverImageAlt: "Mika Musungayi lors de son intervention à Finance Connectée, Marrakech 2026 — bannière MSL-iTECH visible en arrière-plan",
    author: {
      name: "Mika Musungayi",
      role: "Fondateur & Dirigeant de MFINANCES · Expert-Comptable certifié ITAA",
      avatar: avatarMika,
    },
    location: "Marrakech, Maroc",
    validated: true,
    lead:
      "Comment passer d'une comptabilité qui constate les résultats à une fonction financière qui aide les dirigeants à mieux anticiper et décider ? C'est autour de cette question que Mika Musungayi, expert-comptable et dirigeant de MFINANCES, est intervenu lors de Finance Connectée, organisé le 7 septembre 2026 à Marrakech, au Maroc.",
    intro: [
      "La gestion financière des entreprises ne se limite plus à enregistrer les opérations et à produire des états comptables. Pour les dirigeants, elle représente également un moyen de mieux comprendre leur activité, d'anticiper les difficultés et de prendre des décisions éclairées.",
      "C'est cette évolution du rôle de la fonction financière que Mika Musungayi a abordée lors de sa participation à Finance Connectée, un événement organisé par MSL-iTECH, autour des enjeux de la transformation numérique et de l'utilisation des outils de gestion, notamment Odoo.",
    ],
    summary: [
      "Mika Musungayi, dirigeant de MFINANCES, est intervenu à la conférence Finance Connectée le 7 septembre 2026 à Marrakech.",
      "La comptabilité explique le passé ; le pilotage financier prépare les décisions futures.",
      "Un logiciel de gestion ne garantit pas à lui seul une meilleure maîtrise financière : organisation, processus et équipes sont déterminants.",
      "La transformation financière doit tenir compte de la taille, de l'organisation et des objectifs propres à chaque entreprise.",
    ],
    keyQuote: {
      text: "La comptabilité nous explique très bien ce qui s'est passé, mais pas toujours pourquoi cela s'est passé.",
      author: "Mika Musungayi",
      role: "Fondateur de MFINANCES",
    },
    sections: [
      {
        id: "constat-pilotage",
        h2: "De la comptabilité à une véritable fonction de pilotage",
        paragraphs: [
          "Pour une entreprise en croissance, disposer d'informations comptables ne suffit pas toujours à comprendre ce qui se passe réellement dans son activité. Le dirigeant peut connaître son chiffre d'affaires ou ses charges, sans pour autant avoir une vision suffisamment précise de ses marges, de sa trésorerie ou de ses perspectives financières.",
          "Cette réflexion met en évidence un enjeu essentiel pour les petites et moyennes entreprises : faire évoluer leur gestion financière afin que les informations disponibles ne servent pas uniquement à constater les résultats passés, mais contribuent également à préparer les décisions futures.",
          "Cette approche est au cœur de la vision de MFINANCES, cabinet d'expertise comptable premium en Belgique, qui associe expertise comptable, Odoo Finance, contrôle de gestion et accompagnement en direction financière externalisée.",
        ],
        sectionQuote: "La comptabilité nous explique très bien ce qui s'est passé, mais pas toujours pourquoi cela s'est passé.",
      },
      {
        id: "odoo-outil",
        h2: "Odoo Finance : un outil au service de la visibilité financière",
        paragraphs: [
          "La démonstration d'Odoo lors de l'événement a permis d'aborder la place des outils numériques dans l'organisation financière des entreprises.",
          "MFINANCES utilise également Odoo en interne et accompagne des clients belges dans leur utilisation de cet environnement, notamment dans le cadre de leur transition vers la facturation électronique via PEPPOL.",
          "Mais l'utilisation d'un logiciel de gestion ne garantit pas, à elle seule, une meilleure maîtrise financière. Les bénéfices dépendent notamment de la qualité des données, de l'organisation des processus et de la capacité des équipes à exploiter les informations disponibles.",
          "L'enjeu est donc de faire d'Odoo un véritable outil de gestion et de pilotage, adapté aux besoins de l'entreprise et à son évolution.",
        ],
      },
      {
        id: "questions-terrain",
        h2: "Les préoccupations des entreprises face à la transformation numérique",
        paragraphs: [
          "Les échanges avec les participants ont notamment porté sur plusieurs questions concrètes : les coûts de mise en place, les délais de déploiement, l'adhésion des équipes et la reprise de l'historique des données.",
          "Ces préoccupations rappellent que la transformation numérique ne repose pas uniquement sur le choix d'un logiciel. Elle implique également une réflexion sur les méthodes de travail, les responsabilités et l'accompagnement des utilisateurs.",
          "Pour les dirigeants, l'objectif est de mettre en place des outils et des processus qui répondent aux réalités de leur activité, sans ajouter de complexité inutile à leur organisation.",
        ],
      },
      {
        id: "conclusion-croissance",
        h2: "Une vision de la finance tournée vers l'avenir",
        paragraphs: [
          "À travers cette intervention à Marrakech, Mika Musungayi a partagé une vision de la finance qui dépasse la seule production comptable : celle d'une fonction qui apporte aux dirigeants une meilleure compréhension de leur entreprise et des éléments utiles à leurs décisions.",
          "Cette vision rejoint l'accompagnement proposé par MFINANCES aux TPE et PME en croissance en Belgique, qui souhaitent disposer d'une information financière plus claire, mieux anticiper leur évolution et piloter leur activité avec davantage de confiance.",
          "La transformation financière n'est toutefois ni automatique ni identique pour toutes les entreprises. Elle doit tenir compte de leur taille, de leur organisation, de leurs outils et de leurs objectifs.",
          "Pour MFINANCES, l'enjeu est de faire de la finance un véritable partenaire de la croissance des entreprises.",
        ],
      },
    ],
    definitions: [
      {
        term: "Pilotage financier",
        text: "Méthode continue de suivi et d'anticipation reposant sur des indicateurs opérationnels (cash-burn, DSO, BFR, marge nette par projet) pour éclairer les décisions stratégiques du chef d'entreprise.",
      },
      {
        term: "Odoo Finance",
        text: "Ensemble des applications financières d'Odoo (comptabilité générale et analytique, facturation automatisée, réconciliation bancaire par intelligence artificielle, tableaux de bord).",
      },
      {
        term: "Facturation électronique PEPPOL",
        text: "Réseau européen sécurisé d'échange de factures sous format XML structuré (UBL). En Belgique, son usage est obligatoire pour l'ensemble des transactions B2B depuis le 1er janvier 2026.",
      },
      {
        term: "DAF Externalisé",
        text: "Mise à disposition flexible d'un Directeur Administratif et Financier de haut niveau quelques jours par mois pour structurer la stratégie financière d'une PME.",
      },
    ],
    faqs: [
      {
        q: "Quelle est la différence fondamentale entre comptabilité et pilotage financier ?",
        a: "La comptabilité a une finalité légale et fiscale : elle enregistre de manière exhaustive les opérations passées. Le pilotage financier a une finalité décisionnelle : il analyse les marges, projette la trésorerie à 12 semaines et aide le dirigeant à choisir les bons arbitrages avant d'engager des dépenses.",
      },
      {
        q: "L'implémentation d'Odoo Finance garantit-elle à elle seule une meilleure rentabilité ?",
        a: "Non. Le logiciel est un formidable accélérateur, mais le résultat dépend de la structuration des processus en amont, de la rigueur de saisie et de la capacité de la direction à interpréter les tableaux de bord mis en place.",
      },
      {
        q: "Comment MFINANCES accompagne-t-il les PME dans ce changement ?",
        a: "MFINANCES combine son statut d'Expert-Comptable certifié ITAA avec une expertise d'intégrateur de solutions de gestion. Nous configurons vos outils, formons vos équipes et assurons le suivi mensuel de vos performances financières.",
      },
    ],
  },
];
