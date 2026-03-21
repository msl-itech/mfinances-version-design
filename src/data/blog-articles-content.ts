export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
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
};
