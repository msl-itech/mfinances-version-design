export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
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
        paragraphs: [
          "On parle souvent de fidélisation pour le marketing. Mais son impact sur la trésorerie est tout aussi important — et souvent sous-estimé.",
        ],
      },
      {
        heading: "Un client fidèle coûte moins cher",
        paragraphs: [
          "Acquérir un nouveau client coûte en moyenne 5 à 7 fois plus cher que de conserver un client existant. Prospection, publicité, temps commercial — ces coûts pèsent sur votre trésorerie.",
          "Un client fidèle, en revanche, génère du chiffre d'affaires récurrent avec un coût d'acquisition nul.",
        ],
      },
      {
        heading: "Un client fidèle paie mieux",
        paragraphs: [
          "Les clients de longue date ont tendance à payer plus rapidement. La relation de confiance établie réduit les litiges et les retards de paiement. Votre DSO (délai moyen de paiement) s'améliore naturellement.",
        ],
      },
      {
        heading: "Comment fidéliser pour stabiliser votre trésorerie",
        paragraphs: ["Des actions concrètes :"],
        list: [
          "Mettez en place un suivi de satisfaction simple et régulier",
          "Proposez des contrats annuels ou des abonnements pour lisser vos revenus",
          "Offrez un service après-vente irréprochable",
          "Communiquez régulièrement sur la valeur que vous apportez",
          "Identifiez les clients à risque de départ — et agissez avant qu'il ne soit trop tard",
        ],
      },
    ],
  },
  "anticiper-flux-tresorerie": {
    sections: [
      {
        paragraphs: [
          "L'anticipation est le maître-mot de la gestion de trésorerie. Sans visibilité sur vos flux futurs, chaque décision financière est un pari.",
        ],
      },
      {
        heading: "Pourquoi la plupart des TPE pilotent à vue",
        paragraphs: [
          "Sans prévisionnel, vous découvrez vos problèmes de trésorerie quand ils se présentent. Il est alors trop tard pour réagir sereinement : vous devez emprunter en urgence, retarder vos paiements fournisseurs ou renoncer à des opportunités.",
          "Avec un prévisionnel actualisé, vous voyez les tensions arriver 2 à 3 mois à l'avance. Vous avez le temps de prendre des mesures : relancer un client, négocier un échéancier, reporter un investissement.",
        ],
      },
      {
        heading: "Comment construire un prévisionnel efficace",
        paragraphs: ["Un bon prévisionnel de trésorerie n'a pas besoin d'être complexe. Il doit contenir :"],
        list: [
          "Vos encaissements attendus — factures émises, dates de paiement prévues",
          "Vos décaissements planifiés — loyer, salaires, fournisseurs, échéances fiscales",
          "Vos échéances exceptionnelles — remboursements d'emprunt, investissements, régularisations",
          "Un solde prévisionnel par semaine ou par mois",
        ],
      },
      {
        heading: "La mise à jour mensuelle : indispensable",
        paragraphs: [
          "Un prévisionnel qui n'est pas mis à jour est un prévisionnel inutile. Chaque mois, il faut confronter vos prévisions aux données réelles : quels clients ont payé ? Quelles dépenses imprévues sont apparues ?",
          "Chez MFinances, le prévisionnel de trésorerie est inclus dans le forfait Excellence. Il est actualisé mensuellement sur vos données réelles pour que vous ayez toujours une vision fiable de vos 3 prochains mois.",
        ],
      },
    ],
  },
};
