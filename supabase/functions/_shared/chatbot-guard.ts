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

// (?<![\d.,]) : « 2026 350 € » ne devient pas « 026 350 € » ; décimales captées : « 275,50 € » ≠ 275.
const AMOUNT_AFTER = /(?<![\d.,])(\d{1,3}(?:[ .\u00a0\u202f]\d{3})+|\d+)(?:[,.](\d{1,2}))?\s*(k)?\s*(?:€|euros?\b|eur\b)/giu;
const AMOUNT_BEFORE = /€\s*(\d{1,3}(?:[ .\u00a0\u202f]\d{3})+|\d+)(?:[,.](\d{1,2}))?/gu;

function toAmount(int: string, dec: string | undefined, k: boolean): number {
  const n = Number(`${int.replace(/[ .\u00a0\u202f]/g, "")}${dec ? "." + dec : ""}`);
  return k ? n * 1000 : n;
}

/** Montants en euros cités dans un texte (« 3 400 € » → 3400, « 5k€ » → 5000, « 275,50 € » → 275.5). */
export function extractEuroAmounts(text: string): number[] {
  const out: number[] = [];
  const src = String(text ?? "");
  for (const m of src.matchAll(AMOUNT_AFTER)) out.push(toAmount(m[1], m[2], !!m[3]));
  for (const m of src.matchAll(AMOUNT_BEFORE)) out.push(toAmount(m[1], m[2], false));
  return out.filter(Number.isFinite);
}

// Une phrase qui parle de prix ne peut JAMAIS reprendre un montant écrit par le visiteur.
const PRICE_CONTEXT = /forfait|formule|tarif|prix|co[uû]te|coûte|htva|honoraires|abonnement|par mois|\/mois|\/h\b|de l'heure/iu;
// Exception : dans une phrase de prix, le visiteur peut retrouver SON chiffre (chiffre d'affaires, bénéfice…)
// si la proposition qui contient le montant parle de ce chiffre et pas d'un prix.
// « Avec un chiffre d'affaires de 250 000 €, le forfait Premium est adapté. » → toléré.
const REVENUE_CONTEXT = /chiffre d'affaires|(?<![\p{L}])CA(?![\p{L}])|bénéfice|revenu|résultat|marge|capital|loyer|salaire|trésorerie/u;
// Propositions : virgule suivie d'un espace (pas « 350,50 »), point-virgule, deux-points, tiret d'incise.
const CLAUSE_SPLIT = /[;:]|,(?=\s)|\s[–-]\s/u;

// ── Termes interdits dans une réponse ──
// La négation doit PRÉCÉDER « garant… » de près (3 mots maximum, sans ponctuation entre les deux).
const NEG_BEFORE_GARANT = /(?:aucun\p{L}*|jamais|impossible|sans|pas|ne\s+peut|ne\s+peuvent|ne\s+pouvons)\s+(?:[\p{L}']+\s+){0,3}garant/iu;
const NEGATION = NEG_BEFORE_GARANT;

export const FORBIDDEN_TERMS: readonly { term: string; reason: string; allowIn?: RegExp }[] = [
  { term: "=SCI", reason: "« SCI » est une forme de société française, elle n'existe pas en Belgique", allowIn: /n'existe pas|français|france/iu },
  { term: "garanti", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantie", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantis", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garanties", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantir", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantiss*", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "garantir*", reason: "aucun résultat ne peut être garanti", allowIn: NEGATION },
  { term: "vous récupérerez", reason: "promesse de résultat chiffré" },
  { term: "vous économiserez", reason: "promesse de résultat chiffré" },
  { term: "vous allez récupérer", reason: "promesse de résultat chiffré" },
  { term: "vous allez économiser", reason: "promesse de résultat chiffré" },
  { term: "milliers d'euros", reason: "chiffrage vague non vérifié" },
  { term: "millions d'euros", reason: "chiffrage vague non vérifié" },
  { term: "moins cher", reason: "comparaison de prix non vérifiée" },
  { term: "je ne suis pas une IA", reason: "l'assistant ne doit jamais nier être une IA" },
  { term: "je ne suis pas un robot", reason: "l'assistant ne doit jamais nier être une IA" },
  { term: "je suis un humain", reason: "l'assistant ne doit jamais se faire passer pour un humain" },
  { term: "je suis une vraie personne", reason: "l'assistant ne doit jamais se faire passer pour un humain" },
  { term: "je suis Mika", reason: "l'assistant ne doit jamais se faire passer pour Mika" },
];

// ── Délai de rappel : seul « 72 h » (ou « 3 jours ») est permis ──
const SHORT_DELAY = /(?<![\p{L}\p{N}])(?:sous|dans|en|d'ici|moins de|maximum)\s+(\d+)\s*(?:h|heures?)(?![\p{L}])/giu;
const CALLBACK_WORDS = /rappel\p{L}*|recontact\p{L}*|vous\s+contact\p{L}*|vous\s+joind\p{L}*|reviend\p{L}*\s+vers\s+vous|vous\s+répond\p{L}*/iu;
const DURATION = /(\d+|un|une|deux|trois|quatre|cinq|six|sept)\s*(h|heures?|jours?|j)(?![\p{L}])/giu;
const NUMBER_WORDS: Record<string, number> = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7 };
const IMMEDIATE = /(?<![\p{L}])(?:aujourd'hui|dans la journée|immédiatement|demain|dans l'heure|ce soir|tout de suite|le jour même)(?![\p{L}])/iu;

// ── Diagnostic : questionnaire en ligne, jamais « diagnostic gratuit 30 min » ──
const DIAGNOSTIC_DURATION = /diagnostic[^.!?\n]{0,40}?\d+\s*(?:min|minutes)(?![\p{L}])|\d+\s*(?:min|minutes)[^.!?\n]{0,25}?diagnostic/iu;

// ── Réductions : seule « -21 % » (non-assujettis à la TVA) existe ──
const DISCOUNT_WORD = /réduction|remise|rabais|ristourne/iu;
const PERCENT = /(\d+(?:[,.]\d+)?)\s*%/gu;

// ── Liens : relatifs de la liste blanche, ou domaines du cabinet ──
const DEFAULT_ALLOWED_HOSTS = ["odoo.mfinances.be", "mfinances.be", "www.mfinances.be"];
const MD_LINK = /\]\(\s*([^)\s]+)\s*\)/g;
const BARE_URL = /https?:\/\/[^\s)\]>"']+/gi;

export type GuardOptions = {
  /** Chemins internes acceptés (liste blanche + articles du catalogue). Si absent, seuls les domaines sont contrôlés. */
  isAllowedPath?: (normalizedPath: string) => boolean;
  allowedHosts?: readonly string[];
};

export type GuardResult = { ok: boolean; issues: string[] };

function checkLinks(text: string, opts: GuardOptions, issues: string[]) {
  const hosts = opts.allowedHosts ?? DEFAULT_ALLOWED_HOSTS;
  const urls = new Set<string>();
  for (const m of text.matchAll(MD_LINK)) urls.add(m[1]);
  for (const m of text.matchAll(BARE_URL)) urls.add(m[0]);
  for (const raw of urls) {
    const url = raw.replace(/[.,;:!?]+$/, "");
    if (/^(mailto:|tel:)/i.test(url)) continue;
    if (url.startsWith("/")) {
      const path = url.split(/[?#]/)[0];
      const norm = path.endsWith("/") ? path : `${path}/`;
      if (opts.isAllowedPath && !opts.isAllowedPath(norm)) issues.push(`lien interne hors liste : ${norm}`);
      continue;
    }
    try {
      const u = new URL(url);
      if (!/^https?:$/.test(u.protocol) || !hosts.includes(u.hostname.toLowerCase())) issues.push(`lien externe non autorisé : ${u.hostname || url}`);
    } catch {
      issues.push(`lien illisible : ${url.slice(0, 60)}`);
    }
  }
}

/**
 * Vérifie une réponse avant affichage :
 * - tout montant en € appartient à la liste fermée ; un montant écrit par le visiteur n'est toléré
 *   que dans une phrase qui ne parle pas de prix (sinon le visiteur « impose » le prix de son choix) ;
 * - tout délai de rappel est « 72 h » ;
 * - aucune réduction autre que 21 % ;
 * - aucun lien hors liste ;
 * - aucun terme interdit.
 */
export function validateAnswer(answer: string, visitorText = "", opts: GuardOptions = {}): GuardResult {
  const text = String(answer ?? "").replace(/’/g, "'");
  const issues: string[] = [];
  const sentences = text.split(/(?<=[.!?\n])\s+/);
  const visitorAmounts = new Set(extractEuroAmounts(String(visitorText ?? "").replace(/’/g, "'")));
  const allowedBase = new Set<number>(ALLOWED_EUR_AMOUNTS);

  const bad = new Set<number>();
  for (const sentence of sentences) {
    const priceTalk = PRICE_CONTEXT.test(sentence);
    for (const clause of sentence.split(CLAUSE_SPLIT)) {
      const revenueClause = REVENUE_CONTEXT.test(clause) && !PRICE_CONTEXT.test(clause);
      for (const n of extractEuroAmounts(clause)) {
        if (allowedBase.has(n)) continue;
        if (visitorAmounts.has(n) && (!priceTalk || revenueClause)) continue;
        bad.add(n);
      }
    }
  }
  if (bad.size) issues.push(`montant non autorisé : ${[...bad].map((n) => `${n} €`).join(", ")} (seuls les prix de la liste sont permis)`);

  for (const m of text.matchAll(SHORT_DELAY)) {
    if (Number(m[1]) !== 72) issues.push(`délai « ${m[0].trim()} » : le seul délai de rappel autorisé est 72 h`);
  }
  for (const sentence of sentences) {
    if (!CALLBACK_WORDS.test(sentence)) continue;
    for (const m of sentence.matchAll(DURATION)) {
      const n = /^\d+$/.test(m[1]) ? Number(m[1]) : NUMBER_WORDS[m[1].toLowerCase()];
      const hours = /^h|^heure/i.test(m[2]);
      const ok = hours ? n === 72 : n === 3;
      if (!ok) issues.push(`délai de rappel « ${m[0].trim()} » : le seul délai autorisé est 72 h`);
    }
    if (IMMEDIATE.test(sentence)) issues.push("promesse de rappel rapide : le seul délai de rappel autorisé est 72 h");
  }

  for (const sentence of sentences) {
    if (!DISCOUNT_WORD.test(sentence)) continue;
    for (const m of sentence.matchAll(PERCENT)) {
      if (Number(m[1].replace(",", ".")) !== 21) issues.push(`réduction de ${m[1]} % : seule la réduction de 21 % (non-assujettis à la TVA) existe`);
    }
  }

  for (const sentence of sentences) {
    if (DIAGNOSTIC_DURATION.test(sentence)) issues.push("le diagnostic gratuit est un questionnaire en ligne, pas un entretien d'une durée donnée");
  }

  checkLinks(text, opts, issues);

  for (const f of FORBIDDEN_TERMS) {
    const hit = sentences.some((sentence) => termMatches(sentence, f.term) && !(f.allowIn && f.allowIn.test(sentence)));
    if (hit) issues.push(`terme interdit « ${f.term.replace(/^=|\*$/g, "")} » : ${f.reason}`);
  }

  return { ok: issues.length === 0, issues: [...new Set(issues)] };
}

/** Réponse de repli quand la réponse générée reste non conforme. */
export function fallbackAnswer(bookingUrl: string): string {
  return `Je préfère que Mika vous réponde précisément sur ce point, pour ne rien vous dire d'approximatif. [Réserver un appel](${bookingUrl}) ou laissez votre e-mail dans le formulaire « Souhaitez-vous être recontacté ? » : il vous rappelle personnellement sous 72 h.`;
}

// ── Score d'intérêt : UNE seule liste, utilisée par le site et par la fonction chatbot ──
// Chaque groupe compte une seule fois par conversation. « contrôle » seul n'est pas une urgence
// (contrôle de gestion est un service) ; « rapidement », « problème », « facture » ne comptent plus.
export const INTEREST_KEYWORDS: readonly { id: string; terms: readonly string[]; points: number }[] = [
  { id: "urgence", terms: ["urgent", "urgence", "pressé", "pressée", "deadline", "dès que possible", "asap", "au plus vite", "contrôle fiscal", "redressement", "mise en demeure", "pénalité*", "amende*", "dette*"], points: 4 },
  { id: "fiscal", terms: ["tva", "impôt*", "isoc", "ipp", "déclaration*", "fiscal*", "vvprbis", "retard"], points: 3 },
  { id: "budget", terms: ["budget", "prix", "coût", "coûte", "tarif*", "combien", "devis", "investir", "investissement", "financer"], points: 3 },
  { id: "recherche", terms: ["cherch*", "besoin d'un comptable", "changer de comptable", "nouveau comptable", "accompagnement", "mission"], points: 3 },
  { id: "taille", terms: ["salarié*", "employé*", "équipe", "collaborateurs", "chiffre d'affaires", "=CA", "croissance", "bénéfice*"], points: 2 },
  { id: "juridique", terms: ["srl", "=SA", "sprl", "asbl", "société", "indépendant*", "management", "holding"], points: 2 },
  { id: "negatif", terms: ["juste regarder", "curieux", "curieuse", "étudiant*", "stagiaire", "gratuit seulement"], points: -3 },
];

/** Score d'intérêt d'un texte visiteur (chaque groupe une fois, jamais négatif). */
export function computeInterestScore(text: string): number {
  let score = 0;
  for (const kw of INTEREST_KEYWORDS) if (anyTermMatches(text, kw.terms)) score += kw.points;
  return Math.max(0, score);
}
