// Textes fixes de la fenêtre de l'assistant. Ils ne passent pas par le modèle :
// un test (src/test/chatbot-copy.test.ts) les soumet tous au même contrôle que les réponses générées.

export const CABINET_PHONE = "+32 2 886 05 50";
export const CABINET_PHONE_HREF = "tel:+3228860550";

export const WELCOME_TEXT =
  "Bonjour ! 👋 Je suis l'assistant IA de MFinances. Comment puis-je vous aider ? Posez-moi une question sur nos services, tarifs ou ressources.";

export const PRIVACY_NOTICE = "N'indiquez ni nom, ni société, ni coordonnées dans vos questions.";

export const PROACTIVE_MESSAGES: Record<string, string> = {
  "/": "Bonjour ! Je vois que vous explorez le site. Une question sur votre situation comptable ou fiscale ? Je peux vous orienter en 2 minutes.",
  "/tarifs/": "Vous comparez nos tarifs ? Je peux vous expliquer ce qui est inclus dans chaque formule selon votre situation. Qu'est-ce qui vous intéresse le plus ?",
  "/services/": "Nos services vont au-delà de la comptabilité classique. Quel est votre besoin principal : optimiser vos charges, piloter votre trésorerie, ou structurer votre croissance ?",
  "/services/daf-externalise/": "Le DAF externalisé, c'est souvent la question du bon moment. Vous pilotez votre trésorerie vous-même actuellement ?",
  "/services/controle-de-gestion/": "Le contrôle de gestion permet d'anticiper plutôt que de subir. Vous avez une visibilité claire sur vos marges aujourd'hui ?",
  "/services/tresorerie/": "La trésorerie, c'est le nerf de la guerre. Vous avez un prévisionnel actualisé ou vous naviguez à vue ?",
  "/services/comptabilite/": "Votre comptabilité vous donne une vision claire de votre activité, ou c'est juste une obligation ?",
  "/services/fiscalite/": "Une fiscalité bien organisée se prépare avant la clôture, pas après. Vous connaissez votre taux effectif d'imposition ?",
  "/services/creation-entreprise/": "Vous créez votre entreprise ? La structure juridique choisie au départ pèse sur votre fiscalité pendant des années.",
  "/qui-nous-accompagnons/": "Chaque secteur a ses spécificités fiscales. Dans quel domaine exercez-vous ?",
  "/societe-en-veille/": "Votre société est en veille ? Même sans activité, vos obligations légales continuent. Je peux vous expliquer ce qui est inclus dans notre forfait à 175€ HTVA/mois.",
  "/newsroom/": "Vous consultez notre actualité ! Mika Musungayi est intervenu à Finance Connectée à Marrakech. Une question sur notre approche du pilotage financier ?",
  "/blog/": "Bonne lecture ! Si un article soulève des questions sur votre situation, je suis là pour personnaliser la réponse.",
  "/contact/": "Avant de nous écrire, je peux peut-être répondre à votre question en quelques secondes. Essayez !",
  "/diagnostic/": "",
};

export const DEFAULT_PROACTIVE =
  "Bonjour ! Je vois que vous explorez le site. Une question sur votre situation comptable ou fiscale ? Je peux vous orienter en 2 minutes.";

export const EXIT_MESSAGES: Record<string, string> = {
  "/tarifs/": "Avant de partir, si le tarif vous freine, notre diagnostic gratuit en ligne vous aide à voir, sans engagement, si on correspond à votre besoin.",
  "/services/daf-externalise/": "Avant de partir, vous hésitez entre recruter un DAF et l'externaliser ? Un appel avec Mika permet de comparer les deux options pour votre situation.",
  "/services/creation-entreprise/": "Avant de partir, le choix de la structure juridique pèse sur votre fiscalité. Notre diagnostic gratuit en ligne vous aide à y voir clair.",
  "/societe-en-veille/": "Avant de partir, une société en veille reste soumise à des obligations. Notre forfait à 175€ HTVA/mois vous permet de rester en règle sans surprise. Prenons 5 min pour en parler ?",
  default: "Avant de partir, vous avez une question sur votre comptabilité ? Je peux vous donner une réponse rapide maintenant.",
};

export const LEAD_CARD_TEXT = "Laissez votre e-mail : Mika vous rappelle personnellement sous 72 h.";

export function leadSuccessText(email: string, bookingUrl: string): string {
  return `Merci ! Mika vous rappelle personnellement sous 72 h à partir de **${email}**. Vous préférez choisir votre créneau tout de suite ? [Réservez un appel](${bookingUrl}).`;
}

export function leadFailureText(bookingUrl: string): string {
  return `Votre demande n'a pas pu nous parvenir pour l'instant. Nous réessaierons automatiquement à votre prochaine visite, mais pour être sûr d'être recontacté : appelez le [${CABINET_PHONE}](${CABINET_PHONE_HREF}) ou [réservez un appel](${bookingUrl}).`;
}

/** Échappe un texte libre avant de l'insérer dans la fiche HTML envoyée au CRM. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
