import jsPDF from "jspdf";
import { LOGO_BASE64 } from "./bail-logo";

/* ── Types ── */
export interface QuotitePiece {
  name: string;
  surface: number;
  type: "vie" | "mansardee" | "cave";
  usagePro: number;
}

export interface QuotitePdfData {
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  statut: string; // dirigeant | independant | les-deux | liberal
  logement: string; // locataire | proprietaire
  pieces: QuotitePiece[];
  loyerMensuel: number;
  energie: number;
  internet: number;
  assurance: number;
  precompte: number;
}

/* ── Colors ── */
const NAVY = [27, 43, 94] as const;
const RED = [232, 57, 58] as const;
const GRAY = [155, 163, 188] as const;
const MID = [68, 75, 99] as const;
const TEXT_C = [26, 29, 46] as const;
const BORDER = [226, 229, 239] as const;
const BG = [247, 248, 252] as const;
const WHITE = [255, 255, 255] as const;
const OK = [59, 109, 17] as const;
const OK_BG = [234, 243, 222] as const;
const WARN = [146, 64, 14] as const;
const WARN_BG = [254, 243, 199] as const;
const INFO_BG = [239, 246, 255] as const;
const INFO_BORDER = [24, 95, 165] as const;
const INFO_TEXT = [12, 68, 124] as const;

type RGB = readonly [number, number, number];
const COEFFS: Record<string, number> = { vie: 1, mansardee: 0.8, cave: 0.2 };
const COEFF_LABELS: Record<string, string> = { vie: "100 %", mansardee: "80 %", cave: "20 %" };

function fmt(n: number, dec = 0) {
  return n.toLocaleString("fr-BE", { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function fmtDec(n: number) {
  return n.toLocaleString("fr-BE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function nowFr(): string {
  return new Date().toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
}

export function generateQuotitePdf(data: QuotitePdfData): Blob {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const M = 20; // margin
  const CW = W - 2 * M; // content width
  let y = 0;

  const setFill = (c: RGB) => doc.setFillColor(c[0], c[1], c[2]);
  const setDraw = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2]);
  const setTextC = (c: RGB) => doc.setTextColor(c[0], c[1], c[2]);

  /* ── Calculations ── */
  let surfacePro = 0;
  let surfaceTotal = 0;
  const piecesCalc = data.pieces.map((p) => {
    const coeff = COEFFS[p.type] ?? 1;
    const pondere = p.surface * coeff;
    const proPond = pondere * (p.usagePro / 100);
    surfaceTotal += pondere;
    surfacePro += proPond;
    return { ...p, coeff, pondere, proPond };
  });
  const quotite = surfaceTotal > 0 ? (surfacePro / surfaceTotal) * 100 : 0;

  const loyerAnnuel = data.loyerMensuel * 12;
  const charges: { label: string; montant: number }[] = [];
  if (loyerAnnuel > 0) charges.push({ label: `Loyer annuel (12 × ${fmt(data.loyerMensuel)} €)`, montant: loyerAnnuel });
  if (data.energie > 0) charges.push({ label: "Énergie", montant: data.energie });
  if (data.internet > 0) charges.push({ label: "Internet", montant: data.internet });
  if (data.assurance > 0) charges.push({ label: "Assurance habitation", montant: data.assurance });
  if (data.precompte > 0) charges.push({ label: "Précompte immobilier", montant: data.precompte });
  const chargesTotal = charges.reduce((s, c) => s + c.montant, 0);
  const deductionAn = chargesTotal * (quotite / 100);
  const deductionMois = deductionAn / 12;

  const hasNonStandardPond = data.pieces.some((p) => p.type !== "vie");
  const dateStr = nowFr();
  const statutLabel =
    data.statut === "dirigeant"
      ? "Dirigeant(e) de société"
      : data.statut === "independant"
        ? "Indépendant(e)"
        : data.statut === "les-deux"
          ? "Les deux"
          : "Profession libérale";

  /* ═══════════════════════════════════════════════
     PAGE 1
  ═══════════════════════════════════════════════ */

  // Header navy
  setFill(NAVY);
  doc.rect(0, 0, W, 42, "F");
  y = 12;

  // Logo
  try {
    doc.addImage(LOGO_BASE64, "PNG", M, 8, 10, 10);
  } catch {
    /* skip */
  }
  doc.setFont("helvetica", "bold");
  setTextC(RED);
  doc.setFontSize(14);
  // doc.text("M", M + 12, 14);
  setTextC(WHITE);
  doc.setFontSize(9);
  doc.text("MFINANCES", M + 18, 14);
  doc.setFont("helvetica", "normal");
  setTextC(GRAY);
  doc.setFontSize(7.5);
  doc.text("Expert-comptable · Uccle, Bruxelles", M, 21);

  // Right side
  doc.setFontSize(7.5);
  setTextC(GRAY);
  doc.text("ITAA n°50.624.805", W - M, 12, { align: "right" });
  doc.setFontSize(7);
  doc.text(`Rapport généré le ${dateStr}`, W - M, 17, { align: "right" });

  // Title
  y = 30;
  doc.setFont("helvetica", "bold");
  setTextC(WHITE);
  doc.setFontSize(14);
  doc.text("Rapport de quotiété professionnelle", M, y);
  doc.setFont("helvetica", "normal");
  setTextC(GRAY);
  doc.setFontSize(8);
  doc.text("Calculé sur base des données saisies par le déclarant", M, y + 6);

  y = 50;

  // Client bar
  setFill(BG);
  setDraw(BORDER);
  doc.roundedRect(M, y, CW, 22, 2, 2, "FD");
  doc.setFont("helvetica", "bold");
  setTextC(NAVY);
  doc.setFontSize(10);
  doc.text(data.prenom || "—", M + 6, y + 7);
  doc.setFont("helvetica", "normal");
  setTextC(GRAY);
  doc.setFontSize(7.5);
  const contactLine = [data.email, data.telephone].filter(Boolean).join(" · ");
  doc.text(contactLine, M + 6, y + 12);
  if (data.adresse) doc.text(`Bien analysé : ${data.adresse}`, M + 6, y + 17);

  // Right ref
  doc.setFontSize(7);
  doc.text("Exercice fiscal 2026", W - M - 6, y + 7, { align: "right" });
  doc.text("Méthode : surfaces pondérées", W - M - 6, y + 12, { align: "right" });
  doc.text("Version cabinet MFinances", W - M - 6, y + 17, { align: "right" });

  y += 28;

  // ── Grand résultat ──
  setFill(NAVY);
  doc.roundedRect(M, y, CW, 40, 3, 3, "F");
  setTextC(GRAY);
  doc.setFontSize(8);
  doc.text("Quotiété professionnelle calculée", W / 2, y + 9, { align: "center" });
  setTextC(WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(38);
  const qText = fmtDec(quotite);
  const qTextW = doc.getTextWidth(qText);
  const qX = W / 2 - qTextW / 2 - 4;
  doc.text(qText, qX, y + 28);
  doc.setFontSize(16);
  doc.text("%", qX + qTextW + 1, y + 18);
  doc.setFont("helvetica", "normal");
  setTextC(GRAY);
  doc.setFontSize(8);
  doc.text(
    `${fmtDec(surfacePro)} m² professionnels pondérés  /  ${fmtDec(surfaceTotal)} m² surface totale pondérée`,
    W / 2,
    y + 35,
    { align: "center" },
  );

  y += 46;

  // ── KPIs ──
  const kpiW = (CW - 9) / 4;
  const kpis = [
    { label: "Surface pro", val: fmtDec(surfacePro), sub: "m² pondérés" },
    { label: "Charges / an", val: fmt(chargesTotal), sub: "€ total" },
    { label: "Déduction / an", val: fmt(Math.round(deductionAn)), sub: "€ estimés", red: true },
    { label: "Déduction / mois", val: fmt(Math.round(deductionMois)), sub: "€ / mois" },
  ];
  kpis.forEach((kpi, i) => {
    const kx = M + i * (kpiW + 3);
    setFill(BG);
    setDraw(BORDER);
    doc.roundedRect(kx, y, kpiW, 24, 2, 2, "FD");
    setTextC(GRAY);
    doc.setFontSize(6);
    const labelLines = doc.splitTextToSize(kpi.label.toUpperCase(), kpiW - 4);
    doc.text(labelLines, kx + kpiW / 2, y + 5, { align: "center" });
    doc.setFont("helvetica", "bold");
    setTextC(kpi.red ? RED : TEXT_C);
    doc.setFontSize(12);
    doc.text(kpi.val, kx + kpiW / 2, y + 15, { align: "center", maxWidth: kpiW - 4 });
    doc.setFont("helvetica", "normal");
    setTextC(GRAY);
    doc.setFontSize(6);
    doc.text(kpi.sub, kx + kpiW / 2, y + 20, { align: "center" });
  });

  y += 30;

  // ── Section title helper ──
  const sectionTitle = (title: string) => {
    setFill(RED);
    doc.rect(M, y, 2, 5, "F");
    doc.setFont("helvetica", "bold");
    setTextC(NAVY);
    doc.setFontSize(7.5);
    doc.text(title.toUpperCase(), M + 5, y + 4);
    setDraw(BORDER);
    doc.line(M, y + 7, W - M, y + 7);
    y += 10;
  };

  // ── Tableau pièces ──
  sectionTitle("Détail des pièces — surfaces et pondérations");

  // Table header
  const cols = [M, M + 50, M + 72, M + 95, M + 118, M + 140];
  const colW = [50, 22, 23, 23, 22, CW - 140 + M];
  setFill(NAVY);
  doc.rect(M, y, CW, 7, "F");
  doc.setFont("helvetica", "bold");
  setTextC(WHITE);
  doc.setFontSize(6.5);
  const headers = ["Pièce", "Surface", "Pondération", "m² pondérés", "Usage pro", "m² pro pond."];
  headers.forEach((h, i) => {
    doc.text(h.toUpperCase(), cols[i] + 2, y + 5);
  });
  y += 8;

  // Table rows
  let totalSurface = 0;
  let totalPondere = 0;
  piecesCalc.forEach((p, idx) => {
    totalSurface += p.surface;
    totalPondere += p.pondere;
    if (idx % 2 === 1) {
      setFill(BG);
      doc.rect(M, y, CW, 6.5, "F");
    }
    doc.setFont("helvetica", "normal");
    setTextC(MID);
    doc.setFontSize(7.5);
    doc.text(p.name, cols[0] + 2, y + 4.5);
    doc.text(`${fmtDec(p.surface)} m²`, cols[1] + 2, y + 4.5);
    if (p.type !== "vie") setTextC(WARN);
    doc.text(COEFF_LABELS[p.type], cols[2] + 2, y + 4.5);
    setTextC(MID);
    doc.text(`${fmtDec(p.pondere)} m²`, cols[3] + 2, y + 4.5);
    doc.text(`${p.usagePro} %`, cols[4] + 2, y + 4.5);
    doc.setFont("helvetica", "bold");
    setTextC(p.proPond > 0 ? NAVY : MID);
    doc.text(`${fmtDec(p.proPond)} m²`, cols[5] + 2, y + 4.5);
    y += 6.5;
  });

  // Total row
  setFill(BG);
  doc.rect(M, y, CW, 7, "F");
  doc.setFont("helvetica", "bold");
  setTextC(NAVY);
  doc.setFontSize(7.5);
  doc.text("Total", cols[0] + 2, y + 5);
  doc.text(`${fmtDec(totalSurface)} m²`, cols[1] + 2, y + 5);
  doc.text("—", cols[2] + 2, y + 5);
  doc.text(`${fmtDec(totalPondere)} m²`, cols[3] + 2, y + 5);
  doc.text("—", cols[4] + 2, y + 5);
  setTextC(RED);
  doc.text(`${fmtDec(surfacePro)} m²`, cols[5] + 2, y + 5);
  y += 10;

  // ── Note pondération (conditionnel) ──
  if (hasNonStandardPond) {
    const noteText = data.pieces
      .filter((p) => p.type !== "vie")
      .map(
        (p) =>
          `« ${p.name} » → ${COEFF_LABELS[p.type]} (${p.type === "mansardee" ? "mansardée, hauteur réduite" : "cave/grenier"})`,
      )
      .join(", ");

    setFill(WARN_BG);
    doc.roundedRect(M, y, CW, 16, 2, 2, "F");
    setFill([245, 158, 11]);
    doc.rect(M, y, 2, 16, "F");
    doc.setFont("helvetica", "bold");
    setTextC(WARN);
    doc.setFontSize(7);
    doc.text("Note sur les pondérations :", M + 5, y + 5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    const wrapNote = doc.splitTextToSize(
      `Pièce(s) pondérée(s) : ${noteText}. Cette pondération est couramment appliquée par les cabinets comptables belges. Elle n'est pas un barème officiel, mais reflète une pratique habituelle défendable en cas de contrôle.`,
      CW - 10,
    );
    doc.text(wrapNote, M + 5, y + 9);
    y += Math.max(16, wrapNote.length * 3.5 + 6);
    y += 3;
  }

  // ── Simulateur par poste ──
  sectionTitle("Simulateur de déductions par poste de charge");

  charges.forEach((c, idx) => {
    if (idx % 2 === 1) {
      setFill(BG);
      doc.rect(M, y, CW, 6.5, "F");
    }
    doc.setFont("helvetica", "normal");
    setTextC(MID);
    doc.setFontSize(7);
    doc.text(c.label, M + 2, y + 4.5, { maxWidth: 94 });
    doc.text(`${fmt(c.montant)} €`, M + 100, y + 4.5);
    setTextC(GRAY);
    doc.text(`× ${fmtDec(quotite)} %`, M + 118, y + 4.5);
    doc.setFont("helvetica", "bold");
    setTextC(RED);
    doc.text(`${fmt(Math.round((c.montant * quotite) / 100))} €`, W - M - 2, y + 4.5, { align: "right" });
    y += 6.5;
  });

  // Total charges
  setDraw(BORDER);
  doc.line(M, y, W - M, y);
  y += 1;
  setFill(BG);
  doc.rect(M, y, CW, 7, "F");
  doc.setFont("helvetica", "bold");
  setTextC(NAVY);
  doc.setFontSize(8);
  doc.text("Charges totales analysées", M + 2, y + 5);
  doc.text(`${fmt(chargesTotal)} €`, M + 100, y + 5);
  y += 8;

  // Déduction totale
  setFill([255, 245, 245]);
  doc.rect(M, y, CW, 8, "F");
  doc.setFont("helvetica", "bold");
  setTextC(RED);
  doc.setFontSize(9);
  doc.text("Déduction totale estimée / an", M + 2, y + 5.5);
  doc.text(`${fmt(Math.round(deductionAn))} €`, W - M - 2, y + 5.5, { align: "right" });
  y += 12;

  // ── Footer page 1 ──
  setFill(BG);
  doc.rect(0, 280, W, 17, "F");
  setDraw(BORDER);
  doc.line(0, 280, W, 280);
  setTextC(GRAY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text(
    "MFinances · Expert-comptable agréé · ITAA n°50.624.805 · Uccle, Bruxelles · info@mfinances.be · mfinances.be",
    M,
    286,
  );
  doc.text("Page 1 / 2", W - M, 286, { align: "right" });

  /* ═══════════════════════════════════════════════
     PAGE 2
  ═══════════════════════════════════════════════ */
  doc.addPage();
  y = 0;

  // Header page 2
  setFill(NAVY);
  doc.rect(0, 0, W, 14, "F");
  doc.setFont("helvetica", "bold");
  setTextC(WHITE);
  doc.setFontSize(8);
  doc.text("MFinances", M, 9);
  doc.setFont("helvetica", "normal");
  setTextC(GRAY);
  doc.setFontSize(7);
  doc.text(`— Rapport quotiété · ${data.prenom} · ${dateStr}`, M + 25, 9);
  doc.text("Page 2 / 2", W - M, 9, { align: "right" });

  y = 22;

  // ── Recommandations selon profil ──
  sectionTitle("Recommandations selon votre profil");

  // Status block
  const drawStatusBox = (icon: string, title: string, text: string) => {
    const lines = doc.splitTextToSize(text, CW - 20);
    const boxH = Math.max(20, lines.length * 3.5 + 14);
    setDraw(NAVY);
    doc.roundedRect(M, y, CW, boxH, 2, 2, "S");
    setFill(BG);
    doc.roundedRect(M + 5, y + 5, 12, 12, 2, 2, "F");
    doc.setFontSize(10);
    setTextC(NAVY);
    doc.text(icon, M + 8, y + 13);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    setTextC(NAVY);
    doc.text(title, M + 22, y + 8);
    doc.setFont("helvetica", "normal");
    setTextC(MID);
    doc.setFontSize(7);
    doc.text(lines, M + 22, y + 13);
    y += boxH + 4;
  };

  if (data.statut === "dirigeant" && data.logement === "locataire") {
    drawStatusBox(
      "🏢",
      "Vous êtes dirigeant de société et locataire",
      "Vous pouvez potentiellement aller plus loin que la simple quotiété. Le mécanisme de sous-location professionnelle vous permet de louer formellement une partie de votre logement à votre société. Le loyer versé par votre société est déductible à l'ISOC — et vous le percevez dans votre IPP comme revenu immobilier, moins lourdement imposé qu'une rémunération.\n\nProchaine étape recommandée : générer un bail de sous-location conforme avec notre outil gratuit.",
    );
  } else if (data.statut === "dirigeant" && data.logement === "proprietaire") {
    drawStatusBox(
      "🏠",
      "Vous êtes dirigeant de société et propriétaire",
      "En tant que propriétaire, vous pouvez louer une partie de votre bien à votre société. Le loyer perçu est imposé comme revenu immobilier dans votre IPP, tandis que la société déduit ce loyer comme charge professionnelle à l'ISOC. Un bail écrit entre vous et votre société est indispensable.\n\nProchaine étape recommandée : générer un bail de location conforme avec notre outil gratuit.",
    );
  } else if (data.statut === "independant" || data.statut === "liberal") {
    drawStatusBox(
      "🧾",
      "Vous êtes indépendant(e)",
      "Déduisez la quotiété directement dans votre déclaration IPP comme frais professionnels. Conservez ce rapport PDF comme documentation justificative. Aucun bail n'est requis pour ce mécanisme.",
    );
  } else {
    drawStatusBox(
      "⚖️",
      "Vous exercez les deux activités",
      "Attention à la règle de non-double déduction : une même charge ne peut être déduite qu'une seule fois, que ce soit via votre société (ISOC) ou via votre activité indépendante (IPP). Nous vous recommandons de choisir le mécanisme le plus avantageux pour chaque poste de charge, avec l'aide de votre expert-comptable.\n\nProchaine étape recommandée : faire un diagnostic personnalisé avec MFinances.",
    );
  }

  // ── Bloc quotiété contextuel ──
  const drawContextBox = (bgColor: RGB, borderColor: RGB, textColor: RGB, text: string) => {
    const lines = doc.splitTextToSize(text, CW - 12);
    const boxH = lines.length * 3.5 + 8;
    setFill(bgColor);
    doc.roundedRect(M, y, CW, boxH, 2, 2, "F");
    setFill(borderColor);
    doc.rect(M, y, 2, boxH, "F");
    setTextC(textColor);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(lines, M + 5, y + 5);
    y += boxH + 4;
  };

  if (quotite <= 10) {
    drawContextBox(
      INFO_BG,
      INFO_BORDER,
      INFO_TEXT,
      `Votre quotiété est faible (${fmtDec(quotite)} %). Si vous utilisez un espace plus important à titre professionnel, ou si vous avez des pièces à usage mixte non comptabilisées, il peut être judicieux de revoir le calcul. Une pièce mixte à 15-20 % d'usage pro peut faire une différence notable.`,
    );
  } else if (quotite < 30) {
    drawContextBox(
      OK_BG,
      OK,
      OK,
      `Votre quotiété de ${fmtDec(quotite)} % est dans la fourchette habituelle pour un appartement avec bureau dédié en Belgique. Elle est bien documentée et défendable en cas de contrôle fiscal, à condition de conserver ce rapport par exercice fiscal.`,
    );
  } else {
    drawContextBox(
      WARN_BG,
      [245, 158, 11],
      WARN,
      `Attention — quotiété élevée (${fmtDec(quotite)} %). Une quotiété supérieure à 30 % peut attirer l'attention lors d'un contrôle fiscal. Assurez-vous que les surfaces et les pourcentages d'usage pro sont rigoureusement justifiables. Consultez votre expert-comptable pour valider ce niveau.`,
    );
  }

  // ── Rappels pour la suite ──
  sectionTitle("Rappels pour la suite");

  const cardW = (CW - 6) / (data.logement === "locataire" ? 3 : 2);
  const rappels = [
    {
      icon: "📁",
      title: "Conservation",
      text: "Conservez ce rapport PDF dans vos archives fiscales. Délai légal : 7 ans.",
    },
  ];
  if (data.logement === "locataire") {
    rappels.push({
      icon: "📄",
      title: "Bail de sous-location",
      text: "Un bail écrit est obligatoire avant tout paiement de loyer de votre société.",
    });
  }
  rappels.push({
    icon: "🔄",
    title: "Recalcul annuel",
    text: "Recalculez votre quotiété à chaque exercice fiscal si votre situation change.",
  });

  let maxRappelH = 22;
  const rappelData = rappels.map((r, i) => {
    const rx = M + i * (cardW + 3);
    const tl = doc.splitTextToSize(r.text, cardW - 10);
    const h = Math.max(22, tl.length * 3 + 12);
    if (h > maxRappelH) maxRappelH = h;
    return { ...r, rx, tl };
  });
  rappelData.forEach((r) => {
    setFill(BG);
    setDraw(BORDER);
    doc.roundedRect(r.rx, y, cardW, maxRappelH, 2, 2, "FD");
    doc.setFontSize(8);
    setTextC(NAVY);
    doc.text(r.icon, r.rx + 4, y + 6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(r.title, r.rx + 12, y + 6);
    doc.setFont("helvetica", "normal");
    setTextC(GRAY);
    doc.setFontSize(6);
    doc.text(r.tl, r.rx + 4, y + 11);
  });
  y += maxRappelH + 6;

  // ── CTA prochaine étape ──
  const ctaBoxH = 24;
  setFill(NAVY);
  doc.roundedRect(M, y, CW, ctaBoxH, 3, 3, "F");

  // Icon: draw a simple clipboard shape instead of emoji
  const iconX = M + 7;
  const iconY = y + 7;
  setFill(WHITE);
  setDraw(WHITE);
  doc.setLineWidth(0.3);
  doc.roundedRect(iconX, iconY, 6, 8, 0.8, 0.8, "S");
  doc.roundedRect(iconX + 1.5, iconY - 1, 3, 2, 0.5, 0.5, "FD");
  // clipboard lines
  doc.line(iconX + 1.5, iconY + 3, iconX + 4.5, iconY + 3);
  doc.line(iconX + 1.5, iconY + 5, iconX + 4.5, iconY + 5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  setTextC(WHITE);
  doc.text("Votre prochaine étape recommandée", M + 18, y + 8);
  doc.setFont("helvetica", "normal");
  setTextC(GRAY);
  doc.setFontSize(7);

  let ctaText = "";
  let ctaBtn = "";
  let ctaUrl = "";
  if (data.statut === "dirigeant" || data.statut === "les-deux") {
    if (data.logement === "locataire") {
      ctaText =
        "Vous êtes dirigeant de société et locataire. Pour maximiser vos avantages fiscaux, générez votre bail de sous-location professionnel — gratuit et conforme.";
      ctaBtn = "Générer mon bail !";
      ctaUrl = "https://mfinances.be/ressources/generateur-bail/";
    } else {
      ctaText =
        "Vous êtes dirigeant de société et propriétaire. Formalisez la location d'une partie de votre bien à votre société avec un bail conforme.";
      ctaBtn = "Générer mon bail !";
      ctaUrl = "https://mfinances.be/ressources/generateur-bail/";
    }
  } else {
    ctaText =
      "Transmettez ce rapport à votre expert-comptable. Il dispose de toutes les données pour intégrer la déduction dans votre déclaration IPP.";
    ctaBtn = "Contacter MFinances";
    ctaUrl = "https://mfinances.be/contact/";
  }
  const ctaLines = doc.splitTextToSize(ctaText, CW - 70);
  setTextC([200, 210, 230]);
  doc.text(ctaLines, M + 18, y + 13);

  // CTA button — clickable link
  const btnW = 42;
  const btnH = 13;
  const btnX = W - M - btnW - 4;
  const btnY = y + (ctaBoxH - btnH) / 2;
  setFill(RED);
  doc.roundedRect(btnX, btnY, btnW, btnH, 2, 2, "F");
  setTextC(WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text(ctaBtn, btnX + btnW / 2, btnY + btnH / 2 + 1.5, { align: "center" });
  doc.link(btnX, btnY, btnW, btnH, { url: ctaUrl });
  y += ctaBoxH + 6;

  // ── Disclaimer ──
  setDraw(BORDER);
  doc.roundedRect(M, y, CW, 28, 2, 2, "S");
  doc.setFont("helvetica", "bold");
  setTextC(GRAY);
  doc.setFontSize(6.5);
  doc.text("Avis important :", M + 4, y + 5);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  const discLines = doc.splitTextToSize(
    "Ce rapport est un outil d'estimation basé exclusivement sur les données saisies par l'utilisateur. La quotiété et les déductions calculées constituent une base de documentation, mais ne remplacent pas une analyse personnalisée par un expert-comptable agréé qui connaît l'ensemble de votre situation fiscale. MFinances SPRL décline toute responsabilité quant à l'utilisation de ce rapport sans validation professionnelle préalable.\n\nLes montants indiqués sont des estimations. Les déductions effectives peuvent varier selon votre situation fiscale complète, le régime d'imposition applicable et les éventuelles limitations légales. Conservez ce document comme pièce justificative — délai légal : 7 ans.",
    CW - 8,
  );
  doc.text(discLines, M + 4, y + 9);
  y += 32;

  // ── Footer page 2 ──
  setFill(BG);
  doc.rect(0, 280, W, 17, "F");
  setDraw(BORDER);
  doc.line(0, 280, W, 280);
  setTextC(GRAY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.text(
    "MFinances · Expert-comptable agréé · ITAA n°50.624.805 · Uccle, Bruxelles · info@mfinances.be · mfinances.be",
    M,
    286,
  );
  doc.text("Document confidentiel généré automatiquement · mfinances.be/ressources/calculateur-bureau/", M, 290);
  doc.text("Page 2 / 2", W - M, 286, { align: "right" });

  return doc.output("blob");
}
