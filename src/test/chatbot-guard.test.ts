import { describe, expect, it } from "vitest";
import {
  INTEREST_KEYWORDS,
  anyTermMatches,
  extractEuroAmounts,
  fallbackAnswer,
  termMatches,
  validateAnswer,
} from "../../supabase/functions/_shared/chatbot-guard";

const BOOKING = "https://odoo.mfinances.be/appointment/11";

describe("contrôle des réponses : montants", () => {
  it("accepte les prix des formules (275, 350, 450, 650 €)", () => {
    expect(validateAnswer("Basic dès 275€ HTVA/mois, Essentiel 350 €, Premium 450 €, Excellence 650 € HTVA/mois.").ok).toBe(true);
  });
  it("accepte société en veille 175 €, création 800 € et 150 €/h", () => {
    expect(validateAnswer("Veille : 175 € HTVA/mois. Création : 800 € HTVA. Ponctuel : 150 € HTVA/h.").ok).toBe(true);
  });
  it("refuse un montant inventé (témoignage 3 400 €)", () => {
    const r = validateAnswer("Un restaurateur a récupéré 3 400 € avec nous.");
    expect(r.ok).toBe(false);
    expect(r.issues[0]).toContain("3400");
  });
  it("refuse un seuil fiscal cité de mémoire (25 000 €)", () => {
    expect(validateAnswer("La franchise TVA s'applique sous 25.000 euros de chiffre d'affaires.").ok).toBe(false);
  });
  it("refuse « 5k€ »", () => {
    expect(validateAnswer("Vous gagnerez 5k€ par an.").ok).toBe(false);
  });
  it("accepte un montant donné par le visiteur lui-même", () => {
    expect(validateAnswer("Avec un chiffre d'affaires de 250 000 €, le forfait Premium est adapté.", "Mon CA est de 250 000 €").ok).toBe(true);
  });
  it("lit les montants écrits de plusieurs façons", () => {
    expect(extractEuroAmounts("3 400 €, 12.000 euros, €800, 275€")).toEqual([3400, 12000, 275, 800]);
  });
});

describe("contrôle des réponses : délai de rappel", () => {
  it("accepte le rappel sous 72 h", () => {
    expect(validateAnswer("Mika vous rappelle personnellement sous 72 h.").ok).toBe(true);
  });
  it("refuse un rappel sous 24 h", () => {
    expect(validateAnswer("Mika vous rappelle sous 24h.").ok).toBe(false);
  });
  it("refuse un rappel dans 4 heures", () => {
    expect(validateAnswer("Nous vous recontactons dans 4 heures.").ok).toBe(false);
  });
  it("refuse un rappel dans la journée", () => {
    expect(validateAnswer("Mika vous rappelle dans la journée.").ok).toBe(false);
  });
});

describe("contrôle des réponses : termes interdits", () => {
  it("refuse « SCI » (forme française)", () => {
    expect(validateAnswer("Une SCI peut optimiser votre fiscalité.").ok).toBe(false);
  });
  it("ne confond pas « sci » dans un mot (conscience)", () => {
    expect(validateAnswer("Une comptabilité tenue en conscience.").ok).toBe(true);
  });
  it("refuse « garanti » et « garantie »", () => {
    expect(validateAnswer("Résultat garanti.").ok).toBe(false);
    expect(validateAnswer("Nous offrons une garantie d'économies.").ok).toBe(false);
  });
  it("accepte une phrase qui nie la garantie", () => {
    expect(validateAnswer("Aucun cabinet ne peut vous garantir un montant d'économie.").ok).toBe(true);
  });
  it("accepte la correction « la SCI n'existe pas en Belgique »", () => {
    expect(validateAnswer("La SCI est une forme française qui n'existe pas en Belgique : on parle plutôt de SRL.").ok).toBe(true);
  });
  it("refuse une promesse de récupération", () => {
    expect(validateAnswer("Vous récupérerez forcément de la TVA.").ok).toBe(false);
  });
  it("refuse de nier être une IA", () => {
    expect(validateAnswer("Non, je ne suis pas une IA, je suis le conseiller.").ok).toBe(false);
    expect(validateAnswer("Bonjour, je suis Mika.").ok).toBe(false);
  });
  it("accepte une réponse type correcte avec article et rendez-vous", () => {
    const ok = "Le BFR mesure l'argent immobilisé dans votre cycle. Pour approfondir : [BFR](/blog/tresorerie/bfr-definition-formule-tpe/). [Réserver un appel](https://odoo.mfinances.be/appointment/11)";
    expect(validateAnswer(ok).ok).toBe(true);
  });
  it("la réponse de repli passe elle-même le contrôle", () => {
    expect(validateAnswer(fallbackAnswer(BOOKING)).ok).toBe(true);
  });
});

describe("détection des mots (accents et sigles)", () => {
  it("« ça » et « sa » ne comptent pas comme la forme SA", () => {
    expect(termMatches("ça m'intéresse pour sa comptabilité", "=SA")).toBe(false);
    expect(termMatches("J'ai une SA à Bruxelles", "=SA")).toBe(true);
  });
  it("« pressé » est reconnu comme mot entier", () => {
    expect(termMatches("Je suis pressé", "pressé")).toBe(true);
  });
  it("« contrôle » et « calcul » ne déclenchent pas le filtre d'insultes", () => {
    expect(anyTermMatches("contrôle fiscal et calcul de l'ISOC", ["con", "cul"])).toBe(false);
  });
  it("« je cherche un comptable » compte comme recherche active", () => {
    const recherche = INTEREST_KEYWORDS.find((k) => k.terms.includes("cherch*"))!;
    expect(anyTermMatches("Je cherche un comptable", recherche.terms)).toBe(true);
  });
});
