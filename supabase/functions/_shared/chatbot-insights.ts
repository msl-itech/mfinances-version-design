// Outils purs (sans API Deno) pour garder les questions de l'assistant de façon anonyme.
// Importés par la fonction chatbot et par les tests du site.

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
// Numéros de 8 chiffres ou plus, avec espaces, points, tirets ou indicatif (+32...).
const PHONE_RE = /(?:\+|00)?\d[\d\s.\-/()]{6,}\d/g;
// Numéros d'entreprise / TVA belges (BE 0xxx.xxx.xxx) et IBAN.
const IBAN_RE = /\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){2,7}\b/gi;

export const MAX_QUESTION_LENGTH = 500;

/** Masque courriels, téléphones et IBAN avant d'enregistrer une question. */
export function redactPii(text: string): string {
  return String(text ?? "")
    .replace(EMAIL_RE, "[courriel]")
    .replace(IBAN_RE, "[compte]")
    .replace(PHONE_RE, (m) => (m.replace(/\D/g, "").length >= 8 ? "[téléphone]" : m))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_QUESTION_LENGTH);
}

/** Articles du blog (/blog/categorie/article/) cités dans une réponse, sans doublon. */
export function extractBlogArticlePaths(answer: string): string[] {
  const found = new Set<string>();
  const re = /\]\((\/blog\/[a-z0-9-]+\/[a-z0-9-]+\/?)\)/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(answer)) !== null) {
    const p = m[1].endsWith("/") ? m[1] : `${m[1]}/`;
    found.add(p.toLowerCase());
  }
  return [...found];
}

/** Assemble le texte d'un flux SSE de type OpenAI (data: {...choices[0].delta.content}). */
export function collectSseText(raw: string): string {
  let out = "";
  for (const line of raw.split("\n")) {
    const l = line.trim();
    if (!l.startsWith("data: ")) continue;
    const json = l.slice(6);
    if (json === "[DONE]") break;
    try {
      const c = JSON.parse(json)?.choices?.[0]?.delta?.content;
      if (typeof c === "string") out += c;
    } catch {
      // ligne incomplète : ignorée
    }
  }
  return out;
}
