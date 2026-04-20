import type { FAQItem } from "@/components/SchemaFAQ";

/**
 * Blocs "Réponses directes" GEO-citables pour LLMs (ChatGPT, Claude, Perplexity).
 *
 * Format : 2-4 Q/R courtes, factuelles, autonomes (citables hors contexte).
 * Affichées en haut de chaque article pour maximiser la citabilité IA + rich snippets.
 *
 * ⚠️ RÈGLES DE RÉDACTION :
 * - Réponse en 2-4 phrases maximum (50-80 mots)
 * - Première phrase = définition/réponse directe à la question
 * - Citer un chiffre, un seuil ou une règle vérifiable quand pertinent
 * - Pas de "nous" / "MFinances" — ton neutre, factuel
 * - Pas de promesse commerciale — info pure
 *
 * ⚠️ FISCALITÉ BELGE : les chiffres (taux, seuils, plafonds) doivent être
 * validés par Mika avant publication. Dernière mise à jour : avril 2026.
 */
export const articleGeoFaqs: Record<string, FAQItem[]> = {
  // ════════════════════════════════════════════════════════════════
  // ✅ ARTICLES PILOTES (conservés)
  // ════════════════════════════════════════════════════════════════

  "bfr-definition-formule-tpe": [
    {
      question: "Qu'est-ce que le BFR pour une TPE belge ?",
      answer:
        "Le besoin en fonds de roulement (BFR) est la différence entre les actifs circulants d'exploitation (stocks + créances clients) et les dettes à court terme d'exploitation (dettes fournisseurs + TVA à payer). Pour une TPE belge, un BFR positif signifie que l'entreprise doit financer son cycle d'exploitation sur sa trésorerie. Un BFR négatif signifie au contraire que les clients paient avant que les fournisseurs soient réglés — situation idéale, fréquente dans le retail et la restauration.",
    },
    {
      question: "Comment calculer le BFR d'une TPE ?",
      answer:
        "Formule : BFR = (Stocks + Créances clients TTC) − (Dettes fournisseurs TTC + Dettes fiscales et sociales). Les données se trouvent au bilan (rubriques 30-37 pour les actifs, 44-45 pour les dettes). Pour une TPE, on calcule généralement le BFR en jours de chiffre d'affaires : BFR / (CA annuel / 365). Au-delà de 30 jours, le poids du BFR devient critique pour la trésorerie.",
    },
    {
      question: "Pourquoi le BFR augmente-t-il avec la croissance ?",
      answer:
        "Quand le chiffre d'affaires augmente, les stocks et les créances clients augmentent proportionnellement, alors que les dettes fournisseurs ne suivent pas toujours au même rythme. Résultat : plus une TPE belge croît vite, plus son BFR consomme de trésorerie. C'est pourquoi de nombreuses TPE rentables font faillite par manque de cash : elles financent leur croissance avec une trésorerie insuffisante.",
    },
    {
      question: "Comment réduire le BFR dans une TPE ?",
      answer:
        "Trois leviers principaux : (1) raccourcir les délais clients via acomptes, paiements échelonnés ou escompte ; (2) optimiser les stocks en flux tendu et négocier les minimums fournisseurs ; (3) allonger les délais fournisseurs par négociation contractuelle. En Belgique, la loi fixe le délai légal de paiement entre entreprises à 60 jours maximum (sauf accord contraire écrit).",
    },
  ],

  "vvprbis-belgique": [
    {
      question: "Qu'est-ce que le régime VVPRbis en Belgique ?",
      answer:
        "Le VVPRbis (Verlaagde Voorheffing / Précompte Réduit bis) est un régime fiscal belge qui permet de réduire le précompte mobilier sur les dividendes distribués par une PME. Au lieu du taux standard de 30 %, le précompte tombe à 20 % la 2e année, puis à 15 % à partir de la 3e année suivant l'apport. Ce régime concerne uniquement les actions nominatives émises en numéraire après le 1er juillet 2013.",
    },
    {
      question: "Quelles sont les conditions pour bénéficier du VVPRbis ?",
      answer:
        "Quatre conditions cumulatives : (1) la société doit être une PME au sens du Code des Sociétés (CSA, art. 1:24) ; (2) les actions doivent être nominatives et entièrement libérées ; (3) elles doivent provenir d'un apport en numéraire (pas en nature) ; (4) elles doivent être détenues en pleine propriété de manière ininterrompue depuis l'apport. Le capital doit avoir été apporté à partir du 1er juillet 2013.",
    },
    {
      question: "Quelle est la différence entre VVPRbis et réserve de liquidation ?",
      answer:
        "Le VVPRbis s'applique aux dividendes distribués chaque année (15 % de précompte après 3 ans). La réserve de liquidation, elle, exige une cotisation anticipée de 10 % au moment de la mise en réserve, puis un précompte réduit à 5 % si distribution après 5 ans (soit ~14,5 % au total). VVPRbis est donc plus avantageux pour des distributions régulières ; la réserve de liquidation pour une distribution de stock à long terme.",
    },
  ],

  "reserve-liquidation-belgique": [
    {
      question: "Qu'est-ce que la réserve de liquidation en Belgique ?",
      answer:
        "La réserve de liquidation est un mécanisme fiscal belge réservé aux PME qui permet de mettre en réserve une partie du bénéfice taxé en payant immédiatement une cotisation distincte de 10 %. En contrepartie, cette réserve peut être distribuée plus tard avec un précompte mobilier réduit à 5 % (au lieu de 30 %), à condition d'attendre au moins 5 ans après l'année de constitution.",
    },
    {
      question: "Quel est le coût fiscal total de la réserve de liquidation ?",
      answer:
        "Le coût total est d'environ 14,5 % du bénéfice net : 10 % de cotisation immédiate + 5 % de précompte mobilier à la distribution (après 5 ans). À titre de comparaison, une distribution classique soumise au précompte de 30 % coûte 30 %. La réserve de liquidation permet donc d'économiser ~15 points de fiscalité, mais immobilise les fonds pendant 5 ans.",
    },
    {
      question: "Que se passe-t-il si on distribue la réserve avant 5 ans ?",
      answer:
        "Une distribution anticipée est possible mais coûteuse : le précompte mobilier passe à 20 % si la distribution intervient avant 5 ans (au lieu de 5 % après 5 ans). Le coût total devient alors 10 % + 20 % = 30 %, soit le même qu'une distribution classique. La réserve de liquidation perd donc tout son intérêt fiscal en cas de sortie anticipée.",
    },
    {
      question: "Qui peut constituer une réserve de liquidation ?",
      answer:
        "Seules les PME au sens fiscal (article 1:24 CSA : moins de 50 employés, CA < 11,25 M€, total bilan < 6 M€ — 2 critères sur 3) peuvent constituer une réserve de liquidation. Les grandes entreprises et les sociétés non-PME en sont exclues. La constitution se fait à la clôture annuelle, sur le bénéfice net après impôt des sociétés (ISOC).",
    },
  ],

  "daf-externalise-definition": [
    {
      question: "Qu'est-ce qu'un DAF externalisé ?",
      answer:
        "Un DAF externalisé (Directeur Administratif et Financier externalisé) est un expert financier mis à disposition d'une entreprise à temps partiel, sans contrat de travail. Il assure les missions de pilotage financier (budget, trésorerie prévisionnelle, reporting, aide à la décision stratégique) qui dépassent le cadre de l'expertise comptable classique, sans le coût d'un recrutement interne (estimé entre 80 000 et 120 000 € bruts annuels pour un DAF salarié en Belgique).",
    },
    {
      question: "Quelle est la différence entre un DAF externalisé et un expert-comptable ?",
      answer:
        "L'expert-comptable assure la conformité comptable et fiscale (bilans, déclarations TVA, ISOC) — il regarde le passé. Le DAF externalisé pilote l'avenir : il construit le budget, modélise la trésorerie, analyse les marges par activité, prépare les décisions d'investissement et le dialogue bancaire. Les deux fonctions sont complémentaires : l'un sécurise le légal, l'autre éclaire la stratégie.",
    },
    {
      question: "À partir de quelle taille un DAF externalisé est-il pertinent ?",
      answer:
        "Le seuil de pertinence se situe généralement entre 500 000 € et 3 M€ de chiffre d'affaires annuel, ou dès qu'une TPE a 5 à 15 employés et des décisions financières structurantes (recrutement, investissement, financement). En dessous, l'expert-comptable suffit. Au-delà, un DAF salarié à temps plein devient économiquement justifié.",
    },
    {
      question: "Combien coûte un DAF externalisé en Belgique ?",
      answer:
        "Les tarifs varient entre 100 € et 200 € HTVA de l'heure selon le profil et l'expérience. Pour une TPE, le budget mensuel typique se situe entre 800 € et 2 500 € HTVA, correspondant à 8 à 20 heures par mois (réunion mensuelle de pilotage + travail de fond sur les indicateurs et la trésorerie).",
    },
  ],

  "bureau-a-domicile": [
    {
      question: "Comment déduire un bureau à domicile en Belgique ?",
      answer:
        "Pour déduire un bureau à domicile, le dirigeant peut soit (1) facturer un loyer à sa société pour la pièce dédiée, soit (2) faire prendre en charge directement les frais (chauffage, électricité, internet) au prorata de la surface. La pièce doit être affectée exclusivement à l'activité professionnelle. Le ratio se calcule : surface bureau / surface totale de l'habitation, appliqué aux charges du logement.",
    },
    {
      question: "Quels frais peut-on déduire pour un bureau à domicile ?",
      answer:
        "Les frais déductibles incluent au prorata de la surface : loyer ou amortissement immobilier, chauffage, électricité, eau, internet, assurance habitation, précompte immobilier, frais d'entretien et de réparation. Le mobilier de bureau (chaise, bureau, étagères) est déductible à 100 % s'il est exclusivement professionnel. L'achat de matériel informatique suit les règles d'amortissement classiques (3 à 5 ans).",
    },
    {
      question: "Faut-il déclarer le loyer du bureau à domicile à l'IPP ?",
      answer:
        "Oui. Le loyer perçu par le dirigeant de sa propre société pour la mise à disposition d'un bureau est imposable à l'impôt des personnes physiques (IPP) comme revenu immobilier. Toutefois, depuis 2019, une partie de ce loyer peut être requalifiée en revenu professionnel si elle dépasse 5/3 du revenu cadastral revalorisé — règle anti-abus à analyser au cas par cas.",
    },
    {
      question: "Quels sont les risques fiscaux d'un bureau à domicile mal documenté ?",
      answer:
        "Trois risques principaux en cas de contrôle fiscal : (1) rejet de la déduction si la pièce n'est pas exclusivement professionnelle (usage mixte = redressement) ; (2) requalification du loyer en revenu professionnel si disproportionné ; (3) cotisations sociales sur la partie requalifiée. Pour sécuriser : convention écrite société-dirigeant, plan du logement, photos de la pièce, justification du prorata.",
    },
  ],

  // ════════════════════════════════════════════════════════════════
  // 🔵 TRÉSORERIE (12 articles)
  // ════════════════════════════════════════════════════════════════

  "tresorerie-vs-benefices": [
    {
      question: "Quelle est la différence entre trésorerie et bénéfices ?",
      answer:
        "Le bénéfice est un résultat comptable : il mesure ce que l'entreprise a gagné sur une période donnée. La trésorerie, elle, mesure le cash réellement disponible sur le compte bancaire à un instant T. Une entreprise peut être bénéficiaire et afficher un compte bancaire vide — notamment si ses clients paient à 60 jours ou si elle a investi massivement.",
    },
    {
      question: "Pourquoi mon entreprise est-elle bénéficiaire mais sans cash ?",
      answer:
        "Trois causes principales : (1) des délais de paiement clients longs qui décalent les encaissements, (2) des stocks importants qui immobilisent du cash, (3) des investissements récents financés sur fonds propres. Ce décalage s'appelle le besoin en fonds de roulement (BFR) — il augmente mécaniquement avec la croissance.",
    },
    {
      question: "Comment réconcilier trésorerie et bénéfices dans une TPE ?",
      answer:
        "La méthode consiste à établir un tableau de flux de trésorerie qui distingue les flux d'exploitation, d'investissement et de financement. En identifiant les postes qui « mangent » du cash malgré les bénéfices — créances clients, stocks, remboursements d'emprunts — le dirigeant peut agir ciblé plutôt qu'à l'aveugle.",
    },
  ],

  "investir-sans-fragiliser-tresorerie": [
    {
      question: "Quand peut-on investir sans risquer de fragiliser sa trésorerie ?",
      answer:
        "Un investissement est sécurisé lorsque l'entreprise dispose d'une réserve de trésorerie couvrant au moins 3 mois de charges fixes après l'investissement. En dessous de ce seuil, un retard de paiement client ou une dépense imprévue peut suffire à créer une tension grave. La règle : investir sur excédent, pas sur réserve de survie.",
    },
    {
      question: "Comment financer un investissement en TPE sans épuiser son cash ?",
      answer:
        "Trois leviers à combiner : (1) le crédit bancaire ou le leasing, qui étale la sortie de cash sur la durée de vie du bien, (2) les aides régionales belges (primes à l'investissement, Impulse.brussels), (3) la négociation de délais de paiement fournisseurs. L'emprunt n'est pas une faiblesse — c'est un outil de gestion du cash.",
    },
    {
      question: "Quelle réserve minimale conserver avant d'investir dans une TPE ?",
      answer:
        "La pratique recommande de conserver l'équivalent de 3 mois de charges fixes incompressibles (loyer, salaires, remboursements d'emprunts) comme réserve intouchable. Tout investissement doit être planifié au-delà de ce seuil. Ce matelas de sécurité est non négociable en période de croissance.",
    },
  ],

  "gestion-stocks-tresorerie": [
    {
      question: "Quel est l'impact des stocks sur la trésorerie d'une TPE ?",
      answer:
        "Les stocks immobilisent du cash : chaque euro de marchandise achetée et non encore vendue est un euro absent du compte bancaire. Plus le stock est élevé et le délai d'écoulement long, plus le besoin en fonds de roulement (BFR) augmente. Un stock mal calibré est l'une des premières causes de tension de trésorerie dans les entreprises commerciales.",
    },
    {
      question: "Comment réduire les stocks pour améliorer la trésorerie ?",
      answer:
        "Quatre actions concrètes : (1) analyser les références à rotation lente et les liquider ou les réduire, (2) négocier des délais de livraison courts avec les fournisseurs pour passer à des commandes plus fréquentes et plus petites, (3) mettre en place un seuil de réapprovisionnement automatique, (4) distinguer les stocks stratégiques des stocks dormants.",
    },
    {
      question: "Quel niveau de stock est optimal pour une TPE belge ?",
      answer:
        "Il n'existe pas de ratio universel, mais un indicateur clé est le taux de rotation des stocks : il mesure combien de fois le stock est renouvelé sur l'exercice. Un taux faible signale un stock excessif. L'objectif est d'aligner le niveau de stock sur la demande réelle, avec une réserve de sécurité calibrée sur les délais fournisseurs.",
    },
  ],

  "tresorerie-face-concurrence": [
    {
      question: "Comment préserver sa trésorerie face à un concurrent qui casse les prix ?",
      answer:
        "La première réponse n'est pas de s'aligner sur les prix mais de défendre sa marge brute. Une guerre des prix érode la trésorerie plus vite qu'une perte de parts de marché temporaire. Il s'agit de réduire les coûts variables, d'accélérer les encaissements et de construire une réserve de sécurité couvrant 3 mois de charges fixes avant d'envisager une riposte tarifaire.",
    },
    {
      question: "Quel niveau de trésorerie minimum maintenir en période de pression concurrentielle ?",
      answer:
        "En période de forte concurrence, le coussin de sécurité recommandé passe de 3 à 6 mois de charges fixes. Cette réserve permet d'absorber une baisse de chiffre d'affaires sans rupture de paiement. Les entreprises qui survivent aux guerres de prix sont celles qui avaient anticipé — pas celles qui réagissent dans l'urgence.",
    },
  ],

  "fidelisation-tresorerie": [
    {
      question: "Quel est l'impact de la fidélisation client sur la trésorerie d'une TPE ?",
      answer:
        "Un client fidèle génère des encaissements récurrents et prévisibles, ce qui réduit la volatilité de trésorerie. Il est aussi moins coûteux à conserver qu'à remplacer : acquérir un nouveau client coûte en moyenne 5 à 7 fois plus cher que d'en fidéliser un existant. La récurrence des revenus est l'un des meilleurs outils de stabilisation du cash.",
    },
    {
      question: "Coût d'acquisition vs rétention : quel ratio pour une TPE belge ?",
      answer:
        "Le coût d'acquisition client (CAC) inclut publicité, prospection et temps commercial. Le coût de rétention se limite aux actions de suivi, de service et de valeur ajoutée. Pour la plupart des TPE de services, investir 1 € en fidélisation rapporte davantage que 1 € en acquisition — surtout si le taux de churn dépasse 20 % par an.",
    },
  ],

  "anticiper-flux-tresorerie": [
    {
      question: "Qu'est-ce qu'un prévisionnel de trésorerie et à quoi ça sert ?",
      answer:
        "Un prévisionnel de trésorerie est un tableau qui projette les encaissements et décaissements futurs semaine par semaine ou mois par mois, généralement sur 3 à 6 mois. Il permet d'identifier à l'avance les périodes où le solde bancaire risque de passer en négatif — et d'agir avant la crise plutôt qu'en réaction.",
    },
    {
      question: "À quelle fréquence faut-il actualiser son prévisionnel de trésorerie ?",
      answer:
        "Pour une TPE en croissance, une actualisation mensuelle est le minimum recommandé. L'idéal est de comparer chaque mois le prévisionnel avec les chiffres réels, d'expliquer les écarts et de recaler les projections des mois suivants. Un prévisionnel non actualisé perd rapidement sa valeur prédictive.",
    },
    {
      question: "Quels outils utiliser pour faire un prévisionnel de trésorerie en TPE ?",
      answer:
        "Un tableau Excel bien structuré suffit pour démarrer. Pour une approche plus robuste, des outils comme Odoo (module Trésorerie) ou des logiciels dédiés permettent de connecter les données comptables réelles au prévisionnel. L'essentiel est la discipline de mise à jour mensuelle — l'outil importe moins que la régularité.",
    },
  ],

  "pourquoi-pas-argent-sur-compte": [
    {
      question: "Pourquoi le compte bancaire est-il vide en fin de mois malgré des ventes ?",
      answer:
        "Plusieurs mécanismes expliquent ce paradoxe : les clients paient en retard (délai moyen 30 à 60 jours en B2B belge), les charges fixes sortent avant que les encaissements n'arrivent, et les investissements ou remboursements d'emprunts drainent le cash sans apparaître comme des charges comptables. La trésorerie et la rentabilité sont deux réalités distinctes.",
    },
    {
      question: "Où va l'argent d'une TPE rentable en fin de mois ?",
      answer:
        "Cinq postes absorbent le cash sans figurer dans le résultat : (1) le remboursement du capital d'emprunt, (2) les achats de stock ou matériel, (3) les acomptes TVA ou ISOC, (4) les créances clients non encore encaissées, (5) la réserve de trésorerie constituée volontairement. Un suivi de trésorerie sépare ces flux du résultat d'exploitation.",
    },
  ],

  "argent-disparait-fin-mois": [
    {
      question: "Pourquoi l'argent disparaît-il en fin de mois dans une petite entreprise ?",
      answer:
        "La concentration des échéances en fin de mois est la principale cause : loyers, salaires, cotisations sociales, TVA et remboursements bancaires sortent souvent au même moment. S'y ajoutent les règlements fournisseurs à 30 jours et les acomptes fiscaux trimestriels. Cette simultanéité crée une tension structurelle que seul un prévisionnel de trésorerie permet de lisser.",
    },
    {
      question: "Quelles sont les charges cachées qui pèsent sur la trésorerie d'une TPE belge ?",
      answer:
        "Les charges les plus sous-estimées sont : les cotisations sociales INASTI (trimestrielles, souvent plus élevées que prévu), les acomptes ISOC ou IPP, la TVA à payer nette, et les provisions pour congés ou arrêts maladie. Ces sorties ne correspondent pas à des achats visibles — elles surprennent les dirigeants qui ne gèrent que leurs factures courantes.",
    },
  ],

  "stress-fin-mois-dirigeant-tpe": [
    {
      question: "Comment réduire le stress financier en fin de mois pour un dirigeant de TPE ?",
      answer:
        "Trois actions structurantes : (1) mettre en place un prévisionnel de trésorerie mensuel pour ne plus être surpris, (2) constituer une réserve de sécurité équivalant à 3 mois de charges fixes, (3) négocier des acomptes clients ou des paiements à l'avance pour décaler les encaissements avant les décaissements. La sérénité financière se construit — elle ne s'improvise pas.",
    },
    {
      question: "Quelles solutions concrètes existent pour les dirigeants de TPE en tension de trésorerie ?",
      answer:
        "Solutions immédiates : relance accélérée des créances clients, demande d'étalement à l'administration fiscale (possible auprès du SPF Finances belge), recours à un crédit de caisse bancaire. Solutions structurelles : révision des délais de paiement contractuels, mise en place de la facturation à l'avance, et suivi prévisionnel mensuel pour anticiper les creux.",
    },
  ],

  "combien-reserve-securite-tpe": [
    {
      question: "Quelle réserve de sécurité une TPE belge doit-elle constituer ?",
      answer:
        "La règle pratique recommande une réserve couvrant 3 mois de charges fixes incompressibles : loyer, salaires bruts, remboursements d'emprunts, assurances et abonnements essentiels. En phase de croissance rapide ou en secteur saisonnier, ce coussin peut monter à 6 mois. En dessous de 1 mois, l'entreprise est vulnérable au moindre imprévu.",
    },
    {
      question: "Comment calculer sa réserve de sécurité en tant que TPE ?",
      answer:
        "Étape 1 : lister toutes les charges fixes mensuelles incompressibles (hors charges variables liées au CA). Étape 2 : multiplier ce montant par 3. Ce chiffre est votre réserve cible. Exemple : 15 000 € de charges fixes/mois → réserve cible de 45 000 €. Cette somme ne sert pas à investir — elle reste sur un compte séparé.",
    },
    {
      question: "Où placer la réserve de sécurité de son entreprise en Belgique ?",
      answer:
        "La réserve de sécurité doit être immédiatement disponible. Un compte d'épargne professionnel à terme court (0 à 3 mois) offre un compromis entre disponibilité et rendement minimal. Évitez les placements bloqués ou volatils : l'objectif est la liquidité, pas le rendement. Certaines banques proposent des comptes séparés dédiés à cet usage.",
    },
  ],

  "bfr-dossier-bancaire-credit-tpe": [
    {
      question: "Comment présenter le BFR dans un dossier bancaire pour une TPE ?",
      answer:
        "La banque veut comprendre comment l'entreprise finance son cycle d'exploitation. Il faut présenter le BFR de manière dynamique : montant actuel, évolution sur 2 à 3 ans, et mode de financement (fonds propres, crédit de caisse, crédit fournisseur). Un BFR maîtrisé et bien expliqué rassure le banquier — un BFR non documenté l'inquiète.",
    },
    {
      question: "Quel lien entre le BFR et l'obtention d'un crédit professionnel en Belgique ?",
      answer:
        "Les banques belges analysent le BFR pour évaluer le risque de liquidité. Un BFR élevé par rapport aux fonds propres signale une dépendance au financement externe. En revanche, un BFR stable et financé par des ressources longues (fonds propres + dettes à moyen terme) est un signal positif. Le ratio BFR / CA est souvent regardé en premier.",
    },
  ],

  "bfr-recrutement-impact-tresorerie": [
    {
      question: "Quel est l'impact d'un recrutement sur le BFR et la trésorerie ?",
      answer:
        "Un recrutement augmente immédiatement les charges fixes mensuelles — salaire brut, cotisations patronales ONSS, frais d'équipement — avant même que le collaborateur ne génère du chiffre d'affaires. En Belgique, le coût total employeur d'un salaire brut de 3 000 € avoisine 4 500 € par mois. Ce décalage peut durer 3 à 6 mois selon le temps de montée en compétence.",
    },
    {
      question: "Comment anticiper l'impact d'un recrutement sur sa trésorerie ?",
      answer:
        "La méthode consiste à modéliser le cash-flow prévisionnel sur 12 mois avec et sans le recrutement. Si le solde prévisionnel passe sous le seuil de sécurité pendant plus de 2 mois consécutifs, le recrutement doit être décalé ou financé par un crédit. La règle pratique : recruter sur excédent de trésorerie, pas sur un espoir de CA futur.",
    },
    {
      question: "Quelle réserve de trésorerie faut-il avoir avant d'embaucher en TPE ?",
      answer:
        "Il est recommandé de disposer d'au moins 6 mois du coût employeur total du nouveau collaborateur en trésorerie disponible avant le recrutement. Exemple : pour un coût employeur de 4 500 €/mois, la réserve préalable recommandée est de 27 000 €. Ce matelas couvre la période de non-productivité du nouveau collaborateur sans mettre l'entreprise en danger.",
    },
  ],

  // ════════════════════════════════════════════════════════════════
  // 🟣 DAF EXTERNALISÉ (3 articles)
  // ════════════════════════════════════════════════════════════════

  "quand-faire-appel-daf": [
    {
      question: "À partir de quel chiffre d'affaires faut-il envisager un DAF externalisé ?",
      answer:
        "Il n'existe pas de seuil universel, mais plusieurs signaux indiquent le bon moment : un CA supérieur à 500 000 €, une équipe de plus de 5 collaborateurs, une croissance annuelle supérieure à 20 %, ou des décisions d'investissement et de financement de plus en plus fréquentes. Ce n'est pas une question de taille — c'est une question de complexité décisionnelle.",
    },
    {
      question: "Quels signaux indiquent qu'une TPE a besoin d'un DAF ?",
      answer:
        "Cinq signaux d'alerte : (1) les décisions d'investissement sont prises sans modélisation financière, (2) la trésorerie réelle est connue avec plusieurs semaines de retard, (3) les dossiers bancaires sont difficiles à monter, (4) la charge fiscale est découverte en fin d'exercice, (5) le dirigeant passe plus d'une journée par semaine sur des sujets financiers sans expertise structurée.",
    },
  ],

  "daf-externalise-vs-expert-comptable": [
    {
      question: "Quelle est la différence entre un DAF externalisé et un expert-comptable ?",
      answer:
        "L'expert-comptable produit, certifie et optimise vos chiffres passés : il regarde dans le rétroviseur. Le DAF externalisé utilise ces chiffres pour vous aider à décider vers l'avenir : il regarde par le pare-brise. L'un est garant de la conformité — l'autre est un copilote stratégique. Les deux rôles sont complémentaires, pas substituables.",
    },
    {
      question: "DAF externalisé et expert-comptable peuvent-ils travailler ensemble ?",
      answer:
        "Oui — c'est même le modèle optimal pour une TPE en croissance. L'expert-comptable assure la comptabilité, les déclarations et la conformité fiscale. Le DAF exploite ces données pour piloter la performance, préparer les décisions et anticiper la trésorerie. Certains cabinets d'expertise comptable proposent les deux services de manière intégrée.",
    },
    {
      question: "Quel est le coût comparé d'un DAF interne et d'un DAF externalisé en Belgique ?",
      answer:
        "Un DAF interne représente entre 80 000 € et 120 000 € de coût employeur annuel pour un profil senior, sans compter le temps de recrutement. Un DAF externalisé facture entre 100 € et 200 € HTVA de l'heure, pour un volume mensuel généralement compris entre 4 et 15 heures. Pour une TPE, le coût total est 5 à 10 fois inférieur avec un niveau d'expertise équivalent.",
    },
  ],

  "decisions-daf-fait-difference": [
    {
      question: "Quelles décisions un DAF externalisé prend-il concrètement ?",
      answer:
        "Le DAF n'est pas décideur — il est copilote. Il intervient sur : la modélisation financière avant un investissement ou un recrutement, la préparation d'un dossier de crédit bancaire, la définition de la stratégie de rémunération du dirigeant, l'analyse des écarts budget/réalisé et la mise en place des indicateurs de pilotage adaptés au modèle économique.",
    },
    {
      question: "Quels résultats concrets peut-on attendre d'un DAF externalisé pour une TPE ?",
      answer:
        "Les impacts les plus fréquents : anticipation des tensions de trésorerie 2 à 3 mois à l'avance, réduction de la charge fiscale par une planification proactive, décisions d'investissement mieux calibrées, amélioration du dossier bancaire et obtention de conditions de crédit plus favorables. Le résultat principal est une prise de décision structurée là où l'intuition prévalait.",
    },
  ],

  // ════════════════════════════════════════════════════════════════
  // 🟢 CONTRÔLE DE GESTION (6 articles)
  // ════════════════════════════════════════════════════════════════

  "controle-gestion-tpe-definition": [
    {
      question: "Qu'est-ce que le contrôle de gestion dans une TPE ?",
      answer:
        "Le contrôle de gestion en TPE consiste à mettre en place un suivi structuré des performances financières : budget annuel prévisionnel, situations intermédiaires régulières (mensuelles ou trimestrielles) et analyse des écarts entre objectifs et réalisé. L'objectif est de permettre au dirigeant de piloter son activité avec des données fiables plutôt qu'à l'intuition.",
    },
    {
      question: "Quelle différence entre comptabilité et contrôle de gestion ?",
      answer:
        "La comptabilité enregistre et certifie les opérations financières passées — c'est une obligation légale. Le contrôle de gestion analyse ces données pour mesurer les performances, les comparer aux objectifs et anticiper les décisions futures. La comptabilité regarde en arrière ; le contrôle de gestion regarde devant.",
    },
    {
      question: "Quels outils de base faut-il pour faire du contrôle de gestion en TPE ?",
      answer:
        "Trois outils suffisent pour démarrer : (1) un budget annuel avec des objectifs mensuels par ligne de revenus et de charges, (2) une situation intermédiaire mensuelle ou trimestrielle produite par votre comptable, (3) un tableau de suivi des écarts entre budget et réalisé. Un tableur Excel bien structuré ou un ERP comme Odoo permettent de mettre en place ces trois outils.",
    },
  ],

  "kpis-tpe-dirigeant": [
    {
      question: "Quels KPI sont essentiels pour piloter une TPE en Belgique ?",
      answer:
        "Cinq indicateurs sont prioritaires : (1) la marge brute (CA – coûts variables), (2) le BFR en jours de CA, (3) la trésorerie nette disponible, (4) le taux de recouvrement des créances clients (délai moyen de paiement), (5) le résultat net mensuel comparé au budget. Ces cinq KPI donnent une vision complète de la santé financière sans surcharge d'information.",
    },
    {
      question: "À quelle fréquence un dirigeant de TPE doit-il suivre ses indicateurs financiers ?",
      answer:
        "La trésorerie doit être suivie hebdomadairement — c'est le seul indicateur vital en temps réel. Les autres KPI (marge, résultat, BFR) peuvent être suivis mensuellement. L'analyse approfondie des écarts se fait trimestriellement au minimum. La règle : plus l'entreprise est en croissance, plus la fréquence de suivi doit être élevée.",
    },
  ],

  "budget-annuel-tpe": [
    {
      question: "Comment construire un budget annuel pour une TPE ?",
      answer:
        "Un budget annuel se construit en trois étapes : (1) estimer les revenus mois par mois en tenant compte de la saisonnalité et des projets connus, (2) lister les charges fixes incompressibles et les charges variables liées au CA, (3) calculer le résultat prévisionnel mensuel et identifier les mois déficitaires à anticiper. Le budget doit être construit avec le comptable ou le DAF, pas seul.",
    },
    {
      question: "Quels postes de charges inclure dans le budget annuel d'une TPE belge ?",
      answer:
        "Les postes clés à budgéter sont : les salaires et cotisations ONSS, le loyer et charges locatives, les frais de sous-traitance, les achats de marchandises, les frais commerciaux et marketing, les frais généraux (téléphone, assurances, abonnements), les remboursements d'emprunts, et les acomptes fiscaux (TVA, ISOC ou IPP). Chaque poste doit être mensualiser pour anticiper les pics de sortie.",
    },
    {
      question: "À quel moment faut-il réviser son budget annuel en cours d'exercice ?",
      answer:
        "Un budget doit être révisé au minimum une fois par trimestre — et immédiatement en cas de changement majeur (perte d'un client important, recrutement non prévu, hausse significative des coûts). Un budget figé sur 12 mois sans révision perd sa valeur prédictive dès le deuxième trimestre. La révision ne traduit pas un échec — elle témoigne d'un pilotage actif.",
    },
  ],

  "analyse-ecarts-budgetaires": [
    {
      question: "Qu'est-ce que l'analyse des écarts budgétaires ?",
      answer:
        "L'analyse des écarts consiste à comparer, poste par poste, les chiffres réalisés avec les chiffres budgétés, puis à expliquer les différences. Un écart positif (résultat supérieur au budget) ou négatif (inférieur) n'est pas bon ou mauvais en soi — c'est la cause qui importe. Cette analyse permet de distinguer les effets structurels des effets conjoncturels.",
    },
    {
      question: "Comment interpréter un écart budgétaire dans une TPE ?",
      answer:
        "L'interprétation suit trois questions : l'écart est-il significatif (> 5 à 10 % de la ligne concernée) ? Est-il ponctuel ou récurrent ? Est-il lié à un changement de volume (on a vendu plus ou moins) ou à un changement de prix/coût ? Cette grille d'analyse permet de distinguer ce qui mérite une décision corrective de ce qui relève d'une variation normale.",
    },
    {
      question: "Quel seuil d'écart budgétaire doit déclencher une alerte dans une TPE ?",
      answer:
        "Un seuil d'alerte couramment utilisé est un écart supérieur à 10 % sur une ligne de charges significative, ou supérieur à 5 % sur le résultat net mensuel. En dessous de ces seuils, les écarts sont dans le bruit normal de gestion. Au-delà, une analyse cause-effet et une décision corrective sont nécessaires avant le mois suivant.",
    },
  ],

  "suis-je-rentable-tpe": [
    {
      question: "Comment savoir si mon entreprise est réellement rentable ?",
      answer:
        "La rentabilité se mesure à trois niveaux : (1) la marge brute (CA – coûts directs variables), qui doit dépasser 40 à 60 % dans les activités de services, (2) la marge d'exploitation (après charges fixes), qui indique si l'activité couvre son fonctionnement, (3) le résultat net après impôts et rémunération du dirigeant. Ce dernier chiffre est le vrai test de rentabilité.",
    },
    {
      question: "Quelle marge nette minimum est acceptable pour une TPE belge ?",
      answer:
        "Un résultat net supérieur à 10 % du chiffre d'affaires est généralement considéré comme sain pour une TPE de services. En dessous de 5 %, l'entreprise est fragile face aux aléas. En négatif, elle consomme ses fonds propres. Ces seuils varient selon le secteur — le commerce alimentaire peut être rentable à 2 %, les professions libérales à 25 % ou plus.",
    },
  ],

  "seuil-de-rentabilite-multi-services": [
    {
      question: "Comment calculer le seuil de rentabilité d'une entreprise multi-activités ?",
      answer:
        "Pour une entreprise avec plusieurs activités, le seuil de rentabilité global se calcule en deux étapes : (1) identifier les charges fixes communes à ventiler entre les activités (au prorata du CA ou du temps passé), (2) calculer le seuil de rentabilité de chaque activité séparément. Cette approche révèle les activités subventionnées par d'autres — information stratégique pour décider où investir.",
    },
    {
      question: "Comment ventiler les charges fixes entre plusieurs services dans une TPE ?",
      answer:
        "Trois clés de répartition sont utilisées couramment : (1) le prorata du chiffre d'affaires de chaque activité, (2) le nombre d'heures ou d'ETP dédiés, (3) la surface ou les ressources consommées. L'important est de choisir une clé cohérente avec la réalité économique et de l'appliquer de façon constante pour permettre les comparaisons dans le temps.",
    },
  ],

  // ════════════════════════════════════════════════════════════════
  // 🟡 FISCALITÉ BELGE (16 articles)
  // ════════════════════════════════════════════════════════════════

  "remuneration-dirigeant-belgique": [
    {
      question: "Quel est le montant minimum de rémunération pour un dirigeant de SRL belge ?",
      answer:
        "Depuis 2021, pour bénéficier du taux d'ISOC réduit de 20 % sur la première tranche de 100 000 € de bénéfices, la société doit verser au moins 45 000 € brut de rémunération annuelle à son dirigeant — ou un montant au moins égal au résultat imposable de la société si ce dernier est inférieur à 45 000 €. Ce seuil est une condition d'accès au taux réduit.",
    },
    {
      question: "Comment optimiser la répartition entre salaire et dividendes pour un dirigeant belge ?",
      answer:
        "L'optimisation dépend de la situation personnelle du dirigeant. Le salaire est déductible pour la société mais imposable à l'IPP (taux progressif jusqu'à 50 %). Les dividendes sont distribués après ISOC, avec un précompte mobilier de 30 % (ou 15 % via VVPRbis). Le bon équilibre intègre aussi les cotisations sociales INASTI et les besoins de trésorerie de la société.",
    },
  ],

  "voiture-societe-belgique": [
    {
      question: "Comment calculer l'avantage de toute nature (ATN) pour une voiture de société en Belgique ?",
      answer:
        "L'ATN voiture se calcule selon la formule : valeur catalogue × 6/7 × pourcentage CO₂ × coefficient d'âge. Le pourcentage CO₂ dépend des émissions du véhicule et du type de carburant. Ce montant est ajouté au revenu imposable du dirigeant et soumis à l'IPP. Pour 2025, un taux de référence CO₂ de 67 g/km s'applique pour les voitures à carburant classique.",
    },
    {
      question: "Quelle déductibilité fiscale pour une voiture de société en Belgique ?",
      answer:
        "La déductibilité des voitures thermiques est limitée en Belgique. Depuis 2023, une transition progressive est en cours : les véhicules thermiques achetés après 2023 voient leur déductibilité réduite chaque année jusqu'à 0 % pour les achats à partir de 2026. Les voitures 100 % électriques restent déductibles à 100 % jusqu'en 2026, avec une réduction progressive ensuite.",
    },
    {
      question: "Voiture électrique ou thermique : quel choix fiscal pour une société belge en 2025 ?",
      answer:
        "Sur le plan fiscal, la voiture électrique est aujourd'hui nettement plus avantageuse pour une société belge : déductibilité à 100 % (vs déductibilité décroissante pour les thermiques), pas de contribution CO₂ en cotisations sociales pour le dirigeant, et ATN souvent plus faible grâce aux émissions nulles. La comparaison doit toutefois intégrer le coût d'achat plus élevé et l'infrastructure de recharge.",
    },
  ],

  "declaration-isoc-belgique": [
    {
      question: "Quels sont les délais de déclaration ISOC en Belgique ?",
      answer:
        "La déclaration ISOC doit être déposée dans les 6 mois suivant la clôture de l'exercice comptable. Pour les sociétés clôturant au 31 décembre, la date limite est généralement fixée au 30 septembre de l'année suivante (délai prorogé). Le non-respect entraîne une cotisation minimale forfaitaire et des intérêts de retard.",
    },
    {
      question: "Quel est le taux d'ISOC applicable aux PME belges en 2025 ?",
      answer:
        "En Belgique, le taux d'ISOC standard est de 25 %. Les PME qui respectent certaines conditions (dont verser une rémunération minimale de 45 000 € à leur dirigeant) bénéficient d'un taux réduit de 20 % sur la première tranche de 100 000 € de bénéfices imposables. Au-delà de 100 000 €, le taux de 25 % s'applique.",
    },
    {
      question: "Comment fonctionnent les acomptes ISOC en Belgique ?",
      answer:
        "Les sociétés belges doivent verser des acomptes trimestriels sur l'ISOC estimé de l'exercice : aux 10 avril, 10 juillet, 10 octobre et 20 décembre. Ne pas verser d'acomptes ou des acomptes insuffisants entraîne une majoration fiscale (accroissement d'impôt). L'avantage des acomptes anticipés est qu'ils génèrent des bonifications calculées selon un taux fixé annuellement par le SPF Finances.",
    },
  ],

  "combien-me-payer-independant-belgique": [
    {
      question: "Combien un indépendant belge doit-il se payer pour optimiser sa situation ?",
      answer:
        "La réponse dépend du statut. En personne physique, le revenu net imposable est soumis à l'IPP (taux marginal de 50 % au-delà de 46 440 € en 2025). En société, le dirigeant peut combiner salaire et dividendes. Le niveau de rémunération optimal intègre les cotisations sociales INASTI, les frais déductibles et l'objectif patrimonial à long terme.",
    },
    {
      question: "Quelles sont les cotisations sociales INASTI pour un indépendant belge en 2025 ?",
      answer:
        "Les cotisations INASTI sont calculées sur le revenu net professionnel. Le taux standard est de 20,5 % sur les premiers 73 992,79 € de revenus, puis 14,16 % sur la tranche suivante jusqu'à 108 844,66 €, et 0 % au-delà. Un minimum annuel de 891,14 € s'applique même en cas de faibles revenus. Ces cotisations sont trimestrielles.",
    },
  ],

  "je-paye-trop-impots-belgique": [
    {
      question: "Pourquoi un dirigeant de TPE belge paie-t-il trop d'impôts ?",
      answer:
        "Les cinq erreurs les plus fréquentes : (1) ne pas verser d'acomptes fiscaux et subir la majoration, (2) distribuer des dividendes au taux normal (30 %) au lieu d'utiliser le VVPRbis (15 %), (3) ne pas déduire tous les frais professionnels admissibles, (4) négliger la réserve de liquidation, (5) fixer sa rémunération sans optimiser l'équilibre salaire/dividendes. Chaque levier manqué coûte de l'argent.",
    },
    {
      question: "Quelles sont les optimisations fiscales légales disponibles pour une PME belge ?",
      answer:
        "Les principaux leviers légaux : VVPRbis (dividendes à 15 % au lieu de 30 %), réserve de liquidation (taxe de 10 % maintenant pour distribution future avantageuse), déduction pour investissement, rémunération optimale du dirigeant, voiture électrique de société, frais professionnels mixtes, et planification des acomptes pour éviter les majorations. Chaque levier dépend de la situation spécifique de la société.",
    },
  ],

  "pourquoi-comptable-aide-pas": [
    {
      question: "Pourquoi mon comptable ne m'aide pas à réduire mes impôts ?",
      answer:
        "La mission classique d'un comptable est de produire des chiffres conformes et de déposer les déclarations dans les délais — pas d'optimiser proactivement votre fiscalité. Cette mission de conseil fiscal approfondi requiert du temps, une connaissance fine de votre situation personnelle et patrimoniale, et une démarche proactive que tous les cabinets n'ont pas les ressources d'offrir dans un forfait standard.",
    },
    {
      question: "Quelle est la différence entre un comptable et un conseiller fiscal ?",
      answer:
        "Le comptable est garant de la conformité : il enregistre, déclare et certifie. Le conseiller fiscal — rôle que peuvent tenir certains experts-comptables ou conseillers spécialisés — analyse votre situation globale (revenus, patrimoine, structure juridique) pour identifier les leviers d'optimisation légaux. Les deux profils sont complémentaires dans un accompagnement de qualité.",
    },
  ],

  "frais-professionnels-deductibles-belgique": [
    {
      question: "Quels frais professionnels sont déductibles pour une société belge ?",
      answer:
        "Sont déductibles les frais ayant un lien direct avec l'activité professionnelle et justifiés par une pièce comptable : frais de bureau (y compris bureau à domicile), frais de déplacement, frais de représentation et repas d'affaires (déductibles à 69 %), matériel informatique, abonnements professionnels, primes d'assurance, frais de formation, et rémunérations des dirigeants et employés.",
    },
    {
      question: "Quels justificatifs sont requis pour les frais professionnels en Belgique ?",
      answer:
        "Tout frais professionnel doit être justifié par une facture ou un document probant mentionnant la date, le fournisseur, le montant et la description. Pour les frais mixtes (privé/professionnel), la quote-part professionnelle doit être déterminée de façon cohérente et défendable. L'administration fiscale belge peut demander ces justificatifs jusqu'à 5 ans après l'exercice concerné.",
    },
  ],

  "frais-mixtes-belgique": [
    {
      question: "Qu'est-ce qu'un frais mixte en fiscalité belge ?",
      answer:
        "Un frais mixte est une dépense qui sert à la fois à des fins professionnelles et privées. En Belgique, seule la quote-part professionnelle est déductible. L'entreprise ou le dirigeant doit déterminer cette proportion de manière cohérente et défendable face à l'administration fiscale. Les frais mixtes les plus courants sont le téléphone, l'internet, le véhicule et le bureau.",
    },
    {
      question: "Comment calculer la quote-part professionnelle d'un frais mixte en Belgique ?",
      answer:
        "Deux méthodes sont admises : (1) la méthode forfaitaire pour certains frais (ex. : 75 % pour le téléphone est courant et généralement accepté), (2) la méthode réelle basée sur un décompte précis (journal de bord pour la voiture, relevé d'appels pour le téléphone). La méthode choisie doit être cohérente dans le temps et documentée.",
    },
    {
      question: "Quels exemples de frais mixtes sont fréquents pour un indépendant ou dirigeant belge ?",
      answer:
        "Les frais mixtes les plus courants : téléphone portable (usage professionnel estimé à 75 % en général), connexion internet (idem), véhicule personnel utilisé partiellement à titre professionnel (calculé sur la base du kilométrage professionnel réel), bureau à domicile (calculé sur la surface dédiée par rapport à la surface totale du logement).",
    },
  ],

  "calcul-bureau-a-domicile": [
    {
      question: "Quelle est la formule de calcul du bureau à domicile en Belgique ?",
      answer:
        "La formule officielle est : (surface du bureau ÷ surface totale habitable) × charges totales du logement (loyer ou valeur locative, charges, assurance, intérêts hypothécaires, amortissements si propriétaire). Le résultat représente la quote-part professionnelle déductible. Exemple : bureau de 15 m² dans un logement de 120 m² → 12,5 % des charges sont déductibles.",
    },
    {
      question: "Quelle surface peut-on inclure dans le calcul du bureau à domicile ?",
      answer:
        "Seule la surface effectivement utilisée à des fins professionnelles est prise en compte — pas les couloirs, salles de bains ou espaces de vie partagés. Le bureau doit être un espace dédié et réservé à l'activité professionnelle, même s'il peut aussi servir à autre chose occasionnellement. Un espace double usage est défendable mais doit être justifié.",
    },
    {
      question: "Existe-t-il un plafond pour la déduction du bureau à domicile en Belgique ?",
      answer:
        "Il n'existe pas de plafond légal fixe, mais l'administration fiscale est attentive aux proportions. Une quote-part dépassant 20 à 25 % de la surface totale peut attirer l'attention lors d'un contrôle si elle n'est pas clairement justifiée. La règle est la proportionnalité et la cohérence avec la réalité de l'utilisation professionnelle.",
    },
  ],

  "piece-usage-mixte-bureau": [
    {
      question: "Une pièce à usage mixte peut-elle être déduite comme bureau à domicile en Belgique ?",
      answer:
        "Oui, à condition de pouvoir justifier l'usage professionnel réel. Une pièce servant de bureau le jour et de salle de jeux le soir est considérée comme mixte. Dans ce cas, soit une quote-part réduite est appliquée, soit la déduction est limitée aux heures/jours d'usage professionnel. L'administration examinera la cohérence entre la surface déclarée et la nature de l'activité.",
    },
    {
      question: "Quels risques de redressement pour un bureau à domicile en Belgique ?",
      answer:
        "Les principaux risques sont : (1) une surface déclarée disproportionnée par rapport à l'activité réelle, (2) l'absence de pièce clairement identifiable comme bureau (open space ou espace partagé non délimité), (3) une déduction sur un logement dont le dirigeant n'est ni propriétaire ni locataire. Un dossier documenté (photos, plan, bail) réduit significativement ce risque.",
    },
    {
      question: "Comment sécuriser la déduction d'un bureau à domicile face à un contrôle fiscal ?",
      answer:
        "Quatre documents à conserver : (1) un plan du logement avec la surface du bureau clairement identifiée, (2) les justificatifs de propriété ou de bail, (3) le détail du calcul de la quote-part avec les charges retenues, (4) tout élément probant de l'usage professionnel (adresse déclarée à la BCE, courriers professionnels reçus au domicile, etc.).",
    },
  ],

  "locataire-societe-sous-location-loyer": [
    {
      question: "Un locataire peut-il sous-louer une partie de son logement à sa société en Belgique ?",
      answer:
        "Oui, sous conditions. Le bail principal doit expressément autoriser la sous-location — à défaut, le propriétaire peut résilier le bail. La sous-location doit correspondre à une réalité économique (surface réellement utilisée à titre professionnel) et le loyer convenu doit être conforme aux prix du marché pour éviter la requalification fiscale.",
    },
    {
      question: "Quels risques fiscaux en cas de sous-location de logement à sa propre société en Belgique ?",
      answer:
        "Le principal risque est la requalification du loyer en rémunération de dirigeant si le montant dépasse 5/3 du revenu cadastral revalorisé du bien. Au-delà de ce seuil, l'excédent est requalifié en rémunération, soumis aux cotisations sociales et à l'IPP. En dessous du seuil, les revenus locatifs sont imposés plus légèrement comme revenus immobiliers.",
    },
  ],

  "louer-meubles-bureau-societe": [
    {
      question: "Peut-on louer ses meubles et équipements à sa propre société en Belgique ?",
      answer:
        "Oui — un dirigeant peut mettre ses biens mobiliers (bureau, ordinateur, mobilier) à disposition de sa société contre un loyer. Ce loyer constitue un revenu mobilier imposable pour le dirigeant, mais il est déductible pour la société. L'opération est intéressante si elle permet de transférer des revenus depuis la société à un taux d'imposition inférieur.",
    },
    {
      question: "Quel est le loyer maximum admissible pour la location de meubles à sa société en Belgique ?",
      answer:
        "La loi belge ne fixe pas de plafond absolu, mais le loyer doit être conforme à la valeur de marché et justifié par un contrat écrit. Pour les biens mobiliers, le rendement annuel admissible se situe généralement entre 5 et 10 % de la valeur vénale du bien. Un loyer manifestement excessif peut être requalifié partiellement en rémunération de dirigeant.",
    },
  ],

  "comparatif-bureau-a-domicile-statut": [
    {
      question: "Le bureau à domicile est-il plus avantageux en indépendant ou en SRL ?",
      answer:
        "En SRL, la société peut payer un loyer au dirigeant pour l'usage du bureau, ce qui crée une déduction pour la société et un revenu immobilier (souvent moins taxé) pour le dirigeant. En personne physique indépendante, la déduction est directe dans les frais professionnels. Le régime SRL est généralement plus avantageux fiscalement, mais il nécessite un contrat de mise à disposition et des conditions strictes.",
    },
    {
      question: "Quel statut juridique optimise le mieux la déduction du bureau à domicile en Belgique ?",
      answer:
        "La SRL avec convention de mise à disposition ou de location au dirigeant offre le meilleur levier fiscal si elle est bien structurée : la société déduit le loyer, le dirigeant perçoit un revenu immobilier imposé à un taux effectif souvent inférieur à l'IPP sur les rémunérations. L'indépendant en personne physique a une déduction plus simple mais fiscalement moins optimisée.",
    },
  ],

  "erreurs-bureau-a-domicile-controle-fiscal": [
    {
      question: "Quelles sont les 5 erreurs les plus fréquentes en cas de contrôle fiscal sur le bureau à domicile ?",
      answer:
        "Les cinq erreurs les plus sanctionnées : (1) surface déclarée sans plan justificatif, (2) déduction sans contrat de mise à disposition entre le dirigeant et la société, (3) loyer supérieur à la règle des 5/3 du revenu cadastral, (4) charges incluses sans lien réel avec le bureau (rénovation globale de la maison), (5) incohérence entre la surface déclarée et d'autres déclarations fiscales ou administratives.",
    },
    {
      question: "Quels documents faut-il conserver pour défendre le bureau à domicile face au fisc belge ?",
      answer:
        "Documents indispensables : plan cadastral ou plan du logement avec dimensions, contrat de bail ou acte de propriété, convention écrite de mise à disposition ou de location entre le dirigeant et la société, factures des charges retenues dans le calcul, et adresse du siège social ou d'activité déclarée à la BCE. Ces documents doivent être conservés 5 ans minimum.",
    },
  ],

  "combinaison-bureau-a-domicile": [
    {
      question: "Peut-on cumuler la déduction du loyer et des charges pour le bureau à domicile en Belgique ?",
      answer:
        "Oui — le calcul du bureau à domicile inclut à la fois la quote-part du loyer (ou valeur locative si propriétaire), les charges récurrentes (électricité, chauffage, eau), les assurances et les intérêts hypothécaires. Tous ces postes entrent dans la base de calcul proportionnelle. Il n'y a pas de double déduction : c'est un seul calcul global, pas deux déductions cumulées.",
    },
    {
      question: "Quelle stratégie adopter pour optimiser la déduction du bureau à domicile en Belgique ?",
      answer:
        "La stratégie optimale combine : (1) documenter précisément la surface dédiée, (2) inclure tous les postes de charges éligibles dans le calcul, (3) opter pour le régime SRL avec convention de location si les montants sont significatifs, (4) mettre à jour le calcul chaque année en cas de changement de loyer ou de charges. L'accompagnement d'un expert-comptable est recommandé pour sécuriser l'optimisation.",
    },
  ],

  "requalification-loyer-remuneration": [
    {
      question: "Dans quel cas un loyer payé par une société à son dirigeant est-il requalifié en rémunération ?",
      answer:
        "La requalification s'applique lorsque le loyer annuel payé par la société à son dirigeant dépasse 5/3 du revenu cadastral revalorisé du bien. Seul l'excédent est requalifié en rémunération de dirigeant — la partie en dessous du seuil reste imposée comme revenu immobilier. Cette règle s'applique aussi bien à la location d'immeubles qu'à la mise à disposition de biens mobiliers.",
    },
    {
      question: "Qu'est-ce que la règle des 5/3 du revenu cadastral en Belgique ?",
      answer:
        "Le revenu cadastral (RC) est une valeur fiscale forfaitaire attribuée à chaque bien immobilier par l'administration. La règle des 5/3 stipule que le loyer annuel admissible pour un bien loué par un dirigeant à sa société ne peut dépasser : RC indexé × 5/3. Si le loyer convenu dépasse ce plafond, l'excédent est automatiquement requalifié en rémunération imposable à l'IPP et soumis aux cotisations sociales.",
    },
    {
      question: "Quelles sont les conséquences fiscales d'une requalification de loyer en rémunération en Belgique ?",
      answer:
        "Les conséquences sont doubles : pour le dirigeant, le montant requalifié s'ajoute à la rémunération imposable à l'IPP (taux progressif jusqu'à 50 %) et aux cotisations sociales INASTI. Pour la société, la déductibilité reste en principe maintenue, mais le montant peut être soumis à des cotisations patronales ONSS. Un redressement fiscal entraîne aussi des intérêts de retard.",
    },
  ],

  // ════════════════════════════════════════════════════════════════
  // 🟠 CRÉATION D'ENTREPRISE (5 articles)
  // ════════════════════════════════════════════════════════════════

  "srl-vs-independant-belgique": [
    {
      question: "Faut-il créer une SRL ou rester indépendant en personne physique en Belgique ?",
      answer:
        "Le choix dépend principalement du niveau de bénéfices. En dessous de 40 000 € de bénéfice net annuel, l'indépendant en personne physique est souvent plus simple et moins coûteux. Au-delà de 40 000 à 50 000 €, la SRL devient généralement avantageuse fiscalement grâce au taux d'ISOC de 20-25 % vs l'IPP progressif jusqu'à 50 %. La responsabilité limitée est un avantage supplémentaire de la SRL.",
    },
    {
      question: "Quels sont les avantages fiscaux d'une SRL par rapport au statut d'indépendant en Belgique ?",
      answer:
        "Trois avantages principaux : (1) l'ISOC à 20 % sur la première tranche de 100 000 € est inférieur à l'IPP marginal de 50 %, (2) la possibilité de distribuer des dividendes via VVPRbis à 15 % de précompte, (3) des leviers d'optimisation plus nombreux (voiture de société, bureau, rémunération mixte). En contrepartie, les frais de gestion annuels sont plus élevés qu'en personne physique.",
    },
  ],

  "creer-srl-belgique-2026": [
    {
      question: "Quelles sont les étapes pour créer une SRL en Belgique en 2026 ?",
      answer:
        "Sept étapes : (1) rédiger le plan financier (obligatoire), (2) rédiger les statuts avec un notaire, (3) déposer l'acte authentique chez le notaire, (4) s'immatriculer à la Banque-Carrefour des Entreprises (BCE), (5) activer le numéro TVA auprès du SPF Finances, (6) ouvrir un compte bancaire professionnel, (7) mettre en place la comptabilité dès le premier jour d'activité.",
    },
    {
      question: "Quel est le capital minimum pour créer une SRL en Belgique ?",
      answer:
        "Depuis l'entrée en vigueur du Code des Sociétés et des Associations (CSA) en 2019, le capital minimum légal de la SRL est de 1 €. En pratique, le montant doit être adéquat aux besoins de l'activité : le plan financier obligatoire doit démontrer que le capital est suffisant pour les deux premières années. Une SRL sous-capitalisée expose les fondateurs à une responsabilité personnelle en cas de faillite.",
    },
    {
      question: "Combien de temps faut-il pour créer une SRL en Belgique en 2026 ?",
      answer:
        "Avec un dossier complet et un notaire disponible, la création d'une SRL prend généralement entre 1 et 3 semaines. L'immatriculation à la BCE est possible le jour même de l'acte notarié. L'activation du numéro TVA peut prendre 1 à 2 semaines supplémentaires via le formulaire e604A au SPF Finances.",
    },
  ],

  "cout-creation-societe-belgique": [
    {
      question: "Combien coûte la création d'une SRL en Belgique ?",
      answer:
        "La création d'une SRL implique deux catégories de coûts : les frais externes (notaire, Moniteur belge, BCE, formulaire TVA) qui représentent généralement entre 1 000 € et 2 500 € selon la complexité des statuts, et les honoraires du comptable ou conseiller pour le plan financier et la mise en place comptable. Au total, le budget à prévoir est de 2 000 € à 4 500 € selon les prestations choisies.",
    },
    {
      question: "Quels sont les frais de notaire pour créer une société en Belgique ?",
      answer:
        "Les honoraires du notaire pour la création d'une SRL varient entre 700 € et 1 500 € HTVA selon la complexité des statuts et la valeur de l'apport. À cela s'ajoutent les frais de publication au Moniteur belge (environ 160 €) et les frais d'inscription à la BCE (environ 90 €). Ces montants sont des estimations — demandez un devis au notaire avant l'acte.",
    },
  ],

  "plan-financier-obligatoire-belgique": [
    {
      question: "Pourquoi le plan financier est-il obligatoire pour créer une société en Belgique ?",
      answer:
        "Depuis la réforme du CSA (Code des Sociétés et des Associations, 2019), le plan financier est obligatoire pour toute création de SRL ou SA. Il doit être remis au notaire avant l'acte de constitution. Son objectif est de prouver que la société disposera de ressources suffisantes pour les deux premières années d'activité. En cas de faillite dans les 3 ans, les fondateurs peuvent être tenus responsables si le plan était insuffisant.",
    },
    {
      question: "Que doit contenir un plan financier pour une SRL belge ?",
      answer:
        "Le plan financier doit inclure : une description de l'activité et du modèle économique, les projections de revenus et charges sur 2 ans minimum, le plan de trésorerie prévisionnel, le bilan d'ouverture, les hypothèses retenues et leur justification, et les sources de financement. Il est signé par les fondateurs et remis au notaire instrumentant. La loi ne fixe pas de format précis — la qualité du raisonnement prime.",
    },
    {
      question: "Sur combien d'années le plan financier doit-il être établi en Belgique ?",
      answer:
        "La loi impose un minimum de 2 ans de projections financières. En pratique, les notaires et les banques recommandent 3 ans pour couvrir la période de démarrage et démontrer la viabilité à moyen terme. Un plan sur 5 ans peut être utile pour des projets d'investissement importants, mais les projections au-delà de 3 ans ont une valeur prédictive limitée.",
    },
  ],

  "erreurs-creation-societe-belgique": [
    {
      question: "Quelles sont les 5 erreurs les plus fréquentes à la création d'une société en Belgique ?",
      answer:
        "Les cinq erreurs les plus courantes : (1) choisir la mauvaise forme juridique sans analyse fiscale et patrimoniale préalable, (2) sous-capitaliser la société (capital insuffisant pour les besoins réels), (3) rédiger un plan financier irréaliste ou insuffisant, (4) négliger l'activation TVA et la mise en place comptable dès le démarrage, (5) ne pas définir dès le départ la politique de rémunération du dirigeant.",
    },
    {
      question: "Quel est le coût d'une erreur à la création d'une société en Belgique ?",
      answer:
        "Une mauvaise structure juridique peut coûter des milliers d'euros en surcharge fiscale chaque année — l'erreur se paye sur toute la durée de vie de la société. Un plan financier insuffisant peut engager la responsabilité personnelle des fondateurs en cas de faillite dans les 3 ans. Une TVA non activée à temps entraîne des amendes. Les erreurs de démarrage sont les plus difficiles et les plus coûteuses à corriger.",
    },
    {
      question: "Comment éviter les erreurs classiques lors de la création d'une société en Belgique ?",
      answer:
        "Trois précautions essentielles : (1) consulter un expert-comptable ou conseiller fiscal avant de choisir la forme juridique — pas seulement un notaire, (2) faire établir le plan financier par un professionnel qui connaît votre secteur, (3) mettre en place la comptabilité et le numéro TVA avant la première facture. Le coût de ces conseils en amont est très inférieur au coût des erreurs à corriger plus tard.",
    },
  ],
};

/**
 * Helper : retourne les Q/R GEO d'un article, ou undefined si non défini.
 */
export function getArticleGeoFaqs(slug: string | undefined): FAQItem[] | undefined {
  if (!slug) return undefined;
  const faqs = articleGeoFaqs[slug];
  return faqs && faqs.length > 0 ? faqs : undefined;
}
