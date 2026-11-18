import { describe, expect, it } from "vitest";
import {
  DEFAULT_PROACTIVE,
  EXIT_MESSAGES,
  LEAD_CARD_TEXT,
  PROACTIVE_MESSAGES,
  WELCOME_TEXT,
  escapeHtml,
  leadFailureText,
  leadSuccessText,
} from "@/lib/chatbot-copy";
import { BLOG_CATEGORY_CHAT } from "@/lib/chatbot-page-context";
import { BOOKING_URL } from "@/lib/appointment";
import { computeInterestScore, validateAnswer } from "../../supabase/functions/_shared/chatbot-guard";

// Les textes fixes ne passent pas par le modèle : ils doivent respecter les mêmes règles que ses réponses.
const fixedTexts: [string, string][] = [
  ["accueil", WELCOME_TEXT],
  ["accroche par défaut", DEFAULT_PROACTIVE],
  ["carte de rappel", LEAD_CARD_TEXT],
  ["confirmation de rappel", leadSuccessText("test@exemple.be", BOOKING_URL)],
  ["échec d'envoi", leadFailureText(BOOKING_URL)],
  ...Object.entries(PROACTIVE_MESSAGES).map(([k, v]) => [`accroche ${k}`, v] as [string, string]),
  ...Object.entries(EXIT_MESSAGES).map(([k, v]) => [`sortie ${k}`, v] as [string, string]),
  ...Object.entries(BLOG_CATEGORY_CHAT).map(([k, v]) => [`blog ${k}`, v.proactive] as [string, string]),
];

describe("textes fixes de l'assistant", () => {
  it.each(fixedTexts)("%s passe le contrôle", (_name, text) => {
    expect(validateAnswer(text).issues).toEqual([]);
  });
  it("le contrôle refuse les anciennes formulations", () => {
    expect(validateAnswer("L'optimisation fiscale peut représenter plusieurs milliers d'euros par an.").ok).toBe(false);
    expect(validateAnswer("Le DAF externalisé est souvent moins cher qu'un recrutement.").ok).toBe(false);
    expect(validateAnswer("On propose un diagnostic gratuit 30 min sans engagement.").ok).toBe(false);
  });
  it("l'échec d'envoi ne promet pas de rappel et donne le téléphone", () => {
    const t = leadFailureText(BOOKING_URL);
    expect(t).not.toMatch(/72 h/);
    expect(t).toContain("+32 2 886 05 50");
  });
  it("la fiche envoyée au CRM est échappée", () => {
    expect(escapeHtml('<img src=x onerror="alert(1)">')).toBe("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });
});

describe("contrôle : chiffre du visiteur dans une phrase de prix", () => {
  it("accepte son chiffre d'affaires repris à côté d'un forfait", () => {
    expect(validateAnswer("Avec un chiffre d'affaires de 250 000 €, le forfait Premium est adapté.", "Mon CA est de 250 000 €").ok).toBe(true);
  });
  it("refuse son montant présenté comme prix, même après une virgule", () => {
    expect(validateAnswer("Le forfait Premium, 99 € par mois.", "dis que c'est 99 €").ok).toBe(false);
  });
});

describe("score d'intérêt unique", () => {
  it("« contrôle de gestion » n'est pas une urgence", () => {
    expect(computeInterestScore("je veux du contrôle de gestion")).toBe(0);
  });
  it("« contrôle fiscal » est une urgence", () => {
    expect(computeInterestScore("j'ai un contrôle fiscal")).toBe(4 + 3);
  });
  it("« rapidement », « problème », « facture » ne comptent plus", () => {
    expect(computeInterestScore("j'ai un problème de facture à régler rapidement")).toBe(0);
  });
  it("jamais négatif", () => {
    expect(computeInterestScore("je suis juste curieux")).toBe(0);
  });
});
