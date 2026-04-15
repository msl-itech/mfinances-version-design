import type { FAQItem } from "@/components/SchemaFAQ";

// ── DAF Externalisé ──
export const faqDafExternalise: FAQItem[] = [
  {
    question: "Combien coûte un DAF externalisé pour une TPE à Bruxelles ?",
    answer: "Chez MFinances, le DAF externalisé est facturé 150 € HTVA/heure et est inclus dans le forfait Excellence (à partir de 650 € HTVA/mois). Ce tarif couvre la supervision comptable, le pilotage de trésorerie et le reporting mensuel.",
  },
  {
    question: "Quelle est la différence entre un DAF externalisé et un expert-comptable ?",
    answer: "L'expert-comptable assure la conformité de vos comptes. Le DAF externalisé va plus loin : il copilote vos décisions stratégiques, optimise votre trésorerie et anticipe vos besoins de financement. Chez MFinances, les deux fonctions sont intégrées.",
  },
  {
    question: "À partir de quel chiffre d'affaires ai-je besoin d'un DAF externalisé ?",
    answer: "En général, dès 500 000 € de CA annuel, la complexité financière justifie un DAF. Si vous avez 5 à 10 employés, des investissements à planifier ou une croissance rapide, c'est le bon moment pour structurer votre pilotage financier.",
  },
  {
    question: "Quelle est la fréquence des rendez-vous avec le DAF ?",
    answer: "Dans le forfait Excellence, vous bénéficiez d'une réunion mensuelle de pilotage avec Mika Musungayi, plus une disponibilité ad hoc par téléphone et email pour les décisions urgentes.",
  },
];

// ── Comptabilité ──
export const faqComptabilite: FAQItem[] = [
  {
    question: "Quel logiciel comptable utilisez-vous ?",
    answer: "Nous utilisons Odoo, un ERP complet qui intègre comptabilité, facturation et reporting dans un seul outil. Vos données sont accessibles en temps réel et la transition depuis un autre logiciel est gérée par notre équipe.",
  },
  {
    question: "Comment se passe la transition vers un nouveau comptable ?",
    answer: "Nous récupérons votre historique comptable, organisons le transfert de dossier avec votre ancien cabinet et assurons la continuité sans interruption. Le processus prend généralement 2 à 4 semaines.",
  },
  {
    question: "Quels sont vos délais pour les déclarations fiscales ?",
    answer: "Toutes les déclarations (TVA, ISOC, IPP) sont déposées dans les délais légaux. Nous anticipons les échéances et vous prévenons en amont des pièces nécessaires pour éviter tout retard.",
  },
];

// ── Fiscalité ──
export const faqFiscalite: FAQItem[] = [
  {
    question: "C'est quoi le VVPRbis en Belgique ?",
    answer: "Le VVPRbis est un régime fiscal belge qui permet de réduire le précompte mobilier sur les dividendes de 30 % à 15 % (voire 5 % après la 3e année). C'est un levier d'optimisation majeur pour les dirigeants de SRL.",
  },
  {
    question: "Comment fonctionne la réserve de liquidation ?",
    answer: "La réserve de liquidation permet de distribuer des bénéfices à un taux réduit de 5 % de cotisation supplémentaire au lieu de 30 % de précompte mobilier, à condition d'attendre 5 ans. C'est une stratégie fiscale puissante pour les sociétés belges.",
  },
  {
    question: "Comment optimiser mon ISOC en Belgique ?",
    answer: "L'optimisation de l'ISOC passe par la déduction des frais professionnels, la rémunération optimale du dirigeant (45 000 € minimum pour le taux réduit), le VVPRbis, la réserve de liquidation et le plan d'investissement. Chaque situation est unique — notre diagnostic gratuit de 30 min permet d'identifier vos leviers.",
  },
];

// ── Création d'entreprise ──
export const faqCreationEntreprise: FAQItem[] = [
  {
    question: "Combien coûte la création d'une entreprise en Belgique avec MFinances ?",
    answer: "Notre forfait création d'entreprise est de 800 € HTVA. Il inclut l'accompagnement complet : choix de la structure juridique, rédaction du plan financier obligatoire (CSA), inscription BCE/TVA et mise en place de la comptabilité sur Odoo.",
  },
  {
    question: "SRL ou personne physique : quelle structure choisir ?",
    answer: "La SRL est généralement avantageuse dès 40 000 à 50 000 € de bénéfice net. Elle offre une responsabilité limitée, un taux ISOC réduit à 20 % (jusqu'à 100 000 €) et des possibilités d'optimisation (VVPRbis, réserve de liquidation) impossibles en personne physique.",
  },
  {
    question: "Le plan financier est-il obligatoire pour créer une SRL ?",
    answer: "Oui, depuis le Code des Sociétés et Associations (CSA), le plan financier est obligatoire pour toute création de SRL en Belgique. Il doit couvrir au minimum 2 ans et démontrer la viabilité financière du projet. MFinances le rédige pour vous dans le forfait création.",
  },
];

// ── Trésorerie ──
export const faqTresorerie: FAQItem[] = [
  {
    question: "Comment gérer la trésorerie d'une TPE en croissance ?",
    answer: "Via un prévisionnel mensuel actualisé sur données réelles, une réserve de 3 mois de charges fixes et un suivi des délais clients. MFinances intègre ce suivi dans le forfait Excellence avec un tableau de bord trésorerie mis à jour chaque mois.",
  },
  {
    question: "C'est quoi un prévisionnel de trésorerie ?",
    answer: "C'est une projection mois par mois de vos entrées et sorties d'argent. Il permet d'anticiper les creux de trésorerie, de planifier les investissements et de négocier avec votre banque en position de force.",
  },
  {
    question: "À quelle fréquence faut-il actualiser son prévisionnel ?",
    answer: "Pour une TPE en croissance, une actualisation mensuelle est indispensable. Chez MFinances, le prévisionnel est recalculé chaque mois sur vos données réelles Odoo, pas sur des estimations.",
  },
];

// ── Tarifs ──
export const faqTarifs: FAQItem[] = [
  {
    question: "Quelle est la différence entre les forfaits Essentiel, Premium et Excellence ?",
    answer: "Essentiel (350 € HTVA/mois) couvre la comptabilité et la fiscalité. Premium (450 €) ajoute le contrôle de gestion trimestriel. Excellence (650 €) inclut le DAF externalisé, la trésorerie mensuelle et le copilotage stratégique.",
  },
  {
    question: "Y a-t-il une réduction pour les ASBL ou les médecins ?",
    answer: "Oui, les structures non assujetties à la TVA (ASBL, médecins, professions médicales) bénéficient d'une réduction de 21 % sur tous les forfaits, car elles ne récupèrent pas la TVA.",
  },
  {
    question: "Quelle est la durée d'engagement ?",
    answer: "L'engagement est annuel avec tacite reconduction et un préavis de 3 mois. Il n'y a pas de frais de sortie ni de pénalité.",
  },
  {
    question: "Combien coûte un expert-comptable pour une PME en Belgique ?",
    answer: "Chez MFinances, les forfaits commencent à 350 € HTVA/mois pour une comptabilité complète. Le prix final dépend du volume d'opérations et du niveau de service souhaité. Notre diagnostic gratuit de 30 min permet d'établir un devis précis.",
  },
];

// ── Contrôle de gestion ──
export const faqControleDeGestion: FAQItem[] = [
  {
    question: "C'est quoi le contrôle de gestion pour une TPE ?",
    answer: "Le contrôle de gestion consiste à suivre vos marges, comparer vos résultats réels à votre budget et identifier les écarts. Chez MFinances, cela se traduit par un budget annuel, des situations intermédiaires trimestrielles et une analyse des écarts avec recommandations.",
  },
  {
    question: "À partir de quand le contrôle de gestion est-il utile ?",
    answer: "Dès que vous avez des charges fixes significatives (salaires, loyer, équipement), le contrôle de gestion devient essentiel. En pratique, à partir de 300 000 à 500 000 € de CA, il permet de piloter la rentabilité au lieu de la constater après coup.",
  },
  {
    question: "Quelle est la différence entre comptabilité et contrôle de gestion ?",
    answer: "La comptabilité enregistre le passé (conformité légale). Le contrôle de gestion analyse le présent et prépare l'avenir (pilotage stratégique). Les deux sont complémentaires — chez MFinances, le contrôle de gestion est inclus dès le forfait Premium.",
  },
];
