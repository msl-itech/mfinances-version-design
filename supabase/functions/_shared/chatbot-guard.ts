// Garde-fous déterministes de l'assistant (sans deuxième IA).
// Pur TypeScript : importé par la fonction chatbot, par le site et par les tests.

// ── Détection de mots compatible avec les accents ──
// Syntaxe d'un terme : "=SA" sensible à la casse, "cherch*" préfixe, sinon mot entier insensible à la casse.
const regexCache = new Map<string, RegExp>();

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function termRegex(term: string): RegExp {
  const cached = regexCache.get(term);
  if (cached) return cached;
  let t = term;
  const caseSensitive = t.startsWith("=");
  if (caseSensitive) t = t.slice(1);
  const prefix = t.endsWith("*");
  if (prefix) t = t.slice(0, -1);
  const body = escapeRe(t.replace(/’/g, "'")).replace(/\s+/g, "\\s+");
  const hasWordChar = /[\p{L}\p{N}]/u.test(t);
  const before = hasWordChar ? "(?<![\\p{L}\\p{N}])" : "";
  const after = hasWordChar && !prefix ? "(?![\\p{L}\\p{N}])" : "";
  const re = new RegExp(`${before}${body}${after}`, caseSensitive ? "u" : "iu");
  regexCache.set(term, re);
  return re;
}

/** Vrai si le texte contient le terme comme mot entier (accents gérés : « pressé », « ça » ≠ « SA »). */
export function termMatches(text: string, term: string): boolean {
  return termRegex(term).test(String(text ?? "").replace(/’/g, "'"));
}

export function anyTermMatches(text: string, terms: readonly string[]): boolean {
  return terms.some((t) => termMatches(text, t));
}

// ── Montants autorisés (liste fermée, en € HTVA) ──
export const ALLOWED_EUR_AMOUNTS: readonly number[] = [175, 275, 350, 450, 650, 150, 800];

const AMOUNT_AFTER = /(\d{1,3}(?:[ .\u00a0\u202f]\d{3})+|\d+)(?:[,.]\d{1,2})?\s*(k)?\s*(?:€|euros?\b|eur\b)/giu;
const AMOUNT_BEFORE = /€\s*(\d{1,3}(?:[ .\u00a0\u202f]\d{3})+|\d+)/gu;

/** Montants en euros cités dans un texte (entiers, « 3 400 € » → 3400, « 5k€ » → 5000). */
export function extractEuroAmounts(text: string): number[] {
  const out: number[] = [];
  const src = String(text ?? "");
  for (const m of src.matchAll(AMOUNT_AFTER)) {
    const n = Number(m[1].replace(/[ .\u00a0\u202f]/g, ""));
    if (Number.isFinite(n)) out.push(m[2] ? n * 1000 : n);
  }
  for (const m of src.matchAll(AMOUNT_BEFORE)) {
    const n = Number(m[1].replace(/[ .\u00a0\u202f]/g, ""));
    if (Number.isFinite(n)) out.push(n);
  }
  return out;
}

// ── Termes interdits dans une réponse ──
// allowIn : le terme est toléré dans une phrase qui le nie ou le corrige (« aucun résultat n'est garanti »).
const NEGATION = /(?<![\p{L}])(?:ne|n'|pas|aucun|aucune|jamais|sans|impossible)(?![\p{L}])/iu;

export const FORBIDDEN_TERMS: readonly { term: string; reason: string; allowIn?: RegExp }[] = [
  { term: "=SCI", reason: "« SCI » est une forme de société française, elle n'existe pas en Belgique", allowIn: /n'existe pas|français|france/iu },
  { term: "garanti", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantie", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantis", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garanties", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantir", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "vous récupérerez", reason: "promesse de résultat chiffré" },
  { term: "vous économiserez", reason: "promesse de résultat chiffré" },
  { term: "vous allez récupérer", reason: "promesse de résultat chiffré" },
  { term: "vous allez économiser", reason: "promesse de résultat chiffré" },
  { term: "je ne suis pas une IA", reason: "l'assistant ne doit jamais nier être une IA" },
  { term: "je ne suis pas un robot", reason: "l'assistant ne doit jamais nier être une IA" },
  { term: "je suis un humain", reason: "l'assistant ne doit jamais se faire passer pour un humain" },
  { term: "je suis une vraie personne", reason: "l'assistant ne doit jamais se faire passer pour un humain" },
  { term: "je suis Mika", reason: "l'assistant ne doit jamais se faire passer pour Mika" },
];

const SHORT_DELAY = /(?<![\p{L}\p{N}])(?:sous|dans|en|d'ici|moins de|maximum)\s+(\d+)\s*(?:h|heures?)(?![\p{L}])/giu;
const SAME_DAY_CALLBACK = /rappel\p{L}*[^.!?\n]{0,60}(?:aujourd'hui|dans la journée|immédiatement|demain|dans l'heure)/iu;

export type GuardResult = { ok: boolean; issues: string[] };

/**
 * Vérifie une réponse avant affichage :
 * - tout montant en € appartient à la liste fermée (ou a été donné par le visiteur) ;
 * - tout délai de rappel est « 72 h » ;
 * - aucun terme interdit.
 */
export function validateAnswer(answer: string, visitorText = ""): GuardResult {
  const text = String(answer ?? "").replace(/’/g, "'");
  const issues: string[] = [];

  const allowed = new Set<number>([...ALLOWED_EUR_AMOUNTS, ...extractEuroAmounts(visitorText)]);
  const badAmounts = [...new Set(extractEuroAmounts(text).filter((n) => !allowed.has(n)))];
  if (badAmounts.length) {
    issues.push(`montant non autorisé : ${badAmounts.map((n) => `${n} €`).join(", ")} (seuls les prix de la liste sont permis)`);
  }

  for (const m of text.matchAll(SHORT_DELAY)) {
    if (Number(m[1]) !== 72) issues.push(`délai « ${m[0].trim()} » : le seul délai de rappel autorisé est 72 h`);
  }
  if (SAME_DAY_CALLBACK.test(text)) issues.push("promesse de rappel rapide : le seul délai de rappel autorisé est 72 h");

  const sentences = text.split(/(?<=[.!?\n])\s+/);
  for (const f of FORBIDDEN_TERMS) {
    const hit = sentences.some((sentence) => termMatches(sentence, f.term) && !(f.allowIn && f.allowIn.test(sentence)));
    if (hit) issues.push(`terme interdit « ${f.term.replace(/^=|\*$/g, "")} » : ${f.reason}`);
  }

  return { ok: issues.length === 0, issues };
}

/** Réponse de repli quand la réponse générée reste non conforme. */
export function fallbackAnswer(bookingUrl: string): string {
  return `Je préfère que Mika vous réponde précisément sur ce point, pour ne rien vous dire d'approximatif. [Réserver un appel](${bookingUrl}) ou laissez votre e-mail dans le formulaire « Souhaitez-vous être recontacté ? » : il vous rappelle personnellement sous 72 h.`;
}

// ── Score d'intérêt (mots entiers, accents gérés) ──
export const INTEREST_KEYWORDS: readonly { terms: readonly string[]; points: number }[] = [
  // Urgence
  { terms: ["urgent", "urgence", "rapidement", "vite", "pressé", "pressée", "deadline", "dès que possible", "asap", "au plus vite", "tout de suite"], points: 4 },
  // Budget / prix
  { terms: ["budget", "prix", "coût", "coûte", "tarif*", "combien", "devis", "factur*", "investir", "investissement", "€", "euro", "euros"], points: 3 },
  // Taille entreprise / CA
  { terms: ["salarié*", "employé*", "équipe", "chiffre d'affaires", "=CA", "revenu", "revenus", "bénéfice*", "croissance", "personnel"], points: 2 },
  // Recherche active de comptable
  { terms: ["cherch*", "besoin d'un comptable", "changer de comptable", "nouveau comptable", "accompagnement", "mission"], points: 3 },
  // Structure juridique
  { terms: ["srl", "=SA", "sprl", "asbl", "société", "indépendant*", "complémentaire", "personne physique", "management", "holding"], points: 2 },
  // Problème fiscal / contrôle
  { terms: ["contrôle fiscal", "redressement", "amende", "tva", "isoc", "ipp", "déclaration*", "retard", "problème", "mise en demeure"], points: 3 },
];
