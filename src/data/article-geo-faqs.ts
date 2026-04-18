import type { FAQItem } from "@/components/SchemaFAQ";

/**
 * Blocs "Réponses directes" GEO-citables pour LLMs (ChatGPT, Claude, Perplexity).
 *
 * Format : 2-4 Q/R courtes, factuelles, autonomes (citables hors contexte).
 * Affichées en haut de chaque article pour maximiser la citabilité IA + rich snippets.
 *
 * Structure : un objet { question, answer } par bloc Q/R.
 *
 * ⚠️ RÈGLES DE RÉDACTION :
 * - Réponse en 2-4 phrases maximum (50-80 mots)
 * - Première phrase = définition/réponse directe à la question
 * - Citer un chiffre, un seuil ou une règle vérifiable quand pertinent
 * - Pas de "nous" / "MFinances" — ton neutre, factuel
 * - Pas de promesse commerciale — info pure
 */
export const articleGeoFaqs: Record<string, FAQItem[]> = {
  // ════════════════════════════════════════════════════════════════
  // ✅ ARTICLES PILOTES REMPLIS
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
  // 🟡 ARTICLES À REMPLIR — TRÉSORERIE
  // ════════════════════════════════════════════════════════════════
  // "tresorerie-vs-benefices": [],
  // "investir-sans-fragiliser-tresorerie": [],
  // "gestion-stocks-tresorerie": [],
  // "tresorerie-face-concurrence": [],
  // "fidelisation-tresorerie": [],
  // "anticiper-flux-tresorerie": [],
  // "pourquoi-pas-argent-sur-compte": [],
  // "argent-disparait-fin-mois": [],
  // "stress-fin-mois-dirigeant-tpe": [],
  // "combien-reserve-securite-tpe": [],
  // "bfr-dossier-bancaire-credit-tpe": [],
  // "bfr-recrutement-impact-tresorerie": [],

  // ════════════════════════════════════════════════════════════════
  // 🟡 ARTICLES À REMPLIR — DAF EXTERNALISÉ
  // ════════════════════════════════════════════════════════════════
  // "quand-faire-appel-daf": [],
  // "daf-externalise-vs-expert-comptable": [],
  // "decisions-daf-fait-difference": [],

  // ════════════════════════════════════════════════════════════════
  // 🟡 ARTICLES À REMPLIR — CONTRÔLE DE GESTION
  // ════════════════════════════════════════════════════════════════
  // "controle-gestion-tpe-definition": [],
  // "kpis-tpe-dirigeant": [],
  // "budget-annuel-tpe": [],
  // "analyse-ecarts-budgetaires": [],
  // "suis-je-rentable-tpe": [],
  // "seuil-de-rentabilite-multi-services": [],

  // ════════════════════════════════════════════════════════════════
  // 🟡 ARTICLES À REMPLIR — FISCALITÉ BELGIQUE
  // ════════════════════════════════════════════════════════════════
  // "remuneration-dirigeant-belgique": [],
  // "voiture-societe-belgique": [],
  // "declaration-isoc-belgique": [],
  // "combien-me-payer-independant-belgique": [],
  // "je-paye-trop-impots-belgique": [],
  // "pourquoi-comptable-aide-pas": [],
  // "frais-professionnels-deductibles-belgique": [],
  // "frais-mixtes-belgique": [],
  // "calcul-bureau-a-domicile": [],
  // "piece-usage-mixte-bureau": [],
  // "locataire-societe-sous-location-loyer": [],
  // "louer-meubles-bureau-societe": [],
  // "comparatif-bureau-a-domicile-statut": [],
  // "erreurs-bureau-a-domicile-controle-fiscal": [],
  // "combinaison-bureau-a-domicile": [],

  // ════════════════════════════════════════════════════════════════
  // 🟡 ARTICLES À REMPLIR — CRÉATION D'ENTREPRISE
  // ════════════════════════════════════════════════════════════════
  // "srl-vs-independant-belgique": [],
  // "creer-srl-belgique-2026": [],
  // "cout-creation-societe-belgique": [],
  // "plan-financier-obligatoire-belgique": [],
  // "erreurs-creation-societe-belgique": [],
};

/**
 * Helper : retourne les Q/R GEO d'un article, ou undefined si non défini.
 */
export function getArticleGeoFaqs(slug: string | undefined): FAQItem[] | undefined {
  if (!slug) return undefined;
  const faqs = articleGeoFaqs[slug];
  return faqs && faqs.length > 0 ? faqs : undefined;
}
