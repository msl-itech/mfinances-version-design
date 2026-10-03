export interface NewsroomArticle {
  slug: string;
  title: string; // balise title (<60)
  description: string; // meta (<160)
  h1: string;
  kicker: string;
  category: string;
  tags: string[];
  companies: string[];
  readingTime: string;
  eventDate: string; // ISO
  /** Tant que les points [À COMPLÉTER] ne sont pas validés : noindex. */
  validated: boolean;
  lead: string;
  summary: string[];
  sections: { h2: string; paragraphs: string[] }[];
  definitions: { term: string; text: string }[];
  faqs: { q: string; a: string }[];
}

export const newsroomArticles: NewsroomArticle[] = [
  {
    slug: "mika-musungayi-finance-connectee-odoo",
    title: "Mika Musungayi : Odoo et pilotage financier à Marrakech",
    description:
      "À Finance Connectée 2026, Mika Musungayi (MFINANCES) explique comment faire de la comptabilité et d'Odoo un vrai outil de pilotage financier.",
    h1: "À Marrakech, Mika Musungayi partage sa vision d'une finance au service du pilotage des entreprises",
    kicker: "Intervention · Finance Connectée · 7 septembre 2026 · Marrakech",
    category: "Interventions",
    tags: ["Pilotage financier", "Odoo Finance", "Facturation électronique", "PME"],
    companies: ["MFINANCES", "MSL-iTECH"],
    readingTime: "4 min",
    eventDate: "2026-09-07",
    validated: false,
    lead:
      "Comment passer d'une comptabilité qui constate les résultats à une fonction financière qui aide les dirigeants à anticiper et à décider ? C'est autour de cette question que Mika Musungayi, dirigeant de MFINANCES, est intervenu lors de Finance Connectée.",
    summary: [
      "Mika Musungayi, dirigeant de MFINANCES, est intervenu à Finance Connectée, le 7 septembre 2026 à Marrakech.",
      "Son message : la comptabilité explique le passé ; le pilotage financier doit aider à préparer les décisions.",
      "Un logiciel comme Odoo ne suffit pas à lui seul : la qualité des données et l'organisation des processus font la différence.",
      "Les participants ont surtout interrogé les coûts, les délais, l'adhésion des équipes et la reprise de l'historique.",
    ],
    sections: [
      {
        h2: "De la comptabilité à une fonction de pilotage",
        paragraphs: [
          "La gestion financière ne se limite plus à enregistrer des opérations et à produire des états comptables. Pour un dirigeant, elle doit aussi permettre de comprendre l'activité, d'anticiper les difficultés et de décider en connaissance de cause.",
          "Dans une entreprise en croissance, connaître son chiffre d'affaires ou ses charges ne suffit pas toujours. Le dirigeant manque souvent d'une vision précise de ses marges, de sa trésorerie et de ses perspectives.",
          "Mika Musungayi a rappelé que la comptabilité explique très bien ce qui s'est passé, mais pas toujours pourquoi cela s'est passé.",
          "Pour les TPE et PME, l'enjeu est clair : faire en sorte que l'information financière ne serve plus seulement à constater les résultats passés, mais aussi à préparer les décisions futures. C'est le cœur de l'approche de MFINANCES.",
        ],
      },
      {
        h2: "Odoo Finance : un outil au service de la visibilité, pas une garantie",
        paragraphs: [
          "La démonstration d'Odoo présentée lors de l'événement a permis d'aborder la place des outils numériques dans l'organisation financière des entreprises.",
          "MFINANCES utilise Odoo en interne et accompagne des entreprises belges dans leur transition vers la facturation électronique via PEPPOL.",
          "Un logiciel de gestion ne garantit pas, à lui seul, une meilleure maîtrise financière. Les bénéfices dépendent de la qualité des données, de l'organisation des processus et de la capacité des équipes à exploiter l'information. L'enjeu est donc de faire d'Odoo un véritable outil de pilotage.",
        ],
      },
      {
        h2: "Coûts, délais, équipes, historique : les questions des dirigeants",
        paragraphs: [
          "Les échanges avec les participants ont porté sur quatre préoccupations concrètes : le coût de mise en place, les délais de déploiement, l'adhésion des équipes et la reprise de l'historique des données.",
          "Elles rappellent qu'une transformation numérique ne se résume pas au choix d'un logiciel. Elle engage aussi les méthodes de travail, les responsabilités et l'accompagnement des utilisateurs.",
        ],
      },
      {
        h2: "Une finance au service de la croissance",
        paragraphs: [
          "À Marrakech, Mika Musungayi a défendu une finance qui dépasse la production comptable : une fonction qui aide les dirigeants à mieux comprendre leur entreprise et à décider.",
          "Cette transformation n'est ni automatique ni identique pour toutes les entreprises. Elle dépend de leur taille, de leur organisation, de leurs outils et de leurs objectifs. Pour MFINANCES, l'enjeu reste le même : faire de la finance un véritable partenaire de la croissance.",
        ],
      },
    ],
    definitions: [
      { term: "Pilotage financier", text: "Suivi régulier d'indicateurs (marges, trésorerie, rentabilité, prévisions) pour anticiper et décider, au-delà de la seule production comptable." },
      { term: "Odoo Finance", text: "Ensemble des modules comptables et financiers du logiciel de gestion Odoo (comptabilité, facturation, rapprochement bancaire, rapports)." },
      { term: "Facturation électronique PEPPOL", text: "Échange de factures structurées entre entreprises via le réseau PEPPOL. En Belgique, la facture électronique structurée est obligatoire entre entreprises assujetties à la TVA depuis le 1er janvier 2026." },
    ],
    faqs: [
      { q: "Qu'est-ce qui distingue la comptabilité du pilotage financier ?", a: "La comptabilité enregistre et restitue ce qui s'est passé. Le pilotage financier exploite ces données pour comprendre les causes, suivre des indicateurs et préparer les décisions." },
      { q: "Installer Odoo suffit-il à mieux maîtriser ses finances ?", a: "Non. Le résultat dépend de la qualité des données, de l'organisation des processus et de l'appropriation par les équipes." },
      { q: "Quelles questions se poser avant de déployer un logiciel de gestion ?", a: "Le coût de mise en place, le délai de déploiement, l'adhésion des équipes et la reprise de l'historique des données." },
    ],
  },
];
