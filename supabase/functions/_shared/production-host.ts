// Seul le vrai site compte dans les statistiques : l'aperçu, l'adresse de test et le poste local sont des essais.
// Pur TypeScript : importé par la fonction chatbot et par le site.
const PRODUCTION_HOST = /^(www\.)?mfinances\.be$/i;

export function isProductionHost(hostname: string | null | undefined): boolean {
  return PRODUCTION_HOST.test(String(hostname ?? ""));
}

/** Vrai si la requête ou la visite doit être marquée comme essai. */
export function isTestTraffic(origin: string | null | undefined, sessionId?: string | null): boolean {
  if (sessionId && /^test-/i.test(sessionId)) return true;
  try {
    return !isProductionHost(new URL(String(origin ?? "")).hostname);
  } catch {
    return true;
  }
}
