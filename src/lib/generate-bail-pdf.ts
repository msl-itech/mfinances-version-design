import jsPDF from "jspdf";
import { LOGO_BASE64 } from "./bail-logo";

interface BailData {
  bailType: "immeuble" | "meuble";
  qualite: "proprietaire" | "locataire";
  civilite: string;
  prenomBailleur: string;
  nomBailleur: string;
  adresseBailleur: string;
  cpBailleur: string;
  villeBailleur: string;
  paysBailleur: string;
  denomination: string;
  formeJuridique: string;
  siegeSocial: string;
  numeroBce: string;
  representant: string;
  adresseBien: string;
  surfaceBien: number | "";
  descriptionBien: string;
  loyerMensuel: number;
  garantie: string;
  duree: string;
  dateDebut: string;
  indexation: boolean;
  partImmeuble: number;
  partMeubles: number;
  loyerImmeuble: number;
  loyerMeubles: number;
  meubles: { designation: string; valeur: number | "" }[];
}

/* ── Colors ── */
const NAVY = [27, 43, 94] as const;
const RED = [232, 57, 58] as const;
const GRAY = [155, 163, 188] as const;
const MID = [68, 75, 99] as const;
const TEXT = [26, 29, 46] as const;
const BORDER = [226, 229, 239] as const;
const BG = [247, 248, 252] as const;
const WARN_BG = [254, 243, 199] as const;
const WARN_BORDER = [245, 158, 11] as const;
const WARN_TEXT = [146, 64, 14] as const;
const INFO_BG = [239, 246, 255] as const;
const INFO_BORDER = [24, 95, 165] as const;
const INFO_TEXT = [12, 68, 124] as const;
const WHITE = [255, 255, 255] as const;

function fmt(n: number) {
  return n.toLocaleString("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDateFr(dateStr: string): string {
  if (!dateStr) return "___";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function computeEndDate(dateStr: string, dureeAns: string): string {
  if (!dateStr) return "___";
  try {
    const d = new Date(dateStr);
    d.setFullYear(d.getFullYear() + parseInt(dureeAns));
    return d.toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "___";
  }
}

export function generateBailPdf(data: BailData): Blob {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const PW = doc.internal.pageSize.getWidth(); // 210
  const PH = doc.internal.pageSize.getHeight(); // 297
  const M = 22; // margin
  const MW = PW - M * 2; // max width
  let y = 0;
  let currentPage = 1;

  const setColor = (c: readonly [number, number, number]) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: readonly [number, number, number]) => doc.setDrawColor(c[0], c[1], c[2]);
  const setFill = (c: readonly [number, number, number]) => doc.setFillColor(c[0], c[1], c[2]);

  const needsPage = (needed: number) => {
    if (y + needed > PH - 30) {
      addFooter();
      doc.addPage();
      currentPage++;
      addPage2Header();
      return true;
    }
    return false;
  };

  /* ══ HEADER (page 1) ══ */
  const addMainHeader = () => {
    // Navy background
    setFill(NAVY);
    doc.rect(0, 0, PW, 32, "F");

    // Logo image
    try {
      doc.addImage(LOGO_BASE64, "PNG", M, 5, 22, 22);
    } catch {
      // Fallback text logo
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      setColor(RED);
      doc.text("M", M, 18);
      doc.setFontSize(12);
      setColor(WHITE);
      doc.text("FINANCES", M + 10, 18);
    }

    // Subtitle under logo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(GRAY);
    doc.text("Expert-comptable · Uccle, Bruxelles", M + 26, 14);

    // ITAA right
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(GRAY);
    doc.text("ITAA n°50.624.805", PW - M, 12, { align: "right" });
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255, 100);
    setColor([160, 168, 190]);
    doc.text("À valider avant signature", PW - M, 17, { align: "right" });

    y = 32;
  };

  /* ══ TITLE BLOCK ══ */
  const addTitleBlock = () => {
    // Title background (continuation of navy)
    setFill(NAVY);
    doc.rect(0, y, PW, 26, "F");

    // Separator line
    doc.setDrawColor(255, 255, 255, 30);
    doc.setLineWidth(0.2);
    doc.line(0, y, PW, y);

    // Title text
    let titleText: string;
    if (data.bailType === "meuble") {
      titleText = "CONTRAT DE BAIL DE LOCATION MEUBLÉE";
    } else if (data.qualite === "locataire") {
      titleText = "CONTRAT DE BAIL DE SOUS-LOCATION";
    } else {
      titleText = "CONTRAT DE BAIL DE LOCATION";
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    setColor(WHITE);
    doc.text(titleText, PW / 2, y + 10, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setColor(GRAY);
    doc.text("À usage professionnel — Bureau à domicile — Belgique", PW / 2, y + 16, { align: "center" });

    // Generation date
    doc.setFontSize(7);
    setColor([160, 168, 190]);
    const now = new Date().toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
    doc.text(`Généré le ${now} · mfinances.be`, PW / 2, y + 21, { align: "center" });

    y += 26;
  };

  /* ══ PAGE 2+ HEADER ══ */
  const addPage2Header = () => {
    setFill(NAVY);
    doc.rect(0, 0, PW, 14, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setColor(WHITE);
    doc.text("MFinances", M, 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(GRAY);
    const headerInfo = ` — Bail professionnel · ${data.prenomBailleur} ${data.nomBailleur} / ${data.denomination} ${data.formeJuridique}`;
    doc.text(headerInfo, M + doc.getTextWidth("MFinances"), 9);

    y = 20;
  };

  /* ══ FOOTER ══ */
  const addFooter = () => {
    const fy = PH - 14;
    setFill(BG);
    doc.rect(0, fy, PW, 14, "F");
    setDraw(BORDER);
    doc.setLineWidth(0.3);
    doc.line(0, fy, PW, fy);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setColor(GRAY);
    doc.text("MFinances · Expert-comptable agréé · ITAA n°50.624.805 · Uccle, Bruxelles · info@mfinances.be · mfinances.be", M, fy + 5);

    doc.setFontSize(6.5);
    doc.setFont("helvetica", "bold");
    doc.text("Document confidentiel · À valider avant signature · mfinances.be/ressources/generateur-bail/", M, fy + 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setColor([200, 205, 224]);
    // Page number placeholder — will be updated at the end
  };

  /* ══ ARTICLE WRITER ══ */
  const writeArticle = (title: string, bodyFn: () => void) => {
    needsPage(20);

    // Red bar + title
    setFill(RED);
    doc.rect(M, y, 2.5, 5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setColor(NAVY);
    doc.text(title.toUpperCase(), M + 5, y + 4);
    y += 9;

    bodyFn();

    // Article separator
    setDraw(BORDER);
    doc.setLineWidth(0.2);
    doc.line(M, y, PW - M, y);
    y += 6;
  };

  const writeParagraph = (text: string, opts?: { color?: readonly [number, number, number]; size?: number; bold?: boolean }) => {
    const size = opts?.size ?? 9;
    const color = opts?.color ?? MID;
    doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
    doc.setFontSize(size);
    setColor(color);
    const lines = doc.splitTextToSize(text, MW);
    needsPage(lines.length * 4);
    doc.text(lines, M, y);
    y += lines.length * 4 + 2;
  };

  const writeBold = (text: string) => writeParagraph(text, { color: TEXT, bold: true });

  /* ══ WARNING BOX ══ */
  const writeWarningBox = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setColor(WARN_TEXT);
    const lines = doc.splitTextToSize(text, MW - 10);
    const boxH = lines.length * 4 + 8;
    needsPage(boxH);

    setFill(WARN_BG);
    doc.rect(M, y, MW, boxH, "F");
    setFill(WARN_BORDER);
    doc.rect(M, y, 2, boxH, "F");

    doc.text(lines, M + 6, y + 6);
    y += boxH + 4;
  };

  /* ══ INFO BOX ══ */
  const writeInfoBox = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(INFO_TEXT);
    const lines = doc.splitTextToSize(text, MW - 10);
    const boxH = lines.length * 4 + 8;
    needsPage(boxH);

    setFill(INFO_BG);
    doc.rect(M, y, MW, boxH, "F");
    setFill(INFO_BORDER);
    doc.rect(M, y, 2, boxH, "F");

    doc.text(lines, M + 6, y + 6);
    y += boxH + 4;
  };

  /* ══ BUILD PDF ══ */

  // Page 1
  addMainHeader();
  addTitleBlock();
  y += 6;

  // ── PRÉAMBULE ──
  writeArticle("Entre les soussignés", () => {
    writeParagraph("D'une part,");
    writeParagraph(
      `${data.civilite} ${data.prenomBailleur} ${data.nomBailleur}, domicilié(e) à ${data.adresseBailleur}, ${data.cpBailleur} ${data.villeBailleur}, ${data.paysBailleur},`,
      { color: TEXT, bold: true }
    );
    writeParagraph("ci-après dénommé(e) « Le Bailleur »,");
    y += 2;
    writeParagraph("Et d'autre part,");
    writeParagraph(
      `La société ${data.denomination} ${data.formeJuridique}, dont le siège social est établi à ${data.siegeSocial}, numéro BCE ${data.numeroBce}, représentée par ${data.representant},`,
      { color: TEXT, bold: true }
    );
    writeParagraph("ci-après dénommée « Le Preneur ».");
  });

  // ── MISE EN GARDE SOUS-LOCATION (conditionnel) ──
  if (data.qualite === "locataire") {
    writeArticle("Mise en garde — Sous-location", () => {
      writeWarningBox(
        "Le Bailleur déclare être lui-même locataire du bien décrit ci-après et disposer de l'autorisation expresse de son propriétaire pour procéder à la présente sous-location à usage professionnel. À défaut d'une telle autorisation, la présente convention serait nulle et non avenue."
      );
    });
  }

  // ── ARTICLE 1 — OBJET ──
  const espaceType = data.bailType === "meuble" ? "espace meublé à usage exclusivement professionnel" : "espace à usage exclusivement professionnel";
  writeArticle("Article 1 — Objet du contrat", () => {
    const surfaceText = data.surfaceBien ? `, surface approximative de ${data.surfaceBien} m²` : "";
    writeParagraph(
      `Le Bailleur donne en location au Preneur un ${espaceType} situé à ${data.adresseBien}${surfaceText}, tel que décrit au présent contrat. Cet espace est destiné à l'usage exclusif de bureau professionnel pour la société ${data.denomination}.`
    );
    if (data.descriptionBien) {
      writeParagraph(`Description de l'espace : ${data.descriptionBien}`, { size: 8.5, color: NAVY });
    }
  });

  // ── ARTICLE 2 — DURÉE ──
  const dateDebutFr = formatDateFr(data.dateDebut);
  const dateFinFr = computeEndDate(data.dateDebut, data.duree);
  writeArticle("Article 2 — Durée", () => {
    writeParagraph(
      `Le présent contrat est conclu pour une durée de ${data.duree} ans, prenant effet le ${dateDebutFr} et venant à échéance le ${dateFinFr}. Sauf dénonciation par lettre recommandée adressée 3 mois avant l'échéance, le contrat sera renouvelé tacitement par périodes successives d'une année.`
    );
  });

  // ── ARTICLE 3 — LOYER ──
  if (data.bailType === "meuble" && data.loyerMensuel > 0) {
    writeArticle("Article 3 — Loyer et répartition", () => {
      writeParagraph(
        `Le loyer mensuel total est fixé à ${fmt(data.loyerMensuel)} €, réparti comme suit :`
      );

      // Table
      const tableX = M;
      const colWidths = [58, 32, 38, 38];
      const tableW = colWidths.reduce((a, b) => a + b, 0);

      needsPage(40);

      // Header row
      setFill(NAVY);
      doc.rect(tableX, y, tableW, 7, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      setColor(WHITE);
      const headers = ["Composante", "Répartition", "Montant mensuel", "Montant annuel"];
      let tx = tableX;
      headers.forEach((h, i) => {
        doc.text(h.toUpperCase(), tx + 3, y + 5);
        tx += colWidths[i];
      });
      y += 7;

      // Data rows
      const rows = [
        ["Location de l'immeuble", `${data.partImmeuble} %`, `${fmt(data.loyerImmeuble)} €`, `${fmt(data.loyerImmeuble * 12)} €`],
        ["Location du mobilier", `${data.partMeubles} %`, `${fmt(data.loyerMeubles)} €`, `${fmt(data.loyerMeubles * 12)} €`],
      ];

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      rows.forEach((row) => {
        setDraw(BORDER);
        doc.setLineWidth(0.2);
        doc.line(tableX, y + 6, tableX + tableW, y + 6);

        setColor(MID);
        tx = tableX;
        row.forEach((cell, i) => {
          if (i >= 2) {
            doc.text(cell, tx + colWidths[i] - 3, y + 4.5, { align: "right" });
          } else {
            doc.text(cell, tx + 3, y + 4.5);
          }
          tx += colWidths[i];
        });
        y += 7;
      });

      // Total row
      setFill(BG);
      doc.rect(tableX, y, tableW, 7, "F");
      doc.setFont("helvetica", "bold");
      setColor(NAVY);
      doc.text("TOTAL LOYER", tableX + 3, y + 5);
      doc.text(`${fmt(data.loyerMensuel)} €`, tableX + colWidths[0] + colWidths[1] + colWidths[2] - 3, y + 5, { align: "right" });
      doc.text(`${fmt(data.loyerMensuel * 12)} €`, tableX + tableW - 3, y + 5, { align: "right" });
      y += 10;

      // Custom repartition justification (if not default 60/40)
      if (data.partImmeuble !== 60) {
        writeParagraph(
          `Justification de la répartition retenue : les parties ont convenu d'une répartition ${data.partImmeuble}/${data.partMeubles} tenant compte de la valeur du mobilier mis à disposition.`,
          { size: 8, color: MID }
        );
      }

      writeParagraph(
        "Le loyer est payable le premier de chaque mois par virement bancaire sur le compte du Bailleur."
      );
    });
  } else {
    writeArticle("Article 3 — Loyer", () => {
      writeParagraph(
        `Le loyer mensuel est fixé à ${fmt(data.loyerMensuel)} €, payable le premier de chaque mois par virement bancaire sur le compte du Bailleur. Ce montant couvre l'usage exclusif de l'espace professionnel décrit à l'article 1.`
      );
    });
  }

  // ── ARTICLE 4 — INDEXATION ──
  writeArticle("Article 4 — Indexation", () => {
    if (data.indexation) {
      writeParagraph(
        "Le loyer est indexé annuellement à la date anniversaire du contrat sur la base de l'indice santé belge (art. 1728bis du Code civil). Formule : loyer de base × (indice du mois précédant l'indexation / indice du mois précédant l'entrée en vigueur)."
      );
    } else {
      writeParagraph(
        "Les parties conviennent expressément que le loyer ne sera pas indexé pendant la durée du présent bail."
      );
    }
  });

  // ── ARTICLE 5 — GARANTIE ──
  writeArticle("Article 5 — Garantie locative", () => {
    const nbMois = parseInt(data.garantie);
    if (nbMois > 0) {
      writeParagraph(
        `Une garantie locative correspondant à ${data.garantie} mois de loyer, soit ${fmt(data.loyerMensuel * nbMois)} €, est constituée au profit du Bailleur avant l'entrée en jouissance. Cette garantie sera restituée dans les 15 jours suivant la fin du contrat, sous déduction des sommes éventuellement dues.`
      );
    } else {
      writeParagraph("Aucune garantie locative n'est exigée.");
    }
  });

  // ── ARTICLE 6 — CHARGES ──
  writeArticle("Article 6 — Charges et impôts", () => {
    writeParagraph(
      "Les impôts, taxes et charges afférents à la propriété du bien (précompte immobilier, assurance propriétaire, entretien structurel) restent à charge du Bailleur. Les charges liées à l'usage professionnel (électricité, internet, entretien courant) sont prises en charge par le Preneur proportionnellement à son usage, selon la part professionnelle professionnelle convenue entre parties."
    );
  });

  // ── ARTICLE 7 — ÉTAT DES LIEUX ──
  writeArticle("Article 7 — État des lieux", () => {
    writeParagraph(
      "Un état des lieux contradictoire est établi à l'entrée en vigueur du présent contrat. Il sera signé par les deux parties et annexé au présent acte. À l'expiration du bail, un état des lieux de sortie contradictoire sera établi dans les mêmes conditions."
    );
  });

  // ── ARTICLE 8 — ENTRETIEN ──
  writeArticle("Article 8 — Entretien et réparations", () => {
    writeParagraph(
      "Le Preneur s'engage à utiliser l'espace loué en bon père de famille et à le restituer dans l'état où il l'a reçu. Les petites réparations d'entretien courant sont à charge du Preneur. Les grosses réparations et travaux de structure restent à charge du Bailleur."
    );
  });

  // ── ARTICLE 9 — CESSION ──
  writeArticle("Article 9 — Cession et sous-location", () => {
    writeParagraph(
      "Le Preneur ne peut ni céder le présent contrat ni sous-louer tout ou partie de l'espace loué sans l'accord écrit préalable du Bailleur."
    );
  });

  // ── ARTICLE 10 — USAGE ──
  writeArticle("Article 10 — Usage professionnel exclusif", () => {
    writeParagraph(
      `L'espace loué est destiné à l'usage exclusivement professionnel de la société ${data.denomination}. Tout autre usage est formellement interdit sauf accord écrit des deux parties.`
    );
  });

  // ── ARTICLE 11 — ENREGISTREMENT ──
  writeArticle("Article 11 — Enregistrement", () => {
    writeParagraph(
      "Le présent contrat peut être soumis à la formalité de l'enregistrement dans un délai de deux mois à compter de sa signature. Les frais d'enregistrement sont à charge du Preneur, conformément à l'article 17 du Code des droits d'enregistrement. L'enregistrement est recommandé pour lui conférer date certaine."
    );
  });

  // ── ARTICLE 12 — DÉCLARATIONS FISCALES ──
  writeArticle("Article 12 — Déclarations fiscales", () => {
    writeParagraph(
      `Le Bailleur ${data.civilite} ${data.prenomBailleur} ${data.nomBailleur} déclare être informé de ses obligations fiscales : les loyers perçus constituent des revenus immobiliers soumis à l'IPP belge. Le Preneur ${data.denomination} ${data.formeJuridique} déduira les loyers versés comme charges professionnelles dans le respect des art. 49 et suiv. du CIR 1992.`
    );
    if (data.bailType === "meuble") {
      writeInfoBox(
        `La part mobilière du loyer (${data.partMeubles} % = ${fmt(data.loyerMeubles)} €/mois) constitue un revenu mobilier divers imposable à un taux effectif d'environ 7,5 % (base 50 % × précompte mobilier 15 %).`
      );
    }
  });

  // ── ARTICLE 13 — LITIGES ──
  writeArticle("Article 13 — Résolution des litiges", () => {
    const ville = data.villeBailleur || "Bruxelles";
    writeParagraph(
      `En cas de litige, les tribunaux de l'arrondissement du lieu de situation du bien loué (${ville}) seront seuls compétents. Le présent contrat est soumis au droit belge.`
    );
  });

  // ── ANNEXE INVENTAIRE (conditionnel) ──
  if (data.bailType === "meuble" && data.meubles.length > 0) {
    writeArticle("Annexe — Inventaire des meubles", () => {
      const tableX = M;
      const colWidths = [12, 100, 44];
      const tableW = colWidths.reduce((a, b) => a + b, 0);

      needsPage(20 + data.meubles.length * 7);

      // Header
      setFill(BG);
      doc.rect(tableX, y, tableW, 7, "F");
      setDraw(BORDER);
      doc.setLineWidth(0.5);
      doc.line(tableX, y + 7, tableX + tableW, y + 7);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      setColor(NAVY);
      doc.text("#", tableX + 3, y + 5);
      doc.text("DÉSIGNATION", tableX + colWidths[0] + 3, y + 5);
      doc.text("VALEUR ESTIMÉE", tableX + colWidths[0] + colWidths[1] + colWidths[2] - 3, y + 5, { align: "right" });
      y += 7;

      // Rows
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      data.meubles.forEach((m, i) => {
        needsPage(8);
        setColor(MID);
        doc.text(String(i + 1), tableX + 3, y + 5);
        doc.text(m.designation || "—", tableX + colWidths[0] + 3, y + 5);
        const val = typeof m.valeur === "number" ? `${fmt(m.valeur)} €` : "—";
        doc.text(val, tableX + tableW - 3, y + 5, { align: "right" });
        setDraw(BORDER);
        doc.setLineWidth(0.2);
        doc.line(tableX, y + 7, tableX + tableW, y + 7);
        y += 7;
      });

      // Total row
      const total = data.meubles.reduce((s, m) => s + (typeof m.valeur === "number" ? m.valeur : 0), 0);
      doc.setFont("helvetica", "bold");
      setColor(NAVY);
      doc.text("Valeur totale de l'inventaire", tableX + 3, y + 5);
      setColor(RED);
      doc.text(`${fmt(total)} €`, tableX + tableW - 3, y + 5, { align: "right" });
      y += 10;

      writeParagraph(
        "Les meubles listés ci-dessus sont inclus dans la location et font partie intégrante du présent contrat. Leur valeur a été estimée d'un commun accord entre les parties.",
        { size: 8, color: GRAY }
      );
    });
  }

  // ── SIGNATURES ──
  needsPage(50);
  writeParagraph(
    `Fait à ${data.villeBailleur || "___"}, le ${dateDebutFr}, en trois exemplaires originaux.`
  );
  y += 4;

  const sigLeftX = M;
  const sigRightX = PW / 2 + 10;

  // Left: Bailleur
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setColor(NAVY);
  doc.text("LE BAILLEUR", sigLeftX, y);
  // Right: Preneur
  doc.text("LE PRENEUR", sigRightX, y);
  y += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setColor(MID);
  doc.text(`${data.civilite} ${data.prenomBailleur} ${data.nomBailleur}`, sigLeftX, y);
  doc.text(`${data.denomination} ${data.formeJuridique}`, sigRightX, y);
  y += 4;

  doc.setFontSize(7.5);
  setColor(GRAY);
  doc.text(`représenté par ${data.representant}`, sigRightX, y);
  y += 14;

  // Signature lines
  setDraw(BORDER);
  doc.setLineWidth(0.3);
  doc.line(sigLeftX, y, sigLeftX + 60, y);
  doc.line(sigRightX, y, sigRightX + 60, y);
  y += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  setColor([200, 205, 224]);
  doc.text("Signature + mention manuscrite « Lu et approuvé »", sigLeftX, y);
  doc.text("Signature + mention manuscrite « Lu et approuvé »", sigRightX, y);
  y += 10;

  // ── DISCLAIMER BOX ──
  needsPage(25);
  const disclaimerText = "Avis important : Ce bail est basé sur un modèle utilisé en cabinet, adapté au contexte belge. Il constitue un acte sous seing privé. Il n'est pas notarié — ce n'est pas nécessaire pour ce type de contrat. À valider avant signature par un expert-comptable ou un conseiller juridique selon votre situation spécifique. L'enregistrement est recommandé pour lui conférer date certaine. MFinances SPRL · ITAA n°50.624.805 · mfinances.be";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  setColor(GRAY);
  const discLines = doc.splitTextToSize(disclaimerText, MW - 10);
  const discH = discLines.length * 3.5 + 8;

  setFill(BG);
  doc.rect(M, y, MW, discH, "F");
  setDraw(BORDER);
  doc.setLineWidth(0.3);
  doc.rect(M, y, MW, discH, "S");

  doc.text(discLines, M + 5, y + 5);
  y += discH + 4;

  // ── ADD FOOTER TO ALL PAGES ──
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    if (i === 1) {
      addFooter();
    } else {
      // Simple footer for other pages
      const fy = PH - 14;
      setFill(BG);
      doc.rect(0, fy, PW, 14, "F");
      setDraw(BORDER);
      doc.setLineWidth(0.3);
      doc.line(0, fy, PW, fy);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      setColor(GRAY);
      doc.text("MFinances · Expert-comptable agréé · ITAA n°50.624.805 · Uccle, Bruxelles · info@mfinances.be · mfinances.be", M, fy + 5);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.text("Document confidentiel · À valider avant signature · mfinances.be/ressources/generateur-bail/", M, fy + 9);
    }

    // Page number
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setColor([200, 205, 224]);
    doc.text(`Page ${i} / ${totalPages}`, PW - M, PH - 6, { align: "right" });
  }

  return doc.output("blob");
}
