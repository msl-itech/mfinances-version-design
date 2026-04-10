export interface ArticleSection {
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  ctaInline?: { text: string; link: string };
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleBody {
  sections: ArticleSection[];
  faq?: ArticleFaq[];
  ctaText?: string;
  ctaDescription?: string;
  ctaLink?: string;
  ctaLabel?: string;
  showCalculator?: boolean;
  showCockpit?: boolean;
  heroCta?: { text: string; link: string };
}

export const articleContent: Record<string, ArticleBody> = {
  "tresorerie-vs-benefices": {
    sections: [
      {
        heading: "Le paradoxe que personne ne vous explique",
        paragraphs: [
          "Vous avez clôturé le mois avec un bénéfice positif. Et pourtant, en fin de semaine, votre compte bancaire est dans le rouge.",
          "C'est le paradoxe le plus courant chez les dirigeants de TPE en croissance — et l'un des plus mal compris. Pas parce que vous êtes mauvais gestionnaire. Parce que bénéfice et trésorerie sont deux choses fondamentalement différentes, et qu'on ne vous l'a jamais expliqué clairement.",
        ],
      },
      {
        heading: "Définitions simples",
        paragraphs: [
          "Le bénéfice est un résultat comptable. C'est ce qui reste quand vous soustrayez toutes vos charges de tous vos revenus — sur une période donnée, selon les règles comptables. Il intègre des éléments qui ne correspondent pas à des flux d'argent réels — amortissements, provisions, produits et charges à recevoir ou à payer.",
          "La trésorerie est la réalité bancaire. C'est l'argent réellement disponible sur votre compte aujourd'hui pour payer vos fournisseurs, vos salariés, vos charges. Elle dépend uniquement des encaissements et décaissements réels — quand l'argent entre et quand il sort.",
        ],
      },
      {
        heading: "Pourquoi le décalage se produit",
        paragraphs: [
          "1. Les délais de paiement clients — Vous facturez 50 000 € en novembre. Votre client paie à 60 jours. L'argent arrive en janvier. Entre-temps, vous devez payer vos salariés, vos fournisseurs et vos charges fixes en décembre. Votre bénéfice de novembre est réel — votre trésorerie de décembre est tendue.",
          "2. Les investissements — Vous achetez une machine pour 30 000 €. Comptablement, cette machine est amortie sur 5 ans — soit 6 000 € de charge par an. Mais les 30 000 € sont sortis de votre compte le jour de l'achat. Votre bénéfice n'est impacté qu'à hauteur de 6 000 €. Votre trésorerie, elle, a pris 30 000 € d'un coup.",
          "3. La croissance elle-même — Paradoxalement, croître consomme de la trésorerie. Vous devez recruter, stocker, investir, avancer des frais — avant que les recettes supplémentaires n'arrivent. Plus vous grandissez vite, plus votre besoin en fonds de roulement augmente.",
        ],
      },
      {
        heading: "L'histoire de Thomas",
        paragraphs: [
          "Thomas dirige une société de services IT à Bruxelles. Ses résultats sont excellents — croissance de 40 % sur l'année, bénéfice en hausse. Et pourtant, en mars, il ne peut pas honorer une échéance fiscale.",
          "Le problème : deux gros clients paient à 90 jours. Thomas a facturé 180 000 € en décembre et janvier. L'argent n'arrive qu'en mars et avril. Entre-temps, il a recruté deux développeurs en janvier, payé ses charges sociales, ses loyers.",
          "Son bénéfice est là. Sa trésorerie, elle, a disparu. La solution n'était pas de moins facturer — c'était de mettre en place un prévisionnel de trésorerie qui anticipait ce décalage.",
        ],
      },
      {
        heading: "Ce que ça change concrètement pour vous",
        paragraphs: ["Voici comment cette distinction impacte vos décisions au quotidien :"],
        list: [
          "Avant de recruter, vous regardez l'impact sur votre trésorerie à 3 mois — pas seulement sur votre résultat annuel",
          "Avant d'investir, vous choisissez entre autofinancement et leasing en fonction de votre position de trésorerie",
          "Avant d'accepter un gros contrat, vous vérifiez que vous pouvez financer l'avance de trésorerie qu'il exige",
        ],
      },
    ],
    faq: [
      {
        question: "Pourquoi une entreprise rentable peut-elle faire faillite ?",
        answer: "Parce que la rentabilité ne paie pas les factures — la trésorerie le fait. Une entreprise rentable mais à court de cash ne peut pas honorer ses échéances immédiates. Si elle ne peut pas payer ses fournisseurs ou ses salariés, elle cesse d'activité — même si son bilan annuel sera positif.",
      },
      {
        question: "Quelle est la différence entre cash-flow et bénéfice ?",
        answer: "Le bénéfice est calculé selon les règles comptables — il intègre des éléments non monétaires comme les amortissements. Le cash-flow mesure uniquement les mouvements réels d'argent entrant et sortant. Une entreprise peut avoir un bénéfice positif et un cash-flow négatif.",
      },
      {
        question: "Comment suivre sa trésorerie simplement ?",
        answer: "La méthode la plus simple : un tableau avec deux colonnes — encaissements prévus et décaissements prévus — semaine par semaine sur 3 mois glissants. Mis à jour chaque semaine avec les données réelles. Pour une version automatisée, c'est ce que MFinances met en place dans Odoo.",
      },
    ],
    ctaText: "Besoin d'un accompagnement ?",
    ctaDescription: "Premier échange gratuit — nous analysons votre situation.",
    ctaLink: "/services/tresorerie/",
    ctaLabel: "Découvrir notre service trésorerie prévisionnelle",
  },
  "investir-sans-fragiliser-tresorerie": {
    sections: [
      {
        heading: "L'erreur que font 8 dirigeants sur 10",
        paragraphs: [
          "Investir comptant. Par principe. Par méfiance envers les banques. Par conviction que « ne rien devoir à personne » est une vertu de gestion. C'est une erreur financière — et elle peut transformer un bon investissement en menace existentielle pour votre trésorerie.",
        ],
      },
      {
        heading: "Pourquoi payer comptant fragilise",
        paragraphs: [
          "Imaginez : vous avez 80 000 € de trésorerie disponible. Vous investissez 60 000 € dans un équipement. Il vous reste 20 000 € — soit moins d'un mois de charges fixes. Un client qui tarde à payer, une panne imprévue, un mois de faible activité — et vous êtes en difficulté.",
        ],
      },
      {
        heading: "Les trois options et quand les utiliser",
        paragraphs: [
          "Autofinancement — À utiliser pour : les petits investissements (moins de 10-15 % de vos liquidités disponibles), les achats qui ne se financent pas autrement. À éviter si l'investissement représente une part importante de vos liquidités.",
          "Emprunt bancaire — À utiliser pour : les investissements importants à retour sur investissement prévisible. Condition : le ROI de l'investissement doit dépasser le coût du crédit. Votre trésorerie est préservée, vos mensualités sont prévisibles.",
          "Leasing — À utiliser pour : les équipements technologiques qui évoluent vite, les véhicules, les machines industrielles. Avantage fiscal : les loyers de leasing sont déductibles comme charges. Trésorerie préservée, flexibilité à l'issue du contrat.",
        ],
      },
      {
        heading: "La règle des 3 mois",
        paragraphs: [
          "Avant tout investissement : après cet investissement, est-ce que je dispose encore de 3 mois de charges fixes en trésorerie disponible ? Si la réponse est non — quel que soit le mode de financement — l'investissement doit être revu, reporté ou financé différemment.",
        ],
      },
    ],
    faq: [
      {
        question: "Vaut-il mieux emprunter ou autofinancer un investissement ?",
        answer: "Cela dépend de votre position de trésorerie. Si l'investissement représente plus de 15-20 % de vos liquidités disponibles, le financement externe préserve mieux votre trésorerie et votre capacité à faire face aux imprévus.",
      },
      {
        question: "Comment évaluer le retour sur investissement avant d'investir ?",
        answer: "Comparez les gains générés (économies de coût, revenus supplémentaires, gains de productivité) aux coûts totaux (prix d'achat ou loyers, maintenance, formation). Si le ROI annuel dépasse le coût du financement, l'investissement mérite d'être financé plutôt que de puiser dans la trésorerie.",
      },
    ],
    ctaText: "Besoin d'un accompagnement ?",
    ctaDescription: "Premier échange gratuit — nous analysons votre situation.",
    ctaLink: "/services/tresorerie/",
    ctaLabel: "Découvrir notre service trésorerie prévisionnelle",
  },
  "gestion-stocks-tresorerie": {
    sections: [
      {
        heading: "Le stock, c'est de l'argent qui dort",
        paragraphs: [
          "Du point de vue de la trésorerie, un produit en stock n'est pas une richesse — c'est de l'argent immobilisé. De l'argent que vous avez sorti de votre compte pour acheter des marchandises qui n'ont pas encore été vendues. Tant que ce produit n'est pas vendu, il ne génère pas de cash. Pire : il génère des coûts — stockage, assurance, obsolescence potentielle.",
        ],
      },
      {
        heading: "Les signaux d'alerte",
        paragraphs: ["Votre stock est un problème de trésorerie si :"],
        list: [
          "Votre taux de rotation est inférieur à ce que votre secteur exige",
          "Vous avez des références qui n'ont pas bougé depuis 3 mois",
          "Vos coûts de stockage représentent plus de 20 % de la valeur du stock",
          "Vous avez des ruptures sur les produits qui se vendent bien, et des excédents sur ceux qui se vendent mal",
        ],
      },
      {
        heading: "Trois stratégies pour libérer du cash",
        paragraphs: [
          "1. Identifier et liquider les stocks dormants — Faites l'inventaire de toutes les références qui n'ont pas bougé depuis 90 jours. Pour les libérer : promotions ciblées, vente en lot, déstockage auprès de revendeurs. L'objectif n'est pas de vendre à perte — c'est de transformer du stock mort en cash utilisable.",
          "2. Réduire les niveaux de stock sur les produits courants — Analysez votre consommation réelle sur les 6 derniers mois par référence. Calculez votre stock de sécurité réel (délai de réapprovisionnement × consommation moyenne). Souvent, les entreprises maintiennent 2 à 3 fois plus de stock que nécessaire par excès de prudence.",
          "3. Négocier des délais de livraison plus courts — Si votre fournisseur livre en 15 jours et que vous maintenez 30 jours de stock par sécurité, négocier des livraisons en 7 jours vous permet de diviser votre stock de sécurité par deux — et de libérer le cash correspondant.",
        ],
      },
      {
        heading: "La règle des 80/20 appliquée au stock",
        paragraphs: [
          "20 % des références génèrent 80 % du chiffre d'affaires. Ces références méritent un suivi serré. Les 80 % restants génèrent 20 % du CA — c'est là que se cache la majorité des liquidités immobilisées et que vous pouvez libérer le plus de cash avec le moins d'impact commercial.",
        ],
      },
    ],
    ctaText: "Besoin d'un accompagnement ?",
    ctaDescription: "Premier échange gratuit — nous analysons votre situation.",
    ctaLink: "/services/tresorerie/",
    ctaLabel: "Découvrir notre service trésorerie prévisionnelle",
  },
  "tresorerie-face-concurrence": {
    sections: [
      {
        heading: "Le réflexe qui coûte cher",
        paragraphs: [
          "Face à un concurrent qui baisse ses prix, le réflexe naturel est de s'aligner. C'est aussi le réflexe le plus dangereux pour votre trésorerie. Baisser ses prix de 10 % pour conserver un client peut transformer un client profitable en client déficitaire — et fragiliser votre trésorerie globale sans que vous le réalisiez.",
        ],
      },
      {
        heading: "Comprendre l'impact réel sur votre trésorerie",
        paragraphs: [
          "Si votre marge sur un produit est de 30 % et que vous baissez votre prix de 10 %, votre marge tombe à 22 % — une baisse de 27 % de votre rentabilité pour une baisse de prix de 10 %. Pour compenser cette perte de marge, vous devez augmenter votre volume de 36 %. C'est rarement ce qui se passe.",
        ],
      },
      {
        heading: "Trois alternatives à la guerre des prix",
        paragraphs: [
          "1. Creuser votre différenciation — Un client qui choisit uniquement sur le prix ira toujours chez le moins cher. Mais la plupart des clients choisissent sur la valeur perçue — qualité, fiabilité, service, relation. Identifiez ce que vous faites mieux que votre concurrent et rendez-le visible.",
          "2. Segmenter votre offre — Créez une offre d'entrée de gamme qui répond à la pression prix — sans dévaloriser votre offre principale. Vous gardez vos marges sur les clients qui valorisent la qualité, et vous limitez les pertes sur les clients les plus sensibles au prix.",
          "3. Renforcer la rétention avant de perdre des clients — Le coût d'acquisition d'un nouveau client est 5 à 7 fois supérieur au coût de rétention d'un client existant. Investir dans la relation client est souvent bien plus rentable que de baisser les prix pour attirer de nouveaux clients.",
        ],
      },
      {
        heading: "Ce que votre trésorerie vous dit",
        paragraphs: [
          "Une trésorerie prévisionnelle à jour vous permet de mesurer précisément l'impact d'une pression concurrentielle. Combien de clients devez-vous perdre avant que votre trésorerie soit menacée ? Quel volume supplémentaire devez-vous générer pour compenser une baisse de prix de 5 % ? Ces réponses changent complètement la nature de votre décision stratégique.",
        ],
      },
    ],
    ctaText: "Besoin d'un accompagnement ?",
    ctaDescription: "Premier échange gratuit — nous analysons votre situation.",
    ctaLink: "/services/tresorerie/",
    ctaLabel: "Découvrir notre service trésorerie prévisionnelle",
  },
  "fidelisation-tresorerie": {
    sections: [
      {
        heading: "Le lien invisible entre fidélisation et trésorerie",
        paragraphs: [
          "On parle de fidélisation en termes de satisfaction client, de réputation, de marketing. Rarement en termes de trésorerie. C'est une erreur. Un client fidèle a un impact direct et mesurable sur vos flux financiers.",
        ],
      },
      {
        heading: "La mécanique financière de la fidélisation",
        paragraphs: [
          "Coût d'acquisition vs coût de rétention — Acquérir un nouveau client coûte en moyenne 5 à 7 fois plus cher que de conserver un client existant. Pour une TPE, chaque euro investi en rétention génère un retour bien supérieur au même euro investi en acquisition.",
          "Prévisibilité des flux — Un portefeuille de clients fidèles génère des revenus prévisibles. Vous savez à l'avance que tel client commande chaque mois, paie sous 30 jours, pour un montant moyen de X euros. Cette prévisibilité est le fondement d'un prévisionnel de trésorerie fiable.",
          "Réduction du risque d'impayés — Les clients fidèles paient mieux et plus vite. Les impayés se concentrent massivement sur les nouveaux clients et les clients occasionnels.",
        ],
      },
      {
        heading: "Les actions à fort impact sur la trésorerie",
        paragraphs: [
          "Mettre en place des abonnements ou forfaits — Transformer des ventes ponctuelles en revenus récurrents est l'une des meilleures décisions financières qu'une TPE puisse prendre. Un forfait mensuel transforme votre trésorerie : vous savez exactement ce qui rentre chaque mois.",
          "Négocier des conditions de paiement favorables avec vos clients fidèles — Un client avec qui vous travaillez depuis 3 ans acceptera plus facilement de passer de 60 à 30 jours de paiement en échange d'une remise de fidélité de 2 %. Pour votre trésorerie, cette accélération des encaissements peut valoir bien plus que le coût de la remise.",
          "Identifier et protéger vos 20 % de clients qui génèrent 80 % de vos revenus — Ces clients sont le socle de votre trésorerie. Connaissez-les, soignez-les, anticipez leurs besoins. La perte d'un seul de ces clients peut créer une tension de trésorerie significative.",
        ],
      },
    ],
    ctaText: "Besoin d'un accompagnement ?",
    ctaDescription: "Premier échange gratuit — nous analysons votre situation.",
    ctaLink: "/services/tresorerie/",
    ctaLabel: "Découvrir notre service trésorerie prévisionnelle",
  },
  "anticiper-flux-tresorerie": {
    sections: [
      {
        heading: "Réactif ou proactif — deux façons de gérer sa trésorerie",
        paragraphs: [
          "Le dirigeant réactif découvre ses problèmes de trésorerie quand ils arrivent. Il jongle, il négocie des délais, il cherche des solutions en urgence. Le dirigeant proactif voit ses problèmes 3 mois à l'avance. Il a le temps de négocier, d'ajuster, de planifier. La différence tient à un seul outil : le prévisionnel de trésorerie.",
        ],
      },
      {
        heading: "Qu'est-ce qu'un prévisionnel de trésorerie ?",
        paragraphs: [
          "Un prévisionnel de trésorerie est un tableau qui projette, semaine par semaine ou mois par mois, l'ensemble de vos encaissements attendus et de vos décaissements prévus — sur 3 à 12 mois. Il part de vos données réelles : contrats signés, factures émises, charges fixes connues, échéances fiscales planifiées. Il est mis à jour régulièrement — idéalement chaque mois.",
        ],
      },
      {
        heading: "Les trois erreurs qui rendent le prévisionnel inutile",
        paragraphs: [
          "Erreur 1 — Le construire une fois et ne jamais le mettre à jour. Un prévisionnel statique est inutile après 6 semaines. La réalité diverge toujours des prévisions — l'intérêt est de mettre à jour régulièrement pour garder une vision précise des semaines à venir.",
          "Erreur 2 — N'inclure que les éléments certains. Un bon prévisionnel inclut aussi les éléments probables avec leur probabilité estimée. Un contrat à 80 % de chance d'être signé mérite d'apparaître — avec une note de probabilité.",
          "Erreur 3 — Ne pas modéliser les scénarios. Le prévisionnel de base montre le scénario central. Mais un bon prévisionnel inclut aussi un scénario pessimiste — que se passe-t-il si mon plus gros client paie avec 30 jours de retard ?",
        ],
      },
      {
        heading: "Les périodes critiques à anticiper en Belgique",
        paragraphs: ["Voici les moments de l'année où la trésorerie est sous pression :"],
        list: [
          "Janvier-mars : cotisations sociales des indépendants, acomptes d'impôt",
          "Avril-juin : TVA du premier trimestre, charges sociales, premières échéances fiscales",
          "Septembre-octobre : rentrée avec recrutements et investissements",
          "Décembre : treizième mois, primes, clôture comptable, pré-paiement TVA",
        ],
      },
      {
        heading: "Odoo comme outil d'anticipation",
        paragraphs: [
          "Intégré correctement, Odoo permet de synchroniser votre prévisionnel avec vos données réelles en temps quasi-réel. C'est l'approche que MFinances met en place pour ses clients Excellence — un prévisionnel actualisé chaque mois, discuté lors de la réunion de pilotage mensuelle.",
        ],
      },
    ],
    faq: [
      {
        question: "Comment créer un tableau de trésorerie prévisionnel ?",
        answer: "Listez toutes vos charges fixes mensuelles. Ajoutez les charges variables prévisibles. Projetez vos encaissements attendus en vous basant sur vos contrats en cours et votre historique. La différence entre encaissements et décaissements chaque mois donne votre solde prévisionnel. Mettez à jour chaque mois avec les données réelles.",
      },
      {
        question: "À quelle fréquence mettre à jour son prévisionnel ?",
        answer: "Idéalement chaque mois, avec les données réelles du mois écoulé. Pour les entreprises avec des flux importants, un suivi hebdomadaire est recommandé pour les 4 à 6 semaines à venir.",
      },
      {
        question: "Quels outils utiliser pour gérer sa trésorerie en Belgique ?",
        answer: "Pour une TPE débutante : un tableau Excel bien structuré suffit. Pour une TPE en croissance : un ERP comme Odoo permet une synchronisation automatique des données et une vision en temps réel.",
      },
    ],
    ctaText: "Besoin d'un accompagnement ?",
    ctaDescription: "Premier échange gratuit — nous analysons votre situation.",
    ctaLink: "/services/tresorerie/",
    ctaLabel: "Découvrir notre service trésorerie prévisionnelle",
  },
  "daf-externalise-definition": {
    sections: [
      {
        heading: "Définition simple en 3 phrases",
        paragraphs: [
          "Un DAF externalisé est un Directeur Administratif et Financier mis à disposition à temps partiel. Il assure le pilotage financier de votre entreprise — analyse des performances, aide à la décision, modélisation financière — sans les coûts d'un recrutement en interne. Il se situe à mi-chemin entre la finance et les opérations.",
        ],
      },
      {
        heading: "Ce que fait un DAF — et ce que ne fait pas un expert-comptable",
        paragraphs: [
          "L'expert-comptable produit, certifie et optimise vos chiffres. Le DAF les utilise pour vous aider à décider. L'un regarde le passé et le présent, l'autre regarde le présent et l'avenir.",
          "Concrètement, votre expert-comptable vous dit combien vous avez gagné le trimestre dernier. Votre DAF externalisé vous dit si vous pouvez recruter au trimestre prochain, si votre marge par client est suffisante, ou si votre mode de financement est le bon.",
          "Les deux sont complémentaires. Mais l'un ne remplace pas l'autre — et beaucoup de dirigeants de TPE font l'erreur de demander à leur comptable un rôle de DAF qu'il n'a ni le temps ni le mandat d'assumer.",
        ],
      },
      {
        heading: "Les 5 situations où un DAF externalisé fait la différence",
        paragraphs: [
          "1. Vous préparez un investissement important — Le DAF modélise l'impact sur votre trésorerie, compare les modes de financement et vous aide à prendre une décision éclairée. Sans lui, vous décidez au feeling.",
          "2. Vous négociez avec votre banque — Le DAF prépare le dossier, construit le prévisionnel, et vous accompagne dans la négociation. Il parle le même langage que votre banquier.",
          "3. Votre croissance accélère — Plus vous grandissez, plus la complexité financière augmente. Le DAF structure votre pilotage pour que la croissance ne devienne pas un piège de trésorerie.",
          "4. Vous devez restructurer vos coûts — Le DAF analyse vos marges par produit, par client, par canal. Il identifie ce qui est rentable et ce qui ne l'est pas — avec des données, pas des intuitions.",
          "5. Vous préparez une cession ou une levée de fonds — Le DAF structure vos chiffres pour les rendre lisibles par un investisseur ou un acquéreur. Il valorise votre entreprise et prépare la data room.",
        ],
      },
      {
        heading: "DAF externalisé vs DAF en interne — comparatif coût / bénéfice",
        paragraphs: [
          "Un DAF salarié en Belgique coûte entre 80 000 € et 120 000 € par an (charges comprises). Pour une TPE de 5 à 30 personnes, c'est rarement justifiable à temps plein.",
          "Un DAF externalisé intervient 1 à 4 jours par mois, pour un budget de 1 500 € à 4 000 € mensuels selon l'intensité de la mission. Vous accédez à la même expertise stratégique, sans le coût fixe d'un recrutement.",
          "L'autre avantage : le DAF externalisé a une vision multi-entreprises. Il a vu des dizaines de situations similaires à la vôtre. Cette expérience transversale est un atout que même un DAF salarié expérimenté n'a pas toujours.",
        ],
      },
      {
        heading: "Pour qui c'est pertinent — et pour qui ça ne l'est pas encore",
        paragraphs: [
          "Le DAF externalisé est pertinent si votre chiffre d'affaires dépasse 500 000 €, si vous avez des décisions d'investissement ou de financement à prendre, ou si votre croissance génère une complexité financière que vous ne maîtrisez plus seul.",
          "Il n'est pas encore nécessaire si vous êtes en phase de lancement, si votre structure de coûts est simple, ou si votre expert-comptable couvre déjà vos besoins de pilotage. Dans ce cas, un bon suivi de trésorerie mensuel suffit — et c'est exactement ce que MFinances propose dans ses forfaits.",
        ],
      },
    ],
    faq: [
      {
        question: "C'est quoi un DAF externalisé ?",
        answer: "Un DAF externalisé est un Directeur Administratif et Financier qui intervient à temps partiel dans votre entreprise. Il assure le pilotage financier stratégique — analyse de rentabilité, prévisionnel de trésorerie, aide à la décision d'investissement — sans les coûts d'un salarié à temps plein.",
      },
      {
        question: "Combien coûte un DAF externalisé en Belgique ?",
        answer: "Entre 1 500 € et 4 000 € par mois selon l'intensité de la mission (1 à 4 jours par mois). C'est 3 à 5 fois moins cher qu'un DAF salarié, pour une expertise équivalente adaptée à la taille de votre entreprise.",
      },
      {
        question: "Quelle différence entre DAF externalisé et expert-comptable ?",
        answer: "L'expert-comptable produit et certifie vos comptes — il regarde le passé. Le DAF externalisé utilise vos chiffres pour vous aider à décider — il regarde l'avenir. Les deux sont complémentaires, mais leurs missions sont fondamentalement différentes.",
      },
      {
        question: "Mon entreprise est-elle assez grande pour un DAF ?",
        answer: "Le DAF externalisé est pertinent dès que votre chiffre d'affaires dépasse 500 000 € ou que vous faites face à des décisions financières complexes (investissement, financement, restructuration). En dessous, un bon suivi de trésorerie mensuel avec votre expert-comptable suffit généralement.",
      },
    ],
    ctaText: "Besoin d'un DAF à temps partiel ?",
    ctaDescription: "Premier échange gratuit — nous évaluons vos besoins de pilotage financier.",
    ctaLink: "/services/daf-externalise/",
    ctaLabel: "Découvrir notre service DAF externalisé",
  },
  "quand-faire-appel-daf": {
    sections: [
      {
        paragraphs: [
          "Beaucoup de dirigeants de TPE sentent qu'ils ont besoin d'un regard financier plus stratégique — mais ne savent pas si c'est le bon moment. Voici les 6 signaux qui indiquent que votre entreprise est prête pour un DAF externalisé.",
        ],
      },
      {
        heading: "Signal 1 — Vous prenez des décisions d'investissement sans modélisation financière",
        paragraphs: [
          "Vous achetez du matériel, vous recrutez, vous ouvrez un nouveau point de vente — sur la base de votre intuition et de votre solde bancaire. Vous n'avez pas de projection financière qui vous montre l'impact à 6 ou 12 mois. Vous décidez au feeling — et parfois, ça coûte cher.",
        ],
      },
      {
        heading: "Signal 2 — Votre banquier vous pose des questions auxquelles vous ne savez pas répondre",
        paragraphs: [
          "Quel est votre EBITDA ? Votre ratio d'endettement ? Votre prévisionnel de trésorerie à 12 mois ? Si ces questions vous mettent mal à l'aise, c'est que vous n'avez pas les outils de pilotage qu'un DAF mettrait en place. Et votre banquier le sait.",
        ],
      },
      {
        heading: "Signal 3 — Votre trésorerie est tendue malgré une activité rentable",
        paragraphs: [
          "Vous êtes rentable sur le papier, mais votre compte en banque raconte une autre histoire. C'est le signe classique d'un décalage entre bénéfice et trésorerie — et c'est exactement le type de problème qu'un DAF résout en construisant un prévisionnel de trésorerie fiable.",
        ],
      },
      {
        heading: "Signal 4 — Vous envisagez un recrutement structurant sans avoir modélisé l'impact",
        paragraphs: [
          "Recruter un salarié à 3 500 € brut en Belgique coûte environ 5 500 € à 6 000 € charges comprises. Sur 12 mois, c'est 66 000 € à 72 000 € de trésorerie. Un DAF modélise cet impact, identifie le point mort du recrutement et vous dit à partir de quel mois ce salarié sera rentable.",
        ],
      },
      {
        heading: "Signal 5 — Vous préparez une levée de fonds ou un crédit important",
        paragraphs: [
          "Les investisseurs et les banques veulent des chiffres structurés : business plan financier, prévisionnel de trésorerie, analyse de rentabilité par activité. Un DAF externalisé construit ces documents et vous accompagne dans la négociation.",
        ],
      },
      {
        heading: "Signal 6 — Vous sentez que vos chiffres ne vous aident pas à décider",
        paragraphs: [
          "Vous recevez votre bilan annuel, vos déclarations TVA, vos situations intermédiaires — mais vous ne savez pas quoi en faire concrètement. Vos chiffres ne vous aident pas à prendre de meilleures décisions. C'est le signal le plus fréquent — et le plus sous-estimé.",
        ],
      },
      {
        heading: "Si vous vous reconnaissez dans au moins 2 de ces signaux",
        paragraphs: [
          "Il est probablement temps d'explorer ce qu'un DAF externalisé peut apporter à votre entreprise. Pas nécessairement un engagement lourd — souvent, 1 à 2 jours par mois suffisent pour structurer votre pilotage financier et prendre de meilleures décisions.",
        ],
      },
    ],
    ctaText: "Vous vous reconnaissez ?",
    ctaDescription: "Premier échange gratuit — nous évaluons ensemble vos besoins de pilotage financier.",
    ctaLink: "/services/daf-externalise/",
    ctaLabel: "Découvrir notre service DAF externalisé",
  },
  "daf-externalise-vs-expert-comptable": {
    sections: [
      {
        paragraphs: [
          "C'est la question que posent 9 dirigeants sur 10 quand on leur parle de DAF externalisé : « Mais mon expert-comptable ne fait pas déjà ça ? » La réponse est non — et comprendre cette différence peut transformer la façon dont vous pilotez votre entreprise.",
        ],
      },
      {
        heading: "Deux rôles fondamentalement différents",
        paragraphs: [
          "L'expert-comptable produit et certifie vos chiffres. Il s'assure que votre comptabilité est conforme, que vos déclarations fiscales sont correctes, que vos bilans sont fiables. C'est un rôle technique et réglementaire — indispensable et obligatoire.",
          "Le DAF externalisé utilise ces chiffres pour vous aider à décider. Il analyse vos performances, modélise des scénarios, construit des prévisionnels et vous accompagne dans vos décisions stratégiques. C'est un rôle stratégique et opérationnel — facultatif mais souvent décisif.",
        ],
      },
      {
        heading: "Comparatif détaillé",
        paragraphs: [],
        table: {
          headers: ["", "Expert-comptable", "DAF externalisé"],
          rows: [
            ["Rôle principal", "Produire et certifier les chiffres", "Analyser et aider à décider"],
            ["Horizon temporel", "Passé et présent", "Présent et futur"],
            ["Nature des interventions", "Technique et réglementaire", "Stratégique et opérationnel"],
            ["Fréquence", "Continue (comptabilité)", "Mensuelle + ad hoc"],
            ["Obligation légale", "Oui", "Non — choix stratégique"],
            ["Chez MFinances", "Inclus dans tous les forfaits", "Option Excellence — 150 € HTVA/h"],
          ],
        },
      },
      {
        heading: "Complémentaires, pas concurrents",
        paragraphs: [
          "L'expert-comptable fournit la matière première — des chiffres fiables. Le DAF la transforme en décisions. Sans comptabilité fiable, le DAF ne peut pas travailler. Sans DAF, les chiffres restent des constats sans plan d'action.",
          "C'est pourquoi chez MFinances, les deux rôles sont intégrés dans une même équipe. Votre comptable et votre DAF travaillent sur les mêmes données, dans le même outil (Odoo), avec une vision cohérente de votre entreprise.",
        ],
      },
      {
        heading: "Quand passer du comptable seul au binôme comptable + DAF ?",
        paragraphs: [
          "Tant que votre entreprise est simple — quelques clients, des charges fixes prévisibles, pas d'investissement majeur — votre expert-comptable suffit. Mais dès que la complexité augmente — croissance rapide, décisions d'investissement, besoin de financement, restructuration — le DAF devient un accélérateur de décisions.",
        ],
      },
    ],
    ctaText: "Besoin des deux ?",
    ctaDescription: "Chez MFinances, comptabilité et pilotage financier sont intégrés dans une même équipe.",
    ctaLink: "/services/daf-externalise/",
    ctaLabel: "Découvrir notre service DAF externalisé",
  },
  "decisions-daf-fait-difference": {
    sections: [
      {
        paragraphs: [
          "Un DAF externalisé n'est pas un luxe — c'est un accélérateur de décisions. Voici les 5 moments clés où sa présence change concrètement la trajectoire d'une TPE.",
        ],
      },
      {
        heading: "Décision 1 — Investissement majeur",
        paragraphs: [
          "Le DAF modélise l'impact sur la trésorerie, évalue le ROI, recommande le mode de financement optimal. Sans lui, vous décidez sur la base de votre solde bancaire et de votre intuition — avec le risque de fragiliser votre trésorerie pour un investissement qui ne sera rentable que dans 18 mois.",
        ],
      },
      {
        heading: "Décision 2 — Recrutement structurant",
        paragraphs: [
          "Le DAF calcule le coût total réel (salaire + charges + onboarding), l'impact sur le BFR, le délai de rentabilisation. Il vous dit à partir de quel mois ce salarié sera rentable — et si votre trésorerie peut absorber la montée en charge.",
        ],
      },
      {
        heading: "Décision 3 — Dossier bancaire ou levée de fonds",
        paragraphs: [
          "Le DAF construit le dossier financier, les projections, l'argumentation chiffrée. Il parle le même langage que votre banquier ou vos investisseurs — et il sait ce qu'ils regardent en premier.",
        ],
      },
      {
        heading: "Décision 4 — Restructuration ou réduction des coûts",
        paragraphs: [
          "Le DAF identifie les leviers sans compromettre la croissance, modélise les scénarios. Réduire les coûts sans vision financière, c'est couper dans le vif au hasard. Le DAF vous montre où couper — et où investir davantage.",
        ],
      },
      {
        heading: "Décision 5 — Stratégie de croissance",
        paragraphs: [
          "Le DAF traduit les ambitions en projections financières réalistes, identifie les contraintes de financement. Il transforme un objectif de croissance en plan d'action chiffré — avec les jalons, les risques et les besoins de financement associés.",
        ],
      },
    ],
    ctaText: "Vous faites face à l'une de ces décisions ?",
    ctaDescription: "Premier échange gratuit — nous évaluons ensemble votre situation.",
    ctaLink: "/services/daf-externalise/",
    ctaLabel: "Découvrir notre service DAF externalisé",
  },
  "controle-gestion-tpe-definition": {
    sections: [
      {
        heading: "Définition simple en 3 phrases",
        paragraphs: [
          "Le contrôle de gestion est un ensemble d'outils et de pratiques qui permettent au dirigeant de suivre les performances de son entreprise en temps réel, de les comparer à ses objectifs, et d'agir avant que les écarts ne deviennent des problèmes.",
          "Ce n'est pas de la comptabilité — c'est du pilotage. Ce n'est pas réservé aux grandes entreprises — c'est indispensable à toute TPE en croissance.",
        ],
      },
      {
        heading: "La différence entre comptabilité et contrôle de gestion",
        paragraphs: [
          "La comptabilité enregistre ce qui s'est passé. Le contrôle de gestion compare ce qui s'est passé à ce qui était prévu — et en tire des actions concrètes.",
          "Votre comptable vous dit que votre marge brute est de 35 %. Le contrôle de gestion vous dit que cette marge était à 38 % il y a 6 mois, que la baisse vient du client X qui négocie trop fort, et qu'il faut agir avant que ça ne s'aggrave.",
        ],
      },
      {
        heading: "Ce que ça change concrètement dans votre quotidien de dirigeant",
        paragraphs: [
          "Avec un contrôle de gestion en place, vous ne découvrez plus vos problèmes en fin d'année. Vous les voyez arriver chaque mois. Vous savez quels produits sont rentables, quels clients coûtent plus qu'ils ne rapportent, et si votre trajectoire est cohérente avec vos objectifs.",
        ],
      },
      {
        heading: "Les 3 outils de base du contrôle de gestion pour une TPE",
        paragraphs: [
          "1. Le budget annuel — votre référentiel. Il fixe les objectifs de revenus et de charges pour l'année, mois par mois.",
          "2. Le tableau de bord mensuel — votre cockpit. Il compare chaque mois le réalisé au budget et met en lumière les écarts significatifs.",
          "3. L'analyse de rentabilité par activité — votre radar. Elle vous montre quels produits, services ou clients sont rentables — et lesquels ne le sont pas.",
        ],
      },
      {
        heading: "Par où commencer — les premières étapes",
        paragraphs: [
          "Commencez par construire un budget simple sur l'année en cours. Puis chaque mois, comparez vos résultats réels à ce budget. Les écarts vous diront où concentrer votre attention. C'est le contrôle de gestion dans sa forme la plus accessible — et c'est déjà transformateur.",
        ],
      },
    ],
    faq: [
      {
        question: "C'est quoi le contrôle de gestion ?",
        answer: "Le contrôle de gestion est un ensemble d'outils qui permet au dirigeant de suivre les performances de son entreprise, de les comparer à ses objectifs, et d'agir avant que les écarts ne deviennent des problèmes. Ce n'est pas de la comptabilité — c'est du pilotage.",
      },
      {
        question: "Quelle différence entre comptabilité et contrôle de gestion ?",
        answer: "La comptabilité enregistre les opérations passées et produit les documents légaux. Le contrôle de gestion utilise ces données pour analyser les performances, identifier les écarts par rapport aux objectifs et orienter les décisions futures.",
      },
      {
        question: "Le contrôle de gestion est-il utile pour une TPE ?",
        answer: "Oui — dès que votre entreprise dépasse le stade de l'activité simple avec quelques clients. Le contrôle de gestion vous permet de piloter votre rentabilité, d'anticiper les problèmes et de prendre de meilleures décisions sans attendre le bilan de fin d'année.",
      },
      {
        question: "Comment mettre en place un contrôle de gestion simplement ?",
        answer: "Commencez par un budget annuel simple et un suivi mensuel des écarts entre budget et réalisé. Ajoutez ensuite une analyse de rentabilité par activité ou par client. Ces trois outils suffisent pour transformer votre pilotage.",
      },
    ],
    ctaText: "Besoin de structurer votre pilotage ?",
    ctaDescription: "Premier échange gratuit — nous analysons votre situation.",
    ctaLink: "/services/controle-de-gestion/",
    ctaLabel: "Découvrir notre service contrôle de gestion",
  },
  "kpis-tpe-dirigeant": {
    sections: [
      {
        paragraphs: [
          "Vous n'avez pas besoin de 50 indicateurs. Vous avez besoin de 5 KPIs bien choisis, suivis chaque mois, qui vous disent l'essentiel sur la santé financière de votre entreprise.",
        ],
      },
      {
        heading: "KPI 1 — Marge brute",
        paragraphs: [
          "Formule : (CA - coût des ventes) / CA × 100. La marge brute mesure la rentabilité directe de votre activité avant les charges de structure. Seuil d'alerte : si elle baisse de plus de 2 points sur un trimestre sans explication, il faut investiguer — pression prix, hausse des coûts d'achat, ou changement de mix produit.",
        ],
      },
      {
        heading: "KPI 2 — Besoin en fonds de roulement (BFR)",
        paragraphs: [
          "Formule : stocks + créances clients - dettes fournisseurs. Le BFR mesure le cash immobilisé dans votre cycle d'exploitation. Seuil d'alerte : si le BFR augmente plus vite que le CA, votre croissance consomme plus de cash qu'elle n'en génère.",
        ],
      },
      {
        heading: "KPI 3 — DSO (délai moyen de paiement clients)",
        paragraphs: [
          "Formule : créances clients / CA × 30. Le DSO mesure le nombre de jours moyen entre l'émission d'une facture et son encaissement. Seuil d'alerte : au-delà de 45 jours pour la plupart des secteurs. Un DSO qui augmente signifie que vos clients paient de plus en plus tard.",
        ],
      },
      {
        heading: "KPI 4 — Taux d'endettement",
        paragraphs: [
          "Formule : dettes financières / capitaux propres. Ce ratio mesure votre levier financier. Seuil d'alerte : au-delà de 1 (dettes supérieures aux fonds propres), votre banquier commencera à s'inquiéter et vos conditions de financement se durciront.",
        ],
      },
      {
        heading: "KPI 5 — Point mort mensuel",
        paragraphs: [
          "Formule : charges fixes / (1 - taux de charges variables). C'est le CA minimum à réaliser chaque mois pour ne pas perdre d'argent. Connaître ce chiffre change votre perspective — vous savez exactement à partir de quel moment du mois vous commencez à gagner de l'argent.",
        ],
      },
    ],
    ctaText: "Besoin d'un tableau de bord sur mesure ?",
    ctaDescription: "Nous construisons vos KPIs dans Odoo pour un suivi automatisé.",
    ctaLink: "/services/controle-de-gestion/",
    ctaLabel: "Découvrir notre service contrôle de gestion",
  },
  "budget-annuel-tpe": {
    sections: [
      {
        paragraphs: [
          "Un budget annuel n'est pas un exercice académique — c'est votre GPS financier. Sans lui, vous pilotez à vue. Avec lui, vous savez à chaque instant si vous êtes sur la bonne trajectoire.",
        ],
      },
      {
        heading: "Étape 1 — Partir de l'historique réel",
        paragraphs: [
          "Analysez les 2 dernières années. Identifiez les tendances : croissance du CA, évolution des charges, saisonnalité. Neutralisez les éléments exceptionnels (un gros contrat ponctuel, une dépense unique). Votre budget doit refléter la réalité probable — pas vos rêves.",
        ],
      },
      {
        heading: "Étape 2 — Budgétiser les charges fixes en premier",
        paragraphs: [
          "Loyers, salaires, abonnements, cotisations — ces charges arrivent quoi qu'il se passe commercialement. Commencez par elles : vous savez immédiatement quel montant de CA vous devez générer juste pour couvrir vos frais fixes.",
        ],
      },
      {
        heading: "Étape 3 — Estimer les revenus par scénario",
        paragraphs: [
          "Construisez 3 scénarios : base (continuité de l'historique), optimiste (+15 %), pessimiste (-15 %). Travaillez avec le scénario base pour les décisions courantes. Le scénario pessimiste vous dit ce qui se passe si les choses tournent mal — et si vous pouvez y survivre.",
        ],
      },
      {
        heading: "Étape 4 — Calculer le point mort et valider la viabilité",
        paragraphs: [
          "Votre budget est-il viable dans le scénario pessimiste ? Si non, identifiez les leviers : quelles charges peuvent être réduites ? Quels revenus peuvent être sécurisés ? Le budget n'est pas qu'un objectif — c'est aussi un test de résistance.",
        ],
      },
      {
        heading: "Étape 5 — Planifier les révisions trimestrielles",
        paragraphs: [
          "Le budget n'est pas un document figé — il est comparé aux réalisés et ajusté chaque trimestre. C'est cette comparaison régulière qui transforme un exercice comptable en outil de pilotage vivant.",
        ],
      },
      {
        heading: "Les erreurs les plus courantes",
        paragraphs: ["Voici les pièges à éviter :"],
        list: [
          "Surestimer les revenus par optimisme commercial",
          "Oublier les charges sociales et fiscales dans les décaissements",
          "Ne pas budgétiser les investissements prévisibles",
          "Construire un budget et ne jamais le comparer aux réalisés",
        ],
      },
    ],
    ctaText: "Besoin d'aide pour construire votre budget ?",
    ctaDescription: "Nous construisons votre budget annuel et assurons le suivi trimestriel.",
    ctaLink: "/services/controle-de-gestion/",
    ctaLabel: "Découvrir notre service contrôle de gestion",
  },
  "analyse-ecarts-budgetaires": {
    sections: [
      {
        paragraphs: [
          "Avoir un budget, c'est bien. Le comparer à la réalité chaque mois et en tirer des actions, c'est le contrôle de gestion. L'analyse des écarts est l'outil qui transforme vos chiffres en décisions.",
        ],
      },
      {
        heading: "Les 4 types d'écarts et ce qu'ils signalent",
        paragraphs: [
          "Écart de volume — Vous avez vendu plus ou moins que prévu. Cause : commerciale ou marché. Action : ajuster la prévision de CA et le budget des charges variables.",
          "Écart de prix — Vos prix réels diffèrent du budget. Cause : négociation, concurrence, inflation. Action : revoir la politique tarifaire ou les conditions commerciales.",
          "Écart de coût — Vos charges sont différentes du budget. Cause : dérive opérationnelle ou changement de structure. Action : identifier la source de la dérive et corriger.",
          "Écart de mix — La composition de vos ventes a changé. Cause : évolution du portefeuille client ou produit. Action : analyser la rentabilité par segment et réorienter l'effort commercial.",
        ],
      },
      {
        heading: "La méthode d'analyse en 3 questions",
        paragraphs: ["Pour chaque écart significatif, posez-vous ces 3 questions :"],
        list: [
          "L'écart est-il significatif ? (plus de 5 % du budget sur ce poste)",
          "L'écart est-il structurel (il va se répéter) ou ponctuel (événement exceptionnel) ?",
          "L'écart nécessite-t-il une action correctrice sur le budget ou sur les opérations ?",
        ],
      },
      {
        heading: "Ce que l'analyse des écarts change pour vous",
        paragraphs: [
          "Sans analyse des écarts, vous découvrez vos problèmes en fin d'année — quand il est trop tard pour agir. Avec une analyse mensuelle, vous voyez les dérives dès le premier mois et vous avez 11 mois pour corriger la trajectoire.",
        ],
      },
    ],
    ctaText: "Besoin d'un suivi budgétaire structuré ?",
    ctaDescription: "Nous mettons en place l'analyse des écarts dans votre pilotage mensuel.",
    ctaLink: "/services/controle-de-gestion/",
    ctaLabel: "Découvrir notre service contrôle de gestion",
  },
  "vvprbis-belgique": {
    sections: [
      {
        heading: "Définition en bref",
        paragraphs: [
          "Le VVPRbis (Verlaagde Voorheffing / Précompte Réduit bis) est un régime fiscal belge qui permet aux PME de distribuer des dividendes à un taux de précompte mobilier réduit — 15 % au lieu de 30 % standard — sous certaines conditions. C'est l'un des leviers d'optimisation les plus efficaces pour les dirigeants de PME belges qui souhaitent se rémunérer via dividendes.",
        ],
      },
      {
        heading: "Conditions pour en bénéficier",
        paragraphs: ["Pour bénéficier du régime VVPRbis, toutes ces conditions doivent être réunies :"],
        list: [
          "La société doit être une PME au sens du Code des sociétés",
          "Les actions doivent avoir été émises à partir du 1er juillet 2013",
          "Les actions doivent être nominatives (inscrites dans le registre des actionnaires)",
          "Les actions doivent être souscrites en numéraire — pas par apport en nature",
          "Les apports doivent être entièrement libérés",
          "Un délai d'attente de 2 ans (dividende à 20 %) puis 5 ans (dividende à 15 %) s'applique",
        ],
      },
      {
        heading: "Les pièges à éviter",
        paragraphs: ["Attention à ces erreurs fréquentes :"],
        list: [
          "Confondre VVPRbis et réserve de liquidation — ce sont deux mécanismes distincts",
          "Ne pas respecter les conditions de libération du capital",
          "Distribuer avant le délai d'attente et perdre l'avantage",
        ],
      },
    ],
    faq: [
      {
        question: "C'est quoi le VVPRbis en Belgique ?",
        answer: "Le VVPRbis est un régime fiscal qui permet aux PME belges de distribuer des dividendes à un taux de précompte mobilier de 15 % (au lieu de 30 %) sous certaines conditions liées à l'ancienneté et à la nature des actions.",
      },
      {
        question: "Quelle différence entre VVPRbis et réserve de liquidation ?",
        answer: "Le VVPRbis s'applique aux dividendes courants et dépend de l'ancienneté des actions. La réserve de liquidation est constituée à partir des bénéfices mis en réserve, avec une taxe de 10 % payée immédiatement, en vue d'une distribution future à taux réduit. Les deux mécanismes sont complémentaires selon votre situation.",
      },
    ],
    ctaText: "Envie d'optimiser vos dividendes ?",
    ctaDescription: "Nous analysons votre situation et identifions les mécanismes applicables.",
    ctaLink: "/services/fiscalite/",
    ctaLabel: "Découvrir notre service fiscalité",
  },
  "reserve-liquidation-belgique": {
    sections: [
      {
        heading: "Définition en bref",
        paragraphs: [
          "La réserve de liquidation est un mécanisme fiscal belge qui permet à une PME de mettre en réserve une partie de ses bénéfices en payant immédiatement une taxe de 10 %, en vue de les distribuer ultérieurement à un taux de précompte mobilier réduit ou nul selon le délai d'attente.",
        ],
      },
      {
        heading: "La mécanique en 3 étapes",
        paragraphs: [
          "Étape 1 — La PME décide de constituer une réserve de liquidation et paie immédiatement 10 % de taxe sur le montant mis en réserve.",
          "Étape 2 — Si la réserve est distribuée avant 5 ans : précompte mobilier de 20 % supplémentaire.",
          "Étape 3 — Si la réserve est distribuée après 5 ans : précompte mobilier de 5 % — soit une charge totale de 15 % contre 30 % pour un dividende classique.",
        ],
      },
      {
        heading: "Quand utiliser la réserve de liquidation ?",
        paragraphs: [
          "La réserve de liquidation est particulièrement intéressante pour les sociétés matures qui dégagent des bénéfices réguliers et qui n'ont pas besoin de distribuer immédiatement. Elle permet de capitaliser avec un coût fiscal réduit à long terme.",
        ],
      },
    ],
    faq: [
      {
        question: "C'est quoi la réserve de liquidation pour une PME belge ?",
        answer: "La réserve de liquidation permet à une PME belge de mettre en réserve une partie de ses bénéfices en payant une taxe de 10 % immédiatement, pour les distribuer plus tard à un taux de précompte réduit ou nul selon le délai d'attente. C'est un outil puissant de planification fiscale à long terme.",
      },
      {
        question: "Réserve de liquidation ou VVPRbis — lequel choisir ?",
        answer: "Les deux mécanismes sont complémentaires. Le VVPRbis convient mieux aux sociétés récentes qui distribuent régulièrement. La réserve de liquidation convient mieux aux sociétés plus matures qui veulent capitaliser et distribuer à terme. Une analyse personnalisée de votre situation est nécessaire.",
      },
    ],
    ctaText: "Envie d'optimiser votre fiscalité ?",
    ctaDescription: "Nous analysons votre situation et construisons la stratégie adaptée.",
    ctaLink: "/services/fiscalite/",
    ctaLabel: "Découvrir notre service fiscalité",
  },
  "remuneration-dirigeant-belgique": {
    sections: [
      {
        paragraphs: [
          "Salaire, dividendes, avantages en nature — la rémunération d'un dirigeant de société belge est un arbitrage fiscal et social complexe. Voici les clés pour comprendre et optimiser.",
        ],
      },
      {
        heading: "Les trois modes de rémunération d'un dirigeant belge",
        paragraphs: [
          "Le salaire — Soumis à l'IPP (jusqu'à 50 %) et aux cotisations sociales. Déductible comme charge pour la société. Ouvre des droits sociaux (maladie, pension). C'est la base obligatoire de toute rémunération de dirigeant.",
          "Les dividendes — Soumis au précompte mobilier (30 % standard, 20 % ou 15 % avec VVPRbis). Distribués sur bénéfice après ISOC. Pas de cotisations sociales. Intéressant au-delà du salaire minimum obligatoire.",
          "Les avantages en nature — Voiture de société, GSM, ordinateur — soumis à l'IPP sur la valeur ATN forfaitaire. Souvent plus avantageux que l'équivalent en salaire net.",
        ],
      },
      {
        heading: "La question centrale : quel est le bon équilibre ?",
        paragraphs: [
          "La loi belge impose un salaire minimum au dirigeant pour que la société bénéficie du taux réduit ISOC PME (45 000 € bruts minimum en 2026, ou salaire supérieur au bénéfice imposable). Au-delà de ce minimum, l'arbitrage salaire/dividendes dépend de votre situation patrimoniale, de vos besoins de liquidités et de vos objectifs à long terme.",
        ],
      },
    ],
    faq: [
      {
        question: "Est-il mieux de se payer en salaire ou en dividendes en Belgique ?",
        answer: "Il n'existe pas de réponse universelle. Un salaire crée des droits sociaux et est déductible pour la société. Les dividendes évitent les cotisations sociales mais sont distribués sur bénéfice après ISOC. L'optimum dépend de votre taux marginal IPP, de vos besoins sociaux, et des mécanismes disponibles (VVPRbis, réserve de liquidation). Une analyse personnalisée est indispensable.",
      },
    ],
    ctaText: "Envie d'optimiser votre rémunération ?",
    ctaDescription: "Nous simulons la combinaison optimale pour votre situation.",
    ctaLink: "/services/fiscalite/",
    ctaLabel: "Découvrir notre service fiscalité",
  },
  "voiture-societe-belgique": {
    sections: [
      {
        paragraphs: [
          "La voiture de société reste l'un des avantages les plus utilisés par les dirigeants belges — mais aussi l'un des plus complexes fiscalement. Voici ce que vous devez savoir en 2026.",
        ],
      },
      {
        heading: "Les 4 composantes fiscales d'une voiture de société",
        paragraphs: [
          "L'ATN (Avantage de Toute Nature) — Calculé sur la valeur catalogue × coefficient CO2 × 6/7. Soumis à l'IPP du dirigeant comme revenu professionnel.",
          "La déductibilité des frais — Dépend des émissions CO2 du véhicule. Pour les véhicules à moteur thermique achetés après 2026, tendance à la déductibilité réduite.",
          "La cotisation de solidarité CO2 — Charge pour la société, dépend des émissions du véhicule.",
          "La TVA récupérable — Limitée à 50 % maximum pour les véhicules mixtes usage professionnel / privé.",
        ],
      },
      {
        heading: "Voiture électrique — l'avantage fiscal en 2026",
        paragraphs: [
          "Les véhicules électriques bénéficient d'un ATN réduit (coefficient CO2 à 0), d'une déductibilité des frais favorable, et d'une cotisation de solidarité CO2 minimale. Dans le cadre de la réforme fiscale belge en cours, les avantages des véhicules électriques sont progressivement renforcés — à vérifier selon la date d'acquisition.",
        ],
      },
    ],
    faq: [
      {
        question: "Comment est calculé l'ATN d'une voiture de société en Belgique ?",
        answer: "L'ATN est calculé selon la formule : valeur catalogue (TVA comprise, options incluses) × coefficient CO2 × 6/7. Le résultat est l'avantage imposable annuel à l'IPP. Des coefficients correcteurs s'appliquent selon l'âge du véhicule. Le calcul est complexe — MFinances l'effectue pour chaque véhicule lors de l'optimisation de la rémunération.",
      },
    ],
    ctaText: "Besoin d'un calcul précis ?",
    ctaDescription: "Nous simulons l'impact fiscal de votre véhicule de société.",
    ctaLink: "/services/fiscalite/",
    ctaLabel: "Découvrir notre service fiscalité",
  },
  "declaration-isoc-belgique": {
    sections: [
      {
        paragraphs: [
          "La déclaration ISOC est un exercice annuel incontournable pour toute société belge. Bien préparée, elle est une formalité. Mal anticipée, elle peut coûter cher.",
        ],
      },
      {
        heading: "Les délais et échéances ISOC",
        paragraphs: ["Voici les échéances clés à respecter :"],
        list: [
          "Clôture d'exercice : date variable selon vos statuts (souvent 31/12 ou 30/06)",
          "Dépôt des comptes annuels à la BNB : dans les 7 mois suivant la clôture",
          "Dépôt de la déclaration ISOC : dans les 7 mois suivant la clôture (délai standard)",
          "Paiement des acomptes : 4 acomptes trimestriels recommandés pour éviter la majoration",
        ],
      },
      {
        heading: "Les acomptes d'impôt — pourquoi ils sont indispensables",
        paragraphs: [
          "Sans acomptes, votre société est soumise à une majoration d'impôt de 6,75 % (taux 2026). Pour une ISOC de 20 000 €, c'est 1 350 € de majoration évitable. Les acomptes sont versés les 10 avril, 10 juillet, 10 octobre et 20 décembre.",
        ],
      },
      {
        heading: "ISOC taux normal vs taux réduit PME",
        paragraphs: [
          "Le taux ISOC normal est de 25 %. Les PME bénéficient d'un taux réduit de 20 % sur la première tranche de 100 000 € de bénéfice imposable — sous conditions (notamment : salaire dirigeant minimum de 45 000 € bruts ou égal au bénéfice imposable).",
        ],
      },
    ],
    faq: [
      {
        question: "Quel est le taux de l'impôt des sociétés en Belgique ?",
        answer: "Le taux ISOC standard est de 25 % en Belgique. Les PME bénéficient d'un taux réduit de 20 % sur la première tranche de 100 000 € de bénéfice imposable, sous conditions notamment relatives au salaire minimum du dirigeant.",
      },
    ],
    ctaText: "Besoin de préparer votre déclaration ISOC ?",
    ctaDescription: "Nous prenons en charge votre déclaration et optimisons votre charge fiscale.",
    ctaLink: "/services/fiscalite/",
    ctaLabel: "Découvrir notre service fiscalité",
  },
  "srl-vs-independant-belgique": {
    sections: [
      {
        paragraphs: [
          "SRL ou indépendant en personne physique ? C'est la première question que se pose tout entrepreneur belge — et la réponse a des conséquences fiscales et juridiques pendant des années.",
        ],
      },
      {
        heading: "Comparatif détaillé",
        paragraphs: [],
        table: {
          headers: ["", "Indépendant PP", "SRL"],
          rows: [
            ["Responsabilité", "Illimitée sur patrimoine personnel", "Limitée au capital apporté"],
            ["Fiscalité bénéfices", "IPP — jusqu'à 50 %", "ISOC — 20 ou 25 %"],
            ["Cotisations sociales", "Sur revenus nets", "Sur salaire dirigeant"],
            ["Frais de création", "Quasi nuls", "1 500 à 3 000 €"],
            ["Comptabilité", "Simplifiée possible", "En partie double obligatoire"],
            ["Crédibilité bancaire", "Limitée", "Meilleure"],
          ],
        },
      },
      {
        heading: "À quel niveau de revenus la SRL devient avantageuse ?",
        paragraphs: [
          "En règle générale, la SRL devient fiscalement avantageuse lorsque le bénéfice net dépasse 40 000 à 60 000 € par an — seuil variable selon la situation personnelle, les charges de famille et les objectifs patrimoniaux. En dessous, les frais de structure peuvent dépasser les économies fiscales.",
        ],
      },
    ],
    faq: [
      {
        question: "Vaut-il mieux être indépendant ou créer une société en Belgique ?",
        answer: "Cela dépend de votre niveau de revenus, de votre tolérance au risque personnel et de vos objectifs patrimoniaux. L'indépendant en personne physique est plus simple et moins coûteux à gérer. La SRL offre une protection du patrimoine personnel et devient fiscalement avantageuse à partir d'un certain niveau de bénéfices. Une analyse personnalisée est indispensable avant de décider.",
      },
    ],
    ctaText: "Besoin d'un avis personnalisé ?",
    ctaDescription: "Nous analysons votre situation pour déterminer la structure optimale.",
    ctaLink: "/services/creation-entreprise/",
    ctaLabel: "Découvrir notre service création d'entreprise",
  },
  "creer-srl-belgique-2026": {
    sections: [
      {
        paragraphs: [
          "Créer une SRL en Belgique en 2026 suit un processus structuré en 6 étapes. Avec un bon accompagnement, vous pouvez aller de la première réunion à la première facture en 2 à 4 semaines.",
        ],
      },
      {
        heading: "Étape 1 — Le plan financier obligatoire",
        paragraphs: [
          "Document légalement requis, remis au notaire, il démontre la viabilité de votre projet sur 2 ans. Il engage votre responsabilité en cas de faillite dans les 3 ans. Honoraires MFinances : inclus dans le forfait 800 € HTVA.",
        ],
      },
      {
        heading: "Étape 2 — L'acte constitutif chez le notaire",
        paragraphs: [
          "Rédaction et signature de l'acte de constitution. Le notaire vérifie le plan financier, les statuts et les apports. Frais notariaux : 1 000 à 1 500 € selon la complexité.",
        ],
      },
      {
        heading: "Étape 3 — L'inscription à la BCE",
        paragraphs: [
          "Attribution du numéro d'entreprise via un guichet d'entreprises agréé. Délai : 1 à 3 jours ouvrables. Frais : environ 90 €.",
        ],
      },
      {
        heading: "Étape 4 — L'activation du numéro de TVA",
        paragraphs: [
          "Demande auprès du SPF Finances. Délai : 1 à 3 semaines. Obligatoire pour facturer avec TVA. Le régime TVA (normal, franchise, mixte) doit être choisi avec soin.",
        ],
      },
      {
        heading: "Étape 5 — L'affiliation à une caisse d'assurances sociales",
        paragraphs: [
          "Obligatoire pour le dirigeant indépendant. Premier trimestre de cotisations à provisionner (environ 700 à 900 €).",
        ],
      },
      {
        heading: "Étape 6 — L'ouverture du compte bancaire professionnel",
        paragraphs: [
          "Obligatoire pour déposer le capital et recevoir les paiements clients. Comparez les offres bancaires — les frais varient significativement.",
        ],
      },
      {
        heading: "Délai total",
        paragraphs: [
          "Avec un dossier complet, la création d'une SRL prend généralement 2 à 4 semaines de la première réunion à la première facture émise.",
        ],
      },
    ],
    ctaText: "Prêt à créer votre SRL ?",
    ctaDescription: "Plan financier + accompagnement complet à partir de 800 € HTVA.",
    ctaLink: "/services/creation-entreprise/",
    ctaLabel: "Découvrir notre service création d'entreprise",
  },
  "cout-creation-societe-belgique": {
    sections: [
      {
        paragraphs: [
          "Combien coûte réellement la création d'une société en Belgique ? Voici tous les frais, poste par poste, sans surprise.",
        ],
      },
      {
        heading: "Tableau récapitulatif des coûts",
        paragraphs: [],
        table: {
          headers: ["Poste de coût", "Montant estimé"],
          rows: [
            ["Honoraires notaire (acte constitutif)", "1 000 à 1 500 €"],
            ["Publication au Moniteur belge", "200 à 350 €"],
            ["Inscription à la BCE", "environ 90 €"],
            ["Ouverture compte bancaire professionnel", "0 à 150 € selon banque"],
            ["Honoraires MFinances (plan financier + conseil + mise en place Odoo)", "800 € HTVA"],
            ["Capital minimum SRL", "1 € légal — 18 550 € recommandé en pratique"],
            ["TOTAL frais de création (hors capital)", "2 000 à 3 000 € environ"],
          ],
        },
      },
      {
        heading: "Les frais récurrents après création",
        paragraphs: [
          "Comptabilité (forfait MFinances à partir de 350 € HTVA/mois), cotisations sociales dirigeant (environ 700 à 900 €/trimestre en début d'activité), assurance responsabilité professionnelle selon secteur.",
        ],
      },
    ],
    ctaText: "Prêt à vous lancer ?",
    ctaDescription: "Nous vous accompagnons de A à Z dans la création de votre société.",
    ctaLink: "/services/creation-entreprise/",
    ctaLabel: "Découvrir notre service création d'entreprise",
  },
  "plan-financier-obligatoire-belgique": {
    sections: [
      {
        heading: "Pourquoi le plan financier est obligatoire — le cadre légal",
        paragraphs: [
          "Depuis la réforme du Code des sociétés et des associations (CSA) en 2019, le plan financier est obligatoire pour la constitution d'une SRL ou d'une SA. Il est remis au notaire lors de la constitution et conservé pendant 3 ans après la date de constitution.",
        ],
      },
      {
        heading: "La responsabilité du fondateur",
        paragraphs: [
          "Si la société est déclarée en faillite dans les 3 ans suivant la constitution, et si le tribunal estime que le capital était manifestement insuffisant au regard du plan financier, les fondateurs peuvent être tenus personnellement responsables des dettes. C'est la principale raison pour laquelle un plan financier solide et réaliste est indispensable.",
        ],
      },
      {
        heading: "Ce que le plan financier doit contenir",
        paragraphs: ["Le plan financier doit inclure les éléments suivants :"],
        list: [
          "Description de l'activité projetée",
          "Présentation de l'actionnariat et du capital",
          "Compte de résultats prévisionnel sur 2 ans minimum",
          "Bilan prévisionnel sur 2 ans minimum",
          "Plan de trésorerie sur 2 ans",
          "Description des hypothèses et des sources de financement",
        ],
      },
    ],
    faq: [
      {
        question: "Le plan financier est-il obligatoire pour créer une société en Belgique ?",
        answer: "Oui — depuis la réforme CSA de 2019, le plan financier est obligatoire pour la constitution d'une SRL ou SA en Belgique. Il doit être remis au notaire et démontre la viabilité financière de la société sur 2 ans minimum. Un plan financier insuffisant peut engager la responsabilité personnelle des fondateurs en cas de faillite dans les 3 ans.",
      },
    ],
    ctaText: "Besoin d'un plan financier solide ?",
    ctaDescription: "Nous construisons votre plan financier conforme aux exigences légales.",
    ctaLink: "/services/creation-entreprise/",
    ctaLabel: "Découvrir notre service création d'entreprise",
  },
  "erreurs-creation-societe-belgique": {
    sections: [
      {
        paragraphs: [
          "Créer une société en Belgique n'est pas compliqué — mais les erreurs commises au départ peuvent coûter cher pendant des années. Voici les 5 plus fréquentes.",
        ],
      },
      {
        heading: "Erreur 1 — Choisir sa structure juridique sans analyse fiscale",
        paragraphs: [
          "Coût réel : des milliers d'euros de surcharge fiscale pendant plusieurs années, et une restructuration coûteuse quand l'erreur est réalisée. Un indépendant qui aurait dû créer une SRL dès le départ peut perdre 5 000 à 15 000 € d'avantage fiscal annuel.",
        ],
      },
      {
        heading: "Erreur 2 — Sous-estimer le capital de départ",
        paragraphs: [
          "Coût réel : difficultés de trésorerie dès le premier trimestre, crédibilité bancaire fragilisée, risque de responsabilité personnelle en cas de faillite. Le capital minimum légal d'1 € est insuffisant — un capital réel de 15 000 à 25 000 € est recommandé selon l'activité.",
        ],
      },
      {
        heading: "Erreur 3 — Négliger le plan financier obligatoire",
        paragraphs: [
          "Coût réel : refus du notaire de constituer la société, ou pire : responsabilité personnelle engagée en cas de faillite dans les 3 ans si le plan est jugé insuffisant.",
        ],
      },
      {
        heading: "Erreur 4 — Mal configurer la TVA dès le départ",
        paragraphs: [
          "Coût réel : pénalités de retard, TVA non récupérable sur les premiers investissements, déclarations rectificatives coûteuses. Le régime TVA (normal, franchise, mixte) doit être choisi en connaissance de cause dès la création.",
        ],
      },
      {
        heading: "Erreur 5 — Ne pas anticiper sa rémunération de dirigeant",
        paragraphs: [
          "Coût réel : perte du taux réduit ISOC PME (20 % vs 25 %), cotisations sociales calculées sur une base incorrecte, surprises fiscales en fin d'année. Le salaire minimum du dirigeant pour bénéficier du taux réduit ISOC est de 45 000 € bruts en 2026.",
        ],
      },
    ],
    ctaText: "Évitez les erreurs dès le départ",
    ctaDescription: "Nous vous accompagnons pour une création de société sans faux pas.",
    ctaLink: "/services/creation-entreprise/",
    ctaLabel: "Découvrir notre service création d'entreprise",
  },

  // ══════════════════════════════════════════════
  // ARTICLES FROIDS
  // ══════════════════════════════════════════════

  "pourquoi-pas-argent-sur-compte": {
    sections: [
      {
        heading: "Vous n'êtes pas seul",
        paragraphs: [
          "C'est l'une des questions les plus fréquentes que nous posent les dirigeants de TPE. Vous travaillez. Vous facturez. Vos clients payent. Et pourtant, en fin de mois — votre compte bancaire est dans le rouge ou dangereusement bas.",
          "La première chose à savoir : ce n'est pas un signe d'échec. C'est souvent un problème de timing et de structure — pas de rentabilité.",
        ],
      },
      {
        heading: "Les 5 vraies raisons",
        paragraphs: [],
      },
      {
        heading: "Raison 1 — Vos clients paient trop tard",
        paragraphs: [
          "Si vos clients paient à 60 ou 90 jours et que vos charges sont à payer ce mois-ci, votre argent existe — mais il n'est pas encore là. Vous avez des bénéfices sur le papier et un compte vide en pratique. C'est le décalage de trésorerie le plus courant.",
        ],
      },
      {
        heading: "Raison 2 — Vous ne provisionnez pas vos impôts et charges sociales",
        paragraphs: [
          "TVA, cotisations sociales, acomptes d'impôt — ces montants sont prévisibles mais arrivent en bloc. Si vous n'avez pas mis de côté chaque mois, leur arrivée vide votre compte d'un coup.",
        ],
      },
      {
        heading: "Raison 3 — Votre croissance consomme plus qu'elle ne rapporte (pour l'instant)",
        paragraphs: [
          "Recruter, investir, stocker — tout ça coûte de l'argent maintenant. Les recettes supplémentaires arrivent plus tard. Plus vous grandissez vite, plus ce décalage est important.",
        ],
      },
      {
        heading: "Raison 4 — Vous payez comptant ce qui devrait être financé",
        paragraphs: [
          "Un équipement à 20 000 € payé cash, c'est 20 000 € qui quittent votre compte en une fois. Financé sur 3 ans, c'est 550 €/mois. Votre trésorerie respire.",
        ],
      },
      {
        heading: "Raison 5 — Vous n'avez pas de visibilité sur ce qui arrive",
        paragraphs: [
          "Sans prévisionnel de trésorerie, vous ne voyez pas venir les tensions. Vous les découvrez quand elles arrivent — et il est souvent trop tard pour agir autrement qu'en urgence.",
        ],
      },
      {
        heading: "Ce que vous pouvez faire cette semaine",
        paragraphs: [],
        list: [
          "Action 1 — Ouvrez un compte épargne dédié aux charges fiscales. Virez automatiquement 20-25% de votre CA chaque mois. Ne touchez pas à cet argent.",
          "Action 2 — Listez tous vos encaissements attendus ce mois et le suivant. Confrontez-les à vos dépenses prévues. Vision immédiate à 30-60 jours.",
          "Action 3 — Relancez vos factures impayées. Pour chaque facture en retard, envoyez un email de relance aujourd'hui.",
        ],
      },
      {
        heading: "Quand le problème est plus structurel",
        paragraphs: [
          "Si malgré ces actions votre trésorerie reste chroniquement tendue, le problème est probablement structurel. Même si vous débutez. Même si vous ne comprenez pas encore tous vos chiffres. Le diagnostic trésorerie gratuit prend 5 minutes et vous dit exactement où vous en êtes.",
        ],
      },
    ],
    faq: [
      {
        question: "Pourquoi mon compte bancaire est-il toujours vide même si j'ai des clients ?",
        answer: "La cause la plus fréquente est le décalage entre le moment où vous facturez et le moment où vous encaissez. Si vos clients paient à 60 jours et vos charges sont dues ce mois-ci, votre argent existe comptablement — mais il n'est pas encore sur votre compte. S'y ajoutent souvent des provisions fiscales insuffisantes et des investissements mal financés.",
      },
      {
        question: "Comment savoir si mon entreprise est vraiment rentable ?",
        answer: "La rentabilité se mesure sur le compte de résultats — revenus moins charges. La trésorerie se mesure sur vos relevés bancaires. Une entreprise peut être rentable et avoir une trésorerie tendue. Pour avoir une vision claire des deux, un tableau de bord financier simple suffit.",
      },
      {
        question: "Que faire quand on n'a plus d'argent sur son compte professionnel ?",
        answer: "En urgence : relancer les factures impayées, négocier un délai avec vos fournisseurs, contacter votre banque pour un crédit de trésorerie temporaire. À moyen terme : mettre en place un prévisionnel pour que ça ne se reproduise plus.",
      },
    ],
    ctaText: "Découvrir pourquoi je manque de cash",
    ctaDescription: "Le diagnostic trésorerie gratuit vous dit exactement où votre argent disparaît.",
    ctaLink: "/diagnostic/",
    ctaLabel: "Découvrir pourquoi mon compte est vide →",
  },

  "argent-disparait-fin-mois": {
    sections: [
      {
        heading: "Le paradoxe que personne ne vous explique clairement",
        paragraphs: [
          "Votre comptable vous dit que vous êtes rentable. Votre banquier voit des bénéfices. Et vous, vous vérifiez votre compte bancaire avec appréhension à chaque fin de mois.",
          "Ce n'est pas une contradiction. C'est une mécanique financière que 60% des dirigeants de TPE ne comprennent pas — parce que personne ne la leur a jamais expliquée simplement.",
          "Le bénéfice est ce que vous avez gagné sur le papier. La trésorerie est l'argent disponible sur votre compte maintenant. Les deux ne sont jamais identiques. Et l'écart entre les deux peut vous coûter très cher.",
        ],
      },
      {
        heading: "Trois raisons concrètes pour lesquelles votre argent disparaît",
        paragraphs: [],
      },
      {
        heading: "1. Vos clients vous paient trop tard",
        paragraphs: [
          "Vous avez facturé 30 000 € ce mois-ci. Vos clients paient à 60 jours. Cet argent n'existera sur votre compte que dans 2 mois. D'ici là, vous payez vos salariés, votre loyer, vos fournisseurs. Résultat : bénéfice positif, compte négatif.",
        ],
      },
      {
        heading: "2. La TVA et les impôts ne sont pas votre argent",
        paragraphs: [
          "Sur chaque facture à 1 000 €, 174 € appartiennent à l'État (TVA à 21%). Si vous dépensez cet argent, vous devrez le rembourser. C'est l'une des erreurs les plus fréquentes — et les plus coûteuses.",
        ],
      },
      {
        heading: "3. Vous grandissez — et grandir coûte de l'argent avant d'en rapporter",
        paragraphs: [
          "Chaque recrutement, chaque investissement, chaque nouveau stock — tout ça sort de votre compte maintenant. Les recettes supplémentaires arrivent dans 3, 6, 12 mois. C'est le piège de la croissance rapide.",
        ],
      },
      {
        heading: "Ce que vous pouvez faire cette semaine — 3 actions",
        paragraphs: [],
        list: [
          "Action 1 : Ouvrez un compte épargne dédié TVA + impôts. Virez-y 25% de chaque encaissement automatiquement. Ne touchez jamais à cet argent.",
          "Action 2 : Listez toutes les factures impayées de plus de 30 jours. Envoyez une relance aujourd'hui. Chaque jour de retard est de l'argent immobilisé.",
          "Action 3 : Faites le diagnostic trésorerie gratuit — 8 questions pour savoir exactement où votre argent disparaît.",
        ],
      },
    ],
    faq: [
      {
        question: "Pourquoi une entreprise rentable peut-elle manquer de cash ?",
        answer: "Parce que la rentabilité et la liquidité sont deux concepts différents. La rentabilité mesure si vos revenus dépassent vos charges sur une période donnée. La liquidité mesure si vous avez de l'argent disponible maintenant. Les décalages de paiement, les investissements et la croissance créent systématiquement un écart entre les deux.",
      },
      {
        question: "Comment savoir si mon problème de trésorerie est structurel ou passager ?",
        answer: "C'est structurel si ça se reproduit chaque mois malgré une activité correcte. C'est passager si ça coïncide avec un événement précis (gros investissement, perte d'un client, retard exceptionnel). Le diagnostic trésorerie gratuit vous aide à faire cette distinction en 8 questions.",
      },
    ],
    ctaText: "Découvrir pourquoi je manque de cash",
    ctaDescription: "Le diagnostic trésorerie gratuit vous dit exactement où votre argent disparaît.",
    ctaLink: "/diagnostic/",
    ctaLabel: "Voir si je commets ces erreurs →",
  },

  "stress-fin-mois-dirigeant-tpe": {
    sections: [
      {
        heading: "Ce que personne ne dit à voix haute",
        paragraphs: [
          "Chaque fin de mois, vous vérifiez votre compte bancaire professionnel avec une légère appréhension. Parfois plusieurs fois par jour. Vous calculez mentalement si vous pouvez payer vos charges, vos salariés, vos fournisseurs. Vous attendez que les clients paient.",
          "Si vous vous reconnaissez dans cette description, sachez une chose : vous n'êtes pas seul. C'est l'une des réalités les moins avouées de la vie des dirigeants de TPE — parce qu'on ne parle pas de ses difficultés financières, même à ses proches.",
          "Mais c'est aussi l'une des plus corrigeables.",
        ],
      },
      {
        heading: "Pourquoi ce stress arrive",
        paragraphs: [
          "Le stress de fin de mois vient presque toujours de la même source : l'absence de visibilité. Vous ne savez pas avec certitude ce que sera votre solde dans 15 jours. Vous réagissez à ce qui se passe plutôt que d'anticiper.",
          "Ce n'est pas un problème de revenus. Des dirigeants avec d'excellents chiffres vivent ce stress — parce que leurs clients paient tard, parce qu'ils n'ont pas de prévisionnel, parce que leurs charges fiscales arrivent en surprise.",
        ],
      },
      {
        heading: "Ce que font différemment les dirigeants qui dorment bien",
        paragraphs: [],
      },
      {
        heading: "Ils savent ce qui arrive avant que ça arrive",
        paragraphs: [
          "Un prévisionnel de trésorerie mis à jour chaque mois leur montre leur solde estimé semaine par semaine sur les 3 prochains mois. Ils ne découvrent pas les tensions — ils les voient venir et agissent avant.",
        ],
      },
      {
        heading: "Ils ont un compte dédié aux charges fiscales",
        paragraphs: [
          "TVA, cotisations sociales, acomptes d'impôt — tout est provisionné chaque mois sur un compte séparé. Quand l'échéance arrive, l'argent est là. Pas de surprise.",
        ],
      },
      {
        heading: "Ils ont une réserve de sécurité",
        paragraphs: [
          "Trois mois de charges fixes disponibles en permanence. Ce coussin transforme chaque imprévu en inconvénient gérable — pas en urgence financière.",
        ],
      },
      {
        heading: "Ils ont un interlocuteur qui surveille",
        paragraphs: [
          "Ils ne sont pas seuls face à leurs chiffres. Quelqu'un regarde leurs finances régulièrement, les prévient quand quelque chose dérive, et les aide à décider avant que la situation ne se dégrade.",
        ],
      },
      {
        heading: "Par où commencer si vous partez de loin",
        paragraphs: [
          "Vous n'avez pas besoin de tout mettre en place en même temps. Commencez par une seule chose : le diagnostic trésorerie gratuit. 8 questions, 3 minutes, et vous saurez précisément quel est votre point de fragilité principal.",
          "Même si vous débutez. Même si vos finances sont dans un état que vous n'osez pas montrer. Le premier échange avec MFinances est gratuit, confidentiel, et sans engagement.",
        ],
      },
    ],
    faq: [
      {
        question: "Est-il normal d'avoir du stress financier quand on dirige une TPE ?",
        answer: "C'est courant — mais ce n'est pas inévitable. Le stress financier des dirigeants de TPE vient dans la grande majorité des cas d'un manque de visibilité, pas d'une situation objectivement catastrophique. Mettre en place les bons outils de suivi transforme cette anxiété en maîtrise.",
      },
      {
        question: "Comment réduire le stress financier quand on est chef d'entreprise ?",
        answer: "Les trois leviers les plus efficaces : un prévisionnel de trésorerie mensuel (vous savez ce qui vient), un compte dédié aux provisions fiscales (les échéances ne sont plus des surprises), et une réserve de sécurité de 3 mois de charges fixes (les imprévus cessent d'être des urgences).",
      },
    ],
    ctaText: "Voir si mon entreprise est en danger",
    ctaDescription: "Le diagnostic trésorerie gratuit vous dit exactement où vous en êtes.",
    ctaLink: "/diagnostic/",
    ctaLabel: "Parler à un expert — c'est gratuit →",
  },

  "combien-reserve-securite-tpe": {
    sections: [
      {
        heading: "La règle des 3 mois — pourquoi ce chiffre",
        paragraphs: [
          "Trois mois de charges fixes couverts en réserve, c'est le seuil minimum recommandé. Voici ce que ça couvre :",
        ],
        list: [
          "Un client important qui paie avec 2 mois de retard",
          "Une panne d'équipement imprévue",
          "Un mois de faible activité (vacances, maladie, crise sectorielle)",
          "Une régularisation de cotisations sociales plus élevée que prévu",
        ],
      },
      {
        paragraphs: [
          "En dessous de 3 mois, le moindre imprévu devient une urgence financière. Au-dessus, vous avez la sérénité de décider — pas de réagir.",
        ],
      },
      {
        heading: "Comment calculer votre seuil de sécurité",
        paragraphs: [
          "Listez toutes vos charges fixes mensuelles : loyer professionnel, salaires et charges, cotisations sociales du dirigeant, abonnements et frais fixes, remboursements d'emprunts. Multipliez par 3. C'est votre réserve de sécurité minimum.",
          "Exemple : charges fixes mensuelles de 8 000 € → réserve minimum de 24 000 €.",
        ],
      },
      {
        heading: "Comment constituer cette réserve si vous partez de zéro",
        paragraphs: [],
      },
      {
        heading: "Méthode simple",
        paragraphs: [
          "Automatiser un virement de 10% de chaque encaissement sur un compte épargne dédié. Ne touchez pas à ce compte sauf urgence réelle. En 12 à 18 mois, vous avez votre réserve.",
        ],
      },
      {
        heading: "Méthode accélérée",
        paragraphs: [
          "Identifier et liquider les postes de dépenses non essentiels, négocier des délais fournisseurs plus longs, encaisser vos créances en retard. Chaque euro récupéré va sur ce compte.",
        ],
      },
      {
        heading: "Ce que ça change quand vous avez cette réserve",
        paragraphs: [
          "Vous pouvez dire non à un mauvais client. Vous pouvez attendre le bon moment pour signer un contrat. Vous pouvez traverser un mois difficile sans paniquer. La réserve de sécurité n'est pas une épargne passive — c'est un outil de liberté décisionnelle.",
        ],
      },
    ],
    ctaText: "Faire le diagnostic trésorerie gratuit",
    ctaDescription: "Découvrez exactement où en est votre réserve de sécurité.",
    ctaLink: "/diagnostic/",
    ctaLabel: "Faire le diagnostic gratuit →",
  },

  "combien-me-payer-independant-belgique": {
    sections: [
      {
        heading: "La question que tout le monde se pose et que personne ne pose à son comptable",
        paragraphs: [
          "C'est souvent la première vraie question d'un indépendant — et l'une des moins bien répondues. Voici la réponse simple.",
        ],
      },
      {
        heading: "Ce qui part avant que vous puissiez vous payer",
        paragraphs: [],
        list: [
          "Cotisations sociales : environ 20,5% de votre revenu net imposable. Facturées trimestriellement.",
          "TVA : si vous êtes assujetti, la TVA collectée appartient à l'État. Ne la dépensez pas.",
          "Impôts (IPP) : selon votre niveau de revenus, entre 25% et 50% de votre bénéfice imposable. À provisionner chaque mois.",
        ],
      },
      {
        heading: "Ce qu'il reste — un exemple concret",
        paragraphs: [
          "Indépendant avec 60 000 € de CA annuel et 15 000 € de charges professionnelles. Bénéfice : 45 000 €.",
        ],
        list: [
          "Cotisations sociales : environ 9 000 €",
          "Impôt IPP (taux moyen estimé) : environ 14 000 €",
          "Reste disponible : environ 22 000 € net — soit 1 833 € par mois",
        ],
      },
      {
        paragraphs: [
          "Ce chiffre est indicatif. Il varie selon votre situation familiale, vos déductions, votre région et votre structure.",
        ],
      },
      {
        heading: "Comment augmenter ce qu'il vous reste",
        paragraphs: [],
        list: [
          "1. Déduire tous vos frais professionnels réels — bureau, voiture, téléphone, formation, abonnements",
          "2. Envisager le passage en société — avantageux généralement à partir de 40 000 à 60 000 € de bénéfice net",
          "3. Optimiser vos cotisations sociales — demander une réduction des cotisations provisoires si vos revenus réels sont inférieurs",
        ],
      },
      {
        heading: "La règle simple à retenir",
        paragraphs: [
          "Sur chaque euro que vous encaissez, provisionnez immédiatement 40 à 45% pour les charges fiscales et sociales. Ce qui reste, vous pouvez vous le payer.",
        ],
      },
    ],
    faq: [
      {
        question: "Combien de charges sociales paie un indépendant en Belgique ?",
        answer: "Les cotisations sociales d'un indépendant à titre principal représentent environ 20,5% du revenu net imposable, avec un minimum annuel d'environ 900 € par trimestre en 2026 pour un débutant. Elles sont facturées trimestriellement et régularisées l'année suivante.",
      },
      {
        question: "Comment calculer son salaire net quand on est indépendant en Belgique ?",
        answer: "Partez de votre CA, déduisez vos charges professionnelles pour obtenir votre bénéfice brut. Déduisez ensuite les cotisations sociales (environ 20,5%) puis l'IPP selon votre tranche marginale. Ce qui reste est votre revenu net disponible.",
      },
    ],
    ctaText: "Prendre rendez-vous",
    ctaDescription: "Premier échange gratuit pour analyser votre situation.",
    ctaLink: "/contact/",
    ctaLabel: "Faire le diagnostic gratuit →",
  },

  "je-paye-trop-impots-belgique": {
    sections: [
      {
        heading: "La réponse courte : probablement oui",
        paragraphs: [
          "La Belgique est l'un des pays où la pression fiscale sur les revenus professionnels est la plus élevée d'Europe. Un dirigeant de TPE qui se rémunère classiquement — salaire + dividendes standards — peut supporter une charge fiscale et sociale de 45 à 55% sur ses revenus.",
          "Mais voici ce que beaucoup de dirigeants ne savent pas : une grande partie de cette charge est légalement réductible. Pas par de l'optimisation agressive. Par l'utilisation correcte des dispositifs fiscaux belges existants — que votre comptable connaît peut-être, mais n'applique pas toujours proactivement.",
        ],
      },
      {
        heading: "Combien payez-vous vraiment ? Un calcul concret",
        paragraphs: [
          "Prenons un dirigeant avec une société qui génère 100 000 € de bénéfice avant impôt :",
        ],
        list: [
          "ISOC sur le bénéfice : 20 000 à 25 000 € (taux 20% PME ou 25% standard)",
          "Précompte mobilier sur dividendes : 15 à 30% selon le dispositif utilisé",
          "Cotisations sociales sur salaire dirigeant : environ 20,5% du revenu net",
          "IPP sur le salaire : selon tranche marginale, entre 25% et 50%",
        ],
      },
      {
        paragraphs: [
          "En optimisant correctement la combinaison de ces éléments, la charge fiscale globale peut être réduite de 20 à 30% sans aucune zone grise.",
        ],
      },
      {
        heading: "Les 5 leviers sous-utilisés par les dirigeants belges",
        paragraphs: [],
        list: [
          "1. Le VVPRbis — dividendes à 15% au lieu de 30% pour les PME éligibles",
          "2. La réserve de liquidation — mise en réserve des bénéfices avec taxe de 10% maintenant, distribution à 5% dans 5 ans",
          "3. La déduction pour investissement — jusqu'à 25% de majoration sur certains investissements",
          "4. L'optimisation salaire/dividendes — trouver l'équilibre qui minimise la charge globale",
          "5. La société de management — facturer vos prestations via une structure séparée pour optimiser la remontée de revenus",
        ],
      },
      {
        heading: "Ce que ça change concrètement",
        paragraphs: [
          "Un dirigeant avec 100 000 € de bénéfice qui optimise correctement sa situation peut économiser 15 000 à 25 000 € de charges fiscales annuelles — légalement, durablement, en utilisant uniquement les dispositifs prévus par le législateur belge.",
          "La question n'est pas de savoir si vous payez trop d'impôts. La question est de savoir si quelqu'un s'occupe activement de les réduire tout au long de l'année — pas juste au moment de la déclaration.",
        ],
      },
    ],
    faq: [
      {
        question: "Quel est le taux d'imposition réel d'un dirigeant de TPE en Belgique ?",
        answer: "La charge fiscale et sociale effective d'un dirigeant de TPE belge varie entre 40% et 55% selon le mode de rémunération choisi et les dispositifs utilisés. Sans optimisation, elle se situe généralement autour de 45-50%. Avec une structuration correcte, elle peut descendre à 30-35% sans aucune zone grise.",
      },
      {
        question: "Est-il légal de réduire ses impôts en Belgique ?",
        answer: "Oui — absolument. La loi fiscale belge prévoit de nombreux dispositifs d'optimisation légaux : VVPRbis, réserve de liquidation, déduction pour investissement, frais professionnels déductibles, optimisation salaire/dividendes. Ces dispositifs existent précisément pour être utilisés. Les utiliser n'est pas de l'évasion fiscale — c'est de la planification fiscale responsable.",
      },
      {
        question: "Mon comptable devrait-il s'occuper de mon optimisation fiscale ?",
        answer: "Un bon expert-comptable ne se limite pas à déclarer vos revenus — il devrait vous informer proactivement des dispositifs applicables à votre situation et les mettre en place. Si vous découvrez votre charge fiscale en fin d'année sans avoir eu de conseil en cours d'année, vous n'avez peut-être pas le bon niveau de service.",
      },
    ],
    ctaText: "Parler à un expert — c'est gratuit",
    ctaDescription: "Découvrez combien vous pourriez économiser légalement.",
    ctaLink: "/contact/",
    ctaLabel: "Voir si mon entreprise est en danger →",
  },

  "pourquoi-comptable-aide-pas": {
    sections: [
      {
        heading: "Une question légitime que beaucoup n'osent pas poser",
        paragraphs: [
          "Vous avez un comptable. Il fait vos déclarations. Et pourtant, quand vous avez une décision importante à prendre, vous ne savez pas vraiment quoi faire. Ce n'est pas forcément la faute de votre comptable. Mais ce n'est pas normal non plus.",
        ],
      },
      {
        heading: "Ce que fait un comptable classique — et ce qu'il ne fait pas",
        paragraphs: [
          "Un comptable traditionnel est formé pour produire des chiffres conformes et les déclarer dans les délais. Ce qu'il ne fait généralement pas :",
        ],
        list: [
          "Il ne vous explique pas ce que vos chiffres signifient pour vos décisions à venir",
          "Il ne vous prévient pas quand une tension de trésorerie arrive dans 2 mois",
          "Il ne vous aide pas à décider si vous pouvez vous payer plus ce mois-ci",
          "Il ne modélise pas l'impact financier de votre prochain recrutement",
          "Il ne vous appelle pas quand quelque chose ne va pas dans vos comptes",
        ],
      },
      {
        heading: "Ce que vous méritez en plus",
        paragraphs: [
          "Un dirigeant de TPE en croissance a besoin de deux choses : un expert-comptable rigoureux qui produit des chiffres fiables et optimise votre fiscalité, ET un partenaire de pilotage qui utilise ces chiffres pour vous aider à décider. Chez MFinances, vous avez les deux — intégrés dans le même service.",
        ],
      },
      {
        heading: "Les signes que vous avez besoin de plus qu'un comptable",
        paragraphs: [],
        list: [
          "Vous recevez vos comptes annuels 6 mois après la clôture et vous ne les comprenez pas vraiment",
          "Vous ne savez pas ce que sera votre trésorerie dans 60 jours",
          "Vous prenez vos décisions d'investissement à l'intuition",
          "Vous découvrez votre charge fiscale en fin d'année — toujours trop tard pour agir",
          "Vous avez l'impression que votre comptable travaille pour l'administration fiscale, pas pour vous",
        ],
      },
      {
        paragraphs: [
          "Si vous vous reconnaissez dans au moins deux de ces situations, un premier échange avec MFinances vous donnera une vision claire de ce qui manque. Même si vous ne voulez pas changer de comptable. Même si vous ne comprenez pas encore tous vos chiffres.",
        ],
      },
    ],
    faq: [
      {
        question: "Mon comptable doit-il m'expliquer mes chiffres ?",
        answer: "Oui — un bon expert-comptable ne se contente pas de produire vos déclarations. Il devrait vous expliquer ce que vos résultats signifient, vous alerter sur les anomalies et vous aider à anticiper votre situation fiscale.",
      },
      {
        question: "Quelle différence entre un comptable et un expert-comptable en Belgique ?",
        answer: "En Belgique, l'expert-comptable est un titre protégé, réglementé par l'ITAA. Il est habilité à certifier les comptes, donner des conseils fiscaux et représenter ses clients. Un comptable sans ce titre peut tenir la comptabilité mais n'a pas les mêmes responsabilités légales ni le même champ d'intervention.",
      },
    ],
    ctaText: "Prendre rendez-vous — premier échange gratuit",
    ctaDescription: "Découvrez ce qu'un vrai partenaire financier fait différemment.",
    ctaLink: "/contact/",
    ctaLabel: "Faire le diagnostic gratuit →",
  },

  "suis-je-rentable-tpe": {
    sections: [
      {
        heading: "La question qu'on n'ose pas poser",
        paragraphs: [
          "Vous travaillez beaucoup. Vous avez des clients. Vous encaissez. Et pourtant, vous n'êtes pas vraiment sûr que votre entreprise gagne de l'argent. Pas clairement. Pas avec certitude. C'est plus courant qu'on ne le croit. Et ce n'est pas une question de compétence — c'est une question d'outils.",
        ],
      },
      {
        heading: "Ce que 'rentable' veut vraiment dire",
        paragraphs: [
          "Votre entreprise est rentable si elle génère plus de revenus qu'elle ne dépense — charges comprises, y compris votre propre rémunération. C'est là que beaucoup de dirigeants se trompent : ils calculent la rentabilité sans inclure leur propre salaire dans les charges. Si vous ne vous payiez pas, vous seriez rentable. Mais puisque vous vous payez — êtes-vous toujours rentable ?",
        ],
      },
      {
        heading: "3 questions pour savoir si vous êtes rentable",
        paragraphs: [],
      },
      {
        heading: "Question 1 — Connaissez-vous votre marge brute ?",
        paragraphs: [
          "Marge brute = (CA - coût direct des ventes) / CA × 100. Si vous ne connaissez pas ce chiffre, vous pilotez à l'aveugle.",
        ],
      },
      {
        heading: "Question 2 — Votre CA couvre-t-il toutes vos charges fixes + votre rémunération ?",
        paragraphs: [
          "Listez toutes vos charges mensuelles — y compris ce que vous vous payez. Si votre CA moyen mensuel couvre ces charges avec un surplus, vous êtes rentable.",
        ],
      },
      {
        heading: "Question 3 — Avez-vous gagné plus cette année que l'année précédente — en travaillant autant ou moins ?",
        paragraphs: [
          "La rentabilité, c'est aussi l'amélioration dans le temps. Si vous travaillez autant mais gagnez moins — quelque chose ne fonctionne pas dans votre modèle.",
        ],
      },
      {
        heading: "Par où commencer si vous ne savez pas",
        paragraphs: [
          "Même si vous ne comprenez pas encore tous vos chiffres, un expert-comptable peut vous donner une vision claire de votre rentabilité en une séance. Pas avec des tableaux compliqués — avec des réponses à vos vraies questions. Chez MFinances, on commence toujours par là.",
        ],
      },
    ],
    faq: [
      {
        question: "Comment savoir si mon entreprise est rentable ?",
        answer: "Comparez vos revenus totaux à l'ensemble de vos charges — y compris votre propre rémunération et les charges sociales associées. Si le solde est positif de façon régulière, votre entreprise est rentable.",
      },
      {
        question: "Mon entreprise peut-elle survivre si elle n'est pas encore rentable ?",
        answer: "Oui — à condition d'avoir suffisamment de trésorerie pour financer les pertes en attendant le point mort. Le risque est de manquer de cash avant d'atteindre la rentabilité. C'est pourquoi le suivi de trésorerie est aussi important que le suivi de rentabilité.",
      },
      {
        question: "Quelle est la différence entre rentabilité et trésorerie ?",
        answer: "La rentabilité mesure si votre activité génère de la valeur sur le long terme. La trésorerie mesure si vous avez de l'argent disponible maintenant pour payer vos charges. Les deux indicateurs sont indispensables.",
      },
    ],
    ctaText: "Voir si mon entreprise est en danger",
    ctaDescription: "Le diagnostic gratuit vous dit exactement où vous en êtes.",
    ctaLink: "/diagnostic/",
    ctaLabel: "Prendre rendez-vous — premier échange gratuit →",
  },
  "bfr-dossier-bancaire-credit-tpe": {
    sections: [
      {
        paragraphs: [
          "Vous avez décroché un rendez-vous avec votre conseiller bancaire. Crédit d'investissement, ligne de crédit, leasing — peu importe. La première chose qu'il va analyser, c'est votre BFR. Et si vous n'êtes pas préparé à cette question, vous perdez votre crédibilité avant même d'avoir parlé de votre projet.",
          "Ce guide vous explique ce que votre banquier cherche vraiment derrière ce chiffre, comment interpréter votre propre BFR, et les 3 leviers pour améliorer votre position avant de vous asseoir en face de lui.",
        ],
      },
      {
        heading: "Ce que votre banquier lit dans votre BFR avant même de vous écouter",
        paragraphs: [
          "Pour une banque, votre BFR est un indicateur de risque opérationnel. Un BFR élevé et non maîtrisé lui dit que votre entreprise a besoin de financement juste pour faire tourner son activité quotidienne — avant même de rembourser un crédit supplémentaire.",
          "Beaucoup de dirigeants arrivent en rendez-vous bancaire avec leurs bilans comptables sous le bras. La banque, elle, regarde surtout l'évolution du BFR sur 3 ans — pas le solde d'une année. Une tendance à la hausse sans explication, c'est le signal qui bloque les dossiers.",
          "Concrètement, le banquier se pose trois questions :",
        ],
        list: [
          "Votre BFR est-il cohérent avec votre secteur et votre taille ? Un BFR de 60 jours de CA est normal dans le bâtiment. Il serait inquiétant dans la restauration.",
          "Votre BFR est-il stable, en baisse ou en hausse ? Un BFR qui augmente plus vite que le CA signale une perte de contrôle.",
          "Comment votre BFR est-il financé ? Fonds propres, ligne de crédit court terme, découvert ? La structure du financement dit beaucoup sur la santé réelle.",
        ],
      },
      {
        heading: "Mini-cas — Société de services B2B, 12 employés, Liège",
        paragraphs: [
          "Situation : demande de crédit d'investissement de 120 000 € pour acquérir un outil de production. Problème : BFR passé de 35 000 € à 78 000 € en 18 mois — sans explication préparée.",
          "Réaction de la banque : dossier mis en attente. « Expliquez-nous d'abord pourquoi votre BFR a doublé. »",
          "Ce que MFinances a fait : reconstitution de l'historique BFR, narration sectorielle (croissance CA +40 %), plan de réduction sur 6 mois. Dossier accepté 3 semaines après.",
          "Leçon : ce n'est pas le BFR qui a bloqué le crédit. C'est l'absence d'explication.",
        ],
      },
      {
        heading: "Ce que votre BFR dit à votre banquier — la lecture derrière les chiffres",
        paragraphs: [],
        table: {
          headers: ["Ce que voit le banquier", "Ce qu'il en déduit"],
          rows: [
            ["BFR stable, bien financé, cohérent avec le secteur", "Entreprise bien gérée. Risque modéré. Crédit envisageable."],
            ["BFR en hausse rapide sans explication claire", "Perte de contrôle opérationnel. Risque d'impayés clients. Prudence."],
            ["BFR négatif", "Modèle favorable — encaissements avant décaissements. Bon signal."],
            ["BFR financé principalement par découvert", "Signal d'alarme : la tréso courante dépend du crédit. Risque systémique."],
            ["BFR présenté sans contexte sectoriel", "Dirigeant peu au fait de sa situation financière. Perte de confiance."],
          ],
        },
      },
      {
        heading: "3 erreurs fréquentes qui font échouer un dossier de crédit",
        paragraphs: [
          "Erreur 1 — Présenter un BFR brut sans contexte sectoriel. Votre banquier ne connaît pas forcément les spécificités de votre secteur. Si votre BFR de 60 jours est la norme dans votre activité, dites-le explicitement — avec des références si possible.",
          "Erreur 2 — Arriver avec un BFR en hausse sans plan d'action. Une tendance à la hausse est acceptable si elle est expliquée (croissance du CA) et accompagnée d'un plan de stabilisation. Sans ce plan, c'est un facteur de refus.",
          "Erreur 3 — Confondre BFR et trésorerie disponible. Plusieurs dirigeants présentent leur solde bancaire comme preuve de bonne santé. La banque sait que trésorerie et BFR sont deux choses différentes — et elle notera que vous confondez les deux.",
          "Chez les dirigeants que nous accompagnons, la troisième erreur est la plus fréquente. Un compte bien approvisionné peut coexister avec un BFR structurellement problématique — c'est précisément ce que la banque cherche à détecter.",
        ],
      },
      {
        heading: "Les 3 leviers pour améliorer votre BFR avant un dossier de crédit",
        paragraphs: [
          "Si vous avez 2 à 3 mois avant votre rendez-vous bancaire, ces trois actions peuvent améliorer significativement votre BFR :",
        ],
        list: [
          "Accélérer les encaissements clients : facturer immédiatement à la livraison, relancer à J+30 sans exception, proposer un escompte de 1 à 2 % pour paiement sous 10 jours. Réduire le DSO de 45 à 30 jours sur un CA de 600 000 € libère 25 000 € de trésorerie.",
          "Solder les stocks dormants : identifier les références à faible rotation et les liquider avant la clôture présentée à la banque. Chaque euro de stock vendu améliore directement le BFR.",
          "Allonger les délais fournisseurs : renégocier de 30 à 45 jours là où vos relations le permettent. C'est le levier le plus rapide — et il n'a aucun impact sur votre activité.",
        ],
      },
      {
        heading: "Vu chez nos clients MFinances",
        paragraphs: [
          "Un client commerce Bruxelles a réduit son DSO de 52 à 34 jours en 2 mois via une procédure de relance systématique — libérant 31 000 € de trésorerie visible dans son bilan avant son dossier bancaire.",
          "Un client services B2B Liège a négocié ses délais fournisseurs de 30 à 45 jours avec ses 4 principaux prestataires — améliorant son BFR de 18 000 € sans toucher à son activité commerciale.",
          "Un client Horeca Anvers a soldé 22 références à rotation inférieure à 3 fois par an, récupérant 14 000 € de stocks immobilisés avant sa demande de ligne de crédit.",
        ],
      },
      {
        heading: "Ce qu'un DAF externalisé apporte dans la préparation d'un dossier bancaire",
        paragraphs: [
          "Préparer un dossier bancaire solide ne se résume pas à imprimer vos bilans. Le banquier attend une narration financière cohérente : voici d'où vous venez, voici où vous en êtes, voici où vous allez, et voici comment vous allez y arriver sans risquer votre structure.",
          "C'est exactement ce que construit un DAF à temps partiel. Il modélise votre BFR prévisionnel, construit vos projections à 18 mois, identifie les angles faibles de votre dossier avant que le banquier ne les pointe — et vous prépare aux questions difficiles.",
          "« Arrêtez de vous présenter en demandeur de crédit. Présentez-vous en chef d'entreprise qui pilote. La banque prête à ceux qui prouvent qu'ils maîtrisent leurs chiffres. » — Mika Musungayi, fondateur MFinances",
        ],
      },
    ],
    faq: [
      {
        question: "Pourquoi la banque regarde mon BFR avant de m'accorder un crédit ?",
        answer: "Votre BFR indique à la banque comment vous financez votre cycle d'activité quotidien. Un BFR élevé et non maîtrisé signale que votre entreprise a besoin de financement avant même d'absorber une nouvelle dette. La banque analyse la stabilité, la tendance sur 2 à 3 ans, et le mode de financement du BFR pour évaluer votre risque opérationnel réel.",
      },
      {
        question: "Quel BFR est acceptable pour obtenir un crédit en Belgique ?",
        answer: "Il n'existe pas de seuil universel — la banque compare votre BFR à votre secteur. Ce qui importe : que votre BFR soit stable, documenté et cohérent avec votre activité. Un BFR élevé mais maîtrisé et en baisse est meilleur qu'un BFR modéré mais croissant sans explication. En Belgique, les banques regardent particulièrement le ratio BFR/CA mensuel et son évolution sur 3 exercices.",
      },
      {
        question: "Comment améliorer son BFR rapidement avant un dossier bancaire ?",
        answer: "Trois leviers rapides et cumulables : (1) accélérer les encaissements clients en facturant immédiatement et en relançant à J+30 — réduire le DSO de 45 à 30 jours sur 600K€ de CA libère 25 000 € ; (2) solder les stocks à faible rotation avant la clôture présentée ; (3) négocier un allongement des délais fournisseurs de 30 à 45 jours. Avec 2 à 3 mois de préparation, ces actions combinées peuvent transformer significativement votre dossier.",
      },
      {
        question: "Un DAF externalisé peut-il m'aider à préparer mon dossier de crédit ?",
        answer: "Oui — c'est l'une de ses missions les plus courantes chez MFinances. Le DAF externalisé construit la narration financière attendue par la banque : modélisation du BFR prévisionnel, projections à 18 mois, identification des points faibles, préparation aux questions du banquier. Il transforme un dossier comptable en dossier financier stratégique — celui d'un dirigeant qui pilote.",
      },
    ],
    ctaText: "Mon dossier bancaire mérite mieux qu'un bilan",
    ctaDescription: "En discuter avec MFinances — premier échange offert, sans engagement.",
    ctaLink: "/contact/",
    ctaLabel: "Parler à un expert",
  },
  "bfr-definition-formule-tpe": {
    showCalculator: true,
    sections: [
      {
        paragraphs: [
          "Vous avez peut-être entendu ce mot chez votre comptable, dans un article financier, ou lors d'un rendez-vous bancaire. Le BFR — besoin en fonds de roulement — est l'un des indicateurs les plus importants pour la santé de votre entreprise. Et pourtant, il reste mystérieux pour la plupart des dirigeants de TPE.",
          "Cet article vous donne une définition claire, la formule exacte, et un exemple chiffré tiré de la réalité d'une TPE belge. À la fin, vous pourrez calculer votre propre BFR en deux minutes.",
        ],
      },
      {
        heading: "C'est quoi le BFR — la définition en trois phrases",
        paragraphs: [
          "Le besoin en fonds de roulement (BFR) représente le montant d'argent que votre entreprise doit mobiliser pour financer son cycle d'exploitation — c'est-à-dire la période entre le moment où vous payez vos charges (fournisseurs, salaires, stocks) et le moment où vous encaissez vos clients.",
          "En clair : c'est le décalage entre ce que vous devez payer et ce que vous avez déjà reçu. Plus ce décalage est important, plus votre trésorerie est sous pression — même si votre entreprise est rentable.",
          "Un BFR positif signifie que vous devez avancer de l'argent pour faire tourner votre activité. Un BFR négatif signifie que vous êtes payé avant de payer — un avantage de trésorerie précieux.",
          "La question que posent le plus souvent les dirigeants que nous rencontrons : « Comment mon entreprise peut-elle faire des bénéfices et avoir un compte bancaire aussi serré ? » La réponse, presque toujours, commence par le BFR.",
        ],
      },
      {
        heading: "La formule du BFR — simple et directe",
        paragraphs: [
          "BFR = Stocks + Créances clients − Dettes fournisseurs",
        ],
        list: [
          "Stocks : la valeur de tout ce que vous avez acheté et pas encore vendu.",
          "Créances clients : le montant des factures émises mais pas encore encaissées.",
          "Dettes fournisseurs : le montant des factures reçues mais pas encore payées.",
        ],
      },
      {
        heading: "Un exemple chiffré — la TPE de Sophie à Liège",
        paragraphs: [
          "Sophie dirige une agence de communication B2B à Liège, 7 collaborateurs, CA annuel de 780 000 €. Voici sa situation au 31 mars :",
        ],
        table: {
          headers: ["Élément", "Montant"],
          rows: [
            ["Stocks (fournitures et matériel non facturé)", "5 200 €"],
            ["Créances clients (factures émises non payées)", "68 000 €"],
            ["Dettes fournisseurs (factures reçues non payées)", "11 500 €"],
            ["BFR = 5 200 + 68 000 − 11 500", "= 61 700 €"],
          ],
        },
      },
      {
        paragraphs: [
          "Sophie doit disposer de 61 700 € en permanence pour financer son cycle d'exploitation. Ce montant représente près de 2,9 mois de CA mensuel moyen — une charge de trésorerie significative. La principale cause : ses clients paient en moyenne à 52 jours, alors que ses fournisseurs sont réglés à 30 jours.",
          "Action MFinances : mise en place d'une procédure de relance systématique à J+30 + J+45. Résultat 3 mois plus tard : DSO réduit à 38 jours, BFR allégé de 28 000 €. Impact concret : Sophie a pu financer le recrutement d'un chef de projet sans avoir recours à une ligne de crédit supplémentaire.",
        ],
      },
      {
        heading: "BFR positif ou négatif — lequel est dangereux ?",
        paragraphs: [],
        table: {
          headers: ["Situation", "Ce que ça signifie"],
          rows: [
            ["BFR positif modéré", "Vous financez votre cycle d'activité — normal. Surveiller que le BFR ne croît pas plus vite que le CA."],
            ["BFR positif élevé (> 2 mois de CA)", "Signal d'attention : vos clients paient trop tard, vos stocks sont trop lourds, ou votre croissance consomme plus de cash qu'elle n'en génère."],
            ["BFR négatif", "Avantage de trésorerie — typique du commerce ou des abonnements prépayés. À préserver."],
            ["BFR en hausse rapide", "Urgence : chaque mois sans action alourdit la structure. C'est ce qui précède les crises de trésorerie."],
          ],
        },
      },
      {
        heading: "Pourquoi le BFR augmente quand votre entreprise grandit",
        paragraphs: [
          "C'est le paradoxe que beaucoup de dirigeants découvrent trop tard : plus votre activité croît, plus votre BFR augmente mécaniquement. Vous décrochez un nouveau contrat important ? Vous devez acheter des fournitures, recruter, livrer — avant d'être payé.",
          "L'entreprise est rentable sur le papier. Le compte en banque, lui, flirte avec le rouge. C'est précisément à ce stade que le pilotage financier devient indispensable — pas quand la crise arrive, mais trois mois avant.",
          "Parmi nos clients en phase de croissance active (CA > 500K€), 7 sur 10 ont un BFR qui croît plus vite que leur CA au moment où ils nous contactent. L'entreprise type qui nous appelle : rentable, bien gérée opérationnellement, mais pilotée à l'intuition sur la trésorerie. Le BFR non maîtrisé est presque toujours l'angle mort.",
        ],
      },
      {
        heading: "Les 3 leviers pour réduire votre BFR",
        paragraphs: [],
        list: [
          "Réduire les délais de paiement clients : facturer dès la livraison, relancer à J+30, proposer des escomptes pour paiement rapide. Chaque semaine gagnée libère de la trésorerie.",
          "Optimiser vos stocks : identifier les articles à faible rotation, négocier des livraisons plus fréquentes en plus petites quantités, mettre en place un suivi des rotations par référence.",
          "Négocier des délais fournisseurs : allonger vos délais de paiement de 30 à 45 jours là où c'est possible réduit directement votre BFR sans toucher à votre activité.",
        ],
      },
      {
        heading: "BFR, trésorerie nette et fonds de roulement — les 3 notions à ne pas confondre",
        paragraphs: [],
        table: {
          headers: ["Notion", "Définition", "Ce que ça mesure"],
          rows: [
            ["Fonds de roulement (FR)", "Capitaux permanents − Actif immobilisé", "Capacité de financement à long terme"],
            ["BFR", "Stocks + Créances − Dettes fournisseurs", "Besoin de financement du cycle d'activité"],
            ["Trésorerie nette", "FR − BFR", "Ce qu'il vous reste réellement disponible"],
          ],
        },
      },
      {
        paragraphs: [
          "La trésorerie nette est la résultante des deux : si votre FR est inférieur à votre BFR, votre trésorerie est en déficit structurel — quelle que soit votre rentabilité. C'est le diagnostic que pose MFinances dès le premier rendez-vous.",
        ],
      },
    ],
    faq: [
      {
        question: "C'est quoi le BFR (besoin en fonds de roulement) ?",
        answer: "Le BFR est le montant d'argent qu'une entreprise doit mobiliser en permanence pour financer le décalage entre ses dépenses (stocks, salaires, fournisseurs) et ses encaissements clients. Formule : BFR = Stocks + Créances clients − Dettes fournisseurs. Un BFR positif signifie que votre trésorerie finance votre activité avant d'être remboursée.",
      },
      {
        question: "Comment calculer son BFR ?",
        answer: "Additionnez vos stocks et vos créances clients, puis soustrayez vos dettes fournisseurs. Exemple belge : une agence de communication à Liège avec 5 200 € de stocks, 68 000 € de créances et 11 500 € de dettes fournisseurs obtient un BFR de 61 700 €.",
      },
      {
        question: "Un BFR négatif est-il bon ou mauvais ?",
        answer: "Un BFR négatif est généralement un avantage : vous encaissez vos clients avant de payer vos fournisseurs. C'est typique des commerces à paiement comptant et des abonnements prépayés. Attention : un BFR négatif artificiel peut signaler une pression excessive sur les fournisseurs.",
      },
      {
        question: "Pourquoi mon BFR augmente quand mon chiffre d'affaires croît ?",
        answer: "La croissance consomme mécaniquement plus de trésorerie : plus de stocks à financer, plus de créances en attente. C'est le « cash trap » de la croissance. Une TPE qui double son CA sans anticiper l'augmentation de son BFR peut se retrouver en tension de trésorerie malgré une activité florissante.",
      },
      {
        question: "Quelle différence entre BFR et trésorerie ?",
        answer: "Le BFR mesure le besoin de financement du cycle d'exploitation. La trésorerie nette est la différence entre le fonds de roulement (capacité de financement structurelle) et le BFR. Une entreprise peut avoir un BFR élevé mais une bonne trésorerie si ses capitaux permanents sont suffisants — et inversement.",
      },
    ],
    ctaText: "Un expert MFinances analyse votre BFR avec vous — gratuitement",
    ctaDescription: "Premier échange offert, sans engagement.",
    ctaLink: "/contact/",
    ctaLabel: "Parler à un expert",
  },
  "bfr-recrutement-impact-tresorerie": {
    sections: [
      {
        paragraphs: [
          "Vous avez décidé de recruter. C'est une bonne nouvelle — cela signifie que votre activité croît. Mais avant de signer ce contrat, il y a un calcul que la plupart des dirigeants de TPE ne font pas. Et son absence peut transformer votre plus belle décision de croissance en une tension de trésorerie sévère.",
          "Ce calcul, c'est l'impact du recrutement sur votre BFR — et par ricochet, sur votre trésorerie disponible dans les 3 à 6 mois qui suivent l'embauche.",
        ],
      },
      {
        heading: "Pourquoi recruter augmente mécaniquement votre BFR",
        paragraphs: [
          "Un recrutement ne se limite pas à un salaire mensuel. Il génère une série de charges immédiates et différées qui alourdissent votre BFR avant que le nouveau collaborateur ne contribue à vos revenus :",
        ],
        list: [
          "Les charges sociales patronales : en Belgique, le coût employeur total représente environ 1,33 fois le salaire brut. Pour un salaire brut de 3 000 €, le coût réel mensuel est de 3 990 €.",
          "Le délai de montée en compétences : selon le poste, un nouveau collaborateur atteint sa pleine productivité entre 1 et 6 mois après son arrivée. Pendant cette période, vous payez sans percevoir la contrepartie.",
          "L'augmentation du cycle d'activité : un collaborateur supplémentaire génère souvent plus de projets, plus de stocks, plus de créances — donc un BFR plus élevé avant que les encaissements suivent.",
          "Les coûts de recrutement et d'équipement : matériel, formation, cabinet éventuel — ces dépenses ponctuelles s'ajoutent à la charge de trésorerie de la période de lancement.",
        ],
      },
      {
        paragraphs: [
          "La question qu'on nous pose le plus souvent : « J'ai les bénéfices, mais est-ce que j'ai la trésorerie ? » C'est exactement la bonne question — et la réponse passe par le calcul de l'impact BFR du recrutement, pas par le solde bancaire du jour.",
        ],
      },
      {
        heading: "Le calcul que personne ne fait avant d'embaucher",
        paragraphs: [
          "Mini-cas — David — entreprise de sécurité, Namur, 9 salariés. Contexte : carnet de commandes plein, décision de recruter un technicien supplémentaire.",
        ],
        table: {
          headers: ["Élément", "Montant"],
          rows: [
            ["Salaire brut mensuel", "2 800 €"],
            ["Coût employeur réel (×1,33)", "3 724 € / mois"],
            ["Délai de montée en charge", "4 mois"],
            ["Coût total montée en charge", "14 896 €"],
            ["Équipement + tenue + formation", "3 200 €"],
            ["Impact BFR immédiat total", "18 096 €"],
          ],
        },
      },
      {
        paragraphs: [
          "Trésorerie disponible de David au moment de la décision : 21 000 €. Verdict MFinances : recrutement possible, mais à monitorer mensuellement. Un second recrutement simultané aurait été déconseillé.",
          "Ce n'est pas un argument contre le recrutement. C'est un argument pour ne pas recruter sans avoir modélisé cet impact sur votre trésorerie disponible.",
        ],
      },
      {
        heading: "3 scénarios selon votre situation de trésorerie actuelle",
        paragraphs: [],
        table: {
          headers: ["Scénario", "Ce que ça implique"],
          rows: [
            ["Tréso disponible > 2× le coût de montée en charge", "✅ Feu vert. Vous absorbez l'impact BFR sans risque. Recrutez et suivez mensuellement."],
            ["Tréso disponible entre 1× et 2× le coût", "⚠️ Feu orange. Recrutement possible avec suivi renforcé. Mettez en place le prévisionnel avant de signer."],
            ["Tréso disponible < 1× le coût de montée en charge", "🚨 Feu rouge. Recrutez en finançant l'impact BFR (ligne crédit, timing décalé) ou attendez 1 à 2 mois."],
          ],
        },
      },
      {
        heading: "Le délai de rentabilisation — comment le calculer",
        paragraphs: [
          "Délai (mois) = Coût total montée en charge ÷ Contribution mensuelle nette attendue",
          "Exemple : coût de montée en charge de 18 096 € ÷ contribution mensuelle nette attendue de 5 500 € = 3,3 mois. Votre recrutement est rentabilisé au bout de 3,3 mois — à condition que la contribution soit au rendez-vous.",
          "C'est ce calcul que réalise un DAF à temps partiel avant chaque décision de recrutement structurant. Pas pour bloquer la décision — pour la prendre avec les yeux ouverts.",
        ],
      },
      {
        heading: "3 erreurs fréquentes avant de recruter",
        paragraphs: [
          "Erreur 1 — Se baser sur le solde bancaire du jour. Votre compte peut sembler bien approvisionné aujourd'hui. Mais votre trésorerie dans 3 mois, après les charges de début de trimestre, la TVA et le premier mois de salaire — c'est une autre histoire.",
          "Erreur 2 — Sous-estimer le délai de montée en productivité. Pour un poste commercial ou technique, 2 à 3 mois est souvent optimiste. Modélisez le scénario à 5 mois, et vérifiez que vous tenez.",
          "Erreur 3 — Recruter deux postes en simultané sans simulation. L'impact BFR se cumule. Deux recrutements simultanés peuvent représenter 35 000 à 40 000 € d'impact trésorerie en quelques semaines — sur une TPE de 600K€ de CA, c'est critique.",
        ],
      },
      {
        heading: "Vu chez nos clients MFinances",
        paragraphs: [
          "Un client services informatiques (Gand, 11 salariés) a simulé 3 scénarios de recrutement avec MFinances avant de décider. Il a choisi de décaler le second poste de 2 mois — évitant une tension de trésorerie qui aurait mis en danger le versement du 13e mois.",
          "Un client conseil (Bruxelles, 6 collaborateurs) a découvert lors de notre simulation que son recrutement commercial prévu serait rentabilisé en 4,8 mois — pas 2 comme il l'estimait. Il a ajusté sa projection de CA en conséquence.",
          "« Le meilleur recrutement est celui que vous avez modélisé avant de signer. Pas après avoir découvert la tension. » — Mika Musungayi, fondateur MFinances",
        ],
      },
    ],
    faq: [
      {
        question: "Comment un recrutement affecte-t-il la trésorerie d'une TPE ?",
        answer: "Un recrutement augmente immédiatement le BFR : charges patronales dès le premier mois (≈ +33 % du salaire brut), délai de montée en productivité de 1 à 6 mois selon le poste, coûts d'équipement et de formation. En Belgique, l'impact trésorerie total avant retour sur investissement dépasse régulièrement 15 000 à 20 000 € pour un poste à 3 000 € de salaire brut.",
      },
      {
        question: "Quel est le coût réel d'un recrutement pour une TPE belge ?",
        answer: "Le coût employeur mensuel réel est d'environ 1,33 fois le salaire brut en Belgique (charges patronales incluses). Pour un salaire brut de 3 000 €, le coût mensuel réel est de 3 990 €. En ajoutant le délai de montée en charge (2 à 5 mois selon le poste) et les frais annexes, l'impact total sur la trésorerie avant retour sur investissement dépasse souvent 15 000 à 20 000 €.",
      },
      {
        question: "Comment savoir si ma trésorerie peut supporter un recrutement ?",
        answer: "Calculez votre coût total de montée en charge (coût mensuel × délai de productivité + équipement). Comparez-le à votre trésorerie projetée dans 3 mois (pas aujourd'hui). Si elle couvre 2 fois ce montant : feu vert. Entre 1 et 2 fois : suivi renforcé nécessaire. En dessous : financez ou décalez le recrutement.",
      },
      {
        question: "À quel moment faut-il recruter dans une TPE en croissance ?",
        answer: "Le bon moment est celui où votre trésorerie prévisionnelle (sur 3 à 6 mois) peut absorber l'impact BFR sans tension. Recruter 2 mois trop tôt, au mauvais moment du cycle de trésorerie, peut fragiliser une entreprise par ailleurs solide. Un prévisionnel actualisé est l'outil indispensable pour prendre cette décision avec clarté.",
      },
    ],
    ctaText: "Modélisez votre recrutement avec un DAF MFinances",
    ctaDescription: "Premier échange offert — sans engagement.",
    ctaLink: "/contact/",
    ctaLabel: "Parler à un expert",
  },
  "seuil-de-rentabilite-multi-services": {
    showCockpit: true,
    sections: [
      {
        paragraphs: [
          "Vous avez calculé votre seuil de rentabilité. Vous atteignez le chiffre. Vous pensez être dans le vert.",
          "Pourtant, quelque chose cloche. La trésorerie reste tendue. Certains mois sont difficiles sans que vous compreniez pourquoi. Et cette sensation persistante que vous travaillez beaucoup — pour un résultat qui ne reflète pas l'effort fourni.",
          "Voici ce que personne ne vous dit : le seuil de rentabilité global d'une entreprise multi-services est une moyenne. Et comme toute moyenne, il peut masquer des réalités très différentes selon les lignes qui le composent.",
          "Un service ultra-rentable peut compenser un autre qui, lui, ne couvre même pas ses coûts directs. Résultat : votre chiffre global semble sain — mais une partie de votre activité vous coûte de l'argent en silence. C'est ce qu'on appelle l'angle mort de rentabilité.",
          "Dans cet article, vous allez comprendre pourquoi le calcul classique ne suffit pas dès que vous avez plusieurs offres — et comment utiliser notre Cockpit de Rentabilité pour voir, en moins de 60 secondes, quelle ligne porte votre business et laquelle le pèse.",
        ],
      },
      {
        heading: "Pourquoi le seuil de rentabilité classique ne fonctionne plus avec plusieurs services",
        paragraphs: [
          "Le seuil de rentabilité classique repose sur une formule simple : Charges fixes / Taux de marge sur coûts variables. Résultat : le chiffre d'affaires minimum à atteindre pour ne pas perdre d'argent.",
          "Cette formule est parfaite quand vous vendez un seul produit ou service à prix fixe. Elle devient trompeuse dès que votre offre se diversifie. Pourquoi ? Parce qu'elle suppose que chaque euro de CA contribue de la même façon à couvrir vos charges fixes — ce qui est rarement vrai.",
          "Exemple : un cabinet de conseil qui vend à la fois des formations (marge 70 %) et des audits ponctuels (marge 30 %) ne peut pas utiliser le même taux pour l'ensemble de son activité sans fausser le calcul.",
        ],
      },
      {
        heading: "L'effet de mix : la variable que personne ne surveille",
        paragraphs: [
          "L'effet de mix, c'est l'impact du changement de composition de vos ventes sur votre rentabilité globale. Si vous vendez davantage de votre service à faible marge ce mois-ci, votre seuil de rentabilité réel monte — même si votre CA est identique.",
          "Concrètement : vous pouvez atteindre votre point mort théorique et pourtant terminer le mois avec moins de cash qu'attendu. C'est l'effet de mix en action. Pour un dirigeant de TPE, ne pas comprendre cet effet, c'est naviguer avec un tableau de bord qui affiche une vitesse moyenne — sans voir que deux roues tournent à 200 km/h et deux autres à 40 km/h.",
        ],
      },
      {
        heading: "La méthode MSCV : calculer votre point mort quand vous avez plusieurs offres",
        paragraphs: [
          "La Marge Sur Coûts Variables (MSCV) est la part de chaque euro encaissé qui reste disponible pour couvrir vos charges fixes, après déduction des coûts directement liés à la production ou à la livraison du service.",
          "Quand vous avez plusieurs services, vous calculez cette marge pour chacun — puis vous pondérez par le poids de chaque service dans votre CA total. Vous obtenez un taux de marge pondéré, qui reflète la réalité de votre mix actuel.",
          "La formule du seuil de rentabilité devient alors : Charges fixes totales / Taux de marge pondéré = CA minimum à atteindre, compte tenu de votre mix actuel.",
        ],
      },
      {
        heading: "Exemple concret — 3 services",
        paragraphs: [],
        table: {
          headers: ["Service", "CA mensuel", "Marge", "Poids"],
          rows: [
            ["Service A (Formations)", "4 000 €", "70 %", "40 %"],
            ["Service B (Conseil)", "4 000 €", "55 %", "40 %"],
            ["Service C (Audits ponctuels)", "2 000 €", "30 %", "20 %"],
          ],
        },
      },
      {
        paragraphs: [
          "Taux pondéré = (70 % × 0,40) + (55 % × 0,40) + (30 % × 0,20) = 28 % + 22 % + 6 % = 56 %. Charges fixes : 5 000 €/mois. Seuil de rentabilité = 5 000 € / 56 % = 8 929 €/mois.",
          "⚠ Si le mix change (moins de formations, plus d'audits) : Nouveau taux pondéré = 48 % → Nouveau seuil = 10 417 €/mois. Le même CA peut ne plus suffire — simplement parce que le mix a évolué.",
        ],
      },
      {
        heading: "La contribution par service : identifier qui porte le business",
        paragraphs: [
          "Au-delà du seuil global, la vraie question est : quelle part de vos charges fixes chaque service contribue-t-il à couvrir ? Calculez, pour chaque service : Marge dégagée / Total des marges × 100. Vous obtenez le taux de contribution de chaque ligne.",
          "Un service qui représente 40 % de votre CA mais seulement 15 % de votre marge totale est un signal d'alerte. Il génère du volume mais pas de valeur. C'est l'angle mort qui pèse sur votre rentabilité — et qui est souvent invisible sans cet outil.",
        ],
      },
      {
        heading: "Ce que votre angle mort révèle sur votre pilotage",
        paragraphs: [
          "Découvrir un angle mort de rentabilité n'est pas une mauvaise nouvelle. C'est une information stratégique que la plupart de vos concurrents n'ont pas.",
          "Elle vous permet de prendre trois types de décisions concrètes : repriser ce service pour le rendre contributif, en réduire le volume pour concentrer votre énergie sur les lignes qui portent, ou l'éliminer si sa contribution nette est négative ou nulle.",
          "Ces décisions ont un impact direct sur votre trésorerie, votre capacité d'investissement et votre tranquillité d'esprit. Un dirigeant qui connaît ses marges par service ne pilote plus à l'aveugle — il pilote avec confiance.",
          "C'est précisément ce que nous construisons avec chaque client MFinances dans le cadre de nos forfaits contrôle de gestion : un tableau de bord de pilotage de votre rentabilité visible, compréhensible et actionnable — chaque mois.",
        ],
      },
    ],
    faq: [
      {
        question: "Comment calculer le seuil de rentabilité quand on a plusieurs produits ?",
        answer: "Calculez la marge sur coûts variables de chaque service séparément, puis pondérez par le poids de chaque service dans votre CA total. Divisez vos charges fixes totales par ce taux pondéré. Résultat : votre point mort réel, tenant compte de votre mix commercial actuel. Notre Cockpit de Rentabilité réalise ce calcul automatiquement.",
      },
      {
        question: "Qu'est-ce que la marge sur coûts variables pondérée ?",
        answer: "C'est la moyenne pondérée des marges de chaque service, où chaque marge est multipliée par le poids de ce service dans le CA total. Elle reflète la rentabilité réelle de votre mix d'activité — contrairement à une simple moyenne arithmétique qui ignorerait la composition de vos ventes.",
      },
      {
        question: "Mon seuil de rentabilité change-t-il si je vends plus d'un service que d'un autre ?",
        answer: "Oui — c'est l'effet de mix. Si vous vendez davantage d'un service à faible marge, votre taux pondéré baisse et votre seuil monte. Vous pouvez atteindre le même CA qu'un bon mois et pourtant être moins rentable. C'est pourquoi surveiller son mix est aussi important que surveiller son chiffre d'affaires.",
      },
      {
        question: "Comment savoir si un de mes services pèse sur ma rentabilité ?",
        answer: "Calculez sa marge contributive (CA du service × taux de marge) et divisez-la par la marge totale de l'entreprise. Si ce ratio est très inférieur à son poids dans le CA, c'est un signal d'alerte. Un service qui représente 35 % du CA mais seulement 12 % de la marge est un angle mort à corriger en priorité.",
      },
      {
        question: "Un expert-comptable peut-il m'aider à analyser ma rentabilité par service ?",
        answer: "Oui — c'est précisément le rôle du contrôle de gestion, l'un des services différenciants de MFinances. Nous construisons avec chaque client un tableau de bord de pilotage qui rend visible la rentabilité par ligne d'activité, chaque mois. C'est intégré dans nos forfaits dès l'offre Premium.",
      },
    ],
    ctaText: "Un expert MFinances analyse votre rentabilité avec vous",
    ctaDescription: "Premier échange offert — sans engagement.",
    ctaLink: "/contact/",
    ctaLabel: "Prendre rendez-vous",
  },

  "frais-professionnels-deductibles-belgique": {
    heroCta: { text: "→ Vérifier si ce frais est défendable", link: "/frais-defendables/" },
    sections: [
      {
        heading: "La vraie question n'est pas « qu'est-ce qui est déductible ? »",
        paragraphs: [
          "Quels frais sont réellement défendables en Belgique — et lesquels peuvent fragiliser votre dossier ? La vraie question n'est pas « qu'est-ce qui est déductible ? » C'est : ce frais est-il cohérent, justifiable et défendable en cas de contrôle ?",
          "En Belgique, un frais professionnel peut être légalement déductible et pourtant difficile à défendre sans la bonne documentation. L'administration fiscale ne vérifie pas seulement la loi — elle vérifie la cohérence globale de votre dossier : usage réel, justificatifs, proportionnalité, logique d'ensemble.",
          "Ce guide couvre les 30 catégories de frais les plus fréquentes pour les indépendants (IPP) et les dirigeants de société (ISOC). Pour chaque frais, nous précisons le régime légal, ce que le fisc vérifie concrètement, et comment défendre votre déduction.",
        ],
      },
      {
        heading: "Les trois niveaux de lecture d'un frais professionnel",
        paragraphs: [
          "Avant d'analyser frais par frais, comprendre la logique globale du contrôle fiscal belge.",
          "🟢 Défendable — cohérent, bien justifié, solide en cas de contrôle. La déduction peut être maintenue sans risque si la documentation est en ordre.",
          "🟡 À encadrer — des éléments manquent pour déduire sereinement. Avec la bonne méthode de ventilation et les justificatifs appropriés, la déduction peut être sécurisée.",
          "🔴 Zone sensible — ce frais peut fragiliser l'ensemble de votre dossier fiscal. Ne pas déduire sans analyse experte préalable.",
        ],
        ctaInline: { text: "→ Vérifier où se situe votre frais avec l'outil Frais Défendables", link: "/frais-defendables/" },
      },
      {
        heading: "Les principales catégories de frais professionnels — avec leur niveau de sensibilité fiscale",
        paragraphs: [],
      },
      {
        subheading: "Frais de mobilité",
        paragraphs: [
          "La voiture de société est le poste le plus complexe et le plus surveillé du dossier fiscal d'un dirigeant belge. Sa déductibilité dépend des émissions CO₂ du véhicule et de la date d'acquisition — le taux n'est pas fixe et évolue dans le temps. Si le véhicule est mis à disposition du dirigeant à des fins privées, un Avantage de Toute Nature (ATN) doit être calculé et déclaré à l'IPP. Un véhicule sans ATN déclaré constitue un risque fiscal majeur.",
          "Le carburant est déductible en corrélation directe avec le taux de déductibilité du véhicule. Le parking professionnel est déductible à 100% si le lien avec un déplacement professionnel est documenté. Le vélo électrique bénéficie d'un régime fiscal généralement favorable — à vérifier selon les modalités exactes de mise à disposition.",
        ],
        ctaInline: { text: "→ Vérifier si ce frais est défendable", link: "/frais-defendables/" },
      },
      {
        subheading: "Frais de représentation",
        paragraphs: [
          "Les repas d'affaires sont déductibles à 69% (art. 53, 7° CIR). Ce taux s'applique à la totalité de la dépense, y compris les boissons alcoolisées. Pour que la déduction soit défendable, la note du repas doit mentionner l'identité des convives et l'objet professionnel de la rencontre. Sans cette note, la déduction est fragile même si la souche TVA est disponible.",
          "Les cadeaux clients sont déductibles à 50% (art. 53, 1° CIR). La TVA n'est pas récupérable si le cadeau dépasse 50 EUR HTVA par bénéficiaire et par an. Un cadeau à la famille du dirigeant sans lien professionnel constitue un Avantage de Toute Nature.",
        ],
        ctaInline: { text: "→ Vérifier si ce frais est défendable", link: "/frais-defendables/" },
      },
      {
        subheading: "Frais de bureau",
        paragraphs: [
          "Le bureau à domicile est déductible si une pièce est réellement dédiée à l'activité professionnelle. Méthode standard : m² bureau ÷ m² total logement × charges éligibles (loyer ou valeur locative, énergie, assurance, entretien). Cette méthode doit être documentée et appliquée de manière cohérente d'un exercice à l'autre.",
          "Pour une société, le dirigeant propriétaire peut sous-louer une partie de son logement à la société. Ce loyer est déductible dans la limite de 5/3 du revenu cadastral indexé net imposable — au-delà, requalification en rémunération.",
        ],
        ctaInline: { text: "→ Vérifier si ce frais est défendable", link: "/frais-defendables/" },
      },
      {
        subheading: "Frais d'équipement et de téléphonie",
        paragraphs: [
          "Il n'existe pas de taux légal fixe pour la déduction du téléphone en Belgique. Un taux de 100% sur une ligne personnelle est statistiquement incompatible avec un usage privé réel. Si vous utilisez une ligne sociétaire dédiée, la déductibilité est totale et la discussion disparaît — c'est la solution la plus simple et la plus protectrice.",
          "L'ordinateur est déductible à 100% si l'usage est exclusivement professionnel. En cas d'usage mixte, une ventilation justifiée est nécessaire.",
        ],
        ctaInline: { text: "→ Vérifier si ce frais est défendable", link: "/frais-defendables/" },
      },
      {
        heading: "Les 6 erreurs les plus fréquentes en matière de frais professionnels",
        paragraphs: [],
        list: [
          "Déduire les amendes et pénalités — exclusion absolue par l'art. 53, 2° CIR, sans exception possible.",
          "Passer des frais de sport ou fitness en frais professionnels — systématiquement rejeté par l'administration belge.",
          "Déduire des vêtements classiques (costume, tailleur, chaussures de ville) — non déductibles selon la jurisprudence constante.",
          "Omettre la fiche 281.50 pour les sous-traitants — risque de cotisation spéciale de 100% sur le montant.",
          "Passer un véhicule privé en charges sociétaires sans structure adaptée — DNA quasi certaine.",
          "Croire qu'un pourcentage « habituel » suffit à justifier un frais — un repère pratique n'est pas une norme légale. Ce qui compte, c'est la cohérence entre le pourcentage revendiqué et l'usage réel.",
        ],
      },
      {
        heading: "Vérifiez si vos frais sont défendables",
        paragraphs: [
          "Utilisez l'outil gratuit Frais Défendables pour analyser votre dépense en 3 questions et obtenir un premier niveau de lecture : défendable, à encadrer, ou zone sensible.",
        ],
        ctaInline: { text: "→ Vérifier si ce frais est défendable", link: "/frais-defendables/" },
      },
    ],
    faq: [
      { question: "Dans quelles conditions un repas au restaurant est-il réellement défendable ?", answer: "Un repas d'affaires est défendable si vous conservez la souche TVA et rédigez une note mentionnant l'identité des convives et l'objet professionnel de la rencontre. La déductibilité est plafonnée à 69% (art. 53, 7° CIR). Sans note rédigée, la déduction peut être rejetée intégralement même avec la souche TVA." },
      { question: "Quel niveau de déduction est défendable pour un téléphone professionnel en Belgique ?", answer: "Il n'existe pas de pourcentage légal fixé pour la déduction du téléphone en Belgique. La part professionnelle déductible dépend de l'usage réel et doit pouvoir être justifiée au regard de la nature de l'activité. Un taux de 100% sur une ligne personnelle est statistiquement difficile à défendre." },
      { question: "Une voiture de société est-elle toujours défendable fiscalement ?", answer: "Non. La déductibilité dépend des émissions CO₂ et de la date d'acquisition. Si le dirigeant utilise le véhicule à des fins privées, un ATN doit être calculé et déclaré à l'IPP. Un véhicule sans ATN déclaré constitue un risque fiscal majeur." },
      { question: "Comment défendre un frais mixte en Belgique ?", answer: "Pour défendre un frais mixte, vous devez établir une méthode de ventilation documentée et cohérente avec la nature réelle de votre activité. Cette méthode doit être appliquée de manière constante. Le fisc vérifie la cohérence globale du dossier, pas chaque frais isolément." },
      { question: "Quels frais sont refusés systématiquement par le fisc belge ?", answer: "Certains frais sont exclus de manière absolue par le CIR (art. 53) : amendes et pénalités fiscales, frais de sport personnels, vêtements classiques (costumes, tailleurs), repas de midi sans déplacement professionnel avéré." },
      { question: "Qu'est-ce que la fiche 281.50 et quand est-elle obligatoire ?", answer: "La fiche 281.50 est obligatoire pour toute rémunération versée à des tiers indépendants dépassant 250 EUR par bénéficiaire et par an. Son absence peut entraîner une cotisation spéciale de 100% sur le montant versé." },
    ],
    ctaText: "Besoin d'un avis clair sur vos frais ?",
    ctaDescription: "MFinances vous aide à sécuriser vos dépenses professionnelles — premier échange gratuit.",
    ctaLink: "/contact/",
    ctaLabel: "Prendre rendez-vous avec MFinances",
  },
};
