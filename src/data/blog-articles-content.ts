interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

interface ArticleBody {
  sections: ArticleSection[];
}

export const articleContent: Record<string, ArticleBody> = {
  "tresorerie-vs-benefices": {
    sections: [
      {
        paragraphs: [
          "Beaucoup de dirigeants de TPE confondent bénéfice et trésorerie. Et c'est l'une des erreurs les plus dangereuses en gestion d'entreprise.",
          "Votre comptabilité peut afficher un bénéfice de 50 000 € alors que votre compte en banque est à sec. Comment est-ce possible ?",
        ],
      },
      {
        heading: "Le bénéfice est une notion comptable, pas bancaire",
        paragraphs: [
          "Le bénéfice est calculé selon des règles comptables : produits moins charges. Mais une facture émise n'est pas un paiement reçu. Un amortissement réduit votre bénéfice sans sortir un euro de votre compte.",
          "À l'inverse, le remboursement d'un emprunt sort du cash de votre compte sans apparaître comme une charge dans votre résultat.",
        ],
      },
      {
        heading: "Les décalages les plus fréquents",
        paragraphs: ["Voici les situations qui créent un fossé entre votre bénéfice et votre trésorerie :"],
        list: [
          "Clients qui paient à 60 ou 90 jours — vos factures sont comptabilisées mais le cash n'est pas là",
          "Stock important — vous avez payé vos fournisseurs mais la marchandise n'est pas encore vendue",
          "Investissements sur fonds propres — vous dépensez du cash qui ne réduit pas votre bénéfice (il s'amortit sur plusieurs années)",
          "TVA à reverser — vous encaissez de la TVA pour le compte de l'État, ce n'est pas votre argent",
        ],
      },
      {
        heading: "Comment piloter votre trésorerie",
        paragraphs: [
          "La solution ? Un prévisionnel de trésorerie actualisé chaque mois. Pas une estimation vague, mais un document construit sur vos données réelles : encaissements attendus, décaissements planifiés, échéances fiscales.",
          "Chez MFinances, nos clients Excellence disposent d'un prévisionnel de trésorerie mis à jour mensuellement. Ils savent exactement à quoi s'attendre dans les 3 prochains mois.",
        ],
      },
      {
        heading: "En résumé",
        paragraphs: [
          "Le bénéfice vous dit si votre activité est rentable. La trésorerie vous dit si votre entreprise peut survivre. Les deux sont importants — mais c'est la trésorerie qui paie vos factures.",
        ],
      },
    ],
  },
  "investir-sans-fragiliser-tresorerie": {
    sections: [
      {
        paragraphs: [
          "Investir est indispensable pour faire croître votre entreprise. Mais un investissement mal financé peut mettre votre trésorerie en danger.",
        ],
      },
      {
        heading: "Le piège du financement sur fonds propres",
        paragraphs: [
          "Beaucoup de dirigeants financent leurs investissements sur fonds propres « par principe » ou pour éviter de s'endetter. C'est souvent une erreur stratégique.",
          "Quand vous utilisez votre trésorerie pour acheter un véhicule ou du matériel, vous immobilisez des liquidités qui pourraient servir à absorber un retard de paiement client ou une période creuse.",
        ],
      },
      {
        heading: "Les bonnes pratiques de financement",
        paragraphs: ["Voici les règles que nous recommandons à nos clients :"],
        list: [
          "Financer les actifs durables par de l'emprunt ou du leasing — préservez votre cash pour le quotidien",
          "Adapter la durée du financement à la durée de vie de l'actif",
          "Comparer systématiquement le coût du financement externe au coût d'opportunité du cash immobilisé",
          "Intégrer les échéances de remboursement dans votre prévisionnel de trésorerie",
        ],
      },
      {
        heading: "Leasing vs emprunt : comment choisir ?",
        paragraphs: [
          "Le leasing est souvent préférable pour les véhicules et le matériel informatique : loyers déductibles, pas d'immobilisation comptable, renouvellement facilité. L'emprunt classique convient mieux pour l'immobilier ou les investissements de long terme.",
          "Dans tous les cas, la décision doit être prise en fonction de votre situation de trésorerie — pas uniquement de votre bénéfice.",
        ],
      },
    ],
  },
  "gestion-stocks-tresorerie": {
    sections: [
      {
        paragraphs: [
          "Vos stocks, c'est de l'argent immobilisé. Chaque euro stocké dans votre entrepôt est un euro qui ne travaille pas pour votre entreprise.",
        ],
      },
      {
        heading: "Le coût caché des stocks",
        paragraphs: [
          "Au-delà du prix d'achat, vos stocks coûtent cher : stockage, assurance, obsolescence, capital immobilisé. Pour une TPE, un stock mal optimisé peut représenter plusieurs mois de trésorerie bloquée.",
        ],
      },
      {
        heading: "Comment optimiser votre rotation de stock",
        paragraphs: ["Quelques leviers concrets pour libérer des liquidités :"],
        list: [
          "Analysez votre taux de rotation par catégorie de produit — identifiez les « dormeurs »",
          "Négociez des délais de paiement fournisseurs plus longs",
          "Mettez en place des commandes plus fréquentes et plus petites",
          "Déstockez les produits à faible rotation avant qu'ils ne perdent de la valeur",
          "Suivez votre BFR (Besoin en Fonds de Roulement) mensuellement",
        ],
      },
      {
        heading: "L'impact direct sur votre trésorerie",
        paragraphs: [
          "Réduire votre stock de 20 % peut libérer des dizaines de milliers d'euros de trésorerie. C'est de l'argent que vous récupérez sans emprunter, sans vendre plus, sans augmenter vos prix.",
          "Chez MFinances, nous aidons nos clients à mettre en place un suivi analytique de leurs stocks pour identifier les opportunités de libération de cash.",
        ],
      },
    ],
  },
  "tresorerie-face-concurrence": {
    sections: [
      {
        paragraphs: [
          "Quand la concurrence s'intensifie, la tentation est de baisser les prix. Mais une guerre des prix sans vision trésorerie peut être fatale.",
        ],
      },
      {
        heading: "La pression sur les marges",
        paragraphs: [
          "Face à un concurrent agressif sur les prix, beaucoup de dirigeants réagissent en alignant leurs tarifs. Le chiffre d'affaires se maintient — mais la marge fond. Et avec elle, la trésorerie.",
          "Le problème : quand vos marges diminuent, votre capacité à absorber les imprévus diminue aussi. Un retard de paiement client ou une dépense imprévue peut suffire à mettre votre trésorerie dans le rouge.",
        ],
      },
      {
        heading: "Comment protéger votre trésorerie face à la concurrence",
        paragraphs: ["Voici les stratégies qui fonctionnent :"],
        list: [
          "Connaître votre seuil de rentabilité — en dessous de ce prix, vous perdez de l'argent",
          "Différencier votre offre par la valeur, pas par le prix",
          "Resserrer votre suivi client — relancez plus tôt, facturez plus vite",
          "Constituer une réserve de trésorerie en période favorable",
          "Surveiller vos marges par produit/service — certains sont peut-être déficitaires sans que vous le sachiez",
        ],
      },
      {
        heading: "Garder le cap",
        paragraphs: [
          "La meilleure défense face à la concurrence, c'est la visibilité financière. Un dirigeant qui connaît ses chiffres prend de meilleures décisions — et résiste mieux aux pressions du marché.",
        ],
      },
    ],
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
