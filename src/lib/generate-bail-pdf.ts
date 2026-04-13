import jsPDF from "jspdf";

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

function fmt(n: number) {
  return n.toLocaleString("fr-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function generateBailPdf(data: BailData): Blob {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const maxWidth = pageWidth - margin * 2;
  let y = 30;

  const checkPage = (needed: number) => {
    if (y + needed > 270) {
      doc.addPage();
      y = 25;
    }
  };

  const addTitle = (text: string) => {
    checkPage(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(26, 39, 68);
    doc.text(text.toUpperCase(), margin, y);
    y += 2;
    doc.setDrawColor(217, 52, 43);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 40, y);
    y += 7;
  };

  const addParagraph = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(text, maxWidth);
    checkPage(lines.length * 4.5);
    doc.text(lines, margin, y);
    y += lines.length * 4.5 + 3;
  };

  const bailLabel = data.bailType === "meuble" ? "LOCATION MEUBLÉE" : "LOCATION PROFESSIONNELLE";

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(26, 39, 68);
  doc.text(`CONTRAT DE BAIL DE ${bailLabel}`, pageWidth / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("À usage professionnel · Bureau à domicile · Belgique", pageWidth / 2, y, { align: "center" });
  y += 4;
  doc.setDrawColor(217, 52, 43);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // ENTRE LES SOUSSIGNÉS
  addTitle("Entre les soussignés");
  addParagraph(
    `D'une part, ${data.civilite} ${data.prenomBailleur} ${data.nomBailleur}, domicilié(e) à ${data.adresseBailleur}, ${data.cpBailleur} ${data.villeBailleur}, ${data.paysBailleur}, ci-après dénommé(e) « Le Bailleur »,`
  );
  addParagraph(
    `Et d'autre part, la société ${data.denomination} ${data.formeJuridique}, dont le siège social est établi à ${data.siegeSocial}, numéro BCE ${data.numeroBce}, représentée par ${data.representant}, ci-après dénommée « Le Preneur ».`
  );

  // ARTICLE 1
  addTitle("Article 1 — Objet du contrat");
  const surfaceText = data.surfaceBien ? `, surface approximative de ${data.surfaceBien} m²` : "";
  const descText = data.descriptionBien ? ` (${data.descriptionBien})` : "";
  addParagraph(
    `Le Bailleur donne en location au Preneur un espace ${data.bailType === "meuble" ? "meublé " : ""}à usage exclusivement professionnel situé à ${data.adresseBien}${surfaceText}${descText}.`
  );

  if (data.qualite === "locataire") {
    addParagraph(
      "Le Bailleur déclare être locataire principal du bien et être autorisé à sous-louer l'espace désigné conformément aux dispositions de son bail principal et de l'article 1717 du Code civil."
    );
  }

  // ARTICLE 2
  addTitle("Article 2 — Durée");
  addParagraph(
    `Le bail est conclu pour une durée de ${data.duree} an(s), prenant cours le ${data.dateDebut || "___"}, et se terminant de plein droit à l'échéance. Il est renouvelable par accord écrit des parties.`
  );

  // ARTICLE 3
  addTitle("Article 3 — Loyer");
  if (data.bailType === "meuble" && data.loyerMensuel > 0) {
    addParagraph(
      `Le loyer mensuel total est fixé à ${fmt(data.loyerMensuel)} €, réparti comme suit :`
    );
    addParagraph(`— Location de l'immeuble (${data.partImmeuble} %) : ${fmt(data.loyerImmeuble)} €/mois`);
    addParagraph(`— Location du mobilier (${data.partMeubles} %) : ${fmt(data.loyerMeubles)} €/mois`);
    addParagraph(
      "La partie mobilière du loyer est soumise au précompte mobilier au taux de 15 % sur 50 % du montant brut, soit une taxation effective de 7,5 %."
    );
  } else {
    addParagraph(
      `Le loyer mensuel est fixé à ${fmt(data.loyerMensuel)} €, payable anticipativement le premier de chaque mois sur le compte bancaire du Bailleur.`
    );
  }

  // ARTICLE 4
  addTitle("Article 4 — Indexation");
  if (data.indexation) {
    addParagraph(
      "Le loyer sera indexé annuellement à la date anniversaire du bail, conformément à l'article 1728bis du Code civil, sur la base de l'indice santé publié par le SPF Économie."
    );
  } else {
    addParagraph("Les parties conviennent qu'aucune indexation du loyer ne sera appliquée pendant la durée du bail.");
  }

  // ARTICLE 5
  addTitle("Article 5 — Garantie locative");
  if (data.garantie !== "0") {
    addParagraph(
      `Le Preneur constitue une garantie locative équivalente à ${data.garantie} mois de loyer, soit ${fmt(data.loyerMensuel * parseInt(data.garantie))} €, déposée sur un compte bloqué au nom du Preneur.`
    );
  } else {
    addParagraph("Aucune garantie locative n'est exigée.");
  }

  // ARTICLE 6
  addTitle("Article 6 — Usage des lieux");
  addParagraph(
    "Le Preneur s'engage à utiliser les lieux exclusivement à des fins professionnelles et à les maintenir en bon état d'entretien. Toute modification structurelle nécessite l'accord écrit préalable du Bailleur."
  );

  // ARTICLE 7
  addTitle("Article 7 — Charges");
  addParagraph(
    "Les charges (énergie, eau, internet, assurance) sont à répartir au prorata de la surface occupée, sauf convention contraire entre les parties."
  );

  // ARTICLE 8
  addTitle("Article 8 — Résiliation");
  addParagraph(
    "Chaque partie peut résilier le bail moyennant un préavis de trois mois, notifié par courrier recommandé. En cas de résiliation anticipée par le Preneur, une indemnité équivalente à un mois de loyer est due."
  );

  // ARTICLE 9
  addTitle("Article 9 — État des lieux");
  addParagraph(
    "Un état des lieux d'entrée contradictoire sera établi à la prise de possession. À défaut, le Preneur est présumé avoir reçu les lieux en bon état."
  );

  // INVENTAIRE MEUBLES
  if (data.bailType === "meuble" && data.meubles.length > 0) {
    addTitle("Annexe — Inventaire des meubles");
    data.meubles.forEach((m, i) => {
      const val = typeof m.valeur === "number" ? `${fmt(m.valeur)} €` : "—";
      addParagraph(`${i + 1}. ${m.designation || "—"} — Valeur : ${val}`);
    });
    const total = data.meubles.reduce((s, m) => s + (typeof m.valeur === "number" ? m.valeur : 0), 0);
    addParagraph(`Valeur totale de l'inventaire : ${fmt(total)} €`);
  }

  // SIGNATURES
  checkPage(40);
  y += 5;
  addTitle("Signatures");
  addParagraph(`Fait en deux exemplaires à ${data.villeBailleur || "___"}, le ${data.dateDebut || "___"}.`);

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.text("Le Bailleur", margin, y);
  doc.text("Le Preneur", pageWidth - margin - 30, y);
  y += 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, margin + 55, y);
  doc.line(pageWidth - margin - 55, y, pageWidth - margin, y);
  y += 5;
  doc.setFontSize(8);
  doc.text(`${data.civilite} ${data.prenomBailleur} ${data.nomBailleur}`, margin, y);
  doc.text(`${data.denomination} ${data.formeJuridique}`, pageWidth - margin - 55, y);

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `Généré par MFinances · ITAA n°50.624.805 · mfinances.be — Page ${i}/${totalPages}`,
      pageWidth / 2,
      290,
      { align: "center" }
    );
  }

  return doc.output("blob");
}
