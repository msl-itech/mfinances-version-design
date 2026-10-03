import mikaAssisImg from "@/assets/mika-assis-1.webp";
import financeConnectee530 from "@/assets/newsroom/DSC08530.webp";
import financeConnectee521 from "@/assets/newsroom/DSC08521.jpg";
import terminauxImg from "@/assets/about-story-terminaux.webp";
import atelierImg from "@/assets/notre-organisation-atelier.webp";
import reunionConseilImg from "@/assets/reunion-conseil.webp";
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
    coverImage: financeConnectee529,
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
  {
    slug: "obligation-peppol-2026-belgique-opportunite-tresorerie",
    title: "Obligation PEPPOL 2026 en Belgique : levier de trésorerie pour PME",
    description:
      "La facturation électronique PEPPOL est obligatoire en Belgique depuis le 1er janvier 2026. Découvrez comment transformer cette obligation en opportunité d'accélération du cash-flow.",
    h1: "Obligation PEPPOL 2026 en Belgique : comment transformer la contrainte réglementaire en levier de trésorerie",
    kicker: "Décryptage Réglementaire & Fiscal · Belgique 2026 · SPF Finances",
    category: "Réglementation & PEPPOL",
    tags: ["PEPPOL", "Facturation électronique", "SPF Finances", "Trésorerie B2B", "Odoo", "Conformité"],
    companies: ["MFINANCES", "SPF Finances", "OpenPEPPOL"],
    readingTime: "6 min",
    eventDate: "2026-08-20",
    displayDate: "20 août 2026",
    featured: false,
    coverImage: terminauxImg,
    coverImageAlt: "Écrans de contrôle et flux de facturation électronique PEPPOL",
    author: {
      name: "Mika Musungayi",
      role: "Fondateur & Dirigeant de MFINANCES · Expert-Comptable certifié ITAA",
      avatar: avatarMika,
    },
    location: "Bruxelles, Belgique",
    validated: true,
    lead:
      "Depuis le 1er janvier 2026, la facture PDF classique envoyée par email ne suffit plus : la Belgique impose la facture électronique structurée via le réseau PEPPOL pour toutes les transactions interentreprises (B2B). Si de nombreux dirigeants subissent cette réforme comme une contrainte administrative, les PME agiles y découvrent un levier inédit pour assainir leur trésorerie.",
    summary: [
      "L'obligation de facturation électronique structurée (UBL via PEPPOL) est entrée en vigueur le 1er janvier 2026 pour toutes les entreprises assujetties à la TVA en Belgique.",
      "Le simple envoi d'un PDF par messagerie n'a plus de valeur libératoire légale entre assujettis belges.",
      "Le gain opérationnel direct : réduction du délai moyen de paiement (DSO) de 12 à 18 jours grâce à l'intégration automatique dans les ERP clients.",
      "MFINANCES a certifié 100% de ses flux clients sur Odoo et PEPPOL dès le quatrième trimestre 2025.",
    ],
    keyQuote: {
      text: "Le dirigeant qui voit PEPPOL comme une corvée fiscale passe à côté du vrai bénéfice : diviser par trois ses litiges de facturation et encaisser son argent deux semaines plus vite.",
      author: "Mika Musungayi",
      role: "Expert-Comptable ITAA",
    },
    sections: [
      {
        id: "contexte-legal",
        h2: "Le cadre légal belge : fin du PDF et généralisation du format UBL",
        paragraphs: [
          "Votée pour moderniser l'économie et réduire le déficit TVA de l'État belge, la loi sur la facturation électronique généralisée impose un changement radical dans les habitudes des entreprises.",
          "Désormais, une facture n'est plus un document visuel que l'on lit sur un écran, mais un jeu de données XML standardisé circulant de serveur à serveur via des points d'accès sécurisés (Access Points PEPPOL).",
          "Les PME belges qui n'ont pas encore mis à jour leurs outils de facturation s'exposent non seulement à des sanctions fiscales du SPF Finances, mais surtout à des rejets de paiement de la part de leurs grands donneurs d'ordres.",
        ],
      },
      {
        id: "acceleration-cash",
        h2: "L'impact direct sur la trésorerie : le 'DSO' en chute libre",
        paragraphs: [
          "Le premier motif de retard de règlement dans le commerce interentreprises réside dans les litiges de forme : facture égarée, mauvais numéro de bon de commande, montant HT erroné ou coordonnées bancaires mal recopiées.",
          "Avec PEPPOL, la facture est ingérée instantanément dans le système comptable du client, vérifiée mathématiquement et programmée pour paiement sans intervention humaine de ressaisie.",
          "Sur les portefeuilles clients suivis par MFINANCES, le délai moyen de règlement (DSO) est passé de 47 jours à 31 jours dès le troisième mois d'automatisation des flux PEPPOL.",
        ],
        callout: "Une PME réalisant 2M€ de CA qui gagne 15 jours de délai de paiement libère immédiatement plus de 80.000€ de trésorerie disponible sur son compte courant.",
      },
      {
        id: "demarche-mfinances",
        h2: "Comment MFINANCES sécurise la transition de ses clients",
        paragraphs: [
          "Plutôt que de contraindre nos clients à souscrire des passerelles onéreuses tierces, MFINANCES active et calibre nativement la passerelle PEPPOL au sein d'Odoo Finance.",
          "Chaque client bénéficie d'un audit de ses fiches tiers (codes BCE, TVA intracommunautaires, identifiants de routage) pour garantir un taux de succès d'émission de 100%.",
          "Nous formons également les équipes administratives à la supervision des statuts d'accusé de réception (MLR - Message Level Response), transformant l'administration des ventes en un pôle d'efficacité.",
        ],
      },
    ],
    definitions: [
      {
        term: "Réseau PEPPOL (Pan-European Public Procurement On-Line)",
        text: "Réseau informatique sécurisé international permettant aux entreprises et administrations publiques d'échanger des documents électroniques normalisés (factures, bons de commande, bordereaux de livraison).",
      },
      {
        term: "Format UBL (Universal Business Language)",
        text: "Norme internationale de syntaxe XML qui structure les informations d'une facture sous forme de balises exploitables directement par les algorithmes comptables.",
      },
      {
        term: "DSO (Days Sales Outstanding)",
        text: "Indicateur financier mesurant le nombre moyen de jours nécessaires à une entreprise pour recouvrer ses créances auprès de ses clients après émission de la facture.",
      },
    ],
    faqs: [
      {
        q: "Puis-je encore envoyer des factures papier ou PDF par email à mes clients professionnels belges ?",
        a: "Non. Pour toute transaction entre deux assujettis belges à la TVA, seule la facture électronique structurée conforme aux normes européennes et transmise via le réseau PEPPOL est légalement valable depuis le 1er janvier 2026.",
      },
      {
        q: "Que se passe-t-il si mon client refuse de recevoir la facture via PEPPOL ?",
        a: "L'obligation légale s'applique à tous les assujettis belges. Un client ne peut pas légalement exiger un simple PDF s'il est assujetti. Les logiciels homologués permettent d'adresser des relances automatiques mentionnant le cadre réglementaire officiel.",
      },
      {
        q: "Combien de temps prend la mise en conformité de notre entreprise ?",
        a: "Avec l'accompagnement de MFINANCES et l'environnement Odoo, la configuration technique et le test d'émission-réception s'effectuent généralement en moins de 48 heures ouvrées.",
      },
    ],
  },
  {
    slug: "du-bilan-annuel-au-cockpit-temps-reel-daf-externalise",
    title: "Du bilan annuel au cockpit financier temps réel : Tribune MFINANCES",
    description:
      "Pourquoi le modèle du cabinet comptable traditionnel vit sa dernière décennie. Tribune de Mika Musungayi sur l'essor de la direction financière externalisée.",
    h1: "Du bilan annuel au cockpit temps réel : pourquoi le modèle du cabinet comptable traditionnel vit sa dernière décennie",
    kicker: "Tribune Dirigeants · Prospective & Croissance PME",
    category: "Tribunes & Analyses",
    tags: ["DAF Externalisé", "Contrôle de gestion", "ERP Finance", "Stratégie PME", "ITAA", "Prospective"],
    companies: ["MFINANCES", "ITAA"],
    readingTime: "5 min",
    eventDate: "2026-07-15",
    displayDate: "15 juillet 2026",
    featured: false,
    coverImage: atelierImg,
    coverImageAlt: "Atelier de modélisation financière et analyse de marge MFINANCES",
    author: {
      name: "Mika Musungayi",
      role: "Fondateur & Dirigeant de MFINANCES · Expert-Comptable certifié ITAA",
      avatar: avatarMika,
    },
    location: "Uccle, Bruxelles",
    validated: true,
    lead:
      "Le dirigeant qui découvre sa marge réelle au mois de mai de l'année suivante joue à la roulette russe avec l'avenir de son entreprise. Dans cette tribune sans complaisance, Mika Musungayi décortique la mutation profonde de l'expertise comptable : la fin de l'encodage manuel au profit du pilotage de bord temps réel.",
    summary: [
      "La valeur ajoutée d'un cabinet ne réside plus dans la saisie des factures — aujourd'hui automatisée par l'OCR et l'IA —, mais dans l'intelligence stratégique apportée au dirigeant.",
      "Le modèle du rendez-vous unique de bilan annuel est obsolète pour piloter une entreprise en phase de recrutement ou d'expansion.",
      "Le concept de DAF externalisé (Directeur Financier à temps partagé) démocratise des compétences financières d'élite autrefois réservées aux multinationales.",
      "MFINANCES propose à chaque client un comité de pilotage mensuel rythmé par des alertes de gestion opérationnelles.",
    ],
    keyQuote: {
      text: "Un expert-comptable qui se contente de calculer vos impôts fait la moitié de son travail. Son rôle premier est de vous aider à créer de la valeur et à protéger votre patrimoine.",
      author: "Mika Musungayi",
      role: "Dirigeant de MFINANCES",
    },
    sections: [
      {
        id: "fin-saisie",
        h2: "La fin de la saisie manuelle : l'avènement du comptable stratège",
        paragraphs: [
          "Pendant un demi-siècle, la profession comptable a été rémunérée pour une tâche essentiellement mécanique : trier des reçus, encoder des lignes de débit-crédit et certifier des liasses fiscales.",
          "Avec l'intelligence artificielle générative, l'automatisation bancaire et PEPPOL, cette charge horaire s'effondre de 70%. C'est une excellente nouvelle pour les dirigeants éclairés, car elle force les cabinets à se repositionner sur ce qui compte vraiment : le conseil prospectif.",
          "Le dirigeant n'attend plus qu'on lui dise combien d'impôts des sociétés il doit verser à l'État ; il veut savoir s'il peut recruter deux ingénieurs sans fragiliser son solde de trésorerie à six mois.",
        ],
      },
      {
        id: "daf-partage",
        h2: "La direction financière externalisée : le chaînon manquant des PME",
        paragraphs: [
          "Une entreprise générant entre 1 et 10 millions d'euros de chiffre d'affaires n'a généralement pas les moyens d'embaucher un Directeur Financier expérimenté à 140.000€ par an.",
          "Pourtant, c'est précisément à ce stade de maturité que les questions financières deviennent critiques : renégociation des lignes de crédit bancaire, modélisation des marges par chantier ou par client, valorisation de parts sociales, préparation d'une croissance externe.",
          "En consacrant une demi-journée ou deux jours par mois à l'entreprise, le DAF externalisé apporte cette hauteur de vue stratégique avec une rentabilité immédiate pour l'actionnaire.",
        ],
        callout: "95% de nos clients ayant adopté un rythme de comité de pilotage mensuel ont réduit leur besoin en fonds de roulement dès le premier exercice.",
      },
      {
        id: "vision-mfinances",
        h2: "La méthodologie MFINANCES : clarté, rigueur et sérénité",
        paragraphs: [
          "Chez MFINANCES, nous avons bâti notre organisation autour d'un principe cardinal : 'Pas de chiffre sans explication, pas d'explication sans plan d'action'.",
          "Chaque mois, nos clients reçoivent une synthèse graphique en une page : trésorerie nette prévisionnelle, point mort révisé, top 5 des créances en souffrance et marge opérationnelle.",
          "Le stress financier s'évanouit lorsque les règles du jeu sont claires et que les imprévus sont modélisés avant de survenir.",
        ],
      },
    ],
    definitions: [
      {
        term: "Point mort (Seuil de rentabilité)",
        text: "Niveau de chiffre d'affaires à partir duquel l'ensemble des charges fixes et variables de l'entreprise est couvert, c'est-à-dire le moment exact où le résultat d'exploitation devient positif.",
      },
      {
        term: "BFR (Besoin en Fonds de Roulement)",
        text: "Montant de capital nécessaire pour financer le décalage de trésorerie entre les décaissements (achats, salaires) et les encaissements clients.",
      },
    ],
    faqs: [
      {
        q: "Mon comptable actuel fait déjà mes bilans. Quel est l'intérêt d'un DAF externalisé ?",
        a: "Votre comptable enregistre le passé fiscal. Le DAF externalisé construit votre avenir financier : il analyse vos devis, simule vos investissements, négocie avec vos banquiers et optimise votre rémunération de dirigeant.",
      },
      {
        q: "Quel est le format d'intervention typique d'un DAF partagé ?",
        a: "Selon la complexité de l'activité, l'intervention varie d'une demi-journée mensuelle pour les structures légères à 2 à 4 jours par mois pour les PME en fort développement.",
      },
    ],
  },
  {
    slug: "table-ronde-bruxelles-bfr-remuneration-dirigeant-croissance",
    title: "Table ronde Dirigeants à Bruxelles : Maîtriser son BFR et sa rémunération",
    description:
      "Compte-rendu de la table ronde exclusive organisée au siège de MFINANCES à Uccle avec 15 dirigeants de PME en forte croissance.",
    h1: "Table ronde Dirigeants à Bruxelles : Maîtriser son BFR et sa rémunération en phase d'accélération",
    kicker: "Événement Exclusif · Cercle des Dirigeants · Uccle Bruxelles",
    category: "Événements & Tables Rondes",
    tags: ["BFR", "Rémunération dirigeant", "Dividendes VVPR-bis", "Table Ronde", "Bruxelles", "Gouvernance"],
    companies: ["MFINANCES", "Cercle des Entrepreneurs Belges"],
    readingTime: "4 min",
    eventDate: "2026-06-04",
    displayDate: "4 juin 2026",
    featured: false,
    coverImage: reunionConseilImg,
    coverImageAlt: "Table ronde de dirigeants et comités de direction chez MFINANCES à Bruxelles",
    author: {
      name: "Mika Musungayi",
      role: "Fondateur & Dirigeant de MFINANCES · Expert-Comptable certifié ITAA",
      avatar: avatarMika,
    },
    location: "Bruxelles (Uccle), Belgique",
    validated: true,
    lead:
      "Réunis à Uccle au siège de MFINANCES, une quinzaine de fondateurs et directeurs généraux ont confronté leurs expériences sur les écueils classiques du passage de 1 à 10 millions d'euros de chiffre d'affaires : l'asphyxie de trésorerie provoquée par la croissance du BFR et l'arbitrage fiscal optimal de la rémunération du chef d'entreprise.",
    summary: [
      "Quinze chefs d'entreprises bruxellois et wallons ont partagé leurs retours d'expérience lors d'une table ronde à huis clos.",
      "Le paradoxe de la croissance : doubler son chiffre d'affaires sans plan de financement adapté mène fréquemment à la rupture de trésorerie en raison du gonflement des stocks et des encours clients.",
      "Revue détaillée des dispositifs belges d'optimisation fiscale légale : régime VVPR-bis, réserves de liquidation, droits d'auteur, tantièmes et mise à disposition de bureau à domicile.",
      "Prochaine session annoncée pour l'automne 2026 sur le thème de la valorisation d'entreprise et de la transmission.",
    ],
    keyQuote: {
      text: "Le chiffre d'affaires est une vanité, le bénéfice net est une opinion, mais la trésorerie disponible sur votre compte en banque est la seule réalité qui paye vos équipes à la fin du mois.",
      author: "Mika Musungayi",
      role: "Expert-Comptable & Animateur de la table ronde",
    },
    sections: [
      {
        id: "paradoxe-croissance",
        h2: "Le piège de l'hypercroissance : pourquoi les entreprises rentables trébuchent",
        paragraphs: [
          "Tous les participants ont témoigné du même phénomène vertigineux : signer de gros contrats suscite l'enthousiasme, mais génère immédiatement une tension intenable sur la liquidité.",
          "Pour honorer les commandes, il faut approvisionner, payer les sous-traitants et recruter, alors que le client ne règlera sa facture qu'à 60 jours fin de mois. Si le BFR n'a pas été calibré et gagé par des lignes de crédit court terme (crédit de caisse, factoring, straight loans), l'entreprise se retrouve en cessation de paiement virtuelle malgré un carnet plein.",
          "Mika Musungayi a présenté la méthodologie du 'BFR normatif' qui permet d'anticiper au centime près le besoin de trésorerie pour chaque palier de 500.000€ de chiffre d'affaires additionnel.",
        ],
      },
      {
        id: "remuneration-dirigeant",
        h2: "Rémunération du dirigeant en Belgique : sortir du 'tout-salaire'",
        paragraphs: [
          "La Belgique demeurant l'un des pays où la pression fiscale et sociale sur les revenus du travail est la plus lourde, les dirigeants ont largement débattu des alternatives pérennes.",
          "Les spécialistes de MFINANCES ont détaillé l'articulation entre un traitement fixe raisonnable (respectant les seuils minimaux de déduction à l'impôt des sociétés) et un bouquet patrimonial équilibré : réserves de liquidation à taux réduit, dividendes VVPR-bis à 15%, et optimisation de l'immobilier d'entreprise.",
          "L'objectif n'est pas de contourner la règle, mais d'appliquer avec rigueur les dispositions prévues par le législateur pour encourager l'investissement et la prise de risque des entrepreneurs.",
        ],
      },
      {
        id: "prochaines-rencontres",
        h2: "Un espace d'échange pérenne pour les entrepreneurs",
        paragraphs: [
          "Face au succès de cette session, MFINANCES a officialisé la création du 'Cercle Dirigeants MFINANCES', un rendez-vous trimestriel confidentiel réunissant des dirigeants de PME pour croiser les regards et partager des solutions concrètes sans jargon.",
          "Les dirigeants intéressés sont invités à candidater pour la prochaine session dédiée aux stratégies de fusion-acquisition et transmission d'entreprises.",
        ],
      },
    ],
    definitions: [
      {
        term: "Régime VVPR-bis",
        text: "Mécanisme fiscal belge permettant aux PME éligibles de distribuer des dividendes soumis à un précompte mobilier réduit de 15% (au lieu de 30%) sous condition de détention d'actions nouvelles nominatives.",
      },
      {
        term: "Réserve de liquidation",
        text: "Dispositif permettant à une société d'affecter tout ou partie de son bénéfice comptable à un compte de réserve spécial moyennant une cotisation distincte de 10%, ouvrant droit à une distribution future à taux avantageux.",
      },
    ],
    faqs: [
      {
        q: "Comment participer aux prochaines tables rondes de MFINANCES ?",
        a: "Les sessions sont réservées aux fondateurs, gérants et administrateurs délégués de PME actives en Belgique. L'inscription s'effectue sur invitation ou sur demande auprès de notre secrétariat général via info@mfinances.be.",
      },
      {
        q: "Ces rencontres font-elles l'objet de démarches commerciales ?",
        a: "Non. Ces cercles sont conçus comme des tribunes de réflexion stratégique et de partage paritaire de bonnes pratiques de gestion.",
      },
    ],
  },
];
